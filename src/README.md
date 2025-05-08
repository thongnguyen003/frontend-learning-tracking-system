# Folder Structure and Conventions

This document explains the folder structure and coding conventions used in this React project.

## Folder Structure

- **components/**: Reusable UI components grouped by UI area or feature.
  - Each component folder contains an `index.js` for cleaner imports.
- **features/**: Feature-specific components containing business logic and related UI.
- **pages/**: Page-level components mapped to routes.
- **layouts/**: Layout components used to wrap pages or features.
- **hooks/**: Custom React hooks for reusable logic.
- **public/**: Static assets and the main HTML file.

## Naming Conventions

- Use PascalCase for component and folder names (e.g., `HeaderStudent`, `Login`).
- Use camelCase for variables and functions.
- CSS files are colocated with components and named accordingly.

## CSS Management

- Prefer CSS Modules or styled-components for scoped styling to avoid global CSS conflicts.
- Example: Rename `header.css` to `header.module.css` and import styles as modules.

## Importing Components

- Use `index.js` files in component folders to simplify imports.
- Example:
