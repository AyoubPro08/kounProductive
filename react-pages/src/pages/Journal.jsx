import { useState, useCallback } from "react"
import DatePicker from "react-datepicker"
import JournalEntry from "../components/JournalEntry";
import JournalEntryPopUp from '../components/JournalEntryPopUp.jsx';
import "react-datepicker/dist/react-datepicker.css";
import "../components/css/journal.css"


function Journal(){
    
    const [journalDateValue, setJournalDateValue] = useState();
    const [checkedEntries, setCheckedEntries] = useState([])
    const [journalData, setJournalData] = useState([
        {
            content:"I did this and this.",
            id:crypto.randomUUID(),
            date: "Sun, Aug 10"
        },
        {
            content:"I went to this place and that place on that day.",
            id:crypto.randomUUID(),
            date: "Sat, Aug 09"
        },
        {
            content:"I ate this that time, and I drank this at that other time.",
            id:crypto.randomUUID(),
            date: "Sun, Aug 03"
        }
    ])

    const [isAddingEntry, setIsAddingEntry] = useState(false)

    const handleDateChange = (date) => {
        setJournalDateValue(date)
    }

    const handleClose = useCallback(() => {
        setIsAddingEntry(false);
    }, []);

    const addEntry = (content, date) => {
        const newEntry = {
            content:content,
            id:crypto.randomUUID(),
            date:date || new Date().toLocaleString()
        }
        setJournalData([...journalData, newEntry])
    }

    const handleEntryCheck = (entryId, isChecked) => {
        if (isChecked) {
            setCheckedEntries([...checkedEntries, entryId]);
        } else {
            setCheckedEntries(checkedEntries.filter(id => id !== entryId));
        }
    };

    const deleteEntries = () => {
        setJournalData(prev => prev.filter(entry => !checkedEntries.includes(entry.id)));
        setCheckedEntries([]);
    }

    const formatDateString = (dateString) => {
        // Handle when journalDateValue is a Date object from DatePicker
        if (dateString instanceof Date) {
            return dateString.toLocaleDateString('en-US', {
                weekday: 'short',
                day: '2-digit',
                month: 'short',
            }); // Remove comma to match your format
        }
        
        // Handle when it's your custom string format like "Sun, Aug 10"
        if (typeof dateString === 'string') {
            return dateString; // Return as is since it's already formatted
        }
        
        // Default case
        return new Date().toLocaleDateString('en-US', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
        }).replace(',', '');
    };

    // ✅ GOOD - Calculate filtered entries BEFORE rendering
    const filteredEntries = journalDateValue 
        ? journalData.filter(entry => 
            formatDateString(journalDateValue) === formatDateString(entry.date)
          )
        : journalData;

    // ✅ GOOD - Calculate if there are matches BEFORE rendering
    const hasMatches = !journalDateValue || filteredEntries.length > 0;

    return (
        <div className="journal-container">
            <div className="buttons-top">
                <button className="new-button"
                        onClick={() => setIsAddingEntry(true)}>
                    New
                </button>
                <button className="delete-button"
                        onClick={() => deleteEntries()}>
                    Delete
                </button>
            </div>
            <div className="journal">
                <div className="journal-entries">
                    {journalDateValue && 
                        <button className="reset-button"
                                onClick={() => {setJournalDateValue(null)}}>
                                    Reset
                        </button>}
                    {filteredEntries.map((journalEntry) => (
                        <JournalEntry
                            key={journalEntry.id}
                            id={journalEntry.id}
                            content={journalEntry.content}
                            date={journalEntry.date}
                            onCheckChange={handleEntryCheck}
                        />
                    ))}
                    
                    {/* ✅ GOOD - Show message when no matches */}
                    {!hasMatches && (
                        <div>No entries found!!</div>
                    )}
                    
                    {isAddingEntry && 
                        <JournalEntryPopUp 
                            closePopUp={handleClose}
                            addJournalEntry={addEntry}
                        />}
                </div>
                <div className="calendar">
                    <p>Calendar</p>
                    <DatePicker
                        selected={journalDateValue}
                        onChange={handleDateChange}
                        isClearable
                        inline
                        placeholderText="Select Date"
                    />
                </div>
            </div>
        </div>
    )
}

export default Journal