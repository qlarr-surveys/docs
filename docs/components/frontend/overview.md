---
sidebar_position: 1
---

# Frontend Overview

The Qlarr Surveys frontend is a React application that serves as both the survey design studio and the survey rendering interface for respondents.

## Repository

[qlarr-surveys/frontend](https://github.com/qlarr-surveys/frontend)

## Role in the System

The frontend handles both core use cases of the Qlarr ecosystem:

- **Survey Design** — A WYSIWYG editor where survey administrators create and configure surveys. The design is saved as JSON to the [Backend](/components/backend/overview).
- **Survey Execution** — A renderer that loads the [generated state machine](/components/survey-engine-kmp/overview#generated-state-machine) from the backend and runs surveys for respondents in the browser.

It also provides the administrative interface for user management, response analytics, and survey lifecycle management.

## Technology Stack

- **React 18** with Vite
- **MUI v5** (Material UI) — UI component library
- **Redux Toolkit** — state management
- **Axios** — HTTP client with JWT interceptor for [backend API](/components/backend/api-reference) calls
- **TipTap** — rich text editor for survey content (text display elements, question descriptions)
- **react-dnd** — drag-and-drop for the survey editor
- **i18next** — internationalization (admin UI translations)
- **Recharts** — response analytics charts
- **react-hook-form** + **Yup** — form handling and validation
- **Caddy** — production web server (via Docker)

## Key Features

- **Visual Survey Editor**: Drag-and-drop interface for adding and arranging questions across pages
- **Real-time Preview**: Test surveys directly from the editor
- **Rich Text Editing**: Format question text, descriptions, and info elements with TipTap
- **Question Library**: All [question types](/features/question-types) available in a categorized sidebar
- **Conditional Logic Builder**: Visual interface for setting up relevance conditions, validation rules, and response piping
- **Multi-language Management**: Add translations for survey content across supported languages
- **Survey Styling**: Customize fonts, colors, and background images
- **Response Analytics**: View individual responses and aggregated charts
- **QR Code Generation**: Generate QR codes for sharing survey links

## Project Structure

```
src/
├── pages/
│   ├── DesignSurvey/     # Survey editor (WYSIWYG)
│   ├── RunSurvey/        # Survey renderer for respondents
│   ├── PreviewSurvey/    # Survey preview from editor
│   ├── ManageSurvey/     # Survey list and management
│   └── manage/           # User and admin management
├── components/           # Shared UI components
├── state/
│   ├── design/           # Redux state for the survey editor
│   └── edit/             # Redux state for question editing
├── networking/           # Axios API client and interceptors
├── services/             # Business logic helpers
├── layouts/              # Page layout components
├── theme/                # MUI theme configuration
└── routes.js             # Application routing
```

## Build Variants

The frontend supports multiple build targets:

| Command | Purpose |
|---|---|
| `npm run build` | Standard web build |
| `npm run build-android` | Build for embedding in the [Android app](/components/android/overview) |
| `npm run build-android-debuggable` | Android build with debugging enabled |
| `npm run build-staging` | Staging environment build |

## Runtime Configuration

The frontend uses runtime configuration via `public/config.js` rather than build-time environment variables. This allows the same build to be deployed to different environments by changing the config file:

```js
window.APP_CONFIG = {
  FRONT_END_HOST: "localhost:3000",
  PROTOCOL: "http",
  BE_URL: "http://localhost:8080"
};
```

| Variable | Description |
|---|---|
| `BE_URL` | Backend API base URL |
| `FRONT_END_HOST` | Frontend host (used for generating survey links) |
| `PROTOCOL` | `http` or `https` |
