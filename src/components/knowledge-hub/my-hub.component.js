import React, { useState } from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import DashboardPosts from './my-hub/dashboard-post.component'
import FavouritePosts from './my-hub/favourite-post.component'
import MyContent from './my-hub/my-content.component'

const MyHub = () => {
  return (
    <>
      <Header heading='Favourite Posts' />
      <div className='main'>
        <div className='siderbar'>
          <Sidebar />
        </div>
        <div className='main-wrapper'>
          <div className='row g-0 justify-content-between'>
            <div className='col-auto'>
              <ul className='nav nav-tabs' id='myTab' role='tablist'>
                <li className='nav-item' role='presentation'>
                  <button
                    className='nav-link '
                    id='home-tab'
                    data-bs-toggle='tab'
                    data-bs-target='#home'
                    type='button'
                    role='tab'
                    aria-controls='home'
                    aria-selected='true'
                  >
                    My Contents
                  </button>
                </li>
                <li className='nav-item' role='presentation'>
                  <button
                    className='nav-link active'
                    id='profile-tab'
                    data-bs-toggle='tab'
                    data-bs-target='#profile'
                    type='button'
                    role='tab'
                    aria-controls='profile'
                    aria-selected='false'
                  >
                    Favourites
                  </button>
                </li>
                <li className='nav-item' role='presentation'>
                  <button
                    className='nav-link'
                    id='contact-tab'
                    data-bs-toggle='tab'
                    data-bs-target='#contact'
                    type='button'
                    role='tab'
                    aria-controls='contact'
                    aria-selected='false'
                  >
                    Dashboard Posts
                  </button>
                </li>
              </ul>
            </div>
            <div className='col-auto'>
              <ul className='nav'>
                <li className='nav-item'></li>
                <li className='nav-item ps-3'>
                  <div className='input-group search-group'>
                    <button className='btn btn-outline-secondary' type='submit'>
                      <i className='fas fa-search' />
                    </button>
                    <input
                      className='form-control'
                      type='search'
                      placeholder='Search affiliate'
                      aria-label='Search'
                    />
                  </div>
                </li>

                <li className='nav-item'>
                  <a className='navlink' href='/'>
                    <i className='fas fa-sort-amount-up' />
                    Sort
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='navlink' href='/'>
                    <i className='fas fa-filter' />
                    Filter
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='tab-content' id='myTabContent'>
            <div
              className='tab-pane fade'
              id='home'
              role='tabpanel'
              aria-labelledby='home-tab'
            >
              <MyContent />
            </div>
            <div
              className='tab-pane fade show active'
              id='profile'
              role='tabpanel'
              aria-labelledby='profile-tab'
            >
              <FavouritePosts />
            </div>
            <div
              className='tab-pane fade'
              id='contact'
              role='tabpanel'
              aria-labelledby='contact-tab'
            >
              <DashboardPosts />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyHub
