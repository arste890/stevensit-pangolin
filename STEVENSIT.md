# StevensIT Access

StevensIT Access is a rebranded build of [Pangolin](https://github.com/fosrl/pangolin) by Fossorial, Inc., used by StevensIT at https://access.stevensit.org. It is distributed under the GNU Affero General Public License, version 3 (see `LICENSE`). This repository is the corresponding source for that service, as section 13 of the AGPL requires.

## What this repository contains

- The AGPL-3.0 portions of Pangolin at tag `1.27.1` (upstream commit `0e011f57f751c77a906eba7fde3cd8765290ab01`).
- It does **not** contain files licensed under the Fossorial Commercial License (`server/private/`, `Dockerfile.ws`, `Dockerfile.dns`). Those files may not be redistributed, and the Community (OSS) build used here does not require them.
- No license checks or enterprise features have been altered or enabled.

## StevensIT changes

All changes are to AGPL-3.0 files:

| File | Change |
|---|---|
| `public/logo/word_mark_black.png`, `public/logo/word_mark_white.png` | StevensIT Access word marks (StevensIT shield, Plus Jakarta Sans) |
| `public/logo/pangolin_orange.svg` | StevensIT shield, shown on the initial setup page |
| `public/favicon.ico` | StevensIT favicon |
| `branding/` | Sources for the word marks (SVG layout, shield image, Plus Jakarta Sans under the OFL, render script) |
| `src/app/layout.tsx`, `src/app/auth/layout.tsx`, `src/app/setup/layout.tsx`, `src/app/admin/layout.tsx` | Default product name "StevensIT Access" in page titles |
| `src/components/AuthFooter.tsx` | StevensIT notice and one "License and source" link to this repository, whose README carries the Pangolin credit, the AGPL-3.0 notice and the warranty disclaimer |
| `src/components/LoginForm.tsx`, `src/components/DashboardLoginForm.tsx` | Dashboard sign-in shows the configured identity providers as the choice; local accounts are behind an "Administrator sign-in" link (or `/auth/login?local=1`) |
| `server/routers/auth/securityKey.ts` | Security key prompts name "StevensIT Access" |
| `README.md` | Notice that this repository is the corresponding source, with credit, licence and warranty statements |
| `src/components/PoweredByPangolin.tsx` | Resource sign-in shows "StevensIT Access" |
| `src/app/globals.css` | StevensIT navy (#243a85 light, #6c83d8 dark) in place of Pangolin orange |
| `messages/en-US.json` | Four user-facing strings name StevensIT Access |
| `.github/workflows/stevensit-image.yml` | Builds `ghcr.io/arste890/stevensit-pangolin` for linux/arm64 with `BUILD=oss` |

## Upgrading

1. Import the new upstream tag's AGPL files the same way (excluding the files listed above).
2. Re-apply the changes in the table; they are small and isolated.
3. Tag `<upstream version>-sit<n>` (for example `1.27.1-sit1`) to build and publish the image.

Pangolin is a trademark of Fossorial, Inc. StevensIT Access is not affiliated with or endorsed by Fossorial.
