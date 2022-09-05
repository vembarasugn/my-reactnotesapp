
import React from "react";
import Sidebar from "./Sidebar";
import Editor from "./Editor";
//import data from "data"
import Split from "react-split";
import { nanoid } from 'nanoid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


function App(){

   const [ notes , setNotes ] = React.useState( () => JSON.parse(window.localStorage.getItem("notes")) || [])
   const [currentNoteId , setCurrentNoteId] = React.useState(
       (notes[0] && notes[0].id) || ""
   )

    // data in local storage
    React.useEffect(() => {
      window.localStorage.setItem("notes",JSON.stringify(notes))
    },[notes])

   function createNewNote(){
     const newNote = {
          id: nanoid(),
          body: "**Your notes **"
     }
     setNotes(prevState => [newNote, ...prevState])
     setCurrentNoteId(newNote.id)
   }

   function updateNote(text){
     //this does not rearrange the most recently update in the list 
  //    setNotes(oldNotes => oldNotes.map(oldNote => {
  //      return oldNote.id === currentNoteId ? {...oldNote, body:text} : oldNote
  //    }))
  //  }

    //this does rearrange the most recently update in the list 
    setNotes(oldNotes => {
      const newArray = []
      for(let i = 0; i < oldNotes.length; i++) {
        const oldNote =oldNotes[i]
        if(oldNote[i].id === currentNoteId) {
          newArray.unshift({...oldNote, body:text})
        } else {
          newArray.push(oldNote)
        }
      }
      return newArray 
    }) 
  }
    // deletes notes from the list 
   function deleteNote(event,noteId) {
     event.stopPropagation()
     setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId ))
   }

   function findCurrentNote(){
     return notes.find(note => {
       return note.id === currentNoteId
     }) || notes[0]
   }

   const styleGrid = {
    paddingBottom: "10px",
    width: "100%",
    margin: "15px",
   };

   const propStyleGrid = {
    container: true,
    spacing:2,
    style: styleGrid
   };

   return (
     <main>
      {
        notes.length > 0
        ?
        <Split
            sizes={[30,70]}
            direction="horizontal"
            className="split"
          > 
          <Sidebar 
             notes={notes}
             currentNote={findCurrentNote()}
             setCurrentNoteId={setCurrentNoteId}
             newNote={createNewNote}
             deleteNote={deleteNote}
          />
          {
            currentNoteId &&
            notes.length > 0 &&
             <Editor 
                currentNote={findCurrentNote()}
                updateNote={updateNote}
                />
          }
          </Split>
          :
          
         <section> 
          
          <Grid {...propStyleGrid}>
            <Grid
             item
             xs={10}
             sm={4}
             md={4}
             lg={4}
             xl={4}
            style={{ display: "flex", justifyContent: "center"}}
            >
            <Card sx={{ maxWidth: 360 }} style={{backgroundColor: "#070222f1"}}>
            <CardContent  className="no-notes"  >
            <Typography gutterBottom variant="h5" component="div" className="typo">
              Currently, you have no notes.
            </Typography>
            <Typography variant="body-3" className="note"  >
            <button className="first-note" onClick={createNewNote}> Create One Now </button>
            </Typography>
            </CardContent>   
            </Card>
           </Grid> 
          </Grid>  
        </section>
      }

     </main>

  )
}

export default App;

