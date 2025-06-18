import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='glass mb-8 p-4 rounded-xl shadow-md'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <div className='w-10 h-10 bg-gradient rounded-lg flex items-center justify-center shadow-md'>
            <span className='text-white font-bold text-lg'>N</span>
          </div>
          <h1 className='text-gradient text-2xl font-bold'>Notes Saver</h1>
        </div>
        
        <div className='flex items-center space-x-4'>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `btn btn-sm ${
                isActive 
                  ? 'btn-primary' 
                  : 'btn-secondary'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/paste" 
            className={({ isActive }) => 
              `btn btn-sm ${
                isActive 
                  ? 'btn-primary' 
                  : 'btn-secondary'
              }`
            }
          >
            Pastes
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
