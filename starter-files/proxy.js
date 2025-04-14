const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors')
const app = express()
const port = 3000

// Enable CORS for all requests
app.use(cors())

// Configuration for the proxy
const proxyOptions = {
  target: 'https://xkcd.com',
  changeOrigin: true,
  pathRewrite: {
    '^/': '/' // removes base path
  }
}

// Create the proxy middleware
app.use('/', createProxyMiddleware(proxyOptions))

app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`)
})