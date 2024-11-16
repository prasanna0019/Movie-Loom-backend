
import UserDb from '../Models/UserModels.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const Register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password) {
            return res.status(400).json({
                message: "Invalid data",
                success: false
            })
        }

        const User = await UserDb.findOne({ email });
        if (User) {
            return res.status(400).json({
                message: "Email is already Used",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserDb({
            fullname,
            email,
            password: hashedPassword

        })


        await newUser.save();
        const token = await jwt.sign({ id: newUser._id, }, process.env.JWT_SECRETE);

        res.cookie("jwt", token).status(200).json({
            message: "Account Created Successfully",
            success: true,
            user: newUser
        })

    } catch (error) {
        console.log(error);

    }

}

export const Login = async (req, res) => {

    const { email, password } = req.body;
    try {

        if (!email || !password) {
            return res.status(400).json({
                message: "Invalid data",
                success: false
            })
        }
        const user = await UserDb.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User Not Found",
                success: false
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Password Do Not Match",
                success: false,


            })

        }

        const token = jwt.sign({ id: user._id, }, process.env.JWT_SECRETE);

        return res.cookie("jwt", token, { httpOnly: true }).status(200).json({
            message: `Welcome Back ${user.fullname}`,
            success: true,
            user
        })

    } catch (error) {
        console.log(error);

    }

}

export const LogOut = (req, res) => {
    return res.status(200).cookie("jwt", "", { expiresIn: new Date(Date.now()), httpOnly: true }).json({
        message: "User logged Out",
        success: true
    })

}