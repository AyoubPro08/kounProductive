const Journal = require('../models/JournalEntry.js');

const getJournalEntries = async (req, res) => {
    try {
        const journalEntries = await Journal.find({})
        res.status(200).json(journalEntries)
    } catch (error) {
        res.status(500).json({msg:error})
    }
}
const createJournalEntry = async (req, res) => {
    const {content, date} = req.body;
    try {
        const newJournalEntry = await Journal.create({
            content:content,
            date:date
        })
        res.status(201).json(newJournalEntry)
    } catch (error) {
        res.status(500).json({msg:error})
    }
}
const deleteJournalEntry = async (req, res) => {
    const {id} = req.params;
    try {
        const deletedJournalEntry = await Journal.findByIdAndDelete({_id:id});
        if (!deletedJournalEntry) return res.status(404).json({msg:"Task not found!"})
        res.status(200).json(deletedJournalEntry)
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports = {
    getJournalEntries,
    createJournalEntry,
    deleteJournalEntry
}