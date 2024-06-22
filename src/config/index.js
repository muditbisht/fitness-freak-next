const CONFIG = require("./config.json");

module.exports = process.env.NODE_ENV === "production" ? CONFIG.PRODUCTION: CONFIG.LOCAL;
// module.exports = CONFIG.PRODUCTION;
// module.exports = CONFIG.TESTING;
// module.exports = CONFIG.LOCAL;
// module.exports = CONFIG.LANTESTING