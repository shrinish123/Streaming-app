const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000"
    : "https://shrinish-social-media.herokuapp.com";
   

module.exports = baseUrl;
  