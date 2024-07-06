#!/bin/bash

# Define your addon name
ADDON_NAME="websites_hidder_for_firefox"

# Ask the user for the version number
echo "Enter the version number for the release:"
read ADDON_VERSION

# Directory where your addon source code resides
SRC_DIR="src"

# Temporary directory for preparing the release package
TEMP_DIR="temp_release"

# Clean up any existing temporary directory
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

# Copy necessary files and directories to temporary directory
cp -r "$SRC_DIR"/* "$TEMP_DIR"
cp manifest.json "$TEMP_DIR"
cp background.js "$TEMP_DIR"
cp -r assets "$TEMP_DIR"  # Example: if you have an assets directory

# Exclude unwanted files and directories
cd "$TEMP_DIR"
rm -f README.md CONTRIBUTING.md package.json package-lock.json .gitignore
rm -rf node_modules

# Go back to the original directory and create a zip file directly without the release folder
cd ..
zip -r "${ADDON_NAME}-${ADDON_VERSION}.zip" "$TEMP_DIR"/*

# Clean up the temporary directory after creating the zip file
rm -rf "$TEMP_DIR"

echo "Release package created: ${ADDON_NAME}-${ADDON_VERSION}.zip"