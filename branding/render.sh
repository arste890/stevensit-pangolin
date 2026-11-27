#!/bin/sh
# Renders the StevensIT Access word marks into public/logo/.
# Requires rsvg-convert (librsvg). Uses the bundled font only; nothing is installed system-wide.
set -e
cd "$(dirname "$0")"
export PANGOCAIRO_BACKEND=fc FONTCONFIG_FILE="$PWD/fonts/fonts.conf"
rsvg-convert -w 896 -h 224 wm-black.svg -o ../public/logo/word_mark_black.png
rsvg-convert -w 896 -h 224 wm-white.svg -o ../public/logo/word_mark_white.png
