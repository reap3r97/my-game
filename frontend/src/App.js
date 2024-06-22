import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingPage/LandingPage';
import './App.css';
import { CssBaseline } from '@mui/material';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null
    };
  }

  async componentDidMount() {
    try {
      // Simulate fetching initial data
      await this.fetchInitialData();
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }

  fetchInitialData() {
    // Simulate async operation (e.g., API call)
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Fetching initial data...");
        resolve();
      }, 2000);
    });
  }

  render() {
    const { loading, error } = this.state;

    if (loading) {
      return (
        <div class="landingPage">
          <div className="spinner"></div>
          {/* <h1>Loading...</h1> */}
        </div>
      );
    }

    if (error) {
      return (
        <div>
          <h1>Error: {error}</h1>
        </div>
      );
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <div className="App">
            <Routes>
              <Route exact path="/" element={<LandingPage />} />
              {/* Add more routes as needed */}
            </Routes>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
