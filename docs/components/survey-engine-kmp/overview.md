---
sidebar_position: 1
---

# Survey Engine (KMP) Overview

The Survey Engine is the core processing layer of Qlarr, built using Kotlin Multiplatform (KMP). It is a UI-agnostic library that parses survey definitions and manages survey execution across all platforms.

## Repository

[qlarr-surveys/survey-engine-kmp](https://github.com/qlarr-surveys/survey-engine-kmp)

## Role in the System

The Survey Engine is imported as a dependency by both the [Backend](/components/backend/overview) (JVM build) and the [Android](/components/android/overview) app (KMP native build). It is the single source of truth for how surveys are processed and executed.

## Two Use Cases

### Process Survey (design time)

When a survey is designed, the engine takes the [JSON survey definition](/architecture/data-model#survey-definition) as input and produces:

1. **Component Graph** — survey components organized into nodes linked by parent-child and sibling relationships, with scope validation and logical consistency checks
2. **State Machine Files** — JavaScript resources that power the runtime state machine, reacting to user interaction and updating survey state
3. **DB Schema** — a relational schema for storing survey responses
4. **Validated Design** — the survey definition with structure and logic validated, augmented with navigation instructions

### Processed Survey Output

The processing step produces several artifacts alongside the validated survey:

- **`survey`** — the validated and augmented survey definition
- **`schema`** — database column definitions derived from questions, used to create the response table
- **`componentIndexList`** — the component graph with parent-child relationships and dependency tracking
- **`script`** — the generated JavaScript state machine (see [Generated State Machine](#generated-state-machine) below)
- **`impactMap`** — dependency graph that determines which components need recalculation when a value changes
- **`skipMap`** — skip logic routing table

These artifacts are what the backend and Android app use to run the survey at execution time.

For details on the input format (survey definition JSON), see the [Data Model](/architecture/data-model).

### Navigate Survey (execution time)

When a respondent takes a survey, the engine takes the processed survey and existing responses (if any) as input and produces:

1. **Reduced Survey** — the survey structure reduced to only the components relevant to the respondent's current position
2. **Survey State** — state machine resources for the current navigation step
3. **Values to Save** — the response data to persist

## Platform Targets

The library is built with Kotlin Multiplatform and supports:

- **JVM** — used by the Spring Boot backend
- **JavaScript** — for Node.js or browser-based applications
- **iOS** — native iOS support via CocoaPods framework

## Supported Features

- Conditional logic and skip logic
- Input validation
- Randomization and sampling
- Multilingual surveys
- Response piping
- Flexible navigation (all questions, page by page, or question by question)
- Conditional formatting

## Generated State Machine

One of the key outputs of the engine's "Process Survey" step is a **JavaScript state machine** that runs on the UI at survey execution time. This state machine is what makes surveys reactive — when a respondent interacts with a question, the entire survey state updates automatically.

### How It Works

The generated code consists of three parts:

1. **`qlarrStateMachine`** — the core propagation function. When a component's value changes, it updates the state and recursively processes all dependents. If a value hasn't changed, propagation stops (preventing infinite loops and unnecessary recalculation).

2. **`qlarrRuntime`** — a generated object containing functions for every component in the survey. Each function computes a specific property (relevance, validity, value, label, etc.) from the current state. For example, a question's `relevance` function might check the value of another question to decide whether to show or hide itself.

3. **`QlarrScripts`** — a utility library available to all survey expressions, providing safe helper functions like `isVoid`, `isNotVoid`, `stripTags`, date/time formatting, and list formatting.

### Reactive Propagation

The state machine follows a dependency-driven model:

1. User changes a value (e.g., selects an answer)
2. `qlarrStateMachine` is called with the component name, variable, and new value
3. The function looks up all dependents of that variable via the dependency graph
4. Each dependent's function is re-evaluated against the current state
5. If a dependent's value changed, its own dependents are recursively processed

This means a single user action can cascade through the survey — updating visibility of follow-up questions, recalculating validation, resolving piped values, and adjusting conditional formatting — all in one pass.

For details on the survey definition format and how instructions work, see the [Data Model](/architecture/data-model).
