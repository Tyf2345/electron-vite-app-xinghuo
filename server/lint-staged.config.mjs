#!/bin/env node

export default {
  "*": () => [`eslint \"{src,apps,libs,test}/**/*.ts\" --fix`],
};
