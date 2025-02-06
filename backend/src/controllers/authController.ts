import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { sendVerificationEmail } from "../utils/email";

export const register = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const randomNumber = Math.floor(
      10000000 + Math.random() * 90000000
    ).toString();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verifycode: randomNumber,
    });
    let rs = await sendVerificationEmail(email, randomNumber);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

export const getProfile = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const logout = async (req: any, res: any) => {
  try {
    const tokenOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.clearCookie("token", tokenOption);
    res.json({
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

export const verifyemail = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.userId);
console.log(req.body)
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
    const userdata = {
      name: user.name,
      email: user.email,
      password:user.password,
      verifycode:user.verifycode,
      isVerified: true,
    };
    console.log(user.verifycode)
    console.log(req.body.verifycode ==user.verifycode)
    if (user.verifycode == req.body.verifycode) {
      const userupdate = await User.findByIdAndUpdate(user._id, userdata, {
        new: true,
        runValidators: true,
        useFindModify: false,
      });
      console.log(userupdate)
       res.json({ message: "Verify Code successful" });
    } else {
      res.json({ message: "Please Enter Valid Code" });
    }
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};
