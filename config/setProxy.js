module.exports = {
  '/oa/**': {
    target: 'http://192.168.80.116',
    changeOrigin: true,
  },
  '/dispute/**': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  },
  // '/upms/**': {
  //   target: 'http://localhost:5000',
  //   changeOrigin: true,
  // },
  '/upms/**': {
    target: 'http://192.168.81.7:8080',
    changeOrigin: true,
    headers: {
      Connection: 'keep-alive',
    },
  },
  // '/upms/**': {
  //   target: 'http://192.168.80.144:81',
  //   changeOrigin: true,
  //   headers: {
  //     Connection: 'keep-alive',
  //   },
  // },
  '/biz/**': {
    target: 'http://192.168.80.144:81',
    changeOrigin: true,
    headers: {
      Connection: 'keep-alive',
    },
  },
};
