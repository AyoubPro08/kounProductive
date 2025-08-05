import './css/tasks.css'

function Task({id, name, date, onDelete, onEdit}) {

    return (
        <>
            <div className="task">
                <p>{name} | {date}</p>
                <button className="modifyButton" onClick={() => onEdit()}>
                    Modify
                </button>
                <button className="removeButton" onClick={() => onDelete(id)}>
                    Remove
                </button>
            </div>
        </>
    );
}


export default Task