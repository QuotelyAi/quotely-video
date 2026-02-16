#!/bin/bash
set -e -E

GEMINI_API_KEY="AIzaSyA9fl49hlndAcy-kIdNsIkb870VcHLsxac"
MODEL_ID="veo-3.1-generate-preview"
PROMPT="${1:-A cinematic aerial shot of a mountain landscape at golden hour}"

cat << EOF > request.json
{
    "instances": [{
        "prompt": "${PROMPT}"
    }],
    "parameters": {
        "aspectRatio": "16:9",
        "sampleCount": 1,
        "durationSeconds": 8,
        "resolution": "720p"
    }
}
EOF

echo "Generating video with prompt: ${PROMPT}"
echo "This may take a few minutes..."

curl \
-s \
-X POST \
-H "Content-Type: application/json" \
"https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:predictLongRunning?key=${GEMINI_API_KEY}" \
-d '@request.json' | tee result.json | jq .name | sed 's/"//g' > op_name

op_name=$(cat op_name)
echo "Operation started: ${op_name}"

while true; do
  is_done=$(curl -s "https://generativelanguage.googleapis.com/v1beta/${op_name}?key=${GEMINI_API_KEY}" | tee op_check.json | jq .done)

  if [[ "${is_done}" = "true" ]]; then
    # Check for errors
    error=$(cat op_check.json | jq -r '.error // empty')
    if [[ -n "${error}" ]]; then
      echo "Error generating video:"
      cat op_check.json | jq .error
      exit 1
    fi

    for (( i=0; i<1; i++ ));
    do
        video_url=$(cat op_check.json | jq ".response.generateVideoResponse.generatedSamples[${i}].video.uri" | tr -d '"')
        echo "Video has been generated: ${video_url}."
        curl -L -s "${video_url}&key=${GEMINI_API_KEY}" --output "video_${i}.mp4"
        echo "Video downloaded to video_${i}.mp4"
    done;
    break
  fi

  echo "Still generating... checking again in 10 seconds."
  sleep 10
done
