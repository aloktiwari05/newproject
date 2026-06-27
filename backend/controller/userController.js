import db from '../config/db.js'

export const login = async (req, res) => {
    res.json({ message: "You are on login post route" })
}

export const signup = async (req, res) => {
    const formData = req.body;

    if (formData.password.length < 8) {
        res.json({ error: "Password should be minimum of 8 characters" })
    }
    else {
        try {
            const user = await db.query('SELECT * FROM users where username= $1 or email=$2', [formData.username, formData.email]);
            const response = await db.query('INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)  RETURNING (id, username, email)', [formData.username, formData.email, formData.password])
            console.log(response)
        }
        catch (err) {
    console.log(err)
}
    }

    // try{
    //     const response = await db.query('SELECT * FROM users WHERE email=$1', [formData.email])
    //     if(res.rows.length > 0){

    //     }
    // }catch(err){
    //     console.log(err)
    // }

}