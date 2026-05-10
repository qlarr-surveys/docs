---
sidebar_position: 5
---

# Response Piping

Response piping lets you insert answers from earlier questions into the text of later questions, creating a more personalized survey experience.

## How It Works

Piping is powered by the [instructions system](/architecture/data-model#instructions). When you reference a previous question's value in a label or text, the [Survey Engine](/components/survey-engine-kmp/overview) creates a dependency between the two components. The [generated state machine](/components/survey-engine-kmp/overview#generated-state-machine) re-evaluates the label whenever the referenced value changes, so piped text updates in real time as the respondent fills in the survey.

## Using Piping in the Editor

The rich text editor (TipTap) for question labels and info elements supports **mentions** — type `@` to see a list of available questions to reference. Selecting a question inserts a piped reference that will be replaced with the respondent's answer at runtime.

## How Piping Works Under the Hood

Any content (question labels, descriptions, info elements) that contains `{{ ... }}` (double curly braces) is treated as containing format instructions. The frontend extracts the content between the braces as a JavaScript expression and sends it as a format instruction to the engine.

For example, when you use the `@` mention to insert a reference to `Qname`, the editor produces content like:

```
Thank you, {{Qname.value}}!
```

The frontend:

1. Scans the content for `{{ ... }}` patterns
2. Extracts each expression (e.g., `Qname.value`) as a format instruction
3. Sends these format instructions to the [Survey Engine](/components/survey-engine-kmp/overview)
4. The engine evaluates the expressions, detects dependencies, and updates the displayed text whenever a referenced value changes

## Examples

**Personalized greeting:**

```
Thank you, {{Qname.value}}! Based on your experience at {{Qrestaurant.value}}, we'd like to ask a few more questions.
```

The respondent sees their actual name and restaurant name inserted into the text.

**Dynamic follow-up:**

```
You mentioned you've been a customer for {{Qyears.value}} years. How has your experience changed over that time?
```

## What Can Be Piped

- **Text question values** — the respondent's typed answer
- **Number values** — numeric answers
- **Choice labels** — the label text of the selected option
- **Date values** — selected dates

Piped references can be used in:

- Question labels
- Question descriptions
- Info element text (text display)
- Page titles
