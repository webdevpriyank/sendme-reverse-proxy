const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config()

// Creating express server
const app = express();

const PORT = process.env.PORT || 3000;
const HOST = "localhost";
const API_BASE_URL = process.env.API_BASE_URL;


const API_SERVICE_URL = `${API_BASE_URL}`;

// Use morgan middleware for logging
app.use(morgan('dev'));

app.use('/', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/`]: '',
    },
}));

// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});