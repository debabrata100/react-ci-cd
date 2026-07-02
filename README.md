# React + Vite GitHub Actions Demo

A small React app built with Vite to demonstrate continuous integration, containerization, and deployment automation using GitHub Actions.

## Project Overview

- `src/App.jsx`: application root component.
- `src/Game.jsx`: interactive box game with add/remove behavior.
- `src/__tests__/components.test.jsx`: React component tests.
- `src/utils/math.js`: utility math functions with unit tests.
- `Dockerfile`: multi-stage build for a production-ready Nginx container.
- `.github/workflows/ci.yml`: primary CI/CD workflow.
- `.github/workflows/reusable-verify.yml`: reusable verification workflow.

## Getting Started

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

Run coverage:

```bash
npm run test:coverage
```

Build production assets:

```bash
npm run build
```

## NPM Scripts

- `npm run dev`: start Vite development server.
- `npm run build`: build production-ready files.
- `npm run lint`: run ESLint checks.
- `npm test`: run Vitest unit tests.
- `npm run test:coverage`: run tests and generate coverage.

## GitHub Actions Learnings

This repository is configured to showcase a modern GitHub Actions pipeline with validation, build, containerization, and deployment.

### Primary CI workflow (`.github/workflows/ci.yml`)

Key features:

- Runs on pushes to `master` and `develop`, and on `release` events.
- Uses a Node.js matrix: `20`, `22`, and `24`.
- Checks out code and prints the current Git SHA.
- Sets up Node with `actions/setup-node@v4` and caches npm dependencies.
- Installs dependencies with `npm ci`.
- Runs `npm audit` to surface high-severity package vulnerabilities.
- Runs linting with `npm run lint`.
- Executes tests with coverage using `npm run test:coverage`.
- Uploads test coverage artifacts for Node `22` on `master`.
- Runs SonarQube scanning for `master` on Node `22`.
- Builds the app and uploads the `dist` artifact.

### Docker and image scanning

The workflow also includes a `docker` job that:

- Downloads the build artifact from the `verify` job.
- Logs into Docker Hub with secrets.
- Sets up Docker Buildx.
- Builds and pushes the Docker image tagged with `latest` and the commit SHA.
- Uses GitHub Actions cache for build speed.
- Runs `aquasecurity/trivy-action` to scan the built image for `HIGH` and `CRITICAL` vulnerabilities.

### Deployment gates

- `deploy-staging` triggers for `develop` branch changes and calls a staging deployment webhook.
- `promote-image` runs on release events, pulling the SHA-tagged image, tagging it with the release version, and pushing the release image.
- `deploy-production` triggers after image promotion and calls a production deployment webhook.

### Reusable workflow (`.github/workflows/reusable-verify.yml`)

- Demonstrates workflow reuse with `workflow_call`.
- Accepts a `node-version` input.
- Encapsulates checkout, install, audit, lint, test, and build logic.
- Helps keep pipelines DRY and maintainable.

## Dockerfile Best Practices

- Uses a multi-stage build:
  - Node builder stage compiles the app.
  - Nginx runtime stage serves static files.
- Keeps the final image small and production-ready.
- Exposes port `80` for runtime.

## What We Learned

- How to validate React code with linting and unit tests in CI.
- How to use GitHub Actions matrix builds for Node.js compatibility.
- How to share artifacts between jobs and reuse workflows.
- How to containerize a Vite React app with a multi-stage Dockerfile.
- How to scan Docker images for vulnerabilities automatically.
- How to deploy using webhook triggers and environment-specific jobs.

## Required GitHub Secrets

- `SONAR_TOKEN`
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`
- `RENDER_STAGING_DEPLOY_HOOK`
- `RENDER_PRODUCTION_DEPLOY_HOOK`

## Notes

This project uses Vite, React 19, and Vitest for testing. The GitHub Actions pipeline is configured to provide a complete CI/CD learning path from code validation to deployment.
