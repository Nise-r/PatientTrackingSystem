const imageRouter = require('express').Router()
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const Image = require('../models/image')
const User = require('../models/user')
const axios = require('axios')
const fs = require('fs')

// Define storage configuration for multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'images')  // Specify the directory for storing images
  },
  filename: function(req, file, cb) {
    // Generate a unique filename using uuid and timestamp
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
  }
})

// File filter to allow only certain file types (PNG, JPG, JPEG)
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg']
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

// Set up the multer upload middleware
let upload = multer({ storage: storage, fileFilter: fileFilter , dest: 'uploads/' })


imageRouter.post('/add',upload.single('photo'),async (req, res)=>{
  const user =await User.findOne({'username':req.body.username})
  // console.log(user._id)
  const photo = req.file.filename  // Get the uploaded file's filename

  const today = new Date()
  const curr = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`

  // console.log(curr)

  const newImageData = {
    user:user._id,
    date:curr,
    name:req.body.name,
    photo
  }

  const newImage = new Image(newImageData)

  newImage.save()
    .then(() => res.json("Image Added"))
    .catch(err => res.status(400).json('Error: ' + err))
})


imageRouter.get('/rec/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
    if (!user) return res.status(404).json('User not found')

    const images = await Image.find({ user: user._id })

    // Send image metadata, including URLs
    const imageUrls = images.map(img => ({
      id: img._id,
      date:img.date,
      name:img.name,
      url: `${req.protocol}://${req.get('host')}/images/${img.photo}`
    }))
    // console.log(imageUrls)
    res.json(imageUrls)
  } catch (err) {
    res.status(500).json('Error: ' + err)
  }
})

// const upload = multer()
const baseUrl = 'https://api.groq.com/openai/v1/chat/completions'
// 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
imageRouter.post('/analyze-image', upload.single('image'), async (req, res) => {
    // const imagePath = req.file.path
    // const imageBuffer = fs.readFileSync(imagePath)
    const imageUrl = req.body.image
    // console.log(req.body.image)

    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    try {
        const filePath = path.join(__dirname, '../', imageUrl.replace('http://localhost:3001', ''))
        console.log(filePath)
        const imageBuffer = fs.readFileSync(filePath)
        const base64Image = imageBuffer.toString('base64')

        if (!fs.existsSync(filePath)) {
          return res.status(404).json({ error: 'Image not found on server' });
        }

        // const imageBuffer = fs.readFileSync(filePath)
        // console.log(imageBuffer)
        // console.log("hello")
        const response = await axios.post(
            baseUrl,
            {
                model: "llama-3.2-11b-vision-preview",
                messages:[
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": "You are medical data analyser.Extract important information from this report."},
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": `data:image/jpeg;base64,${base64Image}`,
                                },
                            },
                        ],
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer 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`,
                    'Content-Type': 'application/json',
                }
            }
        )
        console.log(response.data.choices[0].message.content)

        // fs.unlinkSync(imagePath)

        res.json(response.data)
    } catch (error) {
        // console.error('Error interacting with Groq API:', error)

        // fs.unlinkSync(imagePath)

        res.status(500).json({ error: 'Failed to process the image. Please try again.' })
    }
})
// const response = await axios.post(
//             baseUrl,
//             {
//                 model: "llama-3.2-11b-vision-preview",
//                 messages: [
//                     {
//                         role: "user",
//                         content: "What's in this image?"
//                     },
//                     {
//                         role: "user",
//                         content: "https://upload.wikimedia.org/wikipedia/commons/f/f2/LPU-v1-die.jpg"
//                     }
//                 ]
//             },
//             {
//                 headers: {
//                     'Authorization': `Bearer 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`,
//                     'Content-Type': 'application/json',
//                 }
//             }
//         )


module.exports = imageRouter
