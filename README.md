# onishagangwal.github.io

Personal site of **Onisha Gangwal**, an AI & analytics professional in Tampa, FL, with an MS in Artificial Intelligence & Business Analytics from the University of South Florida.

Live at **https://onishagangwal.github.io**

## What's here

The site is designed like a data publication: a front page plus one long-form case study per project.

| Page | What it covers |
|---|---|
| `index.html` | Front page: lead story, career mandala (Fig. 1), by-the-numbers strip, selected work, AI focus, experience, toolkit, about, contact |
| `work/financial-crime.html` | Transaction-monitoring analytics platform (SQL, Power BI, validation suite) |
| `work/sales-intelligence.html` | Sales pipeline + Holt-Winters forecasting (Postgres, dbt, Streamlit, CI) |
| `work/ev-charging.html` | Tableau story on EV adoption and charging deserts (embedded live) |
| `work/florida-poverty.html` | Tableau dashboard on poverty across ten Florida cities (embedded live) |
| `work/revenue-optimization.html` | Statistical analysis of ~1M retail transactions in R |
| `work/cart-abandonment.html` | Purchase / abandonment classification with XGBoost |

## How it's built

Plain HTML, CSS and a small amount of JavaScript, with no framework and no build step.

- `style.css`: the whole design system (paper/ink/marigold palette with automatic dark mode; Fraunces, Source Serif 4 and IBM Plex Mono)
- `script.js`: draws the career mandala from the `CHAPTERS` list, sets the masthead date, and adds a resume button when `resume.pdf` exists
- `assets/img/`: portrait and project screenshots

## Updating

- **Resume:** add `resume.pdf` to the repo root and a "Resume (PDF)" button appears in the contact section automatically.
- **Mandala:** edit `CHAPTERS` at the top of `script.js`. Each `results` count becomes four petals.
- **New project:** copy any file in `work/`, update the front-page grid in `index.html`, and fix the previous/next links.

To preview locally:

```bash
python -m http.server 8765
```
