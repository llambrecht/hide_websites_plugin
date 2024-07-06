#!/bin/bash

# Define your addon name
ADDON_NAME="websites_hidder_for_firefox"

# Ask the user for the version number
echo "Enter the version number for the release:"
read ADDON_VERSION

# Directory where your addon source code resides
SRC_DIR="src"

# Directory where you want to store the release package
RELEASE_DIR="release"

# Clean up any existing release directory
rm -rf "$RELEASE_DIR"
mkdir -p "$RELEASE_DIR"

# Copy necessary files and directories to release directory
cp -r "$SRC_DIR"/* "$RELEASE_DIR"
cp manifest.json "$RELEASE_DIR"
cp background.js "$RELEASE_DIR"
cp -r assets "$RELEASE_DIR"  # Example: if you have an assets directory

# Exclude unwanted files and directories
cd "$RELEASE_DIR"
rm -f README.md CONTRIBUTING.md package.json package-lock.json .gitignore
rm -rf node_modules

# Create a zip file of the release directory
cd ..
zip -r "${ADDON_NAME}-${ADDON_VERSION}.zip" "$RELEASE_DIR"/*

echo "Release package created: ${ADDON_NAME}-${ADDON_VERSION}.zip"