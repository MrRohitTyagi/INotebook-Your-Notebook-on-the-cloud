import React from 'react'
import { Link } from 'react-router-dom'

const NavBar1 = () => {
  // const [heading,setheading] = useState('');
 
let Signout =()=>{

 

}


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
  <div className="container-fluid">


    <div style={{cursor:"pointer"}} className="navbar-brand">iNotebook</div>



    <div className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">

    <div  className="btn  mx-2 profile "><i className="fa-solid mx-2 fa-circle-user"></i>Guest</div>
      <span className="navbar-toggler-icon"></span>
    </div>


    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

       
        

       
        
        
        
      </ul>
      <div className="d-flex" role="search">
    <div  className="btn dkhjas mx-4 profile "><i className="fa-solid mx-2 fa-circle-user"></i>Guest</div>
      </div>

      <div className="d-flex" role="search">
        <div   onClick={Signout} className="btn btn-outline-danger"><Link style={{textDecoration:"none",color:"lightgreen"}} to={"/"}>SignOut</Link></div>
      </div>
    
    </div>
  </div>
</nav>
  )
}

export default NavBar1