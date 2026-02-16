#!/bin/bash
# Generate AI presenter avatar clips using Google Veo API
# Creates 4 avatar clips for the Quotely AI presenter
# Requires GEMINI_API_KEY in .env

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
OUTPUT_DIR="$PROJECT_DIR/public/videos/avatar"

source "$PROJECT_DIR/.env"

if [ -z "$GEMINI_API_KEY" ]; then
  echo "Error: GEMINI_API_KEY not set in .env"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

# Consistent presenter description for visual continuity
PRESENTER_BASE="Professional AI presenter, young woman with dark hair in a modern navy blazer, medium close-up shot, dark gradient background with subtle blue lighting, looking at camera, 4K quality, cinematic lighting"

declare -A PROMPTS
PROMPTS["greeting"]="${PRESENTER_BASE}, warmly greeting and giving a small wave, friendly smile, welcoming gesture"
PROMPTS["explaining"]="${PRESENTER_BASE}, talking and explaining with natural hand gestures, engaged expression, conversational"
PROMPTS["pointing"]="${PRESENTER_BASE}, gesturing to the right side with open palm, directing attention, encouraging expression"
PROMPTS["closing"]="${PRESENTER_BASE}, waving goodbye with a warm smile, final farewell gesture, professional and friendly"

echo "Generating ${#PROMPTS[@]} avatar clips..."
echo ""

for name in "${!PROMPTS[@]}"; do
  OUTPUT_FILE="$OUTPUT_DIR/${name}.mp4"

  if [ -f "$OUTPUT_FILE" ]; then
    echo "[SKIP] $name.mp4 already exists"
    continue
  fi

  echo "[GEN] avatar/$name"
  echo "  Prompt: ${PROMPTS[$name]:0:80}..."

  # Generate video using Gemini/Veo API with person generation allowed
  RESPONSE=$(curl -s "https://generativelanguage.googleapis.com/v1beta/models/veo-3.1-generate-preview:predictLongRunning" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{
      \"instances\": [{
        \"prompt\": \"${PROMPTS[$name]}\"
      }],
      \"parameters\": {
        \"aspectRatio\": \"9:16\",
        \"personGeneration\": \"allow_adult\",
        \"durationSeconds\": 8
      }
    }")

  OP_NAME=$(echo "$RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('name',''))" 2>/dev/null || echo "")

  if [ -z "$OP_NAME" ]; then
    echo "  ✗ Failed to start generation"
    continue
  fi

  echo "  Operation: $OP_NAME"
  echo "  Polling for completion..."

  for i in $(seq 1 60); do
    sleep 10
    STATUS=$(curl -s "https://generativelanguage.googleapis.com/v1beta/$OP_NAME" \
      -H "x-goog-api-key: $GEMINI_API_KEY")

    DONE=$(echo "$STATUS" | python3 -c "import sys,json; print(json.load(sys.stdin).get('done', False))" 2>/dev/null || echo "False")

    if [ "$DONE" = "True" ]; then
      VIDEO_URI=$(echo "$STATUS" | python3 -c "
import sys, json
resp = json.load(sys.stdin)
vids = resp.get('response', {}).get('generateVideoResponse', {}).get('generatedSamples', [])
if vids:
    print(vids[0].get('video', {}).get('uri', ''))
" 2>/dev/null || echo "")

      if [ -n "$VIDEO_URI" ]; then
        curl -s -o "$OUTPUT_FILE" "$VIDEO_URI"
        echo "  ✓ Saved avatar/$name.mp4"
      else
        echo "  ✗ No video URI in response"
      fi
      break
    fi

    echo "  ... waiting ($((i * 10))s)"
  done

  echo ""
done

echo "Done! Avatar clips saved to: $OUTPUT_DIR"
