#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn docs:build

cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:rcarcasses/vue-cytoscape master:gh-pages

rm -rf .git
cd -