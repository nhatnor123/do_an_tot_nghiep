import React from "react";
import { CChartLine } from "@coreui/react-chartjs";
import { hexToRgba } from "@coreui/utils";

const MainChartExample = (attributes) => {
  console.log("Attribute =", attributes);
  let detailStat = attributes.detailStat;
  let maxStat = Math.max.apply(
    Math,
    detailStat.map((o) => o.quantity)
  );
  let statLabel = attributes.statLabel;
  let statColor = attributes.statColor;

  const defaultDatasets = [
    {
      label: statLabel,
      backgroundColor: hexToRgba(statColor, 10),
      borderColor: statColor,
      pointHoverBackgroundColor: statColor,
      borderWidth: 2,
      data: detailStat.map((stat) => stat.quantity),
    },
  ];

  const defaultOptions = (() => {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5),
              max: parseInt((maxStat * 3) / 2) + 1,
            },
            gridLines: {
              display: true,
            },
          },
        ],
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    };
  })();

  // render
  return (
    <CChartLine
      {...attributes}
      datasets={defaultDatasets}
      options={defaultOptions}
      labels={detailStat.map((stat) => stat.dateTime)}
    />
  );
};

export default MainChartExample;
