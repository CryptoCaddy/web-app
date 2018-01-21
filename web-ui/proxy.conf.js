const PROXY_CONFIG = {
    "/api": {
        "target": process.env.API_SERVER || "http://localhost:8080",
        "secure": false
    }
}

module.exports = PROXY_CONFIG;