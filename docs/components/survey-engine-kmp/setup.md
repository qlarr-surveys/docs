---
sidebar_position: 2
---

# Setup and Integration

How to add the Survey Engine (KMP) as a dependency in your project.

## Prerequisites

- **JDK 17+** — required for JVM builds
- **Gradle 8.10+** — build system
- **Kotlin 2.1+** — language version

## Installation

The library is published via [JitPack](https://jitpack.io/#qlarr-surveys/survey-engine-kmp).

### Step 1: Add the JitPack repository

```kotlin
// settings.gradle.kts
dependencyResolutionManagement {
    repositories {
        maven { url = uri("https://jitpack.io") }
    }
}
```

Or in your module's `build.gradle.kts`:

```kotlin
repositories {
    maven { url = uri("https://jitpack.io") }
}
```

### Step 2: Add the dependency

```kotlin
dependencies {
    implementation("com.github.qlarr-surveys:survey-engine-kmp:0.1.6")
}
```

## Platform Targets

The library supports three platform targets:

| Platform | Target | JS Engine |
|---|---|---|
| **JVM** | `jvm()` | GraalVM JavaScript (sandboxed) |
| **JavaScript** | `js(IR)` — browser and Node.js | Native `eval` |
| **iOS** | `iosX64`, `iosArm64`, `iosSimulatorArm64` | JavaScriptCore |

### iOS (CocoaPods)

For iOS projects, the library is available as a CocoaPods framework:

```ruby
pod 'surveyengine', :path => '<path-to-library>'
```

Before running `pod install`, generate the framework:

```bash
./gradlew :surveyengine:generateDummyFramework
```

## API Overview

The library exposes two main entry points:

### ValidationUseCaseWrapper (design time)

Used to process and validate a survey definition:

```kotlin
val wrapper = ValidationUseCaseWrapper.create(surveyJson)
val result = wrapper.validate() // returns processed survey JSON
```

### NavigationUseCaseWrapper (execution time)

Used to navigate a survey during execution:

```kotlin
val wrapper = NavigationUseCaseWrapper(
    processedSurvey = processedSurveyJson,
    values = existingResponses,           // default: "{}"
    navigationMode = NavigationMode.GROUP_BY_GROUP,
    navigationDirection = NavigationDirection.Start,
    navigationIndex = null,
    lang = "en",
    skipInvalid = true,
    surveyMode = surveyMode
)
```

### Key Types

- **`NavigationMode`** — `ALL_IN_ONE`, `GROUP_BY_GROUP`, `QUESTION_BY_QUESTION`
- **`NavigationDirection`** — `Start`, `Next`, `Previous`, `Resume`, `Save`, `Jump`
- **`NavigationIndex`** — identifies the current position (group, question, or end)

## Building from Source

```bash
git clone https://github.com/qlarr-surveys/survey-engine-kmp.git
cd survey-engine-kmp
./gradlew build
```

## Running Tests

```bash
./gradlew allTests
```

Platform-specific tests:

```bash
./gradlew jvmTest
./gradlew jsTest
./gradlew iosX64Test
```
