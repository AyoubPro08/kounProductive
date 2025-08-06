import { Link } from 'react-router-dom';
import { useTasks } from '../contexts/TaskContext'
import '../components/css/dashboard.css'


function Dashboard() {

    const {taskData, setTaskData} = useTasks();

    const tasksOfTheDay = taskData;

    return (
        <>
            <div className='DashboardContainer'>
                <p className='Title'>Welcome User</p>
                <div className="Main">
                    <div className="Upcoming">
                        <p>Upcoming Events</p>
                        <div className="UpcomingEvents">
                            { tasksOfTheDay.map((task) => {
                                if (task.date == new Date().toLocaleDateString('fr-CA')) {
                                    return (
                                            <div
                                                className='task-dashboard' key={task.id}>
                                                <div>
                                                    {task.name} | {task.date}
                                                </div>
                                                <div>

                                                    <button className="check-button-dashboard"
                                                    key={task.id}>
                                                        <Link to="/tasks"
                                                        className='check-text'>
                                                            Check
                                                        </Link>
                                                    </button>
                                                    <button
                                                        id={task.id}
                                                        key={crypto.randomUUID()}
                                                        className="remove-button-dashboard"
                                                        onClick={() => {setTaskData(
                                                            prev => prev.filter(t => t.id!==task.id)
                                                        )}}>
                                                            Remove
                                                    </button>
                                                </div>
                                            </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                    <div className="Stats">
                        <p>Overview</p>
                        <div className="StatsOverview">
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Dashboard