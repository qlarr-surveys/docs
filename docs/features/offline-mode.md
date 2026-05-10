---
sidebar_position: 6
---

# Offline Mode

Qlarr Surveys supports offline-first data collection, allowing surveyors to collect responses in areas with poor or no internet connectivity.

## How It Works

Offline mode is powered by the [Android app](/components/android/overview), which runs surveys entirely on-device:

1. **Download** — While connected, the app downloads survey designs, resources, and autocomplete data from the [Backend](/components/backend/overview)
2. **Collect** — Surveys run locally using the [Survey Engine (KMP)](/components/survey-engine-kmp/overview) with no server communication needed
3. **Sync** — When connectivity returns, responses are uploaded to the backend in the background

The web frontend can also run surveys with intermittent connectivity, but the Android app is designed specifically for sustained offline use.

## Enabling Offline Mode

When configuring a survey, set the **Survey Mode** in the launch settings:

- **Web and Offline** — survey is available both on web and for offline collection via the Android app
- **Web Only** — survey is only available via web link
- **Offline Only** — survey is only available through the Android app

Surveys set to "Web and Offline" or "Offline Only" appear in the Android app's survey list when the surveyor syncs.

## Survey Download

When the Android app syncs, it downloads everything needed to run surveys without a server connection.

### Step 1: Fetch Survey List

The app calls `GET /survey/offline` to get all surveys available for offline use. The response includes survey metadata, status, published version, quotas, and feature flags (GPS, audio, timings). The app compares versions with its local cache to determine which surveys need updating.

### Step 2: Download Survey Design

For new or updated surveys, the app calls `POST /survey/{surveyId}/offline/design` with its current `PublishInfo` (version, subVersion, lastModified). The backend responds with a `DesignDiffDto` containing:

- **`validationJsonOutput`** — the processed survey design (schema, component index, script, impact/skip maps) if the version has changed
- **`files`** — list of resource files (name, size, lastModified) that need to be downloaded
- **`publishInfo`** — the current published version on the server

If the app already has the latest version, the design is omitted and only file changes are returned.

### Step 3: Download Resources

For each file in the diff response, the app downloads survey resources via `GET /survey/{surveyId}/resource/{fileName}`. These include images, videos, and other media used in the survey.

### Step 4: Download Autocomplete Data

If the survey uses autocomplete questions, the app downloads the autocomplete data files. These are cached locally so autocomplete search works offline.

### Local Storage

All downloaded data is stored locally:

- **Survey design and metadata** — Room database (`SurveyDataEntity`)
- **Resource files** — device file storage
- **Runtime script** — generated on-device by the KMP engine from the cached design

### Download Endpoints

| Endpoint | Auth | Purpose |
|---|---|---|
| `GET /survey/offline` | Yes | List surveys available for offline use with metadata and version info |
| `POST /survey/{surveyId}/offline/design` | Yes | Get survey design diff based on the app's current version |
| `GET /survey/{surveyId}/resource/{fileName}` | No | Download a survey resource file (image, media) |

## Response Sync

Responses collected offline are synced to the backend when connectivity is available. The sync process is handled by Android's `WorkManager` and runs in the background:

### Sync Flow

1. The app identifies all unsynced, submitted responses across active surveys
2. For each response, **file attachments are uploaded first**:
   - Photos (compressed), videos, audio recordings, signatures, uploaded files
   - Each file is checked against the server to avoid duplicate uploads (`POST .../upload/{fileName}/exists`)
   - Files are uploaded individually (`POST .../upload/{fileName}`)
3. The **response data is uploaded** with all values, timestamps, language, navigation state, and events (`POST .../response/{responseId}/upload`)
4. On success, the response is marked as synced locally and the survey's response counts are updated

### Upload Endpoints

| Endpoint | Auth | Purpose |
|---|---|---|
| `POST .../offline/response/{responseId}/upload/{fileName}/exists` | Yes | Check if a file was already uploaded |
| `POST .../offline/response/{responseId}/upload/{fileName}` | Yes | Upload a response file attachment |
| `POST .../response/{responseId}/upload` | Yes | Upload the response data (values, events, timestamps) |

### Retry and Reliability

- Sync jobs are queued with `WorkManager`, which guarantees execution even if the app is closed
- Network connectivity is required — the job waits until a connection is available
- Failed uploads retry automatically with linear backoff
- Each file upload is idempotent — the app checks if a file already exists on the server before re-uploading

## Offline-Only Features

Surveys running in offline mode can use additional data collection capabilities:

- **GPS Recording** — capture device coordinates with each response (enable **Record GPS** in survey settings)
- **Background Audio** — record audio in the background during the survey (enable **Background Audio** in survey settings)
- **Response Timings** — track how long each response takes (enable **Save Timings** in survey settings)

These events are stored alongside the response data and uploaded during sync.

## Survey Versioning

The app tracks the published version of each survey. When a surveyor syncs their survey list:

- If a newer version is available, the app flags it so the surveyor can update
- Responses collected on an older version include the version number, so the backend can handle version differences
- The design diff endpoint (`POST /survey/{surveyId}/offline/design`) returns only the changes since the app's current version, minimizing download size

## Quotas

Admins can control offline data collection with quotas:

- **Per-surveyor quota** — limit how many responses each surveyor can collect
- **Total quota** — limit total responses across all surveyors

The app tracks local response counts and checks against quotas when syncing.
