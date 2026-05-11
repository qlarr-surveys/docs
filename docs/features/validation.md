---
sidebar_position: 2
---

# Input Validation

Qlarr provides built-in validation rules and support for custom validation expressions to ensure data quality.

## How It Works

Validation is configured per question in the editor's **Validation** tab. Each rule generates a `validity` [instruction](/architecture/data-model#instructions) — a JavaScript expression that the [Survey Engine](/components/survey-engine-kmp/overview) evaluates at runtime. When a rule fails, the configured error message is shown to the respondent.

Validation runs in the browser via the [generated state machine](/components/survey-engine-kmp/overview#generated-state-machine), providing instant feedback as the respondent fills in the survey.

## Built-in Validation Rules

The available rules depend on the question type:

### Text Questions

| Rule | Description |
|---|---|
| Required | Field must not be empty |
| Min character length | Minimum number of characters |
| Max character length | Maximum number of characters |
| Pattern (regex) | Must match a regular expression |
| Contains | Must contain a specific string |
| Does not contain | Must not contain a specific string |

### Number Questions

| Rule | Description |
|---|---|
| Required | Field must not be empty |
| Between | Value must be within a range |
| Not between | Value must be outside a range |
| Less than / Less than or equal | Upper bound |
| Greater than / Greater than or equal | Lower bound |
| Equals / Not equal | Exact match or exclusion |

### Long Text (Paragraph) Questions

| Rule | Description |
|---|---|
| Required | Field must not be empty |
| Min word count | Minimum number of words |
| Max word count | Maximum number of words |
| Contains / Does not contain | String presence checks |

### Email Questions

| Rule | Description |
|---|---|
| Required | Field must not be empty |
| Email pattern | Must be a valid email format (built-in) |
| Min/Max character length | Length constraints |

### Choice Questions (Multiple Choice)

| Rule | Description |
|---|---|
| Min selected options | Minimum number of selections |
| Max selected options | Maximum number of selections |
| Exact option count | Must select exactly N options |

### Ranking Questions

| Rule | Description |
|---|---|
| Min ranked items | Minimum number of items to rank |
| Max ranked items | Maximum number of items to rank |
| Exact ranking count | Must rank exactly N items |

### Array Questions (Matrix)

| Rule | Description |
|---|---|
| Required | All rows must be answered |
| One response per column | Each column can only be selected once across rows |

### File Upload / Photo / Video

| Rule | Description |
|---|---|
| Required | A file must be uploaded |
| Max file size | Maximum file size |
| File types | Allowed file extensions (file upload only) |

## Custom Validation Rules

For validation logic that goes beyond built-in rules, you can write custom JavaScript expressions:

1. Open the question's **Validation** tab
2. Click **Add Custom Rule** at the bottom
3. Give the rule an **ID** (used internally)
4. Write a **JavaScript expression** that returns `true` when the input is valid
5. Set a custom **error message** for each language

Custom rules can reference other questions. For example, to ensure a confirmation email matches the original:

```
Qemail.value === Qemail_confirm.value
```

Or to validate that a number is a multiple of 5:

```
Qcount.value % 5 === 0
```

## Validation Error Messages

Each validation rule has a configurable error message. For multilingual surveys, you can set a different message per language. The message is displayed below the question when validation fails.

## Validation Timing

Validation behavior depends on the survey's navigation settings:

- **Per question** (default) — validation runs when the respondent moves to the next question or page
- **On submit only** — enable **Enforce Validation Only on Submit** in the survey settings to defer all validation until the respondent submits the survey
