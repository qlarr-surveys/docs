---
sidebar_position: 1
---

# Conditional Logic

Qlarr Surveys supports conditional logic to control what respondents see based on their previous answers. This includes relevance conditions (show/hide), skip logic (jump to a different section), and advanced JavaScript expressions.

## How It Works

All conditional logic is powered by the [instructions system](/architecture/data-model#instructions). Each component (page, question, answer option) has an `instructionList` containing JavaScript expressions that the [Survey Engine](/components/survey-engine-kmp/overview) evaluates at runtime. When a respondent answers a question, the [generated state machine](/components/survey-engine-kmp/overview#generated-state-machine) propagates changes through the dependency graph and re-evaluates all affected conditions in a single pass.

## Relevance (Show/Hide)

Relevance controls whether a component is visible to the respondent. Every question, page, and answer option has a relevance setting.

### Setting Relevance in the Editor

1. Click on a question to open the setup panel
2. Go to the **Logic** tab
3. Toggle the **Relevance** switch

Two modes are available:

- **Visual builder** — a point-and-click interface for building conditions without code. Select a question to reference, choose a comparison operator, and set a value.
- **Raw expression** — write a JavaScript expression directly for complex conditions. Switch between modes using the link below the condition builder.

### Relevance Values

- **Show always** (default) — the component is always visible
- **Show if** — visible only when the condition evaluates to `true`
- **Hide always** — the component is never shown (useful for hidden computed fields)

### Examples

Show a follow-up question only if the respondent selected "Other":

```
Qchoice.value === "other"
```

Show a page only if the respondent is over 18:

```
Qage.value >= 18
```

Show an answer option only when another question has a specific value:

```
Qcountry.value === "US"
```

### Relevance on Answer Options

Individual answer options within choice questions also support relevance conditions. This allows you to show or hide specific options based on previous answers — for example, filtering a list of cities based on the selected country.

## Skip Logic

Skip logic lets you jump the respondent to a different page or question based on their answer to a choice question. It is available on single-choice questions (radio, icon, image).

### Setting Up Skip Logic

1. Click on a single-choice question to open the setup panel
2. Go to the **Logic** tab
3. Under **Skip Logic**, click **Add Skip Rule**
4. Select the **conditions** — which answer options trigger this rule
5. Select the **destination** — which page or question to skip to

### Skip Rule Options

Each skip rule has:

- **Condition** — one or more answer options that trigger the skip
- **Destination** — a page or question to jump to
- **To end of group** — skip to the end of the destination page instead of its beginning
- **Disqualify** — mark the respondent as disqualified (only available when skipping to the Thank You page)

You can add multiple skip rules to a single question, each with different conditions and destinations. Answer options can only be used in one rule.

## Advanced: Order Instructions

For more complex scenarios, the **Order Instructions** section (in the Logic tab under advanced settings) lets you write raw JavaScript expressions for any instruction type. This is useful for:

- Computed values that depend on multiple questions
- Dynamic labels that change based on responses
- Custom ordering logic
- Conditions that require arithmetic or string operations

These expressions can reference any component in the survey using the pattern `Qcode.value`, `Qcode.relevance`, etc.
