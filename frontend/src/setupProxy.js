// Configure a proxy server to solve cross-domain problems
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        ["/admin", "/products"],
        createProxyMiddleware({
            target: "https://localhost:7170",
            changeOrigin: true,
        })
    );
};
