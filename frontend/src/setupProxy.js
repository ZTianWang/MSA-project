// 配置代理服务器解决跨域问题
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/admin",
        createProxyMiddleware({
            // target: "http://localhost:3006",
            target: "http://localhost:5258",
            changeOrigin: true,
        })
    );
    app.use(
        "/products",
        createProxyMiddleware({
            target: "http://localhost:5258",
            changeOrigin: true,
        })
    )
};
