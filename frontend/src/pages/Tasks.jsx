import axios from "axios";
import { useState, useEffect, useCallback } from "react"
import { useTasks } from '../contexts/TaskContext';
import  Task from '../components/Task.jsx'
import PopUp from "../components/PopUp.jsx";
import '../components/css/tasks.css'

async function getTasks() {
    try {
        const response = await axios.get("/tasks")
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

function Tasks() {

    const {taskData, setTaskData} = useTasks();

    useEffect(() => {
        (async() => {
            const data = await getTasks();
            setTaskData(data.tasks);
            console.log("Fetched tasks: ", data)
        })();
    }, [setTaskData])

    const [inputValue, setInputValue] = useState("");
    const [dateValue, setDateValue] = useState("")

    const addTask = useCallback(() => {

        if (inputValue.trim() === "") return;

        axios({
            method:'post',
            url:'/tasks',
            data:{
                name:inputValue,
                date:dateValue || new Date().toLocaleDateString(['fr-FR'])
            }
        });

        
        const newTask = {
            _id: crypto.randomUUID(),
            name:inputValue,
            date: dateValue || new Date().toLocaleDateString(['fr-FR'])
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
                        key={task._id}
                        id={task._id}
                        name={task.name}
                        date={new Date(task.date).toISOString().split("T")[0]}
                        onDelete=
                            {(idToDelete) =>{
                                axios.delete(`/tasks/${idToDelete}`)
                                    .then(() => {
                                        setTaskData(
                                            prev => prev.filter(
                                                task => 
                                                    task._id !== idToDelete
                                        ))
                                    })
                                    .catch((error) => {console.log(error)})
                                
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
                        name={taskBeingEdited?.name || ""}
                        date={taskBeingEdited ? new Date(taskBeingEdited.date).toISOString().split("T")[0] : ""}
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
                            axios.patch(`/tasks/${taskBeingEdited._id}`, {
                                name: editedName,
                                date: new Date(editedDate).toISOString()
                            })
                                .then(res => {
                                    const updatedTask = res.data.task;
                                    setTaskData(prevTasks =>
                                        prevTasks.map(task =>
                                        task._id === updatedTask._id ? updatedTask : task
                                        )
                                    );
                                })
                                .catch(err => console.log(err));
                                
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