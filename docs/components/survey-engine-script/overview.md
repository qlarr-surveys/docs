---
sidebar_position: 1
---

# Survey Engine Script Overview

The Survey Engine Script is a JavaScript library that validates the dynamic instructions used in survey designs. It ensures that survey logic expressions are safe, syntactically correct, and only access permitted variables and functions.

## Repository

[qlarr-surveys/survey-engine-script](https://github.com/qlarr-surveys/survey-engine-script)

## Purpose

Surveys in Qlarr use JavaScript expressions for dynamic behavior — conditional logic, validation rules, piping, formatting, etc. (see [Instructions](/architecture/data-model#instructions)). These expressions are written by survey designers, so they need to be validated before execution.

Survey Engine Script parses each expression into an [Abstract Syntax Tree](https://github.com/estree/estree/blob/master/es5.md) (AST) using [acorn](https://github.com/acornjs/acorn) and validates the tree nodes against a strict set of rules.

## Security Model

### Allowed

- **Literals** — simple values: `1`, `"text"`, `true`
- **Binary expressions** — `1 + 2`, `a * b`
- **Logical expressions** — `a || b`, `a && b`
- **Unary expressions** — `!true`, `!a`
- **Conditional (ternary) expressions** — `a ? b : c`
- **Object and array expressions** — `{name: "Alfred"}`, `[1, 2, 3]`
- **Whitelisted function calls** — common static methods like `Math.abs()`, `Date.parse()`, and instance methods like `"abc".length`, `[1,2,3].at(0)`
- **Whitelisted variables** — only survey variables that are in scope for the instruction (e.g., `Qname.value`, `Qchoice.relevance`)

### Blocked

- Variable or function declarations
- Variable assignment or update
- `if`, `while`, `for`, or any loop statements
- Any node type not explicitly permitted

This ensures survey logic cannot execute arbitrary code while remaining flexible enough for complex survey scenarios.

## API

The library exposes a single function:

```javascript
EMScript.validateCode(instructionList)
```

- **Input**: a JSON array of objects, each with:
  - `script` — the JavaScript expression to validate
  - `allowedVariables` — the survey variables accessible to this expression
- **Output**: an array of error arrays (one per input), each error containing:
  - `message` — description of the error
  - `start` / `end` — character positions of the error within the expression

## Integration with Survey Engine KMP

Survey Engine Script is **bundled as a resource** inside the [Survey Engine KMP](/components/survey-engine-kmp/overview). The minified file (`survey-engine-script.min.js`) is included in the KMP library's resources and loaded by each platform at runtime:

| Platform | JS Engine | How it loads the script |
|---|---|---|
| **JVM** | GraalVM (sandboxed) | Loaded via classloader from resources, compiled once, reused for all validations |
| **iOS** | JavaScriptCore | Loaded from the app bundle via `NSBundle`, evaluated in a `JSContext` |
| **JavaScript** | Native | Imported directly as an npm module |

The Survey Engine calls `EMScript.validateCode()` during the **Process Survey** step to validate all instructions in a survey definition before generating the state machine.

## Development

To work on the library locally:

```bash
git clone https://github.com/qlarr-surveys/survey-engine-script.git
cd survey-engine-script
npm install
npm test        # run tests
npm run build   # produces dist/survey-engine-script.min.js
```

After building, copy the output to the Survey Engine KMP resources:

```
survey-engine-kmp/surveyengine/src/commonMain/resources/survey-engine-script/survey-engine-script.min.js
```
