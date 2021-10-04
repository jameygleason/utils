#!/usr/bin/env sh

# Github
git remote set-url origin git@github.com:jameygleason/utils.git && \
git push origin && \
git push --tags && \

# Gitlab
git remote set-url origin git@gitlab.com:jameygleason/utils.git && \
git push origin && \
git push --tags