---
sidebar_position: 2
---

# Data Model

## Survey Definition

Surveys are defined as JSON files with a hierarchical structure:

**Survey → Groups (pages) → Questions → Answers**

Each level in the hierarchy carries:
- **`content`** — localized labels and hints (HTML strings keyed by language code)
- **`instructionList`** — JavaScript expressions that drive the survey's behavior (relevance, validity, value, etc.)
- **`resources`** — associated media files

### Survey Level

The root of the definition contains global settings:

- **`groups`** — the list of pages
- **`navigationMode`** — `group_by_group`, `question_by_question`, or all at once
- **`defaultLang`** / **`additionalLang`** — language configuration
- **`theme`** — visual styling (fonts, colors)
- **`allowPrevious`**, **`allowIncomplete`**, **`allowJump`**, **`skipInvalid`** — navigation behavior

### Groups (Pages)

Groups represent pages in the survey. Each group contains:
- **`questions`** — the list of questions on that page
- **`groupType`** — the type of group (e.g., `GROUP`)
- **`relevance`** — whether the page is shown (e.g., `show_always` or a conditional rule)

### Questions

Each question has:
- **`type`** — the question type (see [Question Types](/features/question-types))
- **`content`** — localized label and hint text
- **`answers`** — for choice-based questions, the list of answer options
- **`validation`** — validation rules (e.g., `validation_required`)
- **`skip_logic`** — conditional navigation after answering

### Answers

Answer options within choice-based questions. Each answer has its own `instructionList`, allowing per-option logic for relevance, ordering, and labeling.

## Instructions

The `instructionList` is the core mechanism that powers survey logic. Every component (survey, group, question, answer) has one. Each instruction is a JavaScript expression with:

- **`code`** — the instruction type (e.g., `relevance`, `validity`, `value`, `label`)
- **`text`** — the JavaScript expression to evaluate
- **`returnType`** — expected return type
- **`isActive`** — whether the instruction uses a custom expression or the default

Common instruction types:
- **`relevance`** — controls whether a component is shown
- **`validity`** — whether the component's current state is valid
- **`value`** — the component's current value
- **`label`** — dynamic label text
- **`order`** / **`priority`** — controls randomization and ordering

These expressions can reference other components (e.g., `Qname.value`, `Qchoice.relevance`), enabling conditional logic, piping, and validation across the survey.

## Processed Survey Output

When the [Survey Engine](/components/survey-engine-kmp/overview) processes a survey definition, it validates the structure and logic, then produces several additional artifacts: a database schema for responses, a component graph capturing the full hierarchy and dependencies, dependency maps for change propagation, skip logic routing, and a generated JavaScript state machine. These artifacts are what the backend and Android app use to run the survey at execution time. See [Processed Survey Output](/components/survey-engine-kmp/overview#processed-survey-output) for the full breakdown.

## Generated State Machine

The most important processed artifact is a **JavaScript state machine** that runs on the UI during survey execution. It makes surveys reactive — when a respondent interacts with a question, the state machine propagates changes through the dependency graph, automatically updating visibility, validation, piped values, and conditional formatting across the entire survey in one pass. See [Generated State Machine](/components/survey-engine-kmp/overview#generated-state-machine) for details on how it works.

## Survey Settings (Database)

While the survey definition is stored as a JSON file, survey metadata and configuration are stored in **PostgreSQL**. This includes:

- **`id`** — unique survey identifier
- **`name`** / **`description`** — survey display info
- **`status`** — lifecycle state (e.g., `active`)
- **`usage`** — deployment mode (`mixed`, `web`, or `offline`)
- **`startDate`** / **`endDate`** — optional collection period
- **`surveyQuota`** — maximum number of responses (-1 for unlimited)
- **`responsesCount`** / **`completeResponseCount`** — response counters

### Version Tracking

Each survey tracks its latest version:

- **`version`** / **`subVersion`** — version numbering
- **`valid`** — whether the current design passes validation
- **`published`** — whether this version is live
- **`status`** — version-level status

### Navigation Settings

Navigation behavior is stored alongside the survey settings:

- **`navigationMode`** — `GROUP_BY_GROUP`, `QUESTION_BY_QUESTION`, or all at once
- **`allowPrevious`** — whether respondents can go back
- **`allowIncomplete`** — whether partial responses are saved
- **`allowJump`** — whether respondents can jump between sections
- **`skipInvalid`** — whether to skip past invalid sections
- **`resumeExpiryMillis`** — how long a partial response remains resumable

### Privacy and Offline Settings

- **`saveIp`** — record respondent IP addresses
- **`saveTimings`** — track response times
- **`backgroundAudio`** — record audio during offline surveys
- **`recordGps`** — capture GPS coordinates with responses
- **`publicWithinOrg`** — whether the survey is visible to all organization members

### Autocomplete Resources

Surveys with autocomplete questions store references to their data files:

- **`code`** — the question code that uses autocomplete
- **`filename`** — reference to the uploaded data file
