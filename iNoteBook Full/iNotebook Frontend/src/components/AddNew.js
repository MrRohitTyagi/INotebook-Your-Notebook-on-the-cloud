import React, { useState,useContext } from 'react'
import axios from 'axios'
import { updateContext } from './User';


const AddNew = (props) => {
   
    let updateUpdator = useContext(updateContext)
    const [text, settext] = useState('');
    const [content,setcontent] = useState('');
    const baseURL = 'https://iNotebook.rt7rt7.repl.co'

    
    let closenotetab=()=>{
        document.querySelector('.NewNoteMaker').style.display = "none"
        document.querySelector('.whole-content').style.opacity = "100%"
    }

    let AddNewNote = async () => {
        updateUpdator.setmessage("Note Addes Successfully")
        updateUpdator.setworkdone(true)

        // console.log(text);

        let data = await axios.post(`${baseURL}/api/notes/createnote?email=${props.email}&title=${text}&content=${content}`)

        // console.log(data.data);

        document.querySelector('.NewNoteMaker').style.display = "none"
        document.querySelector('.whole-content').style.opacity = "100%"

        // console.log(updateUpdator.updator);
        updateUpdator.setupdator(2)
        setTimeout(() => {
            updateUpdator.setworkdone(false)
        }, 2000);
        

    }


    return (
        <div className="alert alert-danger newnotadd" role="alert">
            <i onClick={closenotetab} className="fa-solid cut fa-xmark"></i>
            <div className="center my-3"> Add new note  </div>

            <form className='center' action="">

                <input className='my-2' value={text} onChange={(e) => settext(e.target.value)} type="text" placeholder='Title' required />
                <input className='my-2' value={content} onChange={(e) => setcontent(e.target.value)} type="text" placeholder='Content Optional' />
                <div onClick={AddNewNote} className='my-2 AddNoteBtn btn btn-success'>Add Note</div>
            </form>
            <div className="center my-4">
                Title must be unique
            </div>

        </div>
    )


}

export default AddNew