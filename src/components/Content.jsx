import React, {Component} from "react";
import {connect} from "react-redux";
import {setCurrentFruitTypeIndex} from "../actions/fruitActions";
import {Table} from "react-bootstrap";
import Chart from "./Chart";
import moment from "moment";

class Content extends Component {
  state = {
    currentFruitTypeIndex: 0
  }

  onFruitTypeClicked = currentFruitTypeIndex => {
    this.props.dispatch(setCurrentFruitTypeIndex(currentFruitTypeIndex));
  }

  getTimeSpanStr = deliciousnessData => {
    if (deliciousnessData.length < 2) {
      return "";
    }

    const minMaxTimestamps = deliciousnessData.reduce((minMax, dObj) => {
      minMax[0] =  minMax[0] === undefined || dObj.unixTimestamp < minMax[0] ? dObj.unixTimestamp : minMax[0];
      minMax[1] =  minMax[1] === undefined || dObj.unixTimestamp > minMax[1] ? dObj.unixTimestamp : minMax[1];
      return minMax;
    }, []);
    if (minMaxTimestamps[0] === undefined || minMaxTimestamps[1] === undefined) {
      return "";
    }

    const smallestMoment = moment(new Date(minMaxTimestamps[0] * 1000));
    const biggestMoment = moment(new Date(minMaxTimestamps[1] * 1000));
    return `covering a span of ${moment.duration(biggestMoment.diff(smallestMoment)).humanize()}`;
  }

  render() {
    const fruits = this.props.fruits;
    if (!fruits || fruits.length === 0) return <p>Data not available</p>;
    
    const currentFruitObj = this.props.fruits[this.props.currentFruitIndex];
    const fruitName = currentFruitObj.name;
    const numTypes = currentFruitObj.types.length;

    return (
      <div className="p-2 content">
        <h3>Fruit: {fruitName}</h3>
        <p>{numTypes} total types of {fruitName}</p>
        <div className="pb-3">
          <Table bordered hover>
            <thead>
              <tr>
                <th>Type</th>
                <th>Deliciousness</th>
              </tr>
            </thead>
            <tbody>
              {currentFruitObj.types.map((d, i) =>
                <tr key={d.name} className="deliciosnessTR" onClick={() => this.onFruitTypeClicked(i)}>
                  <td>{d.name}</td>
                  <td>{d.deliciousnessData.length} data point(s) {this.getTimeSpanStr(d.deliciousnessData)}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <Chart key={`${this.props.currentFruitIndex} - ${this.props.currentFruitTypeIndex}`}/>
      </div>
    );
  }
}

const mapSateToProps = state => ({
  fruits: state.fruits,
  currentFruitIndex: state.currentFruitIndex, 
  currentFruitTypeIndex: state.currentFruitTypeIndex
});

export default connect(mapSateToProps)(Content);
