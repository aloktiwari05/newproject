import cookie from 'cookie-parser'
import jwt from 'jsonwebtoken'
import db from '../config/db.js'

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15min' })
}

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
}

const saveRefreshToken = async (userId, token) => {
        const response = await db.query('UPDATE users SET refresh_token = ($1) WHERE id = ($2) RETURNING id, username, email, refresh_token', [token, userId])
        return response.rows[0]
}

const setRefreshTokenCookie = (res, refreshToken) => {
    return res.cookie('refreshToken',refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
    })
}

export {
    generateAccessToken,
    generateRefreshToken,
    saveRefreshToken,
    setRefreshTokenCookie,
}