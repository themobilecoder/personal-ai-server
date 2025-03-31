#!/bin/bash

# Start Ollama in the background.
/bin/ollama serve &
# Record Process ID.
pid=$!

# Pause for Ollama to start.
sleep 5

echo "🔴 Running llama3.2 model..."
ollama run llama3.2
echo "🟢 Done!"

# Wait for Ollama process to finish.
wait $pid