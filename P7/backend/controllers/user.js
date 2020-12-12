const bcrypt = require('bcrypt')

let sess// global session, NOT recommended

class user {
    constructor(app,db) {
        this.login(app, db)
        this.logout(app, db)
        this.isLoggedIn(app, db)
        this.signup(app, db)
        this.saveImage(app, db)
        this.postComment(app, db)
        this.getComments(app, db)
        this.getAllPosts(app, db)
        this.deleteUser(app, db)
        this.deletePost(app, db)
        this.deleteComment(app, db)
        this.deleteAccount(app, db)
    }

    signup(app, db) {
        app.post('/signup', (req, res) => {
        let id = 1
        let username = req.body.username
        let password = req.body.password

        db.query("SELECT MAX(id) AS UserId FROM Users", function (err, result, fields) {
            id = (result[0].UserId + 1).toString() // Increment last index
        })

        bcrypt.hash(password, 10)
            .then(hash => {
                // Check if user already exist
                db.query("SELECT username FROM Users WHERE username = '"+username+"'", function (err, result, fields) {
                    if (result.length > 0) {
                        return res.status(401).json({error: "A user with this name already exist"})
                    } else {
                        password = hash
                        // Create user in database
                        db.query("INSERT INTO Users (id, username, password) VALUES ('"+id+"', '"+username+"', '"+password+"')", function (err, result, fields) {
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
        let cols = [username] // Check if username exist in db
        db.query('SELECT * FROM Users WHERE username = ? LIMIT 1', cols, function (err, data, fields) {
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


    saveImage(app, db) {
        app.post('/saveImage', (req, res) => {
            let id = 1
            let username = req.body.username
            let image = req.body.image
            let titre = req.body.titre
            let date = new Date()
            date.setDate(date.getDate() + 1);
            let postdate = date.toJSON().slice(0, 10)

            const promise = new Promise ((resolve, reject) => {
                db.query("SELECT MAX(id) AS UserId FROM Gifs", function (err, result, fields) {
                    id = (result[0].UserId + 1).toString() // Increment last index
                    resolve(id)
                })
            })
             promise.then(id => {
                 // Save Gif in database
                db.query("INSERT INTO Gifs (id, username, titre, image, postdate) VALUES ('"+id+"', '"+username+"', '"+titre+"', '"+image+"', '"+postdate+"')", function (err, result, fields) {
                    if (err) {
                        res.json({
                            success: false,
                        })
                    }
                    else {
                        res.json({
                            success: true
                        })
                    }
                    return res
                })
            })
        })
    }

    isLoggedIn(app, db) {
        app.post('/isLoggedIn', (req, res) => {
            if (sess.userID) {
                let cols = [sess.userID]
                const promise = new Promise ((resolve, reject) => {
                        db.query('SELECT * FROM Users WHERE id = ? LIMIT 1', cols, (err, data, fields) => {
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
                console.log("Not logged in")
            }
        })
    }

    getAllPosts(app, db) {
        app.get('/getAllPosts', (req, res) => {
            const promise = new Promise ((resolve, reject) => {
                db.query("SELECT * FROM Gifs", function (err, result, fields) {
                    res.status(200).json({
                        listOfResult: result
                    })
                    resolve(result)
                })
            })
        })
    }

    postComment(app, db) {
        app.post('/postComment', (req, res) => {
            let id = 1
            let username = sess.username
            let comment = req.body.comment
            let publication_id = req.body.publication_id
            let date = new Date()
            date.setDate(date.getDate() + 1);
            let postdate = date.toJSON().slice(0, 10)

            const promise = new Promise ((resolve, reject) => {
                db.query("SELECT MAX(id) AS Id FROM Comments", function (err, result, fields) {
                    id = (result[0].Id + 1).toString() // Increment last index
                    resolve(id)
                })
            })
            promise.then(id => {
            // Save Gif in database
            db.query("INSERT INTO Comments (id, publication_id, username, comment, postdate) VALUES ('"+id+"', '"+publication_id+"', '"+username+"', '"+comment+"', '"+postdate+"')", function (err, result, fields) {
                if (err) throw err
                if (result) {
                    res.json({
                        success: true,
                    })
                    return result
                }
                })
            })
        })
    }

    deleteUser(app, db) {
        app.delete('/deleteUser', (req, res) => {
            let id = req.body.id
            const promise = new Promise ((resolve, reject) => {
                db.query("DELETE FROM Users WHERE id = '"+id+"'", function (err, result, fields) {
                    resolve()
                })
            })
            promise.then(() => {
                console.log("Le compte "+id+" a bien été supprimé.")
            })
        })
    }

    deletePost(app, db) {
        app.delete('/deletePost', (req, res) => {
            let id = req.body.id
            const promise = new Promise ((resolve, reject) => {
                db.query("DELETE FROM Gifs WHERE id = '"+id+"'", function (err, result, fields) {
                    resolve()
                })
            })
            promise.then(() => {
                db.query("DELETE FROM Comments WHERE publication_id = '"+id+"'", function (err, result, fields) {
                    console.log("Le post "+id+" a bien été supprimé.")
                    res.json({
                        success: true
                    })
                    return true
                })
            })
        })
    }

    deleteComment(app, db) {
        app.delete('/deleteComment', (req, res) => {
            let id = req.body.id
            let publication_id  = req.body.publication_id
            const promise = new Promise ((resolve, reject) => {
                db.query("DELETE FROM Comments WHERE id = '"+id+"' AND publication_id = '"+publication_id+"'", function (err, result, fields) {
                    resolve()
                })
            })
            promise.then(() => {
                console.log("Le commentaire "+id+" a bien été supprimé.")
            })
        })
    }

    logout(app, db) {
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

    getComments(app, db) {
        app.post('/getComments', (req, res) => {
            let publication_id = req.body.publication_id
            const promise = new Promise ((resolve, reject) => {
                db.query("SELECT * FROM Comments WHERE publication_id = '"+publication_id+"'", function (err, result, fields) {
                    res.status(200).json({
                        listOfComments: result
                    })
                    resolve(result)
                })
            })
        })
    }

    deleteAccount(app, db) {
            app.delete('/deleteAccount', (req, res) => {
                let username = sess.username
                const promise = new Promise((resolve, reject) => {
                    db.query("DELETE FROM Users WHERE username = '" + username + "'", function (err, result, fields) {
                    })

                    db.query("DELETE FROM Comments WHERE username = '" + username + "'", function (err, result, fields) {
                    })

                    db.query("DELETE FROM Gifs WHERE username = '" + username + "'", function (err, result, fields) {
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
                    console.log("Le compte a bien été supprimé.")
                })
            })
        }

    getNumberComments(app, db) {
        app.post('/getNumberComments', (req, res) => {
            let publication_id = req.body.publication_id
            const promise = new Promise ((resolve, reject) => {
                db.query("SELECT * FROM Comments WHERE publication_id = '"+publication_id+"'", function (err, result, fields) {
                    res.status(200).json({
                        numberOfComments: result.length
                    })
                    resolve(result)
                })
            })
        })
    }

}

module.exports = user