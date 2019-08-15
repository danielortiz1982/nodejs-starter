const mongoose = require('mongoose')

const Pages = mongoose.model('Pages', {
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        trim: true
    },
    keywords: {
        type: Array
    },
    featuredImg: {
        type: String,
        trim: true
    }
})
module.exports = Pages