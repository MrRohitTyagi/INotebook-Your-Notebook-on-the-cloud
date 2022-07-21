import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserEmail,UserName } from '../App'
import axios from 'axios';


function Signup() {
    let updateEmail = useContext(UserEmail)
    let UpdateName = useContext(UserName)
   
   
    // const baseURL = 'http://localhost:5000'
    const baseURL = 'https://iNotebook.rt7rt7.repl.co'
    const [userExists,setuserExists] = useState(false);
    const [alert, setalert] = useState(false);
    const [validation,setvalidation] = useState(false);
    const [LoginSucess,setLoginSucess] = useState(false);
    const [Password, setPassword] = useState('');
    const [Username, setUsername] = useState('');
    const [email, setemail] = useState('');


    const UserSignUp = async () => {

        if (Username === "" || email === "" || Password === "") {

            setalert(true)
            setTimeout(() => {
                setalert(false)

            }, 2000);

            // console.log("complete fields");
            return
        }


        // console.log("signing up");
        try {
            
            let data = await axios({
                method: 'post',
                url: `${baseURL}/api/auth/createuser`,
                data: {
                  
                    name: Username,
                    email: email,
                    password: Password
                    
                },
                
                
            })
            // console.log(data);
            if(data.data==="sorry a user with this email already exists"){
                setuserExists(true)
                setTimeout(() => {
                    setuserExists(false)
                    
                }, 2000);
            }
            else{
                
             
                setLoginSucess(true)
                localStorage.setItem('name',Username)
                localStorage.setItem('email',email)
                updateEmail.setUserUniqueEmail(email)
                UpdateName.setUserUniqueName(Username)
            }
        } 
        
        catch (error) {
            // console.log(error);
            setvalidation(true)
            setTimeout(() => {
                setvalidation(false)

            }, 2000);

        }
    }
    const fetchUID = async () => {

        let data = await axios({
        method: 'post',
        url: `${baseURL}/api/auth/getuser`,
        data: {

          email: email
        //   email: "panda@gmail.com"
          
        },  
        
        
      }) 
 
    //  console.log(data.data)
    // updateEmail.setUserUniqueEmail(data.data.email) 
    //   UpdateUID.setUIDa(data.data.UID)
    //   localStorage.setItem('UID',data.data.UID)
        
    }


    return (
        <>
            <div className="center">

 


                <div className="login-cont my-3" style={{color:"black"}}>
                    {alert === true ?
                        <div  className="alert alert-danger" role="alert">
                            All fields are mandatory!
                        </div> : <div></div>
                    }
                    {LoginSucess === true ?
                        <div className="alert alert-success" role="alert">
                                SignUp Successfull !
                        </div> : <div></div>
                    }
                    {validation === true ?
                        <div className="alert alert-danger" role="alert">
                                Invalid Email or password
                        </div> : <div></div>
                    }
                    {userExists === true ?
                        <div className="alert alert-primary" role="alert">
                                Email already regestered kindly login
                        </div> : <div></div>
                    }




                    <h3 className="center heading my-5">iNotebook SignIn</h3>
                    <hr />
                  

                    <div className="center">

                        <div className="form ">
                            <input value={Username} onChange={(e) => { setUsername(e.target.value) }} className="input" placeholder="Username" required type="text" />
                            <span className="input-border"></span>
                        </div>
                    </div>


                    <div className="center">

                        <div className="form ">
                            <input autoComplete='true' value={email} onChange={(e) => { setemail(e.target.value) }} className="input" placeholder="Email" required type="text" />
                            <span className="input-border"></span>
                        </div>
                    </div>


                    <div className="center">

                        <div className="form ">
                            <input value={Password} onChange={(e) => { setPassword(e.target.value) }} className="input" placeholder="Password" required type="text" />
                            <span className="input-border"></span>
                        </div>
                    </div>
                    {LoginSucess === true ?
                    
                    

                    <Link to={'/userprofiledata'}><div onClick={fetchUID}  className="btn btn-primary my-4">Continue</div></Link>
                    :
                    <div onClick={UserSignUp} className="btn btn-primary my-4">SignIn</div>

                    }
                    <div className="center">
                        Already have an account ? <Link className='mx-1' to={'/login'}> Login</Link>
                    </div>


                </div>

            </div>


        </>




    )
}
export default Signup