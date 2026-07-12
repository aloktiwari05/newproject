import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized User !' })
    }
    const token = authHeader.split(' ')[1];

    try {

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        console.log(decoded)
        req.user = decoded
        next()

    }
    catch (err) {

        if(err.name === "TokenExpiredError") 
            {
            return res.status(401).json({message: err.name});
        }

        return res.status(401).json({message: "Invalid token"});
    }

}

export {
    auth,
}