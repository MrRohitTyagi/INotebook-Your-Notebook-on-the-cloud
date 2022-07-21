import './App.css';
import React, { createContext, useState  } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './components/Home';
// import About from './components/About'
import NavBar from './components/NavBar'
import User from './components/User';
import Signup from './components/Signup';
import Login from './components/Login';
import NavBar1 from './components/Navbar1';


// import NOteState from './components/context/notes/NoteState';
const UserEmail = createContext()
const UserName = createContext()



function App() {
 
  
  // console.log(UserID,"app");
  const [UserUniqueEmail, setUserUniqueEmail] = useState('');
  const [UserUniqueName, setUserUniqueName] = useState('');

  return (
    <>



   

      <UserEmail.Provider value={{ UserUniqueEmail, setUserUniqueEmail }}>
        <UserName.Provider value={{UserUniqueName,setUserUniqueName}}>



          <BrowserRouter>
            

            <div className='container-fluid'>
              <Routes>

                <Route exact path='/' element={<><NavBar1 /><Home /></>} />

                <Route exact path='/userprofiledata' element={<><NavBar /><User key={1} /></>} />

                {/* <Route exact path='/about' element={<About />} /> */}
                <Route exact path='/signup' element={<><NavBar1 /><Signup key={2} /></>} />
                <Route exact path='/login' element={<><NavBar1 />< Login key={3} /></>} />

              </Routes> 
            </div>
          </BrowserRouter>

        </UserName.Provider>
      </UserEmail.Provider>
 


    </>
  )
}

export default App;
export { UserEmail }
export {UserName}

