---
sidebar_position: 2
---

# Android Setup

## Prerequisites

- **Android Studio** Arctic Fox or later
- **Android SDK 24+**
- **JDK 17**
- A running [Backend](/components/backend/setup) instance for syncing surveys

## Running Locally

1. Clone the repository:

```bash
git clone https://github.com/qlarr-surveys/android.git
cd android
```

2. Open the project in Android Studio

3. Build and run on an emulator or device:

```bash
./gradlew installDebug
```

The debug build uses the application ID suffix `.debug`, so it can be installed alongside a release build.

## Build Types

| Type | Debuggable | Minified | Suffix |
|---|---|---|---|
| `debug` | Yes | No | `.debug` |
| `release` | No | Yes (ProGuard + resource shrinking) | — |

## Build Commands

```bash
./gradlew assembleDebug          # Build debug APK
./gradlew assembleRelease        # Build release APK
./gradlew test                   # Run unit tests
./gradlew connectedAndroidTest   # Run instrumented tests
```

## Guest Mode

The app includes bundled example surveys in the `assets/example-surveys/` directory. Guest mode allows testing survey functionality without a backend connection.

## Updating the Frontend Bundle

The embedded React frontend is stored in `app/src/main/assets/react-app/`. To update it, build the frontend with the Android target and copy the output:

```bash
# In the frontend repo
npm run build-android

# Copy build output to Android assets
cp -r build/* ../android/app/src/main/assets/react-app/
```
