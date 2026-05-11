---
sidebar_position: 1
---

# Quick Start

Get started with Qlarr and create your first survey in minutes.

## Overview

This guide will walk you through creating, customizing, and deploying your first survey using the Qlarr cloud platform. The entire process takes just a few minutes.

Qlarr offers multiple ways to create surveys:
- **AI-powered creation**: Describe your goals and let AI design your survey
- **Visual editor**: Drag-and-drop interface for manual design
- **JSON import**: Upload existing survey templates

## Accessing the Platform

### Cloud Version (Recommended for Quick Start)

1. Navigate to [console.qlarr.com](https://console.qlarr.com)
2. Click **Get Started** if you don't have an account
3. Sign up with:
   - Email and password, or
   - Google account (quick sign-in)
4. Verify your email address via the confirmation email

### Self-Hosted Version

If you prefer to host Qlarr on your own infrastructure, see the self-hosted setup instructions in the component docs.

## Creating Your First Survey

After logging in, you'll see the welcome dashboard with three options for creating your survey:

### Option 1: Create Survey with AI (Recommended for Beginners)

The fastest way to get started is using the **AI Survey Assistant**:

1. Click **Create Survey with AI** button on the dashboard
2. The AI Survey Assistant panel will open on the right side
3. Describe your survey topic or goal in the chat interface
   - Example: "I want to create a customer satisfaction survey for my restaurant"
   - Example: "I need an employee feedback survey about remote work"
4. The AI will guide you through:
   - Suggesting relevant questions
   - Recommending question types
   - Organizing your survey structure
5. Review and customize the AI-generated survey using the visual editor

This is the quickest path from idea to survey - the AI handles the initial design based on your goals.

### Option 2: Start from Scratch

For full creative control, build your survey manually:

1. Click **Create Survey** button
2. The visual survey editor will open with:
   - A left sidebar containing question types
   - A center canvas showing your survey pages
   - A right sidebar for customization options
   - A **Preview** button in the top-right corner

### Option 3: Import Existing Template

If you have a survey template in JSON format, click **Import Existing Template** to upload and customize it.

### Survey Structure

Every survey starts with:
- **Page 1**: Your main survey page for questions
- **Thank You Page**: A final page shown after survey completion (can contain info elements only)

You can add multiple pages by clicking **Add a new Page** in the Sections panel.

### Adding Questions

The editor provides a library of [question types](/features/question-types) organized into categories in the left sidebar.

**To add a question:**
1. Drag a question type from the left sidebar onto the canvas, or
2. Click a question type to add it to the current page

### Customizing Your Survey

#### Visual Styling

Use the styling panel (paint palette icon) to customize:
- **Font**: Choose from available fonts (default: Rubik)
- **Page Title**: Font size for page titles (default: 32)
- **Question Title**: Font size for questions (default: 18)
- **Text**: Font size for body text (default: 14)
- **Highlight Color**: Accent color for interactive elements
- **Background Color**: Survey background
- **Foreground Color**: Content area background
- **Text Color**: Primary text color
- **Upload Background**: Custom background image

#### Multilingual Support

Use the language panel (globe icon) to add translations:
1. Set your **Base Language** (primary language)
2. Check **Additional Languages** to enable (English, Deutsch, العربية, Español, Português, Français, Nederlands)
3. Respondents can switch languages during the survey

Learn more in the [Multilingual Support](/features/multilingual) guide.

### Configuring Logic

Configure survey behavior and navigation through the settings panel (gear icon):

#### Navigation Settings
- **Navigation Mode**: Choose between:
  - All questions (single page)
  - Page by Page
  - Question by Question
- **Response Expiry Time**: Set how long responses remain valid
- **Allow Previous**: Let respondents go back to previous questions
- **Allow Incomplete/Resume**: Save progress and resume later
- **Allow Jump/Show Survey Index**: Display survey navigation
- **Enforce Validation Only on Submit**: Validate all fields when submitting vs. per question

For advanced conditional logic and skip patterns, see the [Conditional Logic](/features/conditional-logic) guide.

## Publishing Your Survey

Once your survey is ready, configure launch settings:

### Launch Configuration

Access the settings panel (gear icon) and navigate to the **Launch** section:

1. **Survey Mode**: Select deployment mode
   - Web and Offline (allows offline data collection)
   - Web Only
   - Offline Only

2. **Survey Dates**: Set collection period (optional)
   - From: Start date
   - To: End date

3. **Survey URL**: Your survey is automatically assigned a unique URL
   - Example: `https://console.qlarr.com/run-survey/47ae8555-ce1c-44be-99d9-ec843e97dc1`

### Activating Your Survey

1. Review your survey using the **Preview** button
2. Click the **Activate** button in the Launch section
3. Your survey is now live and ready to collect responses

### Sharing Your Survey

Once activated, you can share your survey:
- **Copy Link**: Click to copy the survey URL
- **QR Code**: Generate a QR code for mobile access
- Share the link via email, social media, or embed it on your website

### Privacy & Offline Settings

Configure additional options:

**Privacy**
- **Save IP**: Record respondent IP addresses
- **Save Timings**: Track response times

**Offline**
- **Background Audio**: Record audio in the background (for field surveys)
- **Record GPS**: Capture GPS coordinates with responses

## Collecting Responses

### Viewing Responses

1. Navigate to your survey in the dashboard
2. Click to open the survey responses page
3. Two tabs are available:
   - **Individual Responses**: View each response separately
   - **Analytics**: Aggregated data and visualizations

### Managing Responses

**Filter and Search**
- Use **Filter by Type** dropdown to filter responses
- Pagination controls to browse multiple responses

**Exporting Data**
- Click **Export Responses** to download response data
- Supported formats include CSV and JSON

### Survey Users & Quotas

Control survey access and response limits:

**Survey Users**
- Add specific users who can access the survey
- Toggle **Public Within Organization** for broader access within your organization

**Quotas**
- Set response limits per surveyor
- Limit total responses collected

### Advanced: FTP Access

Enable **FTP Server Access** to:
- Download files uploaded by respondents
- Access media captured during offline surveys

## Next Steps

Now that you've created your first survey, explore advanced capabilities:

- **[Conditional Logic](/features/conditional-logic)**: Create dynamic surveys with skip patterns and branching
- **[Response Piping](/features/response-piping)**: Personalize questions based on previous answers
- **[Validation](/features/validation)**: Add custom validation rules to ensure data quality
- **[Randomization](/features/randomization)**: Randomize question order to reduce bias
- **[Offline Mode](/features/offline-mode)**: Deploy surveys for offline data collection



## Exporting and Importing Surveys

### Exporting Surveys

You can export any survey as JSON for backup, version control, or migration:

1. Open your survey in the editor
2. Click the settings icon (gear) in the left sidebar
3. Scroll to **Export Survey** section
4. Click **Export Survey** to download the JSON file

### Importing Surveys

To import an existing survey template:

1. From the dashboard, click **Import Existing Template**
2. Upload your JSON file
3. The survey will be imported and ready to customize in the editor

This is useful for:
- Reusing survey templates across projects
- Sharing survey designs with team members
- Migrating surveys between environments
- Version control and backup
