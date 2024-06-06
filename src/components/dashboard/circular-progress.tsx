import { useEffect } from "react";
interface IProps{
    label: string
    progress: number
}
const RadialBarChart = ({label, progress}: IProps) => {
    useEffect(() => {
      const options = {
        chart: {
          height: 280,
          type: "radialBar",
        },
        series: [progress],
        colors: ["#FF4560"],
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: "60%",
              background: "#293450",
            },
            track: {
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                blur: 4,
                opacity: 0.15,
              },
            },
            dataLabels: {
              name: {
                offsetY: -10,
                color: "#fff",
                fontSize: "13px",
              },
              value: {
                color: "#fff",
                fontSize: "30px",
                show: true,
              },
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "vertical",
            gradientToColors: ["#FE9010"],
            stops: [0, 100],
          },
        },
        stroke: {
          lineCap: "round",
        },
        labels: [label],
      };
  
      const chart = new ApexCharts(document.querySelector("#chart"), options);
  
      chart.render();
  
      // Cleanup function to destroy the chart instance
      return () => {
        chart.destroy();
      };
    }, [label, progress]); // Empty dependency array to ensure the effect runs only once
  
    return <div id="chart"></div>;
  };
  
  export default RadialBarChart;