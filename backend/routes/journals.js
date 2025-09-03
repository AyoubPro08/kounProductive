const express = require('express');
const router = express.Router();

const {
    getJournalEntries,
    createJournalEntry,
    deleteJournalEntry
} = require('../controllers/journals.js')

router.get('/', getJournalEntries)

router.post('/', createJournalEntry)

router.delete('/:id', deleteJournalEntry)

module.exports = router;