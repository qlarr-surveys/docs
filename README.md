# Qlarr Documentation

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Documentation Structure

The documentation is organized into the following sections:

- **Introduction**: Overview of Qlarr
- **Getting Started**: Quick start guides for users and developers
- **Architecture**: System design and data model
- **Components**: Documentation for each repository
  - Survey Engine (KMP)
  - Survey Engine Script
  - Backend
  - Frontend
  - Android
- **Features**: Detailed feature documentation (conditional logic, validation, randomization, etc.)
- **Guides**: Best practices and tutorials
- **API Reference**: REST and JavaScript API documentation
- **Deployment**: Production deployment guides

## Installation

```bash
npm install
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

```bash
npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Contributing

This documentation skeleton has been created with placeholders marked as "To be completed". Contributors should:

1. Fill in the placeholder sections with actual content from respective repositories
2. Add code examples where appropriate
3. Include diagrams for architectural explanations
4. Link to relevant GitHub repositories
5. Keep documentation up to date with code changes

## License

AGPL-3.0
