import './App.css';
import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';


import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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

function BlogCard(props){
    const classes = useStyles();

    return (
      <Grid item xs={4}>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {props.data.title}
            </Typography>
            <Typography variant="body2" component="p">
              {props.data.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href={"/blogs/" + props.data.id + "/"}>Read More</Button>
          </CardActions>
        </Card>
      </Grid>
        
    );
}

function BlogList(props){
    const list = [];
    if(props.data != null){
      props.data.data.forEach(function(e){
        list.push(<BlogCard data={e} />);
      });   
    }
    if (list.length === 0) list.push(<h3>No Blogs</h3>);
    return (
      <Grid container spacing = {3} w='100%' h="100%">
        {list}
      </Grid>
      
    );
}



function Blogs() {
    const classes = useStyles();
    const [headertext, setHeadertext] = React.useState(0);
    const [blogData, setBlogData] = React.useState(null);
  
  
    useEffect(() => {
      sendHttp();
    }, []);  
  
    function sendHttp(){
      const axios = require('axios');
    
      axios.get('http://localhost:8000/blogs/')
        .then(function(response){
          // success
          console.log(response);
          setHeadertext('Blogs');
          setBlogData(response);
        })
        .catch(function (error){
          // error
          //debugger;
          console.log(error);
          setHeadertext('Error...');
        })
        .then(function(){
          //always
        });
  
    }
    
    return (
      <div>
        <h1 id="header-text">{headertext}</h1>
        <div className = {classes.root}>
          
            <BlogList data={blogData}/>
            
            <Button variant="contained" color="primary" href = "add/">
                Add Blog
            </Button>
            
        </div>
      </div>
      
    );
  }
  
  
  
export default Blogs;
  
  
  