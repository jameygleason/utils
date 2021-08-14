#!/usr/bin/env sh

git remote set-url origin git@github.com:jameygleason/utils.git && \
git push origin && \
git remote set-url origin git@gitlab.com:jameygleason/utils.git && \
git push origin