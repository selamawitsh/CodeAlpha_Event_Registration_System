import UserModel from "../model/User.model.js";
import bycrpt from "bcryptjs";
import jwt from 'jsonwebtoken';

//Register a new user
const registerUser = async (req, res)=>{
    try {
        const {name, email,password, role} = req.body;

        const existingUser = await UserModel.findOne({email: email});
        if (existingUser){
            return res.status(400).json({message: "User already exists"});
        }
        const hashedPassword = bycrpt.hashSync(password, 10);

        const newUser = new UserModel({
            name: name,
            email:email,
            password: hashedPassword,
            role: role
        })
        await newUser.save()
        res.status(201).json({message: "User registered successfully", user: newUser});
        
    } catch (error) {
        console.error("error in registering user", error);
        res.status(500).json({message: "internal server error"})
    }
}

//login user
const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordValid = bycrpt.compareSync(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // ✅ SEND FULL USER INFO + TOKEN
    res.status(200).json({
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role, // ✅ so frontend can detect admin
      token: token,
    });
  } catch (error) {
    console.error("Error in logging in user", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("error in fetching users", error);
        res.status(500).json({message: "internal server error"});
    }
}

export {registerUser, LoginUser, getAllUsers};