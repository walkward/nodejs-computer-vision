#!/bin/sh

set -x
mkdir -p ${DIR}/reports
tslint -p . --format junit --out ./reports/tslint-junit.xml
