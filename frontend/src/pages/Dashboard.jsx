import { Link } from "react-router-dom";
import { useTasks } from "../contexts/TaskContext";
import { useEffect } from "react";
import axios from "axios";
import "../components/css/dashboard.css";

async function getTasks() {
    try {
        const response = await axios.get("/tasks")
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function deleteTask(id) {
  try {
    await axios.delete(`/tasks/${id}`);  // ✅ call backend API
    return true;
  } catch (error) {
    console.error("Error deleting task:", error);
    return false;
  }
}


function Dashboard() {
  const { taskData, setTaskData } = useTasks();

  useEffect(() => {
          (async() => {
              const data = await getTasks();
              setTaskData(data.tasks);
              console.log("Fetched tasks: ", data)
          })();
      }, [setTaskData])

  // ✅ Safer date comparison (ignores time zone issues)
  function isSameDay(dateString1, date2) {
    const d1 = new Date(dateString1);
    const d2 = new Date(date2);

    const format = (d) => d.toISOString().split("T")[0]; // "YYYY-MM-DD"

    return format(d1) === format(d2);
  }

  // ✅ Get only today's tasks
  const tasksOfTheDay = taskData.filter((task) =>
    isSameDay(task.date, new Date())
  );

  return (
    <div className="DashboardContainer">
      <p className="Title">Welcome User</p>
      <div className="Main">
        <div className="Upcoming">
          <p>Upcoming Events</p>
          <div className="UpcomingEvents">
            {tasksOfTheDay.length > 0 ? (
              tasksOfTheDay.map((task) => (
                <div className="task-dashboard" key={crypto.randomUUID()}>
                  <div>
                    {task.name} | {new Date(task.date).toLocaleDateString(['fr-FR'])}
                  </div>
                  <div>
                    <button className="check-button-dashboard">
                      <Link to="/tasks" className="check-text">
                        Check
                      </Link>
                    </button>
                    <button
                      className="remove-button-dashboard"
                      id={task.id}
                      onClick={async () => {
                            const success = await deleteTask(task._id || task.id);
                            if (success) {
                                setTaskData((prev) => prev.filter((t) => t._id !== task._id));
                            }
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No tasks for today 🎉</p>
            )}
          </div>
        </div>
        <div className="Stats">
          <p>Overview</p>
          <div className="StatsOverview"></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
