---
sidebar_position: 1
slug: /
---

# Introduction to Qlarr

Welcome to the Qlarr documentation. Qlarr is an open-source framework for creating and deploying offline-first surveys across multiple platforms.

## What is Qlarr?

Qlarr enables you to build sophisticated survey applications that work seamlessly offline and across different platforms. The framework uses JSON to define UI-agnostic survey components and JavaScript for complex survey logic.

## Key Features

- **[Offline-First](/features/offline-mode)**: Collect data even without internet connectivity
- **[Rich Question Types](/features/question-types)**: Text, choice, matrix, date/time, media capture, ranking, and more
- **Cross-Platform**: Deploy surveys on web, Android, and iOS (coming soon)
- **[Advanced Logic](/features/conditional-logic)**: Conditional branching, skip patterns, and [response piping](/features/response-piping)
- **[Validation](/features/validation)**: Built-in input validation with custom rules
- **[Randomization](/features/randomization)**: Support for weighted sampling and question randomization
- **[Multi-Language](/features/multilingual)**: Create surveys in multiple languages
- **Flexible Navigation**: Choose between all-questions, page-by-page, or question-by-question modes

## Architecture Overview

The Qlarr ecosystem consists of several interconnected components:

- **[Survey Engine (KMP)](/components/survey-engine-kmp/overview)**: Core processing layer built with Kotlin Multiplatform
- **[Survey Engine Script](/components/survey-engine-script/overview)**: JavaScript validation and execution library
- **[Backend](/components/backend/overview)**: Spring Boot REST API for survey management and data synchronization
- **[Frontend](/components/frontend/overview)**: React-based WYSIWYG editor and survey renderer
- **[Android App](/components/android/overview)**: Native mobile implementation

Learn more about the [architecture and data model](/architecture/overview).

## Getting Started

Choose your path based on your role:

- **[Survey Creators](/guides/quick-start)**: Learn how to design and deploy surveys
- **[Developers](/architecture/overview)**: Understand the architecture and explore component docs

## License

All Qlarr repositories are licensed under AGPL-3.0.
