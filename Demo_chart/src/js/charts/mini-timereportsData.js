import { green, blue } from "../api/colors.js";

const getDiagramData = (json) => {
  const data = json;
  const datesObj = data.monthData;

  const diagramData = {
    labels: datesObj.dates,
    lables: [1, 2],

    datasets: [
      {
        label: "NORMAL TID",
        fill: false,
        data: data.summary.totalBudgetHours,
        backgroundColor: green,
        borderColor: green,
      },
      {
        label: "Summa alla resurser",
        fill: false,
        data: data.summary.totalReportedHours,
        backgroundColor: blue,
        borderColor: blue,
      },
    ],
  };

  return diagramData;
};

const getOptionData = (json) => {
  const datesObj = json.monthData;
  const titleText = `Rapporterad tid per resurs ${datesObj.monthName} ${datesObj.year} `;

  const optionData = {
    responsive: false,
    title: {
      display: true,
      text: titleText,
    },
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Dag",
          },
        },
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Timmar",
          },
        },
      ],
    },
  };

  return optionData;
};

export { getOptionData, getDiagramData };
