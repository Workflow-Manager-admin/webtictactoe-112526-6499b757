#!/bin/bash
cd /home/kavia/workspace/code-generation/webtictactoe-112526-6499b757/webtictactoe
npm run lint 
$ESLINT_EXIT_CODE
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
  exit 1
fi

