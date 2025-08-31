import { useState } from 'react';
import './css/PopUp.css'
import { useRef, useEffect } from 'react';


function PopUp({name, date, closePopUp, modifyTask}) {

    const nameInputRef = useRef(null)

    useEffect(() => {
        const handleKeyDown = (event) => {
            if(event.key === "Escape") {
                closePopUp();
            } 
        }
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [closePopUp])

    useEffect(() => {nameInputRef.current?.select()}, []);


    const [editedInputValue, setEditedInputValue] = useState(name);
    const [editedDateValue, setEditedDateValue] = useState(date);
    
    return (
        <div className='modal-wrapper'>
            <div className="overlay" onClick={closePopUp}></div>
            <div className="modal-box">
                <div className='title'>Modify Task</div>
                <div className='new-information'>

                        <p>New Name: </p>
                        <input
                            id={crypto.randomUUID()}
                            type="text"
                            placeholder='Write a task'
                            value={editedInputValue}
                            onChange={(character) => setEditedInputValue(character.target.value)}
                            ref={nameInputRef}
                        />

                        <p>New Deadline: </p>
                        <input
                            id= {crypto.randomUUID()}
                            type="date" 
                            value={editedDateValue}
                            onChange={(character) => setEditedDateValue(character.target.value)}
                            className='date-input'
                        />

                </div>

                <div className='buttons'>
                    <button 
                        onClick={() => modifyTask(editedInputValue, editedDateValue)}
                        className='modify-button'
                    >
                        Modify
                    </button>
                    <button 
                        onClick={closePopUp}
                        className='close-button'
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );

}



export default PopUp