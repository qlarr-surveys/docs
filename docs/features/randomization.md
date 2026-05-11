---
sidebar_position: 3
---

# Randomization

Qlarr supports randomizing the order of pages, questions, and answer options to reduce order bias in survey responses.

## How It Works

Randomization is configured in the editor's **Logic** tab for each component. The [Survey Engine](/components/survey-engine-kmp/overview) processes randomization through `order` and `priority` [instructions](/architecture/data-model#instructions) that determine the display order at runtime. Each respondent sees a different order.

## Randomization Levels

### Page (Group) Randomization

Randomize the order of pages in the survey:

1. Click the survey settings (gear icon)
2. Under **Order & Priority**, set **Groups order** to **Random**

### Question Randomization

Randomize the order of questions within a page:

1. Click on a page to open its setup panel
2. Go to the **Logic** tab
3. Set **Questions order** to **Random**

### Answer Option Randomization

Randomize the order of answer options within a question. Available on choice questions (single choice, multiple choice, icon/image choice), multiple text, and ranking questions.

1. Click on a question to open its setup panel
2. Go to the **Logic** tab
3. Set **Options order** to one of:
   - **As is** — keep the defined order
   - **Random** — fully randomized
   - **Flip** — reverse the order
   - **Sort by label** — alphabetical order

### Matrix Row and Column Randomization

For array (matrix) questions, rows and columns can be randomized independently:

- **Rows order** — randomize, flip, or sort the row items
- **Columns order** — randomize, flip, or sort the column headers

## Selective Randomization

When randomization is enabled, you can choose which items participate in the random order and which stay in their fixed position. After selecting a randomization mode, a checklist appears showing all child items. Uncheck any item to pin it in place while the rest are shuffled.

This is useful when you want to keep "Other" or "None of the above" as the last option while randomizing the rest.
