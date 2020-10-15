module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/form/1',
        permanent: true,
      },
      {
        source: '/form',
        destination: '/form/1',
        permanent: true,
      },
    ];
  },
};
