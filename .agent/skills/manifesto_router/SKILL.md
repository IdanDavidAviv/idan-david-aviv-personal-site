---
name: manifesto_router
description: Abstraction layer for translating the Creator's internal methodologies (Shap-Tie, Alchemical Anchor) into user-facing CTAs and engagement funnels without leaking the underlying mechanics.
---

# Manifesto Router & CTA Architecture

## Core Directive
The Manifesto Router is responsible for ensuring that all Call-to-Actions (CTAs) across the site act as a **Deep Alignment Funnel**. The goal is not to "sell" but to filter. We attract high-alignment clients who resonate with "Harmonious Flow" and repel those looking for sterile, generic dev work.

## 🔗 Bi-Directional Routing (The Universal Translation Layer)
- **Governed By:** [`idan_core_blueprint`](../idan_core_blueprint/SKILL.md), [`virgo_manifesto`](../virgo_manifesto/SKILL.md), and [`virgo_dna_manifesto`](../virgo_dna_manifesto/SKILL.md). This router possesses no philosophy of its own; it derives its logic strictly from the Creator's blueprints.
- **The Obscurity Constraint:** (Specific to `idan_core_blueprint`) Never expose internal mystical terms ("Shabtai", "Alchemical Anchor", "Sovereign Identity") in the frontend UI. The router must translate these into concrete, heart-forward, premium copy.
- **Trigger:** Whenever the agent is tasked with writing or updating Call-to-Actions (CTAs), Hero text, or engagement funnels based on *any* of the manifestos, it MUST route its generation through this skill to ensure the copy acts as a "Deep Alignment Funnel" rather than generic marketing.

## Global CTA Routing Rules
1. **No Dedicated Manifesto Page**: The philosophy is injected directly into the site's natural flow (Hero, Projects, About).
2. **Unified Destination**: All major CTAs must route to the Contact Area on the Me (About) page.
3. **Contextual Handoff**: The text of the CTA must reflect the context of the page it originates from, but the destination is always the same Discovery Call / Engagement funnel.

## Output Formatting
When generating UI copy for CTAs, use:
- **Action-oriented verbs** that imply partnership (e.g., "Forge Together", "Let's Build", "Start a Conversation").
- **Eyes Height Mandate**: The copy MUST be grounded, warm, and inviting. Never speak from a pedestal. Avoid overly pretentious or arrogant framing (e.g., avoid things like "Explore philosophical alignment" that sound inaccessible).
- **Premium Aesthetics** matching `premium_ui_dna`.
