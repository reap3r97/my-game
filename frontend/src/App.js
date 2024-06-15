import React, { Component } from 'react';
import './App.css';

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
      console.log("HI");
    } catch (error) {
      this.setState({ error: error, loading: false });
    }
  }

  render() {
    const { loading, error } = this.state;

    if (loading) {
      return <div>
        <h1>React App</h1>
      </div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div>
        <h1>React App</h1>
      </div>
    );
  }
}

export default App;
