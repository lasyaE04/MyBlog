import './App.css';
import React, {useEffect} from 'react';
import { Button } from '@material-ui/core';
import {useParams, withRouter} from "react-router-dom";

import { createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
  console.log(props);
  if(props.data != null){
    props.data.forEach(function(e){
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

function AuthorCard(props){
  const classes = useStyles();
  return (
    <Grid item xs={4}>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.data.name}
          </Typography>
          <Typography variant="body2" component="p">
            {props.data.bio}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
      
  );
}

function AuthorList(props){
  const list = [];

  if(props.data != null){
    
      props.data.data.forEach(function(e){
        list.push(<AuthorCard data={e} />);
        list.push(<br></br>);
        list.push(<BlogList data={e} />);
      });
      
  }
  if (list.length === 0) list.push(<h3>No Authors</h3>);
  return list;
}



function AuthorInfo(props){
    if (props.data === null) return (<h4></h4>);

    console.log(props);

    return (
      <div>
        <p>{props.data.data.bio}</p>
        <p>Blogs by {props.data.data.name}</p>
        
        <BlogList data={props.data.data.blog_set}/>
        
        <Button variant="contained" color="primary" href = "edit/">
          Edit
        </Button>
        

        <Button variant="contained" color="secondary" href = "edit/">
          Delete
        </Button>
  
      </div>
    );
  }



function AuthorDetail() {
    const [headertext, setHeadertext] = React.useState('loading');
    const [authorData, setAuthorData] = React.useState(null);
    let { id } = useParams();
  
    useEffect(() => {
      sendHttp(id);
    }, []);  
  
    function sendHttp(id){
      const axios = require('axios');
      
      axios.get('http://localhost:8000/authors/'+ id)
        .then(function(response){
          // success
          console.log(response);
          setHeadertext(response.data.name);
          setAuthorData(response);
        })
        .catch(function (error){
          // error
          console.log(error);
          setHeadertext('Error loading the author...please try again later');
  
        })
        .then(function(){
          //always
        });
  
    }
    
    
  
    return (
      <withRouter>
        <div>
          <h1 id="header-text">{headertext}</h1>
          <AuthorInfo data={authorData} id={id}/>
        </div>
      </withRouter>
      
      
    );
  }
  
  
  
export default AuthorDetail;
  