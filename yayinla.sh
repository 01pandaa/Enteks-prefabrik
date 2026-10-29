#!/usr/bin/env bash
# Siteyi üretir ve deponun köküne kopyalar (GitHub Pages "main / root" için)
set -euo pipefail
cd "$(dirname "$0")"
node src/build.js
# eski üretilmiş klasörleri temizle
rm -rf img mersin tarsus modeller prefabrik-ev celik-ev yutong-ev ytong-ev iletisim hakkimizda sss tarsus-mahalleleri
cp -r dist/. .
