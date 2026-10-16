# reach.

**A Solana memecoin discovery and research terminal (concept demo).**

Reach is a landing page and interactive demo for a read-only "terminal" that helps people discover, track and research Solana memecoins: new pairs, on-chain risk signals, and a watchlist, wrapped in a black-and-phosphor-green terminal aesthetic.

> ⚠️ **Demo data only.** Every token, price, volume and network figure on this site is fictional and simulated. Mint addresses are fake (they end in `demo`). Nothing here is live, verified, or financial advice.

## Features

- **Sticky top bar.** Live token search with a dropdown and a ⌘K / Ctrl K shortcut. On mobile the links collapse into a menu.
- **Hero.**
  - A command field that takes a name, `$ticker` or mint address. It has loading, results, empty and unknown-address states.
  - An animated ASCII "pair weather" field.
  - A pixel-art scout robot animated in pure CSS.
  - A demo market strip and a scrolling ticker tape.
- **Discovery board.**
  - Four tabs: Trending, Just launched, Gainers, Most active.
  - Sortable columns, text filter and toggle filters.
  - Watchlist stars, sparklines, and loading and empty states.
- **Signals panel.**
  - Seven on-chain checks: liquidity, liquidity/market cap, top-10 holders, mint and freeze authority, LP status and pair age.
  - Each check is rated **Clear / Watch / Flag**, with clear "signals, not guarantees" framing.
  - Links to Solscan and Solana Explorer.
- **Demo terminal.**
  - Commands: `help`, `trending`, `new`, `scan $TICKER`, `watch`, `unwatch`, `watchlist`, `pulse`, `clear`.
  - Typed-out responses and ↑/↓ history.
- **Daily pulse.** A decorative collectible-style badge with a network waveform.
- **How it works, FAQ (accessible accordion) and closing call to action** with a risk disclaimer.

## Tech

Plain HTML, CSS and vanilla JavaScript. There is no framework, no build step and no dependencies other than Google Fonts (Archivo and JetBrains Mono).

```
index.html   page markup
styles.css   all styling (responsive, reduced-motion aware)
app.js       demo data + interactions
```

Accessibility features:

- Semantic landmarks and real buttons and links.
- Visible focus states.
- ARIA tabs with arrow-key support, sortable column state (`aria-sort`) and an accordion.
- A screen-reader live region for terminal output.
- `prefers-reduced-motion` support: animations stop and the terminal prints instantly.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Deploy on GitHub Pages

1. Create a new repository on GitHub and upload these files to the root (or `git push` them).
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

## Connecting real data

The demo data lives in the `RCH` module at the top of `app.js` (`RAW` array and helpers). To go live, replace it with data from a Solana indexer or DEX API, show a timestamp and source on each figure, and keep the "signals, not guarantees" language.

## Disclaimer

Reach is an analytics and discovery concept. It does not trade, hold funds or give financial advice. Memecoins are highly speculative and can lose all of their value quickly. Automated signals are observations, not audits, endorsements or guarantees.
