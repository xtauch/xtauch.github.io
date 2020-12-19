const mysql = require('mysql')
const auth = require('../middleware/auth')

class Posts {
    constructor(app,db) {
        this.saveImage(app, db)
        this.getAllPosts(app, db)
        this.deletePost(app, db)
    }

    saveImage(app, db) {
        app.post('/saveImage', (req, res) => {
            let id = 1
            let username = req.body.username
            let image = req.body.image
            let titre = req.body.titre
            titre = titre.replace(/'/g,"''")
            let date = new Date()
            date.setDate(date.getDate() + 1);
            let postdate = date.toJSON().slice(0, 10)

            const promise = new Promise ((resolve) => {
                let sql = "SELECT MAX(??) AS UserId FROM ??"
                let inserts = ['id','Gifs']
                sql = mysql.format(sql, inserts)
                db.query(sql, function (err, result) {
                    id = (result[0].UserId + 1).toString() // Increment last index
                    resolve(id)
                })
            })
            promise.then(id => {
                // Save Gif in database
                let sql = "INSERT INTO ?? (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)";
                let inserts = ['Gifs','id','username','titre','image','postdate',id,username,titre,image,postdate]
                sql = mysql.format(sql, inserts);
                db.query(sql, function (err) {
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

    getAllPosts(app, db) {
        app.get('/getAllPosts', (req, res) => {
            const promise = new Promise ((resolve) => {
                let sql = "SELECT * FROM ??";
                let inserts = ['Gifs']
                sql = mysql.format(sql, inserts);
                db.query(sql, function (err, result) {
                    res.status(200).json({
                        listOfResult: result
                    })
                    resolve(result)
                })
            })
        })
    }

    deletePost(app, db) {
        app.delete('/deletePost', (req, res, next) => {
            let id = req.body.id
            const promise = new Promise ((resolve) => {
                let sql = "DELETE FROM ?? WHERE ?? = ?";
                let inserts = ['Gifs', 'id', id]
                sql = mysql.format(sql, inserts);
                db.query(sql, function () {
                    resolve()
                })
            })
            promise.then(() => {
                let sql = "DELETE FROM ?? WHERE ?? = ?";
                let inserts = ['Comments', 'publication_id', id]
                sql = mysql.format(sql, inserts);
                db.query(sql, function () {
                    res.json({
                        success: true
                    })
                    next()
                    return true
                })
            })
        })
    }
}

module.exports = Posts