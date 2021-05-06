const path = require('path')
const withSass = require('@zeit/next-sass');
const Dotenv = require("dotenv-webpack");

module.exports = withSass({
    cssModules: true
})
module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'src/styles')],
    },
    webpack: (config) => {
      config.plugins.push(new Dotenv({ silent: true }));
      return config;
    },
    env: {
      API_URL: process.env.API_URL || "http://192.168.178.36:3005/api",
      TITLE: process.env.TITLE || "AudioPlayer-Player",
      NAME: process.env.NAME || "My Orga01",
      SHORT_NAME: process.env.SHORT_NAME || "Og01",
      CATEGORY: process.env.CATEGORY || "Homework,Pinned",
    }
}

