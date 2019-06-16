import React, {Component} from "react";
import {connect} from "react-redux";
import {Line} from "react-chartjs-2";
import moment from "moment";

const MaxChartDataPoints = 20;

class Chart extends Component {
  constructor(props) {
    super(props);

    const currentFruitObj = this.props.fruits[this.props.currentFruitIndex];
    const currentFruitTypeIndex = this.props.currentFruitTypeIndex;
    
    const deliciousnessData = currentFruitObj.types[currentFruitTypeIndex].deliciousnessData.slice();
    const {chartXData, chartYData, timeUnit} = this.getChartData(deliciousnessData);
    console.log("chosen time unit: ", timeUnit);

    this.state = {chartXData, chartYData, timeUnit};
  }

  // Returns the appropriate time unit to use in the plot. The time unit is chosen such that if
  // data is grouped by this time unit, the number of points dhown on the data will be <= MaxChartDataPoints.
  getAppropriateTimeUnit = deliciousnessData => {
    if (deliciousnessData.length <= 1) {
      return "day";
    }

    const smallestMoment = moment(new Date(deliciousnessData[0].unixTimestamp * 1000));
    const biggestMoment = moment(new Date(deliciousnessData[deliciousnessData.length - 1].unixTimestamp * 1000));
    const duration = moment.duration(biggestMoment.diff(smallestMoment));

    if (duration.asSeconds() <= MaxChartDataPoints) {
      return "second";
    }
    else if (duration.asMinutes() <= MaxChartDataPoints) {
      return "minute";
    }
    else if (duration.asHours() <= MaxChartDataPoints) {
      return "hour";
    }
    else if (duration.asDays() <= MaxChartDataPoints) {
      return "day";
    }
    else if (duration.asMonths() <= MaxChartDataPoints) {
      return "month";
    }
    else {
      return "year";
    }
  }

  // Returns the functions that returns the group by key to use for a
  // particular time unit during aggregation.
  getGroupByFunc = timeUnit => {
    switch (timeUnit) {
      case "second":
        return d => moment.unix(d).format("MM/DD/YYYY HH:mm:ss");
      case "minute":
        return d => moment.unix(d).format("MM/DD/YYYY HH:mm");
      case "hour":
        return d => moment.unix(d).format("MM/DD/YYYY HH");
      case "day":
        return d => moment.unix(d).format("MM/DD/YYYY");
      case "month":
        return d => moment.unix(d).format("MM/YYYY");
      default:
        return d => moment.unix(d).format("YYYY");
    }
  }

  // Groups the data by given time unit and returns the grouped data.
  // Key is the value returned by the group by function and value is
  // an array of original data points corresponding to the bucket.
  groupDataBy = (deliciousnessData, timeUnit) => {
    const groupedData = {};
    const groupByFunc = this.getGroupByFunc(timeUnit);
    deliciousnessData.forEach(d => {
      const bucket = groupByFunc(d.unixTimestamp);
      if (groupedData.hasOwnProperty(bucket)) {
        groupedData[bucket].push(d);
      }
      else {
        groupedData[bucket] = [];
        groupedData[bucket].push(d);
      }
    });
    return groupedData;
  }

  // Returns the data to use for the Line chart.
  // The returned object contains following 3 properties:
  // 1. chartXData: Unix timestamp values for the X axis
  // 2. chartYData: Deliciousness values for the Y axis
  // 3. timeUnit: Time unit property for the chart.
  getChartData = deliciousnessData => {
    deliciousnessData.sort((a, b) => a.unixTimestamp - b.unixTimestamp);
    
    const timeUnit = this.getAppropriateTimeUnit(deliciousnessData);
          
    if (deliciousnessData.length <= MaxChartDataPoints) {
      const chartXData = deliciousnessData.map(d => d.unixTimestamp);
      const chartYData = deliciousnessData.map(d => d.deliciousness);
      return {chartXData, chartYData, timeUnit};
    }

    const groupedData = this.groupDataBy(deliciousnessData, timeUnit);
    const chartXData = [], chartYData = [];
    for (const bucket of Object.values(groupedData)) {
      const totalDeliciousness = bucket.reduce((accumulator, d) => accumulator + d.deliciousness, 0);
      chartXData.push(moment.unix(bucket[0].unixTimestamp).startOf(timeUnit).unix());
      chartYData.push(totalDeliciousness / bucket.length);
    }
    return {chartXData, chartYData, timeUnit};
  }

  render() {
    const currentFruitObj = this.props.fruits[this.props.currentFruitIndex];
    const fruitName = currentFruitObj.name;
    const currentFruitTypeIndex = this.props.currentFruitTypeIndex;
    const fruitTypeName = currentFruitObj.types[currentFruitTypeIndex].name;

    return (
      <div>
        <h5 className="pb-4">{fruitName} / {fruitTypeName} / Deliciousness over time</h5>
        <Line
          data = {{
            labels: this.state.chartXData,
            datasets: [
              {
                label: "Delicousness",
                backgroundColor: "rgba(201, 219, 119)",
                borderColor: "rgba(201, 219, 119)",
                hover: {
                  animationDuration: 0
                },
                responsiveAnimationDuration: 0,
                data: this.state.chartYData
              }
            ]
          }}
          options={{
            responsive: true,
            title: {
              display: false
            },
            legend: {
              display: false
            },
            tooltips: {
              mode: "point",
              intersect: false,
              callbacks: {
                label(tooltipItem, data) {
                  // Round the deliciousness value to 2 decimal places.
                  let label = data.datasets[tooltipItem.datasetIndex].label || "";
                  if (label) {
                    label += ": ";
                  }
                  label += Math.round(tooltipItem.yLabel * 100) / 100;
                  return label;
                }
              }
            },
            elements: {
              line: {
                fill: false,
                tension: 0
              }
            },
            hover: {
              mode: "nearest",
              intersect: true
            },
            scales: {
              xAxes: [{
                type: "time",
                time: {
                  unit: this.state.timeUnit,
                  // Specify following to explicitly set X origin value.
                  // min: this.state.chartXMin,
                  parser: value => moment.unix(value),
                  displayFormats: {
                    day: "ll",
                    hour: "ll hA",
                    minute: "ll h:mm a",
                    second: "ll h:mm:ss a"
                  }
                },
                display: true,
                scaleLabel: {
                  display: true,
                  fontSize: 14,
                  labelString: "Time"
                },
                gridLines: {
                  display: false
                }
              }],
              yAxes: [{
                type: "linear",
                display: true,
                scaleLabel: {
                  display: true,
                  fontSize: 14,
                  labelString: "Level of Deliciousness"
                },
                ticks: {
                  min: 1,
                  max: 5,
                  stepSize: 1
                }
              }]
            }
          }}
        />
      </div>
    );
  }
}

const mapSateToProps = state => ({
  fruits: state.fruits,
  currentFruitIndex: state.currentFruitIndex, 
  currentFruitTypeIndex: state.currentFruitTypeIndex
});

export default connect(mapSateToProps)(Chart);
