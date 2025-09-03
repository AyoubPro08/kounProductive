import { useState, useRef } from 'react';
import './css/journalEntryPopUp.css'


function JournalEntryPopUp({closePopUp, addJournalEntry}) {

    const contentTextArea = useRef(null);

    const [inputDateValue, setInputDateValue] = useState("");
    const [inputContentValue, setInputContentValue] = useState("");
    

    const handleContentChange = (e) => {
        setInputContentValue(e.target.value)
        
        if (!inputContentValue.trim()) {
            contentTextArea.current.style.color = "white";
        }

    }

    const handleAddEntry = () => {
        if (!inputContentValue.trim()) {
            alert("Please enter some content!");
            return;
        }

        // If user picked a date, use it; otherwise use today's date
        const rawDate = inputDateValue ? new Date(inputDateValue) : new Date();

        // ✅ Pass the raw Date object, not formatted string
        addJournalEntry(inputContentValue, rawDate);

        closePopUp();
    };

    return (
        <div className='modal-wrapper'>
            <div className="overlay" onClick={closePopUp}></div>
            <div className="modal-box">
                <div className='title'>Add Journal Entry</div>
                <div className='new-information'>

                        <p>Select Date </p>
                        <input 
                            id= {crypto.randomUUID()} 
                            type='date'
                            className='date-input'
                            value={inputDateValue}
                            onChange={(e) => setInputDateValue(e.target.value)}
                            />

                        <p>Write here </p>
                        <textarea
                            id={crypto.randomUUID()}
                            className='content-input'
                            ref={contentTextArea}
                            type="text"
                            placeholder='Start Dumping'
                            value={inputContentValue}
                            onChange={handleContentChange}
                            rows={4}
                        />


                </div>

                <div className='buttons'>
                    <button 
                        className='add-button'
                        onClick={handleAddEntry}
                    >
                        Add
                    </button>
                    <button
                        className='close-button'
                        onClick={closePopUp}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );

}



export default JournalEntryPopUp