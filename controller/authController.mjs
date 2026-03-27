import User from "../models/user.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function createUser(req, res, next) {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPassword,
    });
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({ message: "Utilisateur créé", data: userResponse });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    //Le plus permet d'inclure le mot de passe qui avait été exclus lors de la creation de l'utilisateur
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      const error = new Error("Courriel ou mot de passe invalide");
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Courriel ou mot de passe invalide");
      error.statusCode = 401;
      throw error;
    }
    const userResponse = user.toObject();
    delete userResponse.password;
    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
      },
      process.env.SECRET_JWT,
      {
        expiresIn: "1h",
      },
    );
    res.status(200).json({ data: userResponse, token: token });
  } catch (err) {
    next(err);
  }
}
