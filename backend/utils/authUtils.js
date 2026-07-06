import cookie from 'cookie-parser'
import jwt from 'jsonwebtoken'
import db from '../config/db.js'

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15min' })
}

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

const saveRefreshToken = async (userId, token) => {
        await db.query('UPDATE users SET refresh_token = ($1) WHERE id = ($2)', [token, userId])
}

// export const verifyToken = (token) => {

// }

const setRefreshTokenCookie = (res, refreshToken) => {
    return res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
    })
}

export {
    generateAccessToken,
    generateRefreshToken,
    saveRefreshToken,
    setRefreshTokenCookie,
}