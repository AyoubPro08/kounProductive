import './css/App.css'
import './css/sidebar.css'
import Hide from '../assets/close.svg'
import {Link} from 'react-router-dom';



function Sidebar() {

  function HideSidebar() {
    const sideBar = document.querySelector('.Sidebar');
    sideBar.style.display = 'none'
    const ShowSidebar = document.querySelector('.ShowSidebar');
    ShowSidebar.style.display = 'block';
    const content = document.querySelector('.ContentContainer');
    content.style.marginLeft = '75px';
  }

  function ShowSidebar () {
    const sideBar = document.querySelector('.Sidebar');
    sideBar.style.display = 'block'
    const ShowSidebar = document.querySelector('.ShowSidebar');
    ShowSidebar.style.display = 'none';
    const content = document.querySelector('.ContentContainer');
    content.style.marginLeft = '300px';
  }

  return (
    <>
      <div className='PageContainer'>
        <div className='SidebarContainer'>
          <div className='ShowSidebar' onClick={ShowSidebar}>
            <img src={Hide} alt='Show' />
          </div>
          <div className='Sidebar'>
            <div className='SidebarTop'>
              <div className='Logo'>
                kounProductive
              </div>
              <div className='HideSidebar' onClick={HideSidebar}>
                <img src={Hide} alt="Hide" />
              </div>
            </div>

            <div className='SidebarLinks'>
              <ul>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>  
                    <a href="">School</a>
                </li>
                <li>
                    <Link to="/tasks">Tasks</Link>
                </li>
                <li>
                    <a href="">Habit Tracker</a>
                </li>
                <li>
                    <Link to="/journal">Journal</Link>
                </li>
                <li>
                    <a href="">Calendar</a>
                </li>
              </ul>
            </div>
          </div>
        </div>      
      </div>
    </>
  )
}


export default Sidebar