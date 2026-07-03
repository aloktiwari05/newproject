import cookie from 'cookie-parser'
import jwt from 'jsonwebtoken'

export const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15min' })
}

export const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export const verifyToken = (token) => {

}

export const setRefreshtTokenCookie = (res, refreshToken) => {
    return res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
    })
}