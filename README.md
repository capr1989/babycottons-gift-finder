# Babycottons — The Little Gift Guide

Custom Liquid, isolated CSS and vanilla JavaScript extension for Shopify Prestige 4.7.2. Public repository authorized by the project owner. No commercial theme source, store credentials, customer data or internal store configuration is included.

Development branch: `feature/gift-finder`. This code does not publish a Shopify theme, create store resources or activate navigation. Install only on an unpublished theme and obtain owner approval before production activation or global store changes.

## Contents

- `shopify/`: custom section, data snippet, stylesheet, filter engine and JSON page template.
- `tests/`: 25 functional tests plus static checks, using synthetic fixtures.
- `docs/`: architecture, mapping, installation, testing, deployment and rollback.

Run `npm test` with Node 18 or newer; no dependency installation is required. The public template starts without selected products or a collection. Configure real candidates in the theme editor; do not expect demo recommendations.

Shopify and GitHub operations for this project use connected MCP tools only. Browser automation and direct remote API/CLI access are excluded by the project instructions. Manual storefront review remains required.
