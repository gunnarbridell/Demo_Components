import { addMonths, format } from "date-fns";

const debug = false;
if (debug) console.log("-- reprortsApi --");

//Calc relica id from HTML document
/*
<div class="div-replid">
  <span this_db_replid ="C12585740026A8A"></span>
</div>
*/
const replDiv = document.querySelector("#div-replid");
const replicaid = replDiv.children[0].getAttribute("this_db_replid");

// set widh depending on formspace, workspace in xpages url
let diagram_height = "300";
let diagram_width = "900";
if (window.location.href.indexOf("workspace") != -1) {
  diagram_width = "800";
}

if (debug) console.log("Diagram width: " + diagram_width);

// ** Calc url
let site = window.location.hostname;
if (debug) console.log(`Site: ${site}`);

// /gb/api.nsf/chart-component/index.html
let path = window.location.pathname;
path = `/solute/api.nsf/api.xsp/chart`;

if (site === "127.0.0.1" || site === "localhost") {
  site = "logu.solute.com";
  path = `/solute/api.nsf/api.xsp/chart`;
}
const mainUrl = `https://${site}${path}?`;
//const timeReportsFullUrl = mainUrl + `type=timereports&month=${year}${month}`;
const timeReportsFullUrl = mainUrl + `type=timereports`;
const materialFullUrl = mainUrl + `type=material`;
const invoiceFullUrl = mainUrl + `type=invoice`;
const dashBoardUrl = mainUrl + `type=dashboard&replid=${replicaid}`;

//Create period options
const periodOptions = () => {
  // let value = ["2020-09", "2020-08", "2020-07", "2020-06"];
  const today = new Date();
  const noOfMonth = 24;
  var arrPeriod = new Array();
  arrPeriod[0] = format(today, "yyyy-MM");
  let i = 0;
  for (i = 1; i < noOfMonth; i++) {
    const nextDate = addMonths(today, -i);
    arrPeriod[i] = format(nextDate, "yyyy-MM");
  }

  let options_str = "";
  arrPeriod.forEach(function (value) {
    options_str +=
      '<option value="' + value.replace("-", "") + '">' + value + "</option>";
  });
  return options_str;
};

//if (debug) console.log(`Year Month: ${year} ${month}`);
if (debug) console.log(`Timereports: ${timeReportsFullUrl}`);
if (debug) console.log(`Material: ${materialFullUrl}`);
if (debug) console.log(`Replicaid: ${replicaid}`);

if (debug) console.log("-- reprortsApi end--");

export {
  diagram_width,
  diagram_height,
  mainUrl,
  invoiceFullUrl,
  timeReportsFullUrl,
  materialFullUrl,
  dashBoardUrl,
  replicaid,
  periodOptions,
};

/*
year,
  month,
  dateKey,
*/
