const path = require('path')
const withSass = require('@zeit/next-sass');

module.exports = withSass({
    cssModules: true
})
module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'src/styles')],
    },
    env: {
      API_URL: process.env.API_URL || "http://localhost:3005/api",
      TITLE: process.env.TITLE || "AudioPlayer-Player",
    }
}

