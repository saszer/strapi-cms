export default {
  plugins: {
    'users-permissions': {
      config: {
        jwt: {
          expiresIn: '7d',
        },
      },
    },
  },
};
