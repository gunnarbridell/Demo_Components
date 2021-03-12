import "./chart-mini-timereports.jsx";
import { dashBoardUrl } from "../api/reportsApi.js";
console.log(dashBoardUrl);
const templ = document.createElement("template");
templ.innerHTML = `
   <style>
          .hide {
            display:none;
          }

          .waitMsg {
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            font-size: 14px;
            margin: 20px;
            padding: 10px;
            text-align: center;
            color: black;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
          }


    </style>
    
   

    
    <div id="dash-board-diagram">
      <div class="container-mini" >
        
        <div id="timeRepCurrMonth" class="chart-mini">
        </div>

      </div>
  </div>
`;

class DashBoard extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = templ.innerHTML;
  } //constructor

  //Runs once when init
  connectedCallback() {
    this.initChart();
  } //connectedCallback

  initChart() {
    //Read attribute from index HTML
    const dashBoard = document.querySelector("dash-board");
    if (dashBoard) {
      // Loding msg
      var node = document.createElement("div"); // Create node
      node.setAttribute("class", "waitMsg");
      var textnode = document.createTextNode("Hämtar data....."); // Create a text node
      node.appendChild(textnode); // Append the text
      dashBoard.appendChild(node);

      const settings = {};
      settings.endpoint = dashBoardUrl;
      settings.node = node;

      createCharts(settings);
    }
  }
} //Class

const createCharts = async (settings) => {
  // Hide diagram until data is ready
  const dashBoardDiagrm = document.querySelector("#dash-board-diagram");
  dashBoardDiagrm.classList.add("hide");

  var startDate = new Date();

  const res = await fetch(settings.endpoint);
  const json = await res.json();

  var endDate = new Date();
  var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
  console.log(`Time yo fetch data: ${seconds} sec  `);

  //Remove msg
  settings.node.remove();

  dashBoardDiagrm.classList.remove("hide");
  console.log(json);
  const chart = document.querySelector("#timeRepCurrMonth");

  // MiniChart TimeReports
  const element = document.createElement("chart-mini-timereports");
  element.setChartData(json.timeReportsMini);
  chart.appendChild(element);
}; //createChart

customElements.define("dash-board", DashBoard);
