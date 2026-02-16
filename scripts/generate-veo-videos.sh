#!/bin/bash
# Generate AI B-roll video clips using Google Veo API
# Requires GEMINI_API_KEY in .env

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
OUTPUT_DIR="$PROJECT_DIR/public/videos"

source "$PROJECT_DIR/.env"

if [ -z "$GEMINI_API_KEY" ]; then
  echo "Error: GEMINI_API_KEY not set in .env"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

declare -A PROMPTS
PROMPTS["scene01_hook"]="Cinematic drone shot of a cluttered 1990s insurance office with overflowing filing cabinets and fax machines, then dissolving into a sleek modern AI-powered office with holographic displays. Dramatic lighting shift from warm tungsten to cool blue. Slow dolly movement."
PROMPTS["scene02_intro"]="Cinematic shot of a modern tech startup office with glass walls, multiple monitors showing insurance dashboards, and golden ambient lighting. Slow push-in through the glass door. Professional commercial style."
PROMPTS["scene03_paperwork"]="Cinematic shot of an insurance office desk covered in paperwork, forms, and spreadsheets. Overhead angle, warm tungsten lighting, slow push-in camera movement. Professional corporate style."
PROMPTS["scene04_phone_quote"]="Split screen showing old phone call on left transitioning to modern AI dashboard on right. Sleek dark UI with gold accents. Professional tech commercial style."
PROMPTS["scene05_lead_dashboard"]="Close-up of a modern CRM dashboard showing lead scores and analytics. Dark themed UI with colorful charts updating in real-time. Smooth camera pan."
PROMPTS["scene06_multichannel"]="A person using a modern smartphone and laptop simultaneously, multiple notification bubbles appearing. Clean modern office, shallow depth of field, warm lighting."
PROMPTS["scene07_document_scan"]="Close-up of an insurance document being scanned with a glowing blue line, data points highlighting and extracting. Futuristic tech visualization style."
PROMPTS["scene08_claims_mobile"]="Person holding a smartphone filing an insurance claim through a modern app interface. Clean, minimal design. Shallow depth of field, natural lighting."
PROMPTS["scene09_marketing_email"]="Abstract visualization of email marketing campaigns launching. Colorful email cards flying outward from center in a spiral pattern. Dark background with golden particle effects."
PROMPTS["scene10_growth"]="Cinematic wide shot of a modern glass office building at golden hour, symbolizing growth and innovation. Drone camera slowly ascending. Warm dramatic lighting."
PROMPTS["scene11_cta"]="Bright modern office with a diverse team celebrating around a large screen showing positive metrics. Energetic, uplifting mood. Natural daylight streaming through windows."
PROMPTS["scene12_outro"]="Cinematic aerial sunset shot over a modern city skyline transitioning to golden hour. Slow drone pull-back revealing the full panorama. Peaceful, aspirational mood."

echo "Generating ${#PROMPTS[@]} B-roll video clips..."
echo ""

for name in "${!PROMPTS[@]}"; do
  OUTPUT_FILE="$OUTPUT_DIR/${name}.mp4"

  if [ -f "$OUTPUT_FILE" ]; then
    echo "[SKIP] $name.mp4 already exists"
    continue
  fi

  echo "[GEN] $name"
  echo "  Prompt: ${PROMPTS[$name]:0:80}..."

  # Generate video using Gemini/Veo API (upgraded to 3.1)
  RESPONSE=$(curl -s "https://generativelanguage.googleapis.com/v1beta/models/veo-3.1-generate-preview:predictLongRunning" \
    -H "x-goog-api-key: $GEMINI_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{
      \"instances\": [{
        \"prompt\": \"${PROMPTS[$name]}\"
      }],
      \"parameters\": {
        \"aspectRatio\": \"16:9\",
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
        curl -s -L -o "$OUTPUT_FILE" -H "x-goog-api-key: $GEMINI_API_KEY" "$VIDEO_URI"
        echo "  ✓ Saved $name.mp4"
      else
        echo "  ✗ No video URI in response"
      fi
      break
    fi

    echo "  ... waiting ($((i * 10))s)"
  done

  echo ""
done

echo "Done! Videos saved to: $OUTPUT_DIR"
