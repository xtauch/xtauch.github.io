const bcrypt = require('bcrypt')
const mysql = require('mysql')

let sess// global session

class user {
    constructor(app,db) {
        this.login(app, db)
        this.logout(app)
        this.isLoggedIn(app, db)
        this.signup(app, db)
        this.deleteUser(app, db)
        this.deleteAccount(app, db)
    }

    signup(app, db) {
        app.post('/signup', (req, res) => {
        let id = 1
        let username = req.body.username
        let password = req.body.password

        let sql = "SELECT MAX(??) AS UserId FROM ??"
        let inserts = ['id', 'Users']
        sql = mysql.format(sql, inserts)
        db.query(sql, function (err, result) {
            id = (result[0].UserId + 1).toString() // Increment last index
        })

        bcrypt.hash(password, 10)
            .then(hash => {
                // Check if user already exist
                let sql = "SELECT ?? FROM ?? WHERE ?? = ?"
                let inserts = ['username', 'Users', 'username', username]
                sql = mysql.format(sql, inserts)
                db.query(sql, function (err, result) {
                    if (result.length > 0) {
                        return res.status(401).json({error: "A user with this name already exist"})
                    } else {
                        password = hash
                        // Create user in database
                        let sql = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)"
                        let inserts = ['Users', 'id', 'username', 'password', id, username, password]
                        sql = mysql.format(sql, inserts)
                        db.query(sql, function (err) {
                            if (err) throw err
                            res.json({
                                success: true,
                            })
                        })
                    }
                })
            })
        })
    }


    login(app, db) {
        app.post('/login', (req, res) => {
        let username = req.body.username
        let password = req.body.password
        username = username.toLowerCase()
        let sql = "SELECT * FROM ?? WHERE ?? = ? LIMIT 1"
        let inserts = ['Users', 'username', username]
        sql = mysql.format(sql, inserts)
        db.query(sql, function (err, data) {
            if (data.length > 0) {
                bcrypt.compare(password, data[0].password, (bcryptErr, verified) => {
                    if (!verified) {
                        return res.status(401).json({error: 'Mot de passe incorrect !'})
                    }
                    sess = req.session
                    sess.userID = data[0].id
                    sess.username = data[0].username
                    res.json({
                        success: true,
                        username: data[0].username
                    })
                })
            } else {
                return res.status(401).json({error: 'Mot de passe incorrect !'})
            }
            })
        })
    }

    isLoggedIn(app, db) {
        app.post('/isLoggedIn', (req, res) => {
            if (sess.userID) {
                const promise = new Promise ((resolve) => {
                        let sql = "SELECT * FROM ?? WHERE ?? = ? LIMIT 1"
                        let inserts = ['Users', 'id', sess.userID]
                        sql = mysql.format(sql, inserts)
                        db.query(sql, (err, data) => {
                            if (data && data.length === 1) {
                                res.json({
                                    success: true,
                                    username: data[0].username
                                })
                                return true
                            } else {
                                res.json({
                                    success: false
                                })
                            }
                            resolve(data)
                        })
                    })
            } else {
                res.json({
                    success: false
                })
            }
        })
    }

    deleteUser(app, db) {
        app.delete('/deleteUser', (req) => {
            let id = req.body.id
            const promise = new Promise ((resolve) => {
                let sql = "DELETE FROM ?? WHERE ?? = ?"
                let inserts = ['Users', 'id', id]
                sql = mysql.format(sql, inserts)
                db.query(sql, function () {
                    resolve()
                })
            })
            promise.then(() => {
                console.log("Le compte "+id+" a bien été supprimé.")
            })
        })
    }

    logout(app) {
        app.post('/logout', (req, res) => {
            if (sess.userID) {
                sess.destroy()
                sess = null
                res.json({
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
        })
    }

    deleteAccount(app, db) {
            app.delete('/deleteAccount', (req, res) => {
                let username = sess.username
                const promise = new Promise((resolve) => {
                    let sql = "DELETE FROM ?? WHERE ?? = ?"
                    let inserts = ['Users', 'username', username]
                    sql = mysql.format(sql, inserts)
                    db.query(sql, function (err, result, fields) {
                    })

                    sql = "DELETE FROM ?? WHERE ?? = ?"
                    inserts = ['Comments', 'username', username]
                    sql = mysql.format(sql, inserts)
                    db.query(sql, function (err, result, fields) {
                    })

                    sql = "DELETE FROM ?? WHERE ?? = ?"
                    inserts = ['Gifs', 'username', username]
                    sql = mysql.format(sql, inserts)
                    db.query(sql, function (err, result, fields) {
                    })

                    resolve()
                })
                promise.then(() => {
                    if (sess.userID) {
                        sess.destroy()
                        res.json({
                            success: true
                        })
                    } else {
                        res.json({
                            success: false
                        })
                    }
                })
            })
        }

}

module.exports = user