#!/bin/bash
set -e -E

GEMINI_API_KEY="${GEMINI_API_KEY:-AIzaSyClPdzdqpEaQTatA3M_ZlSenoD3nQe5dD0}"
MODEL_ID="imagen-3.0-generate-002"
PROMPT="${1:-A beautiful sunset over a mountain landscape, photorealistic}"
OUTPUT_DIR="${2:-.}"
NUM_IMAGES="${3:-1}"

cat << EOF > image_request.json
{
    "instances": [{
        "prompt": "${PROMPT}"
    }],
    "parameters": {
        "sampleCount": ${NUM_IMAGES},
        "aspectRatio": "16:9"
    }
}
EOF

echo "Generating image with prompt: ${PROMPT}"
echo "Model: ${MODEL_ID}"
echo "Number of images: ${NUM_IMAGES}"
echo ""

response=$(curl \
  -s \
  -X POST \
  -H "Content-Type: application/json" \
  "https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:predict?key=${GEMINI_API_KEY}" \
  -d '@image_request.json')

echo "$response" > image_response.json

# Check for errors
error=$(echo "$response" | jq -r '.error.message // empty')
if [[ -n "${error}" ]]; then
  echo "Error generating image: ${error}"
  echo "$response" | jq .error
  exit 1
fi

# Extract and save images from base64 response
count=$(echo "$response" | jq '.predictions | length')
echo "Received ${count} image(s)"

for (( i=0; i<count; i++ )); do
  b64_data=$(echo "$response" | jq -r ".predictions[${i}].bytesBase64Encoded")
  if [[ -n "${b64_data}" && "${b64_data}" != "null" ]]; then
    output_file="${OUTPUT_DIR}/image_${i}.png"
    echo "${b64_data}" | base64 -d > "${output_file}"
    echo "Image saved to ${output_file}"
  else
    echo "No image data for index ${i}"
  fi
done

echo ""
echo "Done! Generated ${count} image(s) in ${OUTPUT_DIR}/"
