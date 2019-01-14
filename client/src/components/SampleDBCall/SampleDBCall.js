import React, { Component } from 'react';

const exampleData = {
    "users": [
      { "id": 1, "name": "Paul",  "active": "true" },
      { "id": 2, "name": "Fred", "active": "false" }
    ] 
  }

class SampleDBCall extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: true,
        items: [
            { "id": 1, "name": "Paul",  "active": "true" },
            { "id": 2, "name": "Fred", "active": "false" }
        ]
      };
    }
  
    componentDidMount() {
        /*
      fetch("./api/users")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result.items
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error: error
            });
          }
        )
        */
    }
  
    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <ul>
            {items.map(item => (
              <li key={item.id}>
                Username: {item.name} Active: {item.active}.
              </li>
            ))}
          </ul>
        );
      }
    }
  }

  export default SampleDBCall;