module.exports = {
  port: process.env.PORT || 8080,
  dbUri:
    process.env.DB_URI ||
    "mongodb+srv://jaideeppatidar3421:w8NpCxaDRLcg3Uz3@mxpertz1.zlhbv6i.mongodb.net/?retryWrites=true&w=majority&appName=mxpertz1",
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
};
