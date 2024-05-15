const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        requied: true,
    },
    color: {
        type: String,
        
    },
    icon: {
        type: String,
        
    }

})

categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtuals: true,
});

exports.Category = mongoose.model('Category', categorySchema);