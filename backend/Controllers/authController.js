import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import axios from "axios";
import User from "../Models/User.js";

const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "30d" });

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already in use" });

    const user = await User.create({ name, email, password });
    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken(user);
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const logout = (req, res) => {
  res.json({ message: "Logout successful (client should delete token)" });
};

export const refreshToken = (req, res) => {
  const token = generateToken(req.user);
  res.json({ token });
};

// ---- NEW Social Login ----
export const socialLogin = async (req, res) => {
  const { provider, token } = req.body;

  try {
    let profile = null;

    if (provider === "google") {
      // Verify Google token
      const googleRes = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
      profile = {
        email: googleRes.data.email,
        name: googleRes.data.name,
      };
    } 
    
    else if (provider === "facebook") {
      // Verify Facebook token
      const fbRes = await axios.get(
        `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`
      );
      profile = {
        email: fbRes.data.email, // may be null if not granted
        name: fbRes.data.name,
      };
    } 
    
    else if (provider === "apple") {
      // Apple ID token is JWT. In production, verify signature using Apple's public keys.
      const decoded = jwt.decode(token); 
      profile = {
        email: decoded.email,
        name: decoded.name || "Apple User",
      };
    } 
    
    else {
      return res.status(400).json({ error: "Unsupported provider" });
    }

    if (!profile?.email) {
      return res.status(400).json({ error: "Email not provided by provider" });
    }

    // Find or create user
    let user = await User.findOne({ email: profile.email });
    if (!user) {
      user = await User.create({
        name: profile.name,
        email: profile.email,
        password: bcrypt.hashSync(jwt.sign({rand: Math.random()}, process.env.JWT_SECRET), 10) // random password placeholder
      });
    }

    // Issue JWT
    const appToken = generateToken(user);
    res.json({ user, token: appToken });

  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Social login failed", details: err.message });
  }
};
