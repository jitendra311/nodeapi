const routers = require("express").Router();
const latest = require('../models/Latest')
const multer = require('multer');

routers.get('/list', (req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => console.log(err))
  })

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + ".jpg");
        }

    })
})



routers.post('/upload', upload.single('image'), async (req, res) => {
    const newUser = new latest({
        name: req.body.name,
        tittle: req.body.tittle,
        image: req.file.filename,
        fullname: req.body.fullname,
        langauge: req.body.langauge,
        release: req.body.release,
        size: req.body.size,
        quality: req.body.quality,
        format: req.body.format,
        storyline: req.body.storyline,
        screenshot: req.body.fieldname,
        downlink: req.body.downlink,
        url: req.body.url

    });
    console.log("success")
    try {

        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = routers