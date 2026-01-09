set -e

outputDir="src/api/generated/fetch-client"
npx openapi-generator-cli generate --input-spec generate-api/schema.yaml -o $outputDir -g "typescript-fetch" --additional-properties=fileNaming='kebab-case',supportsES6=true;
