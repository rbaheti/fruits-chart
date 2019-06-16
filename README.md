# Fruits Chart
  
React single page application that visualizes the deliciousness of different types of fruits. You can choose a fruit from the sidebar on the left and then the sub-type of the fruit from the table. Delicousness data of the chosen fruit type is then shown in a Line chart. If the number of data points are too many (more than MaxChartDataPoints or 20), the data is aggregated (i.e. averaged) at some higher time granularity to reduce the number of data points to below MaxChartDataPoints.

# Libraries Used
1. `react-redux` to store the state of the app in Redux store.
2. `react-bootstrap` to make the app beautiful.
3. `react-chartjs-2` to plot the Line chart.
4. `moment` to perform various time related operations.

# Data
The app currently uses static data read from `src/utils/_DATA.js`. The app can be trivially modified to read the data from a server instead.

# Future Work
1. The Line chart sometimes does not show the value at the origin when the smallest data point is not the beginning of the chosen time unit (i.e. beginning of the day, hour etc.). This does not look good. We could probably use some other chart library e.g. D3 to fix this issue and have more control over the chart.
2. At lower screen sizes we could show a hamburger icon for the sidebar instead of completely hiding it.
3. Further improvements on how large list of fruits or fruit types are visualized.

## How to install and run the app:
1. `npm i`  // To install all package dependencies.
2. `npm start`  // To start the app.
3. Visit `http://localhost:3000/` in your browser.