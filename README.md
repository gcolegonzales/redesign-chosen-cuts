# Chosen Cuts — Website Redesign Concept

A modern, mobile-first website concept for **Chosen Cuts**, a 5-star barbershop at
415 Josephine St, Denham Springs, LA.

This is an **unsolicited redesign concept** — a "this could be yours right now" pitch piece,
not the shop's official site.

## Why a new site?

Chosen Cuts has a perfect 5.0 rating and 90+ reviews, but **no real website** — customers
can only find them through Booksy, Fresha, and Facebook. That means:

- No home base that shows up cleanly in a Google search for their name.
- Their booking, hours, location, pricing, and best work are scattered across third-party
  platforms instead of one branded page they own.
- No polished first impression that matches the quality of the cuts.

This concept fixes that with a single fast, accessible page that puts their real work,
prices, hours, and a direct **Book Now** button (linking to their live Booksy page) front
and center.

## What's inside

- Sticky/shrinking header, smooth-scroll nav, scroll-reveal sections, subtle hero motion
  (all respecting `prefers-reduced-motion`).
- Real service menu and pricing from their Booksy listing.
- A gallery of **real haircut photos** pulled from their Booksy listing, with a lightweight
  CDN lightbox.
- Real address, phone, and hours; a "Book Now" button that links to their actual Booksy page.
- Fully static — no build step, no framework. Opens by double-clicking `index.html`.

## Real data & imagery

- **Address / hours:** from the Fresha & Booksy listings.
- **Phone:** (225) 788-2889 — from the Fresha listing.
- **Services & prices:** from the current Booksy service menu.
- **Photos:** six real client-work photos + logo downloaded from the Booksy listing CDN,
  stored in `assets/photos/` (each optimized under 140 KB).
- **Reviews:** real quotes from the verified Booksy listing.

## How to view

Open `index.html` in any browser. No server or install required.

## SEO / deploy note

On-page SEO is wired in: a `BarberShop` JSON-LD block (name, phone, address, hours,
priceRange, image, url, `sameAs` → Booksy + Facebook), canonical + Open Graph + Twitter
tags, a single `<h1>`, plus `robots.txt` and `sitemap.xml` at the repo root.

Because the final domain isn't known yet, every absolute URL uses the literal placeholder
`https://REPLACE-WITH-DOMAIN.com/`. **At deploy, do one find-replace** of that string with
the real domain across `index.html`, `sitemap.xml`, and `robots.txt`.

## Tech

Plain HTML + CSS + a small vanilla-JS file. Google Fonts + GLightbox loaded via `<link>`/CDN.
Responsive from 360px phones to widescreen; semantic landmarks, alt text, labeled controls,
and visible focus states throughout.

---

*Redesign concept · not affiliated with Chosen Cuts.*
