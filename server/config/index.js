if (process.env.NODE_ENV === "production") {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}


// Create a dev.js for development using this template:
// Folder to store private keys, this file is in .gitignore and will not be uploaded to repo
// module.exports = {
//     DB_HOST: "localhost",
//     DB_USER: "root",
//     DB_PASSWORD: "root",
//     DB_DATABASE: "database",
//   }