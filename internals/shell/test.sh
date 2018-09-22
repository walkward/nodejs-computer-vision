#!/bin/sh

npm run cleanup:reports

# Run tests and generate test coverage
set -x
mkdir -p ${DIR}/reports
nyc ava-ts --tap | tap-xunit > ${DIR}/reports/ava-junit.xml
