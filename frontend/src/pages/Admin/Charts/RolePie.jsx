import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { TotalActiveLang, TotalInactiveLang } from "../../../components/services/dashboard.services";

export default function RolePie() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const totalactive = await TotalActiveLang();
      const totalinactive = await TotalInactiveLang();
      const activeCount = totalactive.total_activelang;
      const inactiveCount = totalinactive.total_inactivelang;
      const ctx = chartRef.current;

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Active", "Inactive"],
          datasets: [
            {
              label: "Table Language",
              data: [activeCount, inactiveCount],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
              ],
              hoverOffset: 5,
            },
          ],
        },
      });
    };

    fetchData();
  }, []);

  return <canvas ref={chartRef}></canvas>;
}
