const {Comment} = require('../models/comment');
const express = require('express');
const router = express.Router();
const {Product} = require('../models/product');
const {user} = require('../models/user');
const { spawn } = require('child_process');
const path = require('path');

function categorizeComment(content, callback) {
    const scriptPath = path.resolve(__dirname, '../helpers/sentimentanalys.py');
    const process = spawn('python', [scriptPath, content]);

    let result = '';
    
    process.stdout.on('data', (data) => {
        result += data.toString();
    });

    process.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    process.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        callback(result.trim());
    });
}

// Example usage:
categorizeComment('Bad', (category) => {
    console.log('Comment category:', category);  // Should print the category 'good', 'neutral', or 'bad'
});

// Get All Comments for a Product
router.get('/product/:productId', async (req, res) => {
    try {
        const comments = await Comment.find({ product: req.params.productId })
                                      .populate('user', 'name profilePhoto ')
                                      .sort('-dateCreated');

        if (!comments || comments.length === 0) {
            console.log(`No comments found for product ID: ${req.params.productId}`);
            return res.status(404).json({ success: false, message: "No comments found" });
        }

        console.log(`Fetched ${comments.length} comments for product ID: ${req.params.productId}`);
        res.status(200).json({ success: true, data: comments });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Get all comments by a user
router.get('/user/:userId', async (req, res) => {
    try {
      const comments = await Comment.find({ 'user': req.params.userId })
      .populate('product', 'name')
      .sort('-dateCreated');
      if (!comments || comments.length === 0) {
        console.log(`No comments found for user ID: ${req.params.userId}`);
        return res.status(404).json({ success: false, message: "No comments found" });
      }
      console.log(`Fetched ${comments.length} comments for user ID: ${req.params.userId}`);
      res.status(200).json({ success: true, data: comments });
    } catch (error) {
      console.error('Error fetching user comments:', error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });

//Add a new Comment to a product
router.post('/', async (req, res) => {
    const { userId, productId, content } = req.body;
    categorizeComment(content, async (category) => {
        try {
            let comment = new Comment({
                user: userId,
                product: productId,
                content: content,
                category: category
            });
            comment = await comment.save();
            if (!comment) {
                return res.status(400).send("The comment cannot be created!");
            }
            res.status(201).json({ success: true, data: comment });
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    });
});

//Update a Comment
router.put('/:id', async (req, res) => {
    try {
        const { content } = req.body;

        // Find the comment by ID and update its content
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            { content: content },
            { new: true } // This option returns the updated document
        );

        if (!updatedComment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        res.status(200).json({ success: true, data: updatedComment });
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

//Delete a comment
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if(!comment) {
            return res.status(404).json({success: false, message: "Comment not found"});
        }
        res.status(200).json({success: true, message: "The comment is deleted successfull"});
    } catch (error) {
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
});

// Get Comment Count for a Product
router.get('/product/:productId/count', async (req, res) => {
    try {
        const commentCount = await Comment.countDocuments({ product: req.params.productId });

        console.log(`Fetched comment count for product ID: ${req.params.productId}`);
        res.status(200).json({ success: true, count: commentCount });
    } catch (error) {
        console.error('Error fetching comment count:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


module.exports = router;