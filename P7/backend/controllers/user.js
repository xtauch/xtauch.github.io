const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mysql = require('mysql')

//Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mopomo91',
    database: 'p7'
})
    .then(function (res){
        res.connect()
            .then(() => console.log('Connexion à MySQL réussie !'))
            .catch(() => console.log('Connexion à MySQL échouée !'))
    })


exports.signup = (req, res, next) => {
    let username = req.body.username
    let password = req.body.password
    bcrypt.hash(password, 10)
        .then(hash => {
            // Check if user already exist
            db.query("SELECT username FROM Users", function (err, result, fields) {
                if (err) throw err
                console.log(result)
            })

            // Create user in database
            let values = [username, hash]
            db.query("INSERT INTO Users (username, password) VALUES ?",values, function (err, result, fields) {
                if (err) throw err
                console.log(result)
            })
        })
}

/*
exports.login = (req, res, next) => {
    let username = req.body.username
    let password = req.body.password
    username = username.toLowerCase()

    let cols = [username] // Check if username exist in db
    db.query('SELECT * FROM Users WHERE username = ? LIMIT 1', cols, (err, data, fields))
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(result) {
            if (err) {
                result.success = false
                result.msg = 'An error occured, please try again'
                return
            }
        })

            bcrypt.compare(password, data.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' })
                    }
                    res.status(200).json({
                        userId: data.id,
                        token: jwt.sign(
                            { userId: data.id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}




exports.logout = (req, res, next) => {

    if (req.session.userID) {
        req.session.destroy()
        req.json({
            success: true
        })
        return true
    }
    else {
        res.json({
            success: false
        })
        return false
    }
}
*/