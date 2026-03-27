import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "Non authentifié" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token : ", token);

  let decodeToken;

  try {
    decodeToken = jwt.verify(token, process.env.SECRET_JWT);

    req.user = decodeToken;
    console.log("req.user : ", req.user);
    next();
  } catch (err) {
    err.statusCode = 401;
    return next(err);
  }
};

export default isAuth;
