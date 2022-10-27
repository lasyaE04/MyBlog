import './App.css';
import React, {useEffect} from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {useParams, useHistory, withRouter} from "react-router-dom";
import Grid from '@material-ui/core/Grid';

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

class Fields extends React.Component {
    render(){
        return (
            <div>
                <TextField
                    required
                    fullWidth
                    id="title-field"
                    label="Title"
                    defaultValue={this.props.defaultTitle}
                    variant="filled"
                />
                <TextField
                    id="description-field"
                    fullWidth
                    label="Description"
                    defaultValue={this.props.defaultDescription}
                    multiline
                    variant="filled"
                />
                <AuthorMenu default={this.props.defaultAuthor} data={this.props.authorData}/>

            </div>

        );
    }
}


  

function EditBlog() {
  const classes = useStyles();
  const [defaultTitle, setDefaultTitle] = React.useState("");
  const [defaultDescription, setDefaultDescription] = React.useState("");
  const [defaultAuthor, setDefaultAuthor] = React.useState(0);
  const [authorData, setAuthorData] = React.useState(null);
  const history = useHistory();
  let { id } = useParams();

  useEffect(() => {
    getHttp(id);
    getHttpAuth();
  }, []);  

  const handleSubmit = event => {
    event.preventDefault();
    const fields = {
      title: document.getElementById('title-field').value,
      description: document.getElementById('description-field').value,
      author: document.getElementById('author-menu').children[1].children[1].value
    };
    sendHttp(fields, id);
  }
  
  function sendHttp(fields, id){
    const axios = require('axios');

    fields.author = parseInt(fields.author);
    axios.put('http://localhost:8000/blogs/'+ id + '/', fields)
      .then(function(response){
        // success
        console.log(response);
        history.push('/blogs/'+id);
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

    
    axios.get('http://localhost:8000/blogs/' + id)
      .then(function(response){
        // success
        console.log(response);
        
        setDefaultTitle(response.data.title);
        setDefaultDescription(response.data.description);
        setDefaultAuthor(response.data.author);
       // setReady(true);
      })
      .catch(function (error){
        // error
        console.log(error);
      })
      .then(function(){
        //always
      });

  }
  
  function getHttpAuth(){
    const axios = require('axios');

    
    axios.get('http://localhost:8000/authors/')
      .then(function(response){
        // success
        console.log(response);
        
        setAuthorData(response);
       // setReady2(true);
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
                <h1>Edit Project</h1>
                <div>
                <Grid container w='100%' h="100%" >
                  <Grid item xs={3}/>
                  
                  <Grid item xs={6}>
                    
                    <Grid container direction="column" alignItems="flex-start">

                        <Fields 
                            // ready = {ready} 
                            //ready2 = {ready2}
                            defaultTitle = {defaultTitle} 
                            defaultAuthor = {defaultAuthor}
                            authorData = {authorData}
                            defaultDescription = {defaultDescription}
                        />


                        <Button variant="contained" color="primary" type="submit">
                            Submit
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



export default EditBlog;
