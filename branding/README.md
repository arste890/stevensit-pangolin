# StevensIT Access word marks

Sources for `public/logo/word_mark_black.png` (light theme) and `public/logo/word_mark_white.png` (dark theme), 896 by 224 pixels.

| File | Purpose |
|---|---|
| `wm-black.svg`, `wm-white.svg` | Layout: shield at x 0, y 6, 214 by 212; text at x 230, baseline 137, Plus Jakarta Sans 76 px, letter spacing -1.2; "StevensIT" weight 800, "Access" weight 500 offset 16 px |
| `stevensit-shield.png` | StevensIT shield, from `assets/images/StevensIT-Logo-Blue.png` in the StevensIT website repository |
| `fonts/PlusJakartaSans.ttf` | Plus Jakarta Sans variable font, SIL Open Font License 1.1 (`fonts/OFL.txt`) |
| `fonts/fonts.conf` | Private fontconfig file, so rendering uses only the bundled font |
| `render.sh` | Renders both PNGs into `public/logo/` |

Colours: light theme #0c1638 and #243a85; dark theme #f5f7fc and #a9b8ee.

To change the word marks, edit the SVG files and run `./render.sh` (requires `rsvg-convert` from librsvg). The rendered PNGs are committed, so the image build does not need these files.
