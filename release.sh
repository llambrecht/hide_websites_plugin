#!/bin/bash

# Define your addon name and version
ADDON_NAME="websites_hidder_for_firefox"
ADDON_VERSION="1.0.0"

# Directory where your addon source code resides
SRC_DIR="src"

# Directory where you want to store the release package
RELEASE_DIR="release"

# Clean up any existing release directory
rm -rf "$RELEASE_DIR"
mkdir -p "$RELEASE_DIR"

# Copy necessary files and directories to release directory
cp -r "$SRC_DIR" "$RELEASE_DIR"
cp -r assets "$RELEASE_DIR"  # Example: if you have an assets directory

# Exclude unwanted files and directories
cd "$RELEASE_DIR"
rm -f README.md CONTRIBUTING.md package.json package-lock.json .gitignore
rm -rf node_modules


echo "Release package created: ${ADDON_NAME}-${ADDON_VERSION}.zip"
