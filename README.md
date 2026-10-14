# 🅿️ Decision Parking Lot

> **Clear your mind. Park the decision.**  
> *You don't have to figure everything out right now.*

**Decision Parking Lot** is a calm, focused personal thinking space designed to combat cognitive overload and decision fatigue. Instead of endlessly ruminating on heavy choices, you park them in structured slots with a future review date, list out your options, weigh pros & cons, define an actionable next small step, and revisit them when you have the clarity or information needed.

---

## ✨ Features

- **🚗 Cognitive Offloading & Parking Slots**  
  Assign each choice to a numbered slot (`#01`, `#02`, etc.) with categorized tagging (Career, Academics, Finance, Personal, Lifestyle, and Tech).
- **⚖️ Options with Pros & Cons**  
  Deconstruct ambiguous decisions into discrete paths. Add multiple pros and cons for each option with instant visual feedback.
- **🎯 Actionable "Next Small Step"**  
  Break analysis paralysis by defining exactly *one* micro-actionable next step with an estimated time commitment (e.g., *"Review syllabus • 20m"*). Mark it done to keep moving forward.
- **⏰ Scheduled Reviews & Quick Snooze**  
  Set target review dates. If a decision isn't ready when review day arrives, defer it stress-free using quick snooze buttons (`+3d`, `+1w`).
- **❓ Unanswered Questions & Progress Tracking**  
  Track open questions with interactive checkboxes and animated completion progress bars.
- **🎓 Relatable Real-World Sample Decisions**  
  Preloaded with thoughtful decisions reflecting real dilemmas (career placement vs. further prep, tech stack choices, student budgets, and wellness).
- **📜 Decided & Reflection History**  
  When ready, mark the decision as made, document the winning option and rationale, and archive it into a permanent Decision History log.
- **🎨 Editorial Aesthetic & Thoughtful Design**  
  Crafted with an editorial identity—warm ivory canvas, refined typography (Lora + Inter + JetBrains Mono), responsive CSS Grid (`minmax(0, 1fr)`), soft layered elevation, and support for `prefers-reduced-motion`.
- **🔒 100% Local & Private**  
  Everything runs client-side with `localStorage` persistence. No accounts, no telemetry, no tracking.

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Styling:** Pure Vanilla CSS (CSS Grid, Flexbox, custom CSS variables, responsive design)
- **Linter:** [Oxlint](https://oxc.rs/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- `npm` or `pnpm` / `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mona-Agrawall/decision-parking-lot.git
   cd decision-parking-lot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Lint the codebase:**
   ```bash
   npm run lint
   ```

---

## 📁 Project Structure

```text
decision-parking-lot/
├── public/
│   ├── favicon.svg             # Application icon
│   └── icons.svg
├── src/
│   ├── assets/                 # SVGs and imagery
│   ├── components/
│   │   ├── AttentionBanner.jsx # Due / overdue review alerts
│   │   ├── DecideModal.jsx     # "Mark as Decided" reflection flow
│   │   ├── DecisionCard.jsx    # Individual parking slot card
│   │   ├── DecisionDetails.jsx # Full-view modal with Pros/Cons & Next Step
│   │   ├── DecisionForm.jsx    # Modal form to park a new decision
│   │   ├── EmptyState.jsx      # Clean empty state display
│   │   ├── ExploreSamplesModal.jsx # Curated sample decisions library
│   │   ├── HistoryView.jsx     # Archived decided decisions
│   │   ├── Navbar.jsx          # Header navigation & quick-action button
│   │   ├── ProgressBar.jsx     # Smooth question progress indicator
│   │   └── StatsSummary.jsx    # Active, due, and decided counters
│   ├── data/
│   │   └── sampleData.js       # Curated initial sample decisions
│   ├── utils/
│   │   ├── dateUtils.js        # Relative dates, formatting & snooze math
│   │   └── decisionUtils.js    # Statistics calculation helpers
│   ├── App.jsx                 # Main state coordinator & view routing
│   ├── index.css               # Design system tokens, grid layout & styles
│   └── main.jsx                # Application root entry point
├── package.json
├── vite.config.js
└── README.md
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
