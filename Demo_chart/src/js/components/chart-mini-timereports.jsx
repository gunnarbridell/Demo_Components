// ** Component for <chart-mini-timereports></chart-mini-timereports>
// ** Created on app-dashboard

import { getOptionData, getDiagramData } from "../charts/mini-timereportsData";
import { diagram_width, diagram_height } from "../api/reportsApi";
const debug = true;

//let diagram_height1 = "200";
const templ = document.createElement("template");
templ.innerHTML = `
    <style>
        
        .main {
            margin-bottom: 30px;
        }

    </style>
     
    <div class="main">
        <canvas id="chart" width=${diagram_width} height=${diagram_height}>
        Diagram
        </canvas>
    </div>


`;
//

class ChartMiniTimereports extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.root.appendChild(templ.content.cloneNode(true));

    this._chartData; // holds json data (first time from index.js)
    this.chart; // holds chart
  } //constructor

  setChartData(chartData) {
    this._chartData = chartData;
  }

  // ** Runs once when init
  connectedCallback() {
    // ** draw chart
    this.drawChart(this._chartData);
  }

  drawChart(json) {
    const diagramData = getDiagramData(json); //Imported function
    const optionData = getOptionData(json);
    const ctx = this.root.querySelector("#chart").getContext("2d");

    this.chart = new Chart(ctx, {
      type: "line",
      data: diagramData,
      options: optionData, //imported
    });
  } //drawChart
} //Class

customElements.define("chart-mini-timereports", ChartMiniTimereports);
