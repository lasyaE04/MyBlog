import './App.css';

import AddBlog from './AddBlog';
import EditBlog  from './EditBlog';
import AddAuthor from './AddAuthor';
import EditAuthor from './EditAuthor';
import Blogs from './Blogs';
import BlogDetail from './BlogDetail';
import Authors from './Authors';
import AuthorDetail from './AuthorDetail';

import React from 'react';
import Button from '@material-ui/core/Button';
import {createTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

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

function Home(){

  return(
    <div>
      <h2>
        Welcome to MyBlog
      </h2>
      
      <Button variant="contained" color="primary" href = "blogs/">
        Blogs
      </Button>
  
      <Button variant="contained" color="primary" href = "authors/">
        Authors
      </Button>
          
    </div>
  );
}



function App() {

  return (

    <Router>
      <div className="App">
        <header className="App-header">

        
          <ThemeProvider theme={theme}>
            
            <Grid container spacing = {3} w='100%' h="100%" justifyContent="center">
              <Grid item xs={2}></Grid>
              <Grid item xs={8} style={{}}>
                <Switch>
                <Route path = "/" exact component={Home}/>
                <Route path = "/blogs/" exact component = {Blogs}/>
                <Route path = "/blogs/add/" exact component = {AddBlog}/>
                <Route path = "/blogs/:id/" exact component={BlogDetail}/>
                <Route path = "/blogs/:id/edit/" exact component={EditBlog}/>
                <Route path = "/authors/" exact component = {Authors}/>
                <Route path = "/authors/add/" exact component={AddAuthor}/>
                <Route path = "/authors/:id/" exact component={AuthorDetail}/>
                <Route path = "/authors/:id/edit/" exact component={EditAuthor}/>
                </Switch>
                
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>

          </ThemeProvider>
        </header>
      </div>
      
      
    </Router>
  );
}

export default App;
