const { default: mongoose } = require("mongoose");

const blogSchema = new mongoose.Schema({

    title : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('blog', blogSchema);