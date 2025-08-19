import { useState } from 'react';
import '../components/css/JournalEntry.css'

function JournalEntry({id, content, date, onCheckChange}) {

    const [isChecked, setIsChecked] = useState(false);


    const handleCheckChange = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        if (onCheckChange) {
            onCheckChange(id, newCheckedState);
        }
    }

    return (
        <div className="journal-entry">
            <input 
                type="checkbox"
                className='entry-selection-checkbox'
                checked={isChecked}
                onChange={handleCheckChange}/>
            <div className='entry-date'>{date}</div>
            <textarea className='entry-content'>
                {content}
            </textarea>
        </div>
    )
}

export default JournalEntry