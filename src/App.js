import React, {Component} from "react";
import {connect} from "react-redux";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import {getFruits} from "./actions/getFruits";
import {Row} from "react-bootstrap";
import "./App.css";

class App extends Component {

  componentDidMount() {
    this.props.dispatch(getFruits());
  }

  render() {
    return (
      <div>
        <Row>
          <Sidebar/>
        </Row>
        <div className="col-md-9 ml-sm-auto col-lg-10">
          <Content/>
        </div>
      </div>
    );
  }
}

const mapSateToProps = state => ({
  fruits: state.fruits
});

export default connect(mapSateToProps)(App);
