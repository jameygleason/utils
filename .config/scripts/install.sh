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

echo ""
echo Installing Kit Deps
echo ""
cd example/kit
npm i
cd ../..

echo ""
echo Installing Rollup Deps
echo ""
cd example/rollup
npm i
cd ../..