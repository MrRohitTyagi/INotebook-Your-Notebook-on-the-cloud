const express = require('express');
const Notes = require('../models/Notes')

const Notesrouter = express.Router()

// route 1  get all the nots of a user 
///////////////////////////////////////////////////////////////////////////////////////
Notesrouter.get('/fetchallnotes', async (req, res) => {
    console.log(req.query);
 

    try {



        const notes = await Notes.find({ email: req.query.email })


        // console.log(notes);

        res.send(notes) 
    }
    catch (error) {
        console.log(error);
    }
})
/////////////////////////////////////////////////////////////////////////////////////////
Notesrouter.get('/fetchtext', async (req, res) => {
    console.log(req.query);


    try {



        const notes = await Notes.findOne({ identifire: req.query.email + req.query.note })
        // const notes = await Notes.find({ UID: 1 })


        // console.log(notes);

        res.send(notes)
    }
    catch (error) {
        console.log(error);
        res.send("some error occured")
    }
})
////////////////////////////////////////////////////////////////////////////////////
Notesrouter.post('/deletenotes', async (req, res) => {
    try {
        const notes = await Notes.deleteOne({ identifire: req.query.email + req.query.title })




        res.send(notes)
    }
    catch (error) {
        console.log(error);
        res.send("some error occured")
    }
})
Notesrouter.post('/update', async (req, res) => {
    console.log(req.query);

    const notes = await Notes.updateMany({ identifire: req.query.identifier }, { $set: { content: req.query.updatedcontent } })




    res.send(notes)
})

///////////////////////////////////////////////////////////////////////////////////////////
Notesrouter.post('/createnote', async (req, res) => {
    try {

        console.log(req.query);
        if (req.query.email === "" || req.query.email === undefined) {
            res.send("email cannot be empty")
            return
        }
        console.log(req.query);
        const notes = await Notes.create({

            email: req.query.email,
            title: req.query.title,
            content: req.query.content,
            identifire: req.query.email + req.query.title


        }
        )


        // console.log(notes);

        res.send(notes)
    }
    catch (error) {
        console.log(error);
        res.send("some error occured")
    }
})

module.exports = Notesrouter 