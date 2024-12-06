import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import fs from "jsonwebtoken";
import db from "../db/db.js";
import { Prisma } from "@prisma/client";

dotenv.config();
var jwtSecret = process.env.JWTSECRET;

// Authentication a User, No login Requiered

export const signupUser = async (req, res) => {
  try {
    // Validate input
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(401).json({ errorMsg: "All fields are required" });
    }

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(401).json({ errorMsg: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(5);
    const securePass = await bcrypt.hash(password, salt);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: securePass,
      },
    });

    const authToken = jwt.sign({ userId: user.id }, jwtSecret);

   return res.status(200).json({ success: true, authToken, user });
  } catch (error) {
    console.error(error.message);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(401).json({ errorMsg: "Email already in use" });
      }
    }

    return res.status(500).json({ success, errorMsg: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  let success = false;

  const { email, password } = req.body;

  try {
    let user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ success, errorMsg: "Account not found" });
    }

    const pwdCompare = await bcrypt.compare(password, user.password);
    if (!pwdCompare) {
      return res
        .status(401)
        .json({ success, errorMsg: "Wrong password" });
    }

    const data = {
      user: {
        id: user.id,
      },
    };
    success = true;

    const authToken = jwt.sign(data, jwtSecret);
   return res.status(200).json({ success, authToken, user });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success, errorMsg: "Server error" });
  }
};
