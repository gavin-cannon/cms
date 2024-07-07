const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

// GET all contacts
router.get('/', async(req, res, next) => {

    const contacts = await Contact.find().populate('group').then(contacts => {
        res.status(200).json(
            contacts
        );
    }).catch(error => {
        console.error('Error fetching contacts:', err);
        res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        });

    });
});

// POST a new contact
router.post('/', async(req, res, next) => {
    const maxContactId = sequenceGenerator.nextId('contacts');

    const contact = new Contact({
        id: maxContactId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl,
        group: req.body.group // Assuming group is an array of ObjectId references to other contacts
    });

    try {
        const createdContact = await contact.save();
        res.status(201).json(
            createdContact
        );
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred',
            error: error
        });
    }
});

// PUT update a contact by ID
router.put('/:id', async(req, res, next) => {
    try {
        const contact = await Contact.findOne({ id: req.params.id });

        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found',
                error: { contact: 'Contact not found' }
            });
        }

        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.imageUrl = req.body.imageUrl;
        contact.group = req.body.group; // Assuming group is an array of ObjectId references to other contacts

        const updatedContact = await Contact.updateOne({ id: req.params.id }, contact);
        res.status(204).json({
            message: 'Contact updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred',
            error: error
        });
    }
});

// DELETE a contact by ID
router.delete('/:id', async(req, res, next) => {
    try {
        const contact = await Contact.findOne({ id: req.params.id });

        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found',
                error: { contact: 'Contact not found' }
            });
        }

        await Contact.deleteOne({ id: req.params.id });
        res.status(204).json({
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred',
            error: error
        });
    }
});

module.exports = router;