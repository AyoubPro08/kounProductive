import { useState, useEffect, useCallback } from "react"
import '../components/css/tasks.css'
import  Task from '../components/Task.jsx'
import { useTasks } from '../contexts/TaskContext';
import PopUp from "../components/PopUp.jsx";


function Tasks() {

    const {taskData, setTaskData} = useTasks();



    const [inputValue, setInputValue] = useState("");
    const [dateValue, setDateValue] = useState("")

    const addTask = useCallback(() => {
        if (inputValue.trim() === "") return;
        
        const newTask = {
            name:inputValue,
            date: dateValue || new Date().toLocaleDateString(['fr-FR']),
            id: Date.now()
        };

        setTaskData([...taskData, newTask]);
        setInputValue("");
        setDateValue("")
    }, [inputValue, dateValue, taskData, setTaskData]);


    useEffect(() => {

        const handleKeyDown = (event) => {
            if (event.key == 'Enter') {
                addTask();
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };

    }, [addTask])

    
    

    

    const [isEditing, setIsEditing] = useState(false);
    const [taskBeingEdited, setTaskBeingEdited] = useState(null);


    return (

        <>
            <div className="inputTask">
                <input
                    id ={crypto.randomUUID()}
                    type="text" 
                    className="inputTaskName"
                    placeholder="Write a task" 
                    value={inputValue}
                    onChange={(character) => setInputValue(character.target.value)}
                />
                <input
                    id= {crypto.randomUUID()}
                    type="date"
                    className="inputTaskDate"
                    value={dateValue}
                    onChange={(character) => setDateValue(character.target.value)}
                />
                <button onClick={addTask}>Add</button>
            </div>
            <div className="tasksContainer">
                {taskData.map((task) => 
                    <Task 
                        id={task.id}
                        name={task.name}
                        date={task.date}
                        key={task.id}
                        onDelete=
                            {(idToDelete) =>{
                                setTaskData(
                                    prev => prev.filter(
                                        task => 
                                            task.id !== idToDelete
                                    ))
                                setIsEditing(false)
                                setTaskBeingEdited(null)
                            }}
                        onEdit={() => {
                            setIsEditing(true);
                            setTaskBeingEdited(task);
                        }}
                    />
                )}

                {isEditing && 
                    <PopUp
                        className='popUp'
                        name={taskBeingEdited}
                        closePopUp={() => {
                            setIsEditing(false);
                            setTaskBeingEdited(null)
                            
                        }}
                        modifyTask={(editedName, editedDate) => {
                            if (editedName.trim() === "" || editedDate.trim() === "") {
                                setIsEditing(false)
                                setTaskBeingEdited(null)
                                return;
                            }
                            setTaskData(prevTasks =>
                                prevTasks.map(task =>
                                    task.id === taskBeingEdited.id
                                    ? { ...task, name: editedName, date: editedDate }
                                    : task
                                )
                            );
                            setIsEditing(false)
                            setTaskBeingEdited(null)
                        }}  
                    />
                }

            </div>
        </>
    )
}

export default Tasks