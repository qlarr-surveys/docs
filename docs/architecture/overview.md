---
sidebar_position: 1
---

# Architecture Overview

This section provides an overview of the Qlarr Surveys architecture and how different components interact.

## System Design

Qlarr Surveys follows a modular architecture with clear separation of concerns:

### Core Components

1. **[Survey Engine (KMP)](/components/survey-engine-kmp/overview)**
   - Parses survey definitions
   - Generates state machines
   - Manages survey execution
   - Creates database schemas

2. **[Survey Engine Script](/components/survey-engine-script/overview)**
   - JavaScript expression validation
   - AST-based parsing
   - Safety constraints enforcement
   - Whitelisted function execution

3. **[Backend](/components/backend/overview)**
   - REST API endpoints
   - Survey management
   - Response caching
   - Data synchronization
   - PostgreSQL integration

4. **[Frontend](/components/frontend/overview)**
   - WYSIWYG survey editor
   - Survey rendering
   - Administrative interface
   - React-based UI

5. **[Android](/components/android/overview)**
   - Native Android implementation
   - iOS support (planned)

## Data Flow

Everything revolves around two use cases: **designing surveys** and **running surveys**.

### Survey Design (Frontend → Backend)

1. The **Frontend** provides a WYSIWYG editor for designing surveys
2. The survey definition is stored as a **JSON file** on the **Backend**
3. The **Backend** uses the **Survey Engine** to process the design — validating structure, generating the component graph, state machine files, and database schema for responses

### Survey Execution — Web (Frontend → Backend)

1. The **Frontend** requests survey content from the **Backend**
2. The **Backend** uses the **Survey Engine** to navigate the survey — resolving which components to show, evaluating conditions, and managing state
3. Responses and survey settings are stored in **PostgreSQL**

### Survey Execution — Mobile (Android, offline-first)

1. The **Android** app downloads processed surveys from the **Backend** while online
2. The app includes its own copy of the **Survey Engine** (KMP native build), so it can run surveys fully **offline**
3. Responses are stored locally and **synced back** to the Backend when connectivity is available

## Technology Stack

- **Backend**: Spring Boot, PostgreSQL, Java 19+
- **Frontend**: React, Node.js
- **Mobile**: Kotlin Multiplatform, Android SDK
