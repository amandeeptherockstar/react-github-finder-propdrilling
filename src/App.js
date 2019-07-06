import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Users from './components/Users/Users';
import Search from './components/Users/Search/Search';
import About from './components/About/About';
import UserDetail from './components/Users/UserDetail/UserDetail';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      selectedUser: null,
      repos: [],
      repoPageCount: 1,
      totalSearchCount: null
    };

    this.searchUsers = this.searchUsers.bind(this);
  }

  // get Users from Gihub Based on search query
  async searchUsers(username) {
    console.log(username);
    const {data} = await axios.get(`https://api.github.com/search/users?q=${username}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);
    console.log(data);
    this.setState({
      users: data.items,
      selectedUser: null,
      totalSearchCount: data.total_count
    });
  }

  // clear users from local state
  clearUser = () => this.setState({ users: [] });

  // get single user detail from Github
  getSingleUser = async (username) => {
    const {data} = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);
    console.log(data);
    this.setState({
      selectedUser: data
    });
  }

  // get Repos from Github
  getRepos = async (username) => {
    const { repoPageCount } = this.state;
    console.log(repoPageCount);
    const {data} = await axios.get(`https://api.github.com/users/${username}/repos?page=${repoPageCount}&per_page=5&sort=created&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);
    console.log(data);
    this.setState({
      repos: data
    });
  }

  // get next repo 
  getNextRepos = (username) => {
    console.log('NEXT');
    this.setState((prevState) => {
      return {
        repoPageCount: prevState.repoPageCount + 1
      }
    }, () => this.getRepos(username));
  }
  // get previous repo
  getPreviousRepos = (username) => {
    if(this.state.repoPageCount > 1) {
      console.log('PREV');
      this.setState((prevState) => {
        return {
          repoPageCount: prevState.repoPageCount - 1
        }
      }, () => this.getRepos(username));
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route exact path="/home" render={(props) => {
                return (
                  <React.Fragment>
                    <Search searchUsers={this.searchUsers} userCount={this.state.users.length} clearUser={this.clearUser} />
                    <Users users={this.state.users} />
                  </React.Fragment>
                );
              }} />
              <Route exact path="/user/:username" render={(props) => <UserDetail {...props} fetchSingleUser={this.getSingleUser} user={this.state.selectedUser} fetchRepos={this.getRepos} repos={this.state.repos} nextRepos={this.getNextRepos} prevRepos={this.getPreviousRepos} /> } />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
