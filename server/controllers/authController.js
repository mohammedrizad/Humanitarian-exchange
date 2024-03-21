const User = require('../models/user');
const { hashPassword, comparePassword}= require('../helpers/auth')

const test = (req, res) => {
  res.json('test is working');
};

const registerUser = async (req, res) => {
  try {
    const {
      ngoName,
      firstName,
      city,
      state,
      experience,
      address,
      postalCode,
      phoneNumber,
      email,
      password,
      documents,
    } = req.body;

    // Check if required fields are provided
    if (!firstName || !email || !password) {
      return res.status(400).json({
        error: 'firstName, email, and password are required fields',
      });
    }

    // Check if the email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: 'Email is already taken',
      });
    }

    // Check if documents field is provided in the expected format
    if (documents && (typeof documents !== 'object' || !documents.data || !documents.contentType)) {
      return res.status(400).json({
        error: 'Invalid format for the documents field',
      });
    }

    const hashedPassword = await hashPassword(password);

    // Create a new user
    const user = await User.create({
      ngoName,
      firstName,
      city,
      state,
      experience,
      address,
      postalCode,
      phoneNumber,
      email,
      password:hashedPassword,
      documents,
    });

    // Send the created user as a response
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        error: 'Validation failed. Check your input data.',
        validationErrors,
      });
    }

    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: 'No user found',
      });
    }

    // Check if passwords match
    const match = await comparePassword(password, user.password);
    if (match) {
      return res.status(200).json({
        message: 'Login Successful!!',
      });
    } else {
      return res.status(401).json({
        error: 'Password incorrect',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};


module.exports = {
  test,
  registerUser,
  loginUser,
};
