export default ({ env }) => ({
  secret: env('JWT_SECRET'),
});
