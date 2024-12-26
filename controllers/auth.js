const user = require("../models/user");
const bcrypt = require("bcryptjs");
const sendEmail = require("../controllers/emailService");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(email);
  // console.log(password);
  // console.log(name);
  if (!name || !email || !password) {
    return res.status(400).json({ message: "all field require" });
  }
  try {
    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    // console.log(hashPassword);
    const newUser = new user({ name, email, password: hashPassword });

    await newUser.save();

    const confirmationToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    // Create Confirmation Link
    const confirmationLink = `http://localhost:3000/api/confirm-email/${confirmationToken}`;

    // Email Content
    const emailContent = `
   <h1>Welcome to Our Service, ${name}!</h1>
   <p>Thank you for registering. Please confirm your email address by clicking the link below:</p>
   <a href="${confirmationLink}">Confirm Email</a>
   <p>This link will expire in 24 hours. If you did not create an account, please ignore this email.</p>
 `;

    await sendEmail(email, "Email Confirmation", emailContent);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", err: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body; //fetching email & password fcrom request made by user
  // console.log("hello", password);
  if (!email || !password) {
    return res.status(400).json({ message: "all fields require" }); //checking the email and password exist or not
  }

  try {
    const newuser = await user.findOne({ email }); // checking email exist in DB

    if (!email) {
      return res.status(401).json({ message: "user not available" });
    }
    // console.log("hiiiiii", newuser.password);
    const isMatch = await bcrypt.compare(password, newuser.password); //checking password entered by user

    if (!isMatch) {
      return res.status(401).json({ message: "invalid password" }); //if password is not matched return error
    }

    const token = jwt.sign(
      // creatinng Json web token
      { userId: newuser._id }, //payload
      process.env.JWT_SECRET_KEY, //signature
      { expiresIn: "1h" } // setting token expiry
    );

    res.json({ token });
  } catch (error) {
    console.error("error in login", error.message);
    res.status(500).json({ message: "server error" });
  }
};

exports.confirmEmail = async (req, res) => {
  const { token } = req.params; // Extract token from the confirmation link
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.userId;
    console.log("hi", userId);

    // Find the user and update their email status
    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { isEmailConfirmed: true },
      { new: true }
    );
    console.log("hii agin", updatedUser);

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found or already verified" });
    }

    res.status(200).json({ message: "Email confirmed successfully!" });
  } catch (error) {
    console.error("Error confirming email:", error.message);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
