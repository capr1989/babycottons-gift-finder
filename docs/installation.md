# Installation on an unpublished theme

1. Confirm the destination theme ID and UNPUBLISHED role using Shopify MCP. Never target MAIN during development.
2. Check for existing files with the same names and preserve any originals. Validate locally, then install only the five custom files under `shopify/` using the connected theme tools.
3. Compare transferred contents against the validated local files, save using the theme commit tool, and inspect saved/rejected/pending results. A successful save does not establish that the page renders correctly.
4. In the unpublished theme editor, select the `gift-finder` page template. Configure candidate product blocks, optional collection, image, copy, colors and size mappings. The public template is intentionally empty.
5. Candidates must carry the exact `gift_shop` tag. Category and age suitability must be recognized or explicitly configured. Sizeless products require approved age groups.

Shopify documents alternate page templates using `?view=gift-finder`. Combining an existing page with the store’s unpublished theme preview mechanism may permit manual review without changing its assignment. Verify the preview theme and resulting template manually; this combination is not asserted as tested here. See [Shopify alternate templates](https://shopify.dev/docs/storefronts/themes/architecture/templates/alternate-templates).

Creating a page, assigning its template, creating/publishing an automatic collection or changing navigation are global store operations requiring owner approval. Do not create a published page solely to resolve preview access. Do not publish an entire development theme automatically.
