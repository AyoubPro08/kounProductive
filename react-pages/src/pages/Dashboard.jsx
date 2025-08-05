import '../components/css/dashboard.css'


function Dashboard() {
    return (
        <>
            <div className='DashboardContainer'>
                <p className='Title'>Welcome User</p>
                <div className="Main">
                    <div className="Upcoming">
                        <p>Upcoming Events</p>
                        <div className="UpcomingEvents">
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