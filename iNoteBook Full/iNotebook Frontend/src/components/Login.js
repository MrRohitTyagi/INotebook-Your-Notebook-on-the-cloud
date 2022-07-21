import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserEmail, UserName } from '../App'
import axios from 'axios'


const Login = () => {
    let updateEmail = useContext(UserEmail)
    let UpdateName = useContext(UserName)
    // console.log(updateEmail);
    // console.log(UpdateName);

    // const baseURL = 'http://localhost:5000'
    const baseURL = 'https://iNotebook.rt7rt7.repl.co'

    const [spinner,setspinner] = useState('');
    let [loginDone, setloginDone] = useState();
    let fetchedemail= localStorage.getItem('email')

    const [email, setemail] = useState( fetchedemail === null ? "" : fetchedemail);
    const [Password, setPassword] = useState('');


    let Login = async () => {
        let data = await axios({
            method: 'post',
            url: `${baseURL}/api/auth/login`,
            data: {

                email: email,
                password: Password
                //   email: "panda@gmail.com"

            },


        })
        // console.log(data);
        if (data.data.success === true) {
            console.log(true);
            setloginDone(true)
            updateEmail.setUserUniqueEmail(email)
            UpdateName.setUserUniqueName(data.data.user.name)
            // console.log(loginDone);
            localStorage.setItem('email',email)
            localStorage.setItem('name',data.data.user.name)
        }
        else {
            console.log(false);
            setloginDone(false)
            // console.log(loginDone);
            setTimeout(() => {
                setloginDone(null)
            }, 4000);
        }
    }


    return (
        <div className="center">
            

            <div className="login-cont my-3" style={{color:"black"}}>
                {loginDone === true ?
                    <div className="alert alert-success" role="alert">
                        Login Successfull !
                    </div> : <div></div>
                }
                {loginDone === false ?
                    <div className="alert alert-danger" role="alert">
                        Invalid Email or Password !
                    </div> : <div></div>
                }
                <h3 className="center heading my-5">iNotebook Login</h3>
                <hr />
                <div className="center">
                        <h6>Welcome back {localStorage.getItem('name')}</h6>
                    </div>



                <div className="center">

                    <div className="form ">
                        <input className="input" value={email} onChange={(e) => setemail(e.target.value)} placeholder="Email" required type="Email" />
                        <span className="input-border"></span>
                    </div>
                </div>


                <div className="center">

                    <div className="form ">
                        <input className="input" value={Password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" required type="password" />
                        <span className="input-border"></span>
                    </div>
                </div>

                
                {loginDone === true ?

                <Link to={'/userprofiledata'}> <div onClick={Login} className="btn btn-primary my-4">Continue</div></Link>
                :

                <button onClick={Login} className="btn btn-primary my-4">Login</button>

                }
                <div className="center">
                    Do not have an account ? <Link className='mx-1' to={'/signup'}> Create One</Link>
                </div>


            </div>

        </div>

    )
}

export default Login