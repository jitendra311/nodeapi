const router = require("express").Router();
const User = require('../models/User')
const multer = require('multer')


router.get('/list', (req, res) => {


  User.find()
    .then(users => res.json(users))
    .catch(err => console.log(err))
})

router.get('/pages', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const totalDocuments = await User.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);

    const pages = await User.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      pages,
      currentPage: page,
      totalPages
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pages' });
  }
});

router.get('/data/:id', async (req, res) => {
  const products = await User.findById({ _id: req.params.id })
  res.send(products)

})

router.get('/see', async function (req, res) {
  const searchTerm = req.query.q;
  if (!searchTerm) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  try {
    const searchResults = await User.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } }
      ]
    });

    res.json(searchResults);
  } catch (error) {
    console.error('Error searching in MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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



router.post('/upload', upload.single('image', 'screenshot'), async (req, res) => {
  const newUser = new User({
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


module.exports = router