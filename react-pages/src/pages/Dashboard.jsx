import { useTasks } from '../contexts/TaskContext'
import '../components/css/dashboard.css'


function Dashboard() {

    const {taskData, setTaskData} = useTasks();

    return (
        <>
            <div className='DashboardContainer'>
                <p className='Title'>Welcome User</p>
                <div className="Main">
                    <div className="Upcoming">
                        <p>Upcoming Events</p>
                        <div className="UpcomingEvents">
                            { taskData.map((task) => {
                                if (task.date == new Date().toLocaleDateString('fr-CA')) {
                                    return (
                                        <p
                                        key={crypto.randomUUID()}
                                        className='task'>
                                            {task.name} | {task.date}
                                        </p>
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