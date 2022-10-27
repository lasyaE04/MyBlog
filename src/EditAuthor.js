import './App.css';
import React, {useEffect} from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {useParams, useHistory, withRouter} from "react-router-dom";
import Grid from '@material-ui/core/Grid';

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


function EditAuthor() {
    const classes = useStyles();
    const [defaultName, setDefaultName] = React.useState("");
    const [defaultBio, setDefaultBio] = React.useState("");
    const history = useHistory();
    let { id } = useParams();
  
    useEffect(() => {
      getHttp(id);
    }, []);  
  
    const handleSubmit = event => {
      event.preventDefault();
      const fields = {
        name: document.getElementById('name-field').value,
        bio: document.getElementById('bio-field').value,
      };
      sendHttp(fields, id);
    }
    
    function sendHttp(fields, id){
      const axios = require('axios');
  
      axios.put('http://localhost:8000/authors/'+ id, fields)
        .then(function(response){
          // success
          console.log(response);
          history.push('/blogs/');
        })
        .catch(function (error){
          // error
          console.log(error);
        })
        .then(function(){
          //always
        });
  
    }

    function sendHttpDel(id){
        const axios = require('axios');
    
        axios.delete('http://localhost:8000/authors/'+ id)
          .then(function(response){
            // success
            console.log(response);
            history.push('/blogs/');
          })
          .catch(function (error){
            // error
            console.log(error);
          })
          .then(function(){
            //always
          });
    
      }
    

  
    function getHttp(id){
      const axios = require('axios');
  
      
      axios.get('http://localhost:8000/authors/' + id)
        .then(function(response){
          // success
          console.log(response);
          
          setDefaultName(response.data.name);
          setDefaultBio(response.data.bio);
        })
        .catch(function (error){
          // error
          console.log(error);
        })
        .then(function(){
          //always
        });
  
    }
    

    const confirmDelete = () => {
        sendHttpDel(id);
    };
      


    return (
        <withRouter>
        <form className={classes.root} onSubmit = {handleSubmit}>

            <div>
                <h1>Edit Category</h1>
                <div>
                <Grid container w='100%' h="100%" >
                  <Grid item xs={3}/>
                  
                  <Grid item xs={6}>
                    
                    <Grid container direction="column" alignItems="flex-start">
                      <Fields 
                        defaultName = {defaultName} 
                        defaultBio = {defaultBio}
                      />

                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>

                    <Button autoFocus onClick={confirmDelete} color="primary">
                            Delete
                    </Button>

            
                    </Grid>
                  </Grid>

                  <Grid item xs={3}/>
                </Grid>

                </div>
            </div>

        </form>
    </withRouter>
     
    );
  }
  
  
  
  export default EditAuthor;
  