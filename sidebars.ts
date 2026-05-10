import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    'guides/quick-start',
    'guides/deployment',
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/overview',
        'architecture/data-model',
      ],
    },
    {
      type: 'category',
      label: 'Components',
      items: [
        {
          type: 'category',
          label: 'Survey Engine (KMP)',
          items: [
            'components/survey-engine-kmp/overview',
            'components/survey-engine-kmp/setup',
          ],
        },
        {
          type: 'category',
          label: 'Survey Engine Script',
          items: [
            'components/survey-engine-script/overview',
          ],
        },
        {
          type: 'category',
          label: 'Backend',
          items: [
            'components/backend/overview',
            'components/backend/setup',
            'components/backend/api-reference',
          ],
        },
        {
          type: 'category',
          label: 'Frontend',
          items: [
            'components/frontend/overview',
            'components/frontend/setup',
          ],
        },
        {
          type: 'category',
          label: 'Android',
          items: [
            'components/android/overview',
            'components/android/setup',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'features/question-types',
        'features/conditional-logic',
        'features/validation',
        'features/randomization',
        'features/multilingual',
        'features/response-piping',
        'features/offline-mode',
      ],
    },
  ],
};

export default sidebars;
