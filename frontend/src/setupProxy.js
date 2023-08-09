// Configure a proxy server to solve cross-domain problems
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        ["/admin", "/products"],
        createProxyMiddleware({
            target: "http://localhost:5258",
            changeOrigin: true,
        })
    );
};
