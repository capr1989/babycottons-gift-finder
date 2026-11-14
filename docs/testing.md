# Verification and limits

Executed locally with Node, without browsers or direct Shopify/GitHub network access:

- 25 functional tests: all budget boundaries, five age groups, combined filters, Surprise me, unknown/conflicting categories, unavailable variants, same-variant price/age/availability matching, multiple prices, sizeless approval, ambiguous sizes, exact gift tag, deduplication, empty/invalid input, 50-product cap, category priorities, overrides and variant links.
- Static checks: JavaScript syntax, section schema and template JSON, settings references, Liquid block balance, isolated CSS selectors, requested palette values and control-border contrast and embedded JSON escaping.
- Installation inspection: custom files compared with validated sources; JSON parsed; theme save results checked for rejections and pending edits. Store-specific installation records are excluded from the public repository.

The plugin’s complete Liquid validator could not start because `@shopify/theme-check-common` was missing. It is not marked as passed. Block balance and accepted file saves do not substitute for a full Liquid render.

Tests use synthetic fixtures. They do not validate the rendered DOM, every live catalog item, real performance, or visual fidelity. Manual review remains required for desktop/tablet/mobile, keyboard and screen readers, form validation/reset, images/fonts, editor reloads, currency changes, variant links, header/footer/cart/search compatibility and JavaScript console errors.

No automated browsers or screenshots were used. The graphical reference was unavailable; the design follows the textual brief. The hero image is optional and has no invented external asset. Live-catalog suitability and zero-result behavior must be reviewed before launch.

Palette exception: the owner requested #a7c2c5 text on white (approximately 1.88:1). Text contrast does not meet WCAG AA. See [palette notes](palette.md).
