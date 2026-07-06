import db from '../config/db.js'
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken, saveRefreshToken, setRefreshTokenCookie } from '../utils/authUtils.js'

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS)

// Login POST route

const login = async (req, res) => {
    const formData = req.body;

    try {
        const result = await db.query('SELECT id, email, username, password_hash FROM users WHERE email = ($1) or username = ($1)', [formData.identifier])

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid email/username or password." })
        }

        const { id, username, email, password_hash } = { ...result.rows[0] }
        const isMatch = await bcrypt.compare(formData.password, password_hash)

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email/username or password." })
        }
        else {
            const accessToken = generateAccessToken(id)
            const refreshToken = generateRefreshToken(id)
            await saveRefreshToken(id, refreshToken)
            setRefreshTokenCookie(res, refreshToken)
            return res.status(201).json({ message: 'User Logged In Successfully', user: {id, username, email}, accessToken })
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal Server Error !' })
    }
}

// Register POST route

const signup = async (req, res) => {

    if (!req.body) {
        return res.status(400).json({ error: 'Form Data is REQUIRED !' })
    }

    const formData = req.body;

    if (formData.password.length < 8) {
        return res.status(400).json({ error: "Password should be minimum of 8 characters" })
    }
    try {
        const hash = await bcrypt.hash(formData.password, saltRounds)

        const response = await db.query('INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)  RETURNING id, username, email', [formData.username, formData.email, hash])

        const accessToken = generateAccessToken(response.rows[0].id)
        const refreshToken = generateRefreshToken(response.rows[0].id)
        await saveRefreshToken(response.rows[0].id, refreshToken)
        setRefreshTokenCookie(res, refreshToken)

        res.status(201).json({ message: 'User Created Successfully', user: response.rows[0], accessToken })
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

export {
    login,
    signup,
}