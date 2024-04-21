"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import styled from "styled-components";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export interface PokemonStats {
  data: {
    statName: string[];
    statValue: number[];
  };
}

const RadarChartContainer = styled.div`
  width: 570px;

  @media (max-width: 425px) {
    width: 400px;
  }

  @media (max-width: 375px) {
    width: 320px;
  }
`;

const RadarChart = ({ data }: PokemonStats) => {
  const options: ApexOptions = {
    chart: {
      height: 420,
      type: "radar",
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      radar: {
        size: 150,
        polygons: {
          strokeColors: "#e9e9e9",
          fill: {
            colors: ["#f8f8f8", "#fff"],
          },
        },
      },
    },
    title: {
      text: "Base stats",
      style: {
        color: "#fff",
        fontSize: "32px",
      },
    },
    colors: ["#FF4560"],
    markers: {
      size: 4,
      colors: ["#fff"],
      strokeColors: "#FF4560",
      strokeWidth: 2,
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return val;
        },
      },
    },
    xaxis: {
      categories: data.statName,
      labels: {
        style: {
          colors: [
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
          ],
          fontSize: "16px",
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        formatter: function (val: any, i: any) {
          if (i % 2 === 0) {
            return val;
          } else {
            return "";
          }
        },
        style: {
          colors: "#000",
        },
      },
    },
    responsive: [
      {
        breakpoint: 426,
        options: {
          plotOptions: {
            radar: {
              size: 100,
            },
          },
          xaxis: {
            categories: data.statName,
            labels: {
              style: {
                colors: [
                  "#fff",
                  "#fff",
                  "#fff",
                  "#fff",
                  "#fff",
                  "#fff",
                  "#fff",
                  "#fff",
                ],
                fontSize: "13px",
                fontWeight: 300,
              },
            },
          },
        },
      },
    ],
  };

  const series = [
    {
      name: "Stats",
      data: data.statValue,
    },
  ];
  return (
    <RadarChartContainer>
      <ApexChart
        options={options}
        series={series}
        type="radar"
        height={420}
        width={"100%"}
      />
    </RadarChartContainer>
  );
};

export default RadarChart;
