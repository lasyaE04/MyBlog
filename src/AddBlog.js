import './App.css';
import React, {useEffect} from 'react';
import { Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {useHistory} from "react-router-dom";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
  
  
  

function AuthorMenu(props){
    const [authId, setAuthId] = React.useState('');
    const list = [];
  
    const handleChange = (event) => {
      setAuthId(event.target.value);
    };
  
    
    if(props.data){
        props.data.data.forEach(element => {
          list.push(<MenuItem value={element.id}>{element.name}</MenuItem>);
        });
    
    } else {
        list.push(<MenuItem disabled>Loading authors...</MenuItem>);
    }
    
  
    return(
        <FormControl fullWidth variant="filled" style={{textAlign: 'left'}} id="author-menu">
          <InputLabel>Author</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            
            value={authId}
            onChange={handleChange}
          >
            {list}
          </Select>
        </FormControl>
          
  
    );
  }
  
function AddBlog() {
    const classes = useStyles();
    const [authorData, setAuthorData] = React.useState(null);
    const history = useHistory();
  
   useEffect(() => {
      getHttpAuth();
    }, []); 
  
    const handleSubmit = event => {
      event.preventDefault();
      const fields = {
        title: document.getElementById('title-field').value,
        description: document.getElementById('description-field').value,
        author: document.getElementById('author-menu').children[1].children[1].value
      };
      sendHttp(fields);
    }
  
    function getHttpAuth(){
      const axios = require('axios');
  
      
      axios.get('http://localhost:8000/authors')
        .then(function(response){
          // success
          console.log(response);
          
          setAuthorData(response)
        })
        .catch(function (error){
          // error
          console.log(error);
        })
        .then(function(){
          //always
        });
  
    }
  
    function sendHttp(fields){
      const axios = require('axios');
  
  
      axios.post('http://localhost:8000/blogs/', fields)
        .then(function(response){
          // success
          console.log(response);
          //debugger;
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
  
    return (
      <form className={classes.root} onSubmit = {handleSubmit}>
  
        <div>
          <h1>Add Blog</h1>
          <Grid container w='100%' h="100%" >
            <Grid item xs={3}/>
            
            <Grid item xs={6}>
              
                <Grid container direction="column" alignItems="flex-start">
  
                    <TextField 
                      fullWidth
                      required
                      id="title-field"
                      label="Title"
                      defaultValue=""
                      variant="filled"
                   />
  
                    <TextField
                      fullWidth
                      id="description-field"
                      label="Description"
                      placeholder=""
                      multiline
                      variant="filled"
                   />
  
                  <AuthorMenu data={authorData}/>
  
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
  
            <Grid item xs={3}/>
   
        </div>
  
      </form>
      
    );
  }
  
  
  
  export default AddBlog;
  