#!/usr/bin/env sh

echo ""
echo Installing Root Deps
echo ""
npm i

echo ""
echo Installing Package Deps
echo ""
cd package
npm i

echo ""
echo Building Package
echo ""
npm run build
cd ..
