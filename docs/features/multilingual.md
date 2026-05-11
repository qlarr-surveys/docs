---
sidebar_position: 4
---

# Multi-Language Support

Qlarr supports creating surveys in multiple languages, allowing respondents to switch between languages during the survey.

## Setting Up Languages

1. Open your survey in the editor
2. Click the **language panel** (globe icon) in the left sidebar
3. Set your **Base Language** — the primary language you'll author the survey in
4. Check any **Additional Languages** to enable

Supported languages include: English, Deutsch, العربية, Español, Português, Français, and Nederlands.

## Translating Content

Once additional languages are enabled, every text field in the survey becomes translatable. The editor stores content keyed by language code in the survey's `content` objects:

- **Question labels** — the question text shown to respondents
- **Hints** — placeholder text in input fields
- **Descriptions** — additional context below question titles
- **Answer option labels** — text for each choice option
- **Validation error messages** — custom error text per language
- **Page titles and descriptions**
- **Info element content** (text display, image captions)

Switch between languages using the language selector in the editor to enter translations for each field.

## Language Selection for Respondents

When a survey has multiple languages enabled, respondents can switch languages at any time during the survey. The language switcher appears in the survey UI, and all question text, options, and messages update immediately.

The survey can also be started in a specific language by passing the `lang` parameter when starting a session.

## Right-to-Left (RTL) Support

Qlarr includes built-in RTL support for languages like Arabic (العربية). When an RTL language is active:

- The entire survey layout mirrors (right-to-left reading direction)
- Text alignment adjusts automatically
- The editor UI also supports RTL via `stylis-plugin-rtl`
