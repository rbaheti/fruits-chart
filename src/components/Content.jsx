import React, {Component} from "react";
import {connect} from "react-redux";
import {Row, Col, Navbar, Nav} from "react-bootstrap";

class Content extends Component {
  state = {
  }

  render() {
    const fruits = this.props.fruits;
    if (!fruits || fruits.length === 0) return <p>Data not available</p>;
    
    return (
      <div>
        <h3>Fruit: {this.props.fruits[this.props.currentFruit].name}</h3>
      </div>
    );
  }
}

const mapSateToProps = state => ({
  fruits: state.fruits,
  currentFruit: state.currentFruit
});

export default connect(mapSateToProps)(Content);
