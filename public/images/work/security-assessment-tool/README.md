# Security Assessment Tool — case screenshots

The bespoke case page (`components/SecurityCase`) expects these three PNGs here:

- `insights-filters.png` — Issue Resolution Time view, filters panel open (hero + interface + moment crops 1 & 2)
- `heatmap-training.png` — Security training hours view (lens 2)
- `heatmap-issues.png` — Open issues view, one red tile (lens 3 + moment crop 3)

They live in the Claude Design project `Portfolio Repositioning Strategy` under
`assets/security/`. Each is larger than the design API's 256 KB fetch cap, so
they couldn't be synced automatically — download them from the design project
and drop them in this folder with the exact filenames above.

The moment-card crops were tuned to the original pixel dimensions
(insights-filters: 1364×1651, heatmap-issues: 1377×1441); replacing the images
at different sizes will shift those crops.
