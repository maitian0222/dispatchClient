module.exports = {
  '/upms/**': {
    target: 'http://192.168.80.144',
    changeOrigin: true,
  },
  '/admin/**': {
    target: 'http://192.168.80.144',
    changeOrigin: true,
    headers: {
      Connection: 'keep-alive',
    },
  },
  '/biz/**': {
    target: 'http://192.168.80.144',
    changeOrigin: true,
    headers: {
      Connection: 'keep-alive',
    },
  },

  '/oss/**': {
    target: 'http://192.168.80.144:8082',
    changeOrigin: true,
    headers: {
      Connection: 'keep-alive',
    },
  },
};
