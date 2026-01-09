set -e

if [ $CI ]; then
  BRANCH_NAME=$CI_COMMIT_REF_NAME
else
  BRANCH_NAME="$(git rev-parse --abbrev-ref HEAD)"
fi

BRANCH_NAME=${BRANCH_NAME:-develop} node --env-file generate-api/.env generate-api/download-api.js
