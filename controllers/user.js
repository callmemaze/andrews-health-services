import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModal from "../models/userModel.js";
import dotenv from "dotenv";
import Twilio from "twilio";

dotenv.config();

const twilio = Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, "secret");

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });
    if (oldUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      phone,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "secret");
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });
    twilio.verify.v2
      .services(process.env.TWILIO_SERVICE_ID)
      .verifications.create({ to: email, channel: "email" })
      .then((verification) => {
        return res.status(200).json({ data: "OTP sent" });
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const verifyResetPassword = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!otp) {
      return res.status(200).json({ message: "Please enter OTP" });
    }
    twilio.verify.v2
      .services(process.env.TWILIO_SERVICE_ID)
      .verificationChecks.create({ to: email, code: otp })
      .then((data) => {
        return res.status(200).json({ data: data.status });
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const users = await UserModal.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
      }
    );
    res.status(201).json({ message: "Password reset" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
