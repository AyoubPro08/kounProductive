import { TaskProvider } from './contexts/TaskContext.jsx';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx'
import Sidebar from './components/Sidebar.jsx'
import Tasks from './pages/Tasks.jsx'
import Journal from './pages/Journal.jsx';
import School from './pages/School.jsx';
import HabitTracker from './pages/HabitTracker.jsx';
import Calendar from './pages/Calendar.jsx';

import './components/css/App.css'
import './components/css/dashboard.css'

function App() {

  return (
    <>
      <TaskProvider>
        <BrowserRouter>
          <Sidebar />
          <div className="ContentContainer">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/habittracker" element={<HabitTracker />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/school" element={<School />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TaskProvider>
    </>
  );

}

export default App
