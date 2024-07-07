const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

// GET all messages
router.get('/', async(req, res, next) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        });
    }
});

// POST a new message
router.post('/', async(req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId('messages');

    const message = new Message({
        id: maxMessageId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender // Assuming sender is the ObjectId of a Contact
    });

    try {
        const createdMessage = await message.save();
        res.status(201).json(
            createdMessage
        );
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred',
            error: error
        });
    }
});

// PUT update a message by ID
router.put('/:id', async(req, res, next) => {
    try {
        const message = await Message.findOne({ id: req.params.id });

        if (!message) {
            return res.status(404).json({
                message: 'Message not found',
                error: { message: 'Message not found' }
            });
        }

        message.subject = req.body.subject;
        message.msgText = req.body.msgText;
        message.sender = req.body.sender; // Assuming sender is the ObjectId of a Contact

        const updatedMessage = await Message.updateOne({ id: req.params.id }, message);
        res.status(204).json({
            message: 'Message updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred',
            error: error
        });
    }
});

// DELETE a message by ID
router.delete('/:id', async(req, res, next) => {
    try {
        const message = await Message.findOne({ id: req.params.id });

        if (!message) {
            return res.status(404).json({
                message: 'Message not found',
                error: { message: 'Message not found' }
            });
        }

        await Message.deleteOne({ id: req.params.id });
        res.status(204).json({
            message: 'Message deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred',
            error: error
        });
    }
});

module.exports = router;