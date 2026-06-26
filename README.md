# Premium Developer Portfolio — Ahmad Sabhi

A bespoke, responsive, and luxury-themed personal portfolio website showcasing professional experience, technical expertise, and production-grade SaaS products. Built with clean semantic HTML, vanilla CSS (using a modern Champagne Gold design system), and interactive JavaScript.

## Features

- **Luxury Theme & Aesthetics**: Built using curated typography (Plus Jakarta Sans & Cormorant Garamond), champagne gold highlights, glassmorphic headers, and neutral dark tones for an upscale design.
- **Scroll-Triggered Odometer**: Key engineering metrics roll up dynamically using an `IntersectionObserver` coupled with an ease-out timing curve when scrolled into viewport.
- **Interactive Project Showcase**: Dynamically filter engineering, creative, and design works. Includes professional dashboard mockups that load live links and codebases when clicked.
- **Responsive Animations**: Beautiful fade-in reveal animations active for elements during page scroll.
- **Corner Gold Accents**: Luxury frame layouts that adapt dynamically on hover.
- **Live Form Validation**: Interactive contact form validating missing inputs or format mismatches on focus-out instantly.
- **Floating Toast Notifications**: Submitting contact inquiries displays a sleek slide-in bottom-right corner confirmation card, leaving the form fully active.
- **Resume Downloader**: Access downloadable resume copies directly from header links, mobile drawers, or hero call-to-actions.

## Project Structure

```
├── assets/
│   ├── portrait.png          # Personal photo
│   ├── project1.png          # DoxRadar AI mockup
│   ├── project2.png          # Gym CRM Growth OS mockup
│   ├── project3.png          # AI Resume Builder mockup
│   └── project4.png          # Forever E-Commerce mockup
├── index.html                # Semantic HTML structure & metadata
├── style.css                 # Custom luxury stylesheet (Variables, reset, keyframe animations)
├── script.js                 # Smooth reveals, menu, form validation, stats odometer
└── sabhi_resume (3).pdf      # PDF Resume asset
```

## Setup & Running

Simply open `index.html` in any web browser, or serve it using local dev servers like VS Code's Live Server extension.
