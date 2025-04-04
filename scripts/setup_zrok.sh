#!/bin/bash

# Function to display usage
usage() {
    echo "Usage: $0 --token <token> <reserved-name>"
    exit 1
}

# Check if the correct number of arguments is provided
if [ "$#" -ne 3 ]; then
    usage
fi

# Parse arguments
if [ "$1" != "--token" ]; then
    usage
fi

TOKEN=$2
RESERVED_NAME=$3

# Clean up zrok first
zrok disable

# Execute zrok commands
zrok enable "$TOKEN"
zrok reserve public localhost:9000 --unique-name "$RESERVED_NAME"
zrok share reserved "$RESERVED_NAME"