import './App.css';
import React  from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {useHistory, useParams, withRouter} from "react-router-dom";

//import { createTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
//import purple from '@material-ui/core/colors/purple';
//import green from '@material-ui/core/colors/green';


/*const theme = createTheme({
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: green[500],
      },
    },
});*/

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        //width: '25ch',
      },
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        //width: '25ch',
      },
    },
 
}));

class Fields extends React.Component {
    render(){
      return (
      <div>
          <TextField
              required
              fullWidth
              id="name-field"
              label="Name"
              variant="filled"
          />

          <TextField
              required
              fullWidth
              id="bio-field"
              label="Bio"
              variant="filled"
          />
          
      </div>

      );
        
    }
}



function AddAuthor() {
    const classes = useStyles();
    const history = useHistory();
    let { id } = useParams();
  
    const handleSubmit = event => {
      event.preventDefault();
      const fields = {
        name: document.getElementById('name-field').value,
        bio: document.getElementById('bio-field').value,
      };
      sendHttp(fields,id);
    }
  
  
    function sendHttp(fields,id){
      const axios = require('axios');
  
  
      axios.post('http://localhost:8000/authors/', fields)
        .then(function(response){
          // success
          console.log(response);
          //debugger;
          //print("hello");
          history.push('/authors/');
        })
        .catch(function (error){
          // error
          console.log(error);
        })
        .then(function(){
          //always
        });
  
    }
  
    return (
    <withRouter>
        <form className={classes.root} onSubmit = {handleSubmit}>
    
            <div>
            <h1>Add Author</h1>
            <Grid container w='100%' h="100%" >
                <Grid item xs={3}/>
                
                <Grid item xs={6}>
                
                    <Grid container direction="column" alignItems="flex-start">
    
                    <Fields/>
    
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>


                    </Grid>
                </Grid>
                </Grid>
    
                <Grid item xs={3}/>
    
            
            
            </div>
    
        </form>
    </withRouter>

    );
  }
  
  
  
  export default AddAuthor;
  