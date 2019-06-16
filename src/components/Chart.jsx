import React, {Component} from "react";
import {connect} from "react-redux";
import {Line} from "react-chartjs-2";
import moment from "moment";

class Chart extends Component {
  state = {
    chartHeader: "Poverty Measures By Gender",
    chartLeftText: "A little bit of text about this chart. What does it all mean? Insights highlighted here."
  }

  cleanChartData = (chartXData, chartYData) => {
    console.log("abc");
    return {chartXData, chartYData};
  }

  render() {
    const currentFruitObj = this.props.currentFruitObj;
    const fruitName = currentFruitObj.name;
    const currentFruitTypeIndex = this.props.currentFruitTypeIndex;
    const fruitTypeName = currentFruitObj.types[currentFruitTypeIndex].name;
    
    // Get deliciousness data in ascending order of unixTimestamp.
    const deliciousnessData = currentFruitObj.types[currentFruitTypeIndex].deliciousnessData.slice();
    deliciousnessData.sort((a, b) => a.unixTimestamp - b.unixTimestamp);

    const rawXData = deliciousnessData.map(d => d.unixTimestamp);
    const rawYData = deliciousnessData.map(d => d.deliciousness);
    const {chartXData, chartYData} = this.cleanChartData(rawXData, rawYData);

    return (
      <div className="p-2">
        <h5 className="pb-4">{fruitName} / {fruitTypeName} / Deliciousness over time</h5>
        <Line
          data = {{
            labels: chartXData,
            datasets: [
              {
                label: "Delicousness",
                backgroundColor: "rgba(201, 219, 119)",
                borderColor: "rgba(201, 219, 119)",
                hover: {
                  animationDuration: 0
                },
                responsiveAnimationDuration: 0,
                data: chartYData
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
              intersect: false
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
                display: true,
                scaleLabel: {
                  display: true,
                  fontSize: 14,
                  labelString: "Time"
                },
                gridLines: {
                  display: false
                },
                ticks: {
                  maxTicksLimit: 8,
                  callback(value, index, values) {
                    const dateStr = moment.unix(value).format("MM/DD/YYYY");
                    const todayStr = moment(new Date()).format("MM/DD/YYYY");
                    return dateStr === todayStr ? "Today" : dateStr;
                  }
                }
              }],
              yAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  fontSize: 14,
                  labelString: "Level of Deliciousness"
                },
                ticks: {
                  min: 0,
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

export default connect()(Chart);
