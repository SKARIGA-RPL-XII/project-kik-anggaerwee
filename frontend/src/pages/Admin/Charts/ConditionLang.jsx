import {useRef, useEffect} from "react";
import { Chart } from "chart.js";
export default function ConditionLang() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current;

    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Inactive", "Active"],
        datasets: [
          {
            label: "Mslang",
            data: [40, 50],
            backgroundColor: [
              "rgb(231, 0, 11)",
              "rgb(0, 201, 80)",
            ],
            hoverOffset: 5,
          },
        ],
      },
    });

    return () => {
      myChart.destroy(); // supaya tidak double render
    };
  }, []);

  return <canvas ref={chartRef}></canvas>;
}
