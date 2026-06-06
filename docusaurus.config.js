// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'PreciCore Docs',
  tagline: 'Precision beyond the human hand.',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.precicore.ca',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'poisnoir', // Usually your GitHub org/user name.
  projectName: 'precicore-docs', // Usually your repo name.

  onBrokenLinks: 'throw',

  headTags: [
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' } },
  ],

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
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: undefined,
          showLastUpdateTime: false,
          
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      announcementBar: {
        id: 'precicore-v01',
        content: 'v0.1 · MIT Licensed · Open source surgical robotics stack — <a href="https://github.com/poisnoir" target="_blank" rel="noopener">View on GitHub →</a>',
        backgroundColor: '#f0ece4',
        textColor: '#1a1a1a',
        isCloseable: true,
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'PreciCore Docs',
        logo: {
          alt: 'PreciCore Logo',
          src: 'img/logo.svg',
        },
        items: [
          { to: '/docs/spine/intro', label: 'Spine', position: 'left' },
          { to: '/docs/spine-nodes/intro', label: 'Spine Nodes', position: 'left' },
          { href: 'https://github.com/poisnoir', label: 'GitHub', position: 'right' },
          { href: 'https://precicore.ca', label: 'Website', position: 'right' },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              { label: 'Spine', to: '/docs/spine/intro' },
              { label: 'Spine Nodes', to: '/docs/spine-nodes/intro' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'GitHub', href: 'https://github.com/poisnoir' },
              { label: 'Website', href: 'https://precicore.ca' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} PreciCore. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
