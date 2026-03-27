#!/bin/bash

# Define the file path
FILE_PATH="project/document-dashboard/config.yaml"

# Check if the file exists
if [ ! -f "$FILE_PATH" ]; then
    echo "File $FILE_PATH not found."
    exit 0
fi

# Use awk to process the YAML file entry by entry.
# We look for lines with "- id:" to reset the state for a new entry.
# We then check if we find a "template:" line starting with "com-dynatrace" or "dashboad".
# If we do, we mark this entry as one that needs its "skip" property set to "true".
# When we reach a "skip:" line, we update its value if the condition was met.

awk '
BEGIN { FS=":"; OFS=":" }
/^- id:/ {
    # New entry starts.
    # Reset state
    needs_skip = 0
}
/^[[:space:]]+template:[[:space:]]+(com-dynatrace|dashboard)/ {
    needs_skip = 1
}
/^[[:space:]]+skip:/ {
    if (needs_skip) {
        # Update skip to true
        sub(/:.*/, ": true")
    }
}
{ print }
' "$FILE_PATH" > "${FILE_PATH}.tmp" && mv "${FILE_PATH}.tmp" "$FILE_PATH"

echo "Processed $FILE_PATH"
