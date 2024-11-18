import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostList from './views/post/PostList';
import PostCreate from './views/post/PostCreate';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS import

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/post/new" component={PostCreate} />
        <Route path="/post" component={PostList} />
      </Switch>
    </Router>
  );
}

export default App;
