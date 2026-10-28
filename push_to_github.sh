#!/bin/bash
set -e

REPO_URL="https://github.com/Kiarash-Shadkam/LEC_NFT.git"

if [ -z "$1" ]; then
  echo "=========================================================="
  echo "Quantum Engraving Collection — GitHub Push Helper"
  echo "=========================================================="
  echo "نحوه استفاده:"
  echo "اگر توکن دسترسی گیت‌هاب (Personal Access Token) دارید، دستور زیر را اجرا کنید:"
  echo "  ./push_to_github.sh <YOUR_GITHUB_TOKEN>"
  echo ""
  echo "یا در ترمینال خود به صورت مستقیم دستور زیر را بزنید:"
  echo "  git push -u origin main"
  echo "=========================================================="
  exit 1
fi

TOKEN="$1"
REMOTE_WITH_AUTH="https://${TOKEN}@github.com/Kiarash-Shadkam/LEC_NFT.git"

echo "در حال ارسال آخرین کدها و دارایی‌ها به مخزن گیت‌هاب: $REPO_URL ..."
git push "$REMOTE_WITH_AUTH" main --force

echo ""
echo "✓ با موفقیت به https://github.com/Kiarash-Shadkam/LEC_NFT پوش شد!"
