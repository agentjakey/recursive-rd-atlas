# Recursive R&D Atlas

An interactive educational tool mapping the path from AI-assisted coding to AI-driven research. Built to make the current evidence visible and the core questions clearer.

Recursive self-improvement -- an AI system autonomously designing and developing its own successors -- has not occurred. This project is not about predicting if or when it will. It is about understanding what the measurable trend toward greater AI involvement in AI R&D looks like today, where the bottlenecks are, and what failure modes emerge as that involvement grows.

---

## Core idea

AI is already substantially involved in writing the code that builds AI systems. Task horizons for autonomous AI operation have grown from 4 minutes to 12 hours in two years. AI systems are beginning to participate in research decisions, not just execution. These are documented facts from Anthropic Institute publications and METR evaluations.

None of this is recursive self-improvement. But the path is visible, the gaps are measurable, and the oversight challenges are present before the loop closes.

---

## Sections

- **Framing** -- What this is and is not about. Distinguishes the gap between "AI writes code faster" and "AI builds itself."
- **Timeline** -- Documented milestones from public Anthropic and METR data, March 2024 to mid-2026
- **R&D Loop Map** -- Clickable 7-node interactive diagram of the Model-to-Model loop. Each node has detail panels covering automation state, human dependency, and risk signals.
- **Bottleneck Simulator** -- A toy model (clearly labeled, not a forecast) for exploring how capability acceleration and oversight capacity interact across 8 dimensions.
- **Failure Mode Cards** -- 8 failure modes specific to AI-driven R&D pipelines. Each card covers definition, why it matters, warning signs, and possible mitigations.
- **Evidence Panel** -- Key metrics from the public record, with sourced interpretations and trend direction.
- **Thesis** -- What the evidence says and does not say.

---

## Source grounding

All quantitative claims come from:

- [Anthropic Institute: Recursive Self-Improvement](https://www.anthropic.com/institute/recursive-self-improvement)
- [Anthropic Research Agenda](https://www.anthropic.com/research/anthropic-institute-agenda)
- [METR: Time Horizons](https://metr.org/time-horizons/)
- [METR: RE-Bench](https://metr.org/blog/2024-11-22-evaluating-r-d-capabilities-of-llms/)

No claims are fabricated, projected, or sourced from secondary reporting.

---

## Accuracy caveat

This project does not claim:

- That recursive self-improvement has occurred or is inevitable
- That AI code authorship is equivalent to model self-improvement
- That task horizon trends guarantee any particular future state
- That the bottleneck simulator is a scientific or predictive instrument

The bottleneck simulator is a toy model for intuition only. It is clearly labeled as such throughout. Treat it as a structured way to think through tradeoffs, not as a model of reality.

---

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # ESLint via next lint
```

Requires Node.js 18+.

---

## Stack

- Next.js 15 (App Router, fully static)
- React 18, TypeScript 5, Tailwind CSS 3
- Framer Motion 11
- Fonts: Sora, Lora, DM Mono via next/font/google

---

## Sibling projects

- [Failure Mode Atlas](https://failure-mode-atlas.vercel.app) -- catalog of AI failure modes from the research literature
- [CoT Faithfulness](https://cot-faithfulness.vercel.app) -- causal mediation analysis on chain-of-thought
- [Neural Polysemanticity](https://neural-polysemanticity.vercel.app) -- mechanistic interpretability visualizations

---

## Author

Jacob Ortiz. AI researcher at American Refrigeration. Finishing BS Physics at UCSD (June 2026). Incoming UC Berkeley MIDS, Fall 2026. NeurIPS 2025 ML4PS co-author (arXiv:2512.00210, transformer interpretability for jet tagging with the Duarte Lab).

- GitHub: [agentjakey](https://github.com/agentjakey)
- Writing: [Latent Space Lab](https://agentjakey.substack.com)

---

MIT License. Errors are mine.
