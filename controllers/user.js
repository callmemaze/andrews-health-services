import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModal from "../model/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    if (!oldUser.verified) {
      return res.status(400).json({ verfied: false });
    }

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret);

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });
    const oldPhone = await UserModal.findOne({ phone });
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
      location,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, secret);
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
    const otpGenerated = generateOTP();
    const hashedOtp = await bcrypt.hash(otpGenerated, 12);
    const users = await userVerification.create({
      user: oldUser._id,
      otp: hashedOtp,
    });
    await sendMail({
      to: email,
      OTP: otpGenerated,
    });
    res.status(201).json({ message: "OTP sent" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const verifyResetPassword = async (req, res) => {
  try {
    const { user, otp } = req.body;
    const users = await userVerification.findOne({
      user,
    });
    if (!users) {
      return res.status(201).json({ verify: "User not found" });
    }
    const hashPassword = await bcrypt.compare(otp, users.otp);

    if (!hashPassword) return res.status(201).json({ verify: "Invalid OTP" });
    await userVerification.findByIdAndDelete(users._id);
    res.status(201).json({ verified: true });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { user, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const users = await UserModal.findByIdAndUpdate(user, {
      password: hashedPassword,
    });
    res.status(201).json({ message: "Password reset" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
