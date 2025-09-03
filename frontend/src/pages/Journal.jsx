import axios from 'axios';
import { useState, useCallback, useEffect } from "react"
import DatePicker from "react-datepicker"
import JournalEntry from "../components/JournalEntry";
import JournalEntryPopUp from '../components/JournalEntryPopUp.jsx';
import "react-datepicker/dist/react-datepicker.css";
import "../components/css/journal.css"


async function getJournalEntries() {
    try {
        const response = await axios.get('/journal')
        return response.data
    } catch (error) {
        console.log(error);
        return [];
    }
}

function Journal(){
    
    const [journalDateValue, setJournalDateValue] = useState();
    const [checkedEntries, setCheckedEntries] = useState([])
    const [journalData, setJournalData] = useState([])

    useEffect(()=> {
        (async()=>{
            const data = await getJournalEntries();
            setJournalData(
            data.map(entry => ({
                id: entry._id,
                content: entry.content,
                date: new Date(entry.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "2-digit"
                })
            }))
        );
            console.log("Fetched data: ", data)
        })()
    }, [])

    const [isAddingEntry, setIsAddingEntry] = useState(false)

    const handleDateChange = (date) => {
        setJournalDateValue(date)
    }

    const handleClose = useCallback(() => {
        setIsAddingEntry(false);
    }, []);

    const addEntry = async (content, date) => {
        try {
            const response = await axios.post("/journal", {
                content,
                date: date || new Date()
            });

            const savedEntry = response.data;

            setJournalData([
            ...journalData,
            {
                id: savedEntry._id,
                content: savedEntry.content,
                date: new Date(savedEntry.date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "2-digit"
                })
            }
            ]);
        } catch (error) {
            console.error("Error saving entry:", error);
        }
    };

    const handleEntryCheck = (entryId, isChecked) => {
        if (isChecked) {
            setCheckedEntries([...checkedEntries, entryId]);
        } else {
            setCheckedEntries(checkedEntries.filter(id => id !== entryId));
        }
    };

    const deleteEntries = async () => {
        try {
            // Use Promise.all so deletes happen in parallel
            await Promise.all(
                journalData
                    .filter(journalEntry => checkedEntries.includes(journalEntry.id))
                    .map(journalEntry =>
                        axios.delete(`/journal/${journalEntry.id}`)
                    )
            );

            // Update state after deletion
            setJournalData(prev => prev.filter(entry => !checkedEntries.includes(entry.id)));
            setCheckedEntries([]);
        } catch (error) {
            console.log(error);
        }
    };

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
                            date={new Date(journalEntry.date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "2-digit"
                            })}
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