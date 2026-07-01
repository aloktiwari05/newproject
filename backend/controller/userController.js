import db from '../config/db.js'
import bcrypt from 'bcrypt'

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS)

// Login POST route

export const login = async (req, res) => {
    const formData = req.body;
    try {
        const result = await db.query('SELECT password_hash FROM users WHERE email = ($1) or username = ($2)', [formData.email, formData.name])

        if (result.rows.length == 0) {
            return res.status(401).json({ message: "Invalid email/username or password."})
        }

        const hashedPassword = result.rows[0].password_hash
        const isMatch = await bcrypt.compare(formData.password, hashedPassword)

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email/username or password."})
        }
        else {
            return res.status(200).json({ message: 'User Logged In Successfully !' })
        }
    }
    catch (err) {
        return res.status(500).json({message: 'Internal Server Error !'})
    }
}

// Register POST route

export const signup = async (req, res) => {
    const formData = req.body;

    if (formData.password.length < 8) {
        return res.status(400).json({ error: "Password should be minimum of 8 characters" })
    }
    try {
        const hash = await bcrypt.hash(formData.password, saltRounds)

        const response = await db.query('INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)  RETURNING id, username, email', [formData.username, formData.email, hash])
        res.status(201).json({ message: 'User Created Successfully', user: response.rows[0] })
    }
    catch (err) {

        console.log(err)
        if (err.code == '23505') {

            if (err.constraint == 'users_username_key') {
                return res.status(409).json({ error: 'Username already exists !' })
            }

            if (err.constraint == 'users_email_key') {
                return res.status(409).json({ error: 'Email already exists !' })
            }

        }

        return res.status(500).json({ message: 'Internal Server Error !' })
    }
}