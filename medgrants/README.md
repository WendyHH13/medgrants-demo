# MedGrants by Acceleration Point

**Medical Affairs Sponsorship & Grants Management**

MedGrants is a front-end prototype of a Medical Affairs Sponsorship & Grants Management platform, built by [Acceleration Point](https://accelerationpoint.com). It demonstrates a complete request lifecycle — from submission through multi-step approval, compliance review, post-event closeout, and transparency reporting.

## Features

- **Role-based views** — Requester (MSL), Budget Owner, Medical Reviewer, Legal/Compliance, Admin/Leadership
- **Full request lifecycle** — Submit → Budget Review → Medical Review → Legal Review → Approved → Closeout
- **Clarification workflow** — Reviewers can request clarification; requesters respond and resubmit in-platform
- **SLA monitoring** — Per-stage business day targets with overdue indicators
- **Budget tracker** — Committed vs. actual spend by region, therapeutic area, and quarter
- **Transparency reporting** — Sunshine Act / EFPIA reportable transfers with CSV export
- **Audit trail** — Full timestamped log of every action across all requests
- **Admin settings** — Customizable branding, reference lists, SLA targets, and role labels
- **Persistent state** — All data stored in browser `localStorage`; reset tools available for demos

## Tech Stack

- Pure HTML, CSS, and JavaScript — no build tools, no dependencies, no backend
- Single-page application (SPA) with client-side routing
- Fully self-contained and hostable on GitHub Pages

## Project Structure

```
medgrants/
├── index.html   # App shell and HTML structure
├── styles.css   # All styles and CSS custom properties
├── app.js       # All application logic and state management
└── README.md    # This file
```

## Getting Started

Open `index.html` directly in a browser, or host on any static file server (including GitHub Pages).

No installation or build step required.

---

*Built by Acceleration Point — accelerationpoint.com*
