import React from 'react'
import { Link } from 'react-router-dom'

function Home(props) {
  return (
    <div>
      <div className="center home-heading">

        <h1 className='home-heading ' > Welcome to iNotebook</h1>
      </div>

      <div className="center">
        <Link to={'/login'}><button className='custom-btn'> CONTINUE </button></Link>
      </div>

    </div>
  )
}

export default Home