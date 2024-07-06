#!/bin/bash

# Define your addon name
ADDON_NAME="websites_hidder_for_firefox"

# Ask the user for the version number
echo "Enter the version number for the release:"
read ADDON_VERSION

# Check if there is a zip already and remove it if yes
if [ -f "${ADDON_NAME}-${ADDON_VERSION}.zip" ]; then
    rm "${ADDON_NAME}-${ADDON_VERSION}.zip"
fi

# Directory where your addon source code resides
SRC_DIR="src"

# Create the zip file directly
zip -r "${ADDON_NAME}-${ADDON_VERSION}.zip" "${SRC_DIR}"/* manifest.json background.js assets/* \
    -x "src/README.md" "src/CONTRIBUTING.md" "src/package.json" "src/package-lock.json" "src/.gitignore" "src/node_modules/*"

echo "Release package created: ${ADDON_NAME}-${ADDON_VERSION}.zip"
