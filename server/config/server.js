module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'https://e-auc.herokuapp.com'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '03eec73f1657a9eccaf9a92d09705e66'),
    },
  },
});
