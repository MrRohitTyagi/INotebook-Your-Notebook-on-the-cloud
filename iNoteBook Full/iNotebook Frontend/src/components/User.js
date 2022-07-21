import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import AddNew from './AddNew'


const updateContext = createContext()

const User = (props) => {
  const [updator, setupdator] = useState();

  setTimeout(() => {
    // setupdator(1)
  }, 1000);
  // const baseURL = 'http://localhost:5000'
  const baseURL = 'https://iNotebook.rt7rt7.repl.co'
  const [message, setmessage] = useState('');
  const [workdone, setworkdone] = useState(false);
  const [CurrIdentifier, setCurrIdentifier] = useState('');
  const [AllTitles, setAllTitles] = useState([]);





  useEffect(() => {
    let getallnotes = async () => {
      // console.log('get all notes');
      // let data = await axios.get(`${baseurl}/api/notes/fetchallnotes?email=panda@gmail.com`)
      let data = await axios.get(`${baseURL}/api/notes/fetchallnotes?email=${localStorage.getItem('email')}`)
      // let data = await axios.get(`${baseurl}/api/notes/fetchallnotes?email=${receivedEmail.UserUniqueEmail}`)
      setAllTitles(data.data)
      // console.log(AllTitles);
    }

    getallnotes()


  }, [updator])





  let fetchtext = async (txt) => {

    // console.log(txt);



    // let data = await axios.get(`${baseurl}/api/notes/fetchallnotes?note=${txt}`)
    let data = await axios.get(`${baseURL}/api/notes/fetchtext?note=${txt}&email=${localStorage.getItem('email')}`)
    // console.log(data.data);

    setTimeout(() => {

      document.querySelector('.text-area').value = data.data.content
      setCurrIdentifier(data.data.identifire)
    }, 200);

  }


  let AddNewNote = async () => {


    document.querySelector('.NewNoteMaker').style.display = "flex"
    document.querySelector('.whole-content').style.opacity = "30%"

  }

  let deletenote = async (txt) => {
    setmessage("Note deleted Successfully")

    // let data = await axios.get(`${baseurl}/api/notes/fetchallnotes?note=${txt}`)
    let data = await axios.post(`${baseURL}/api/notes/deletenotes?title=${txt}&email=${localStorage.getItem('email')}`)
    // console.log(data.data);
    setupdator(updator + 1)
    setworkdone(true)
    setTimeout(() => {
      setworkdone(false)

    }, 2000);

  }

  let updateText = async (txt) => {
    setmessage("Note Updated Successfully")
    let updatedContent = document.querySelector('.text-area').value
    // console.log(updatedContent);

    // console.log("text update");
    let data = await axios.post(`${baseURL}/api/notes/update?identifier=${CurrIdentifier}&updatedcontent=${updatedContent}`)
    // console.log(data.data);

    document.querySelector('.text-area').value = updatedContent
    setworkdone(true)
    setTimeout(() => {
      setworkdone(false)

    }, 2000);

  }

  return (
    <>


      <div className="NewNoteMaker" >
        <updateContext.Provider value={{ updator, setupdator, setmessage, setworkdone }}>

          <AddNew email={localStorage.getItem('email')} />
        </updateContext.Provider>
      </div>



      {workdone === true ?
        <div className="alert alert-success custom" role="alert">
          {message}
        </div> : <div></div>
      }



      <div className='container-fluid' style={{marginTop:"7rem"}}>


        {/* //---------------------------------------- */}



        <div className='whole-content  '>



          <div className='all-title-notes'>
            <div onClick={AddNewNote} className="addnew red center title"><strong>Add New</strong> <i className="fa-solid addnew1 mx-2 fa-file-circle-plus"></i></div>



            {AllTitles.map((ele) => (

              <div key={ele._id} onClick={() => fetchtext(ele.title)} className=" addnew green center title">{ele.title} <i onClick={() => deletenote(ele.title)} className="trash  fa-solid fa-trash-can"></i></div>



            ))}

          </div>
          <div className='note-content '>
            <div onClick={updateText} className="btn btn-primary updatebtn">Update</div>
            <textarea placeholder="Enter Note here" className="text-area">
            </textarea>
          </div>

        </div>

      </div>
    </>
  )
}

export default User
export { updateContext }