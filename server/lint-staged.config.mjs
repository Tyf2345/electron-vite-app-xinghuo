#!/bin/env node

export default {
  "*": () => [`eslint \"{src,apps,libs,test}/**/*.ts\" --fix`],
  //   "*.{js,jsx,ts,tsx,html,css,less}": (stagedFiles) => [
  //     `prettier  --write ./src ${stagedFiles.join(" ")}`,
  //   ],
};
