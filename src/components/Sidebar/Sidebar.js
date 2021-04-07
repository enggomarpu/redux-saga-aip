import React from 'react'
import './Sidebar.scss'
import affiliates from '../../img/affiliates.png'
import dashboard from '../../img/dashboard.png'
import KnowledgeHub from '../../img/KnowledgeHub.png'
import marketing from '../../img/marketing.png'
import ArrowNav from '../../img/arrow.png'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <>
      <div className='sidebar-nav'>
        <ul>
          <li>
            <NavLink  exact to='/dashboard' activeClassName="active">
              <span className='nave-icon'>
                <img src={dashboard} alt='Logo' />
              </span>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact to='/marketing' activeClassName="active">
              <span className='nave-icon'>
                <img src={marketing} alt='Logo' />
              </span>
              <span>Marketing</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              
              to='/knowledgeHub'
              role='button'
              id='dropdownMenuLink'
              data-bs-toggle='dropdown'
              aria-expanded='false'
              activeClassName="active"
            >
              <span className='nave-icon'>
                <img src={KnowledgeHub} alt='Logo' />
              </span>
              <span>Knowledge Hub</span>
              <span className='arrow-icon'>
                <img src={ArrowNav} alt='' />
              </span>
            </NavLink>
            <ul className='dropdown-menu' aria-labelledby='dropdownMenuLink'>
              <li>
                <NavLink className='dropdown-item' to='/knowledgeHub/#' activeClassName="active">
                  Library
                </NavLink>
              </li>
              <li>
                <NavLink className='dropdown-item' to='/knowledgeHub/myhub' activeClassName="active">
                  My Hub
                </NavLink>
              </li>
              <li>
                <NavLink className='dropdown-item' to='/knowledgeHub/#' activeClassName="active">
                  Training Modules
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink exact to='/affiliates' activeClassName="active">
              <span className='nave-icon'>
                <img src={affiliates} alt='Logo' />
              </span>
              <span>Affiliates</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
