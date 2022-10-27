import './App.css';
import React, {useEffect} from 'react';
import { Button } from '@material-ui/core';
import Link, {useHistory, useParams, withRouter} from "react-router-dom";

import { createTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';


const theme = createTheme({
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: green[500],
      },
    },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: 225,
    textAlign: 'left',
    padding: theme.spacing(4),
    '& > *': {
      margin: theme.spacing(1),
      width: '60ch',
    },
  },
}));



function BlogInfo(props){
  //  const classes = useStyles();
  //const [open, setOpen] = React.useState(false);
    const history = useHistory();
    if (props.data === null) return (<h4>Nothing...</h4>);
  
    
    const confirmDelete = () => {
      sendHttpDel(props.id);
    }

    function sendHttpDel(id){
      const axios = require('axios');
      
      axios.delete('http://localhost:8000/blogs/'+id)
        .then(function(response){
          // success
          console.log(response);
          history.push("/blogs/");
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
      <div>
        <h3>{props.data.data.author}</h3>
        <p>{props.data.data.description}</p>
        <Button variant="contained" color="primary" href = "edit/">
          Edit
        </Button>
  
        <Button autoFocus onClick={confirmDelete} color="secondary">
          Delete
        </Button>
  
      </div>
    );
  }
  

  function BlogDetail() {
    //const classes = useStyles();
    const [headertext, setHeadertext] = React.useState('loading');
    const [blogData, setBlogData] = React.useState(null);
    let { id } = useParams();
  
    useEffect(() => {
      sendHttp(id);
    }, []);  
  
    function sendHttp(id){
      const axios = require('axios');
      
      axios.get('http://localhost:8000/blogs/'+id)
        .then(function(response){
          // success
          console.log(response);
          setHeadertext(response.data.title);
          setBlogData(response);
        })
        .catch(function (error){
          // error
          console.log(error);
          setHeadertext('Error loading the blog...');
  
        })
        .then(function(){
          //always
        });
  
    }
    
    
  
    return (
      <withRouter>
        <div>
          <h1 id="header-text">{headertext}</h1>
          <BlogInfo data={blogData} id={id}/>
        </div>
      </withRouter>
      
      
    );
  }
  
  
  
export default BlogDetail;
  