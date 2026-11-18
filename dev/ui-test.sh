#!/bin/bash
# Headless UI test via the Windows Chrome install (WSL). Needs the dev server: npm run dev (port 5173).
# usage: dev/ui-test.sh NAME "#/route" "step|step|..." [window-w] [window-h]
#   env: FW=390  render the app in a 390px-wide frame (phone)
#        SEED=file.json  initial user state (UserState JSON) written to IndexedDB before load; default: empty state
# steps: click:SEL  clicktext:SEL=text  key:Enter|Space|1  type:SEL=text  hash:#/x  wait:ms  text:SEL  count:SEL  eval:JS
# output: dev/out/NAME.png and the step results plus JS errors ("ERRORS: none" = pass). Keep "|" out of eval code.
cd "$(dirname "$0")/.." || exit 1
PORT=${PORT:-5173}; OUT=dev/out; mkdir -p $OUT
CH="/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"
WT=$(wslpath "$(cmd.exe /c 'echo %TEMP%' 2>/dev/null | tr -d '\r')")
enc() { python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))" "$1"; }
SEEDQ=""; [ -n "$SEED" ] && SEEDQ="&seed=$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote(open(sys.argv[1]).read()))" "$SEED")"
URL="http://localhost:$PORT/dev/harness.html?hash=$(enc "$2")&fw=${FW:-}&steps=$(enc "$3")$SEEDQ"
W=${4:-1280}; H=${5:-900}
# A fresh profile per run: no shared IndexedDB, service workers or cache with other Chrome windows
PROF="$(wslpath -w "$WT")\\ls_prof_$$"
"$CH" --headless=new --user-data-dir="$PROF" --disable-gpu --hide-scrollbars --window-size=$W,$H --virtual-time-budget=25000 \
  --screenshot="$(wslpath -w "$WT")\\ls_$1.png" "$URL" >/dev/null 2>&1
cp "$WT/ls_$1.png" "$OUT/$1.png" 2>/dev/null
"$CH" --headless=new --user-data-dir="$PROF" --disable-gpu --window-size=$W,$H --virtual-time-budget=25000 --dump-dom "$URL" 2>/dev/null | python3 -c "
import sys,re,html
s=sys.stdin.read(); m=re.search(r'<pre id=\"result\"[^>]*>(.*?)</pre>',s,re.S)
print(html.unescape(m.group(1)) if m and m.group(1).strip() else 'NO RESULT (page did not finish)')"
echo "screenshot: $OUT/$1.png"
rm -rf "$WT/ls_prof_$$" 2>/dev/null
