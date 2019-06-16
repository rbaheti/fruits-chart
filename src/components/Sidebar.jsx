import React, {Component} from "react";
import {connect} from "react-redux";
import {Row, Col, Navbar, Nav} from "react-bootstrap";
import {setCurrentFruitIndex} from "../actions/fruitActions";

class Sidebar extends Component {
  onSidebarItemClicked = currentFruitIndex => {
    this.props.dispatch(setCurrentFruitIndex(currentFruitIndex));
  }

  render() {
    const fruits = this.props.fruits;
    if (!fruits || fruits.length === 0) return <p>Data not available</p>;

    return (
      <Navbar className="col-md-2 d-none d-md-block sidebar" bg="light">
        <Nav className="mr-auto flex-column">
          <Col>
            {fruits.map((d, i) =>
              <Nav.Link key={d.name}
                className={`fruit-sidebar-item ${(i === this.props.currentFruitIndex) ? "active" : ""}`}
                onClick={() => this.onSidebarItemClicked(i)}>
                {d.name}
              </Nav.Link>
            )}
          </Col>
        </Nav>
      </Navbar>
    );
  }
}

const mapSateToProps = state => ({
  fruits: state.fruits,
  currentFruitIndex: state.currentFruitIndex
});

export default connect(mapSateToProps)(Sidebar);