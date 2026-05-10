import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Qlarr Surveys',
  tagline: 'Open-source framework for offline-first surveys across multiple platforms',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://qlarr-surveys.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'qlarr-surveys', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/qlarr-surveys/docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Qlarr Surveys',
      logo: {
        alt: 'Qlarr Surveys Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/qlarr-surveys',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/',
            },
            {
              label: 'Architecture',
              to: '/architecture/overview',
            },
          ],
        },
        {
          title: 'Repositories',
          items: [
            {
              label: 'Survey Engine (KMP)',
              href: 'https://github.com/qlarr-surveys/survey-engine-kmp',
            },
            {
              label: 'Survey Engine Script',
              href: 'https://github.com/qlarr-surveys/survey-engine-script',
            },
            {
              label: 'Backend',
              href: 'https://github.com/qlarr-surveys/backend',
            },
            {
              label: 'Frontend',
              href: 'https://github.com/qlarr-surveys/frontend',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub Organization',
              href: 'https://github.com/qlarr-surveys',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Qlarr Surveys. Licensed under AGPL-3.0. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['kotlin', 'java', 'bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
