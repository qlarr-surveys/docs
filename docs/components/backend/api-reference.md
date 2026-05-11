---
sidebar_position: 3
---

# API Reference

Complete reference for the Qlarr backend REST API. All endpoints are at the root level (no `/api/` prefix).

For authentication details, see [Authentication](/components/backend/overview#authentication).

## Authentication

### `POST /user/login`
Authenticate with email and password.
- **Body:** `{ email, password }`
- **Response:** access token + refresh token
- **Auth:** none

### `POST /user/refresh_token`
Refresh an expired access token.
- **Body:** `{ refreshToken }`
- **Response:** new access token + refresh token
- **Auth:** none

### `POST /user/forgot_password`
Send a password reset email.
- **Body:** `{ email }`
- **Auth:** none

### `POST /user/reset_password`
Reset password using the token from the email.
- **Body:** `{ token, password }`
- **Response:** access token + refresh token
- **Auth:** none

---

## Users

### `GET /user/all`
List all users.
- **Auth:** super_admin, survey_admin

### `GET /user/{userId}`
Get user details by ID.
- **Auth:** authenticated

### `POST /user/create`
Create a new user.
- **Body:** `{ firstName, lastName, email, roles }`
- **Auth:** super_admin

### `PUT /user/{userId}`
Update a user.
- **Body:** `{ firstName, lastName, email, roles }`
- **Auth:** super_admin

### `DELETE /user/{userId}`
Delete a user (soft delete).
- **Auth:** super_admin

### `PUT /user/profile`
Update own profile.
- **Body:** `{ firstName, lastName, email, password, newPassword }`
- **Auth:** authenticated

### `GET /user/count_by_role`
Get user count grouped by role.
- **Auth:** super_admin

### `POST /user/confirm_new_email`
Confirm an email address change using a PIN.
- **Body:** `{ pin }`
- **Auth:** none

---

## Surveys

### `POST /survey/create`
Create a new survey.
- **Body:** `{ name }`
- **Auth:** super_admin, survey_admin

### `GET /survey/{surveyId}`
Get survey details.
- **Auth:** authenticated

### `PUT /survey/{surveyId}`
Update survey metadata (name, dates, settings).
- **Body:** survey settings (name, dates, quota, privacy, navigation, etc.)
- **Auth:** super_admin, survey_admin

### `PUT /survey/{surveyId}/close`
Close/deactivate a survey.
- **Auth:** super_admin, survey_admin

### `DELETE /survey/{surveyId}`
Delete a survey.
- **Auth:** super_admin, survey_admin

### `POST /survey/{surveyId}/clone`
Clone an existing survey.
- **Auth:** super_admin, survey_admin

### `GET /survey/{surveyId}/export`
Export survey as a ZIP package.
- **Auth:** super_admin, survey_admin

### `POST /survey/import`
Import a survey from a ZIP file.
- **Body:** multipart file upload
- **Auth:** super_admin, survey_admin

### `GET /survey/all`
List all surveys with pagination and filtering.
- **Query:** `page`, `per_page`, `sort_by`, `status`
- **Auth:** authenticated

### `GET /survey/offline`
Get surveys available for offline mode.
- **Auth:** super_admin, survey_admin, surveyor

---

## Survey Design

### `GET /survey/{surveyId}/design`
Get the current survey design JSON.
- **Auth:** super_admin, survey_admin

### `POST /survey/{surveyId}/design`
Save/update the survey design.
- **Query:** `version`, `sub_version`
- **Body:** survey design JSON
- **Auth:** super_admin, survey_admin

### `POST /survey/{surveyId}/design/publish`
Publish a survey design version.
- **Query:** `version`, `sub_version`
- **Auth:** super_admin, survey_admin

### `POST /survey/{surveyId}/change_code`
Rename a question/component code.
- **Query:** `from`, `to`
- **Auth:** super_admin, survey_admin

### `POST /survey/{surveyId}/offline/design`
Get design differences for offline sync.
- **Body:** publish info
- **Auth:** super_admin, survey_admin, surveyor

---

## Survey Execution

All survey execution endpoints are **public** (no authentication required).

### `POST /survey/{surveyId}/run/start`
Start a survey session.
- **Body:** `{ lang }`

### `POST /survey/{surveyId}/run/navigate`
Navigate to the next/previous page or submit.
- **Body:** `{ responseId, values, navigationDirection, navigationIndex }`

### `GET /survey/{surveyId}/run/runtime.js`
Get the generated JavaScript state machine for client-side execution.

### `POST /survey/{surveyId}/preview/start`
Start a survey in preview mode.
- **Query:** `mode` (optional, e.g., "offline")
- **Body:** `{ lang }`

### `POST /survey/{surveyId}/preview/navigate`
Navigate in preview mode.
- **Query:** `mode` (optional)
- **Body:** `{ responseId, values, navigationDirection, navigationIndex }`

### `GET /survey/{surveyId}/preview/runtime.js`
Get runtime JavaScript for preview mode.

---

## Responses

### `GET /response/{responseId}`
Get a single response by ID.
- **Auth:** super_admin, survey_admin, analyst

### `GET /response_with_event/{responseId}`
Get a response with its associated events.
- **Auth:** super_admin, survey_admin, analyst

### `GET /survey/{surveyId}/response/summary`
Get paginated response summary for a survey.
- **Query:** `page`, `per_page`, `confirm_files_export`, `surveyor`, `status`
- **Auth:** super_admin, survey_admin, analyst

### `GET /survey/{surveyId}/response/analytics`
Get aggregated analytics for survey responses.
- **Query:** `max_responses` (optional)
- **Auth:** super_admin, survey_admin, analyst

### `GET /survey/{surveyId}/response/export/{format}/{from}/{to}`
Export responses in a given format.
- **Path:** `format` (csv, xlsx, json), `from`/`to` (response indices)
- **Query:** `db_values`, `complete`, `timezone` (required)
- **Auth:** super_admin, survey_admin, analyst

### `GET /survey/{surveyId}/response/files/download/{from}/{to}`
Download response files as a ZIP archive.
- **Query:** `complete`
- **Auth:** super_admin, survey_admin, analyst

### `DELETE /survey/{surveyId}/response/{responseId}`
Delete a response.
- **Auth:** super_admin, survey_admin

---

## Response Files

### `POST /survey/{surveyId}/response/attach/{responseId}/{questionId}`
Upload a file attachment to a response.
- **Body:** multipart file
- **Auth:** none

### `GET /survey/{surveyId}/response/attach/{responseId}/{questionId}`
Download a response file attachment.
- **Auth:** none

### `POST /survey/{surveyId}/response/preview/attach/{responseId}/{questionId}`
Upload a preview file for a response.
- **Body:** multipart file
- **Auth:** none

### `GET /survey/{surveyId}/response/{responseId}/attach/{filename}`
Download a response file by filename.
- **Auth:** none

---

## Offline Sync

### `POST /survey/{surveyId}/response/{responseId}/upload`
Upload a complete offline survey response.
- **Body:** response data
- **Auth:** super_admin, survey_admin, surveyor

### `POST /survey/{surveyId}/offline/response/{responseId}/upload/{fileName}`
Upload a file from an offline response.
- **Body:** multipart file
- **Auth:** super_admin, survey_admin, surveyor

### `POST /survey/{surveyId}/offline/response/{responseId}/upload/{filename}/exists`
Check if an offline file has already been uploaded.
- **Auth:** super_admin, survey_admin, surveyor

---

## Survey Resources

### `POST /survey/{surveyId}/resource`
Upload a resource file (images, media) for a survey.
- **Body:** multipart file
- **Auth:** super_admin, survey_admin

### `GET /survey/{surveyId}/resource/{fileName}`
Download a survey resource file.
- **Auth:** none

### `DELETE /survey/{surveyId}/resource/{fileName}`
Delete a survey resource file.
- **Auth:** super_admin, survey_admin

---

## Autocomplete

### `POST /autocomplete/{surveyId}/{componentId}`
Upload autocomplete data for a question.
- **Body:** multipart file
- **Auth:** super_admin, survey_admin

### `GET /autocomplete/{surveyId}/{componentId}`
Get all autocomplete values for a question.
- **Auth:** super_admin, survey_admin

### `GET /survey/{surveyId}/autocomplete/{filename}`
Search autocomplete values.
- **Query:** `q` (search term), `limit` (default: 10)
- **Auth:** none

### `POST /survey/{surveyId}/autocomplete_resource/{componentId}`
Upload an autocomplete resource file.
- **Body:** multipart file
- **Auth:** super_admin, survey_admin

---

## Events

### `GET /user/{userId}/event`
Get events for a user within a date range.
- **Query:** `from`, `to` (UTC datetime, optional)
- **Auth:** super_admin

### `POST /user/{userId}/event`
Create an event for a user.
- **Body:** event data
- **Auth:** authenticated (own user)
