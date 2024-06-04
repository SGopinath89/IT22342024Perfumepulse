const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['good', 'neutral', 'bad'],
        default: 'neutral'
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }
});

exports.Comment = mongoose.model('Comment',commentSchema);
exports.commentSchema = commentSchema;