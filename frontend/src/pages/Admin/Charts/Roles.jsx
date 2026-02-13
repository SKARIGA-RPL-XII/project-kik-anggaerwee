import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { TotalRoleAdmin, TotalRoleUser } from "../../../components/services/dashboard.services";

export default function Roles() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const totaluser = await TotalRoleUser();
      const totaladmin = await TotalRoleAdmin();
      const adminCount = totaladmin.totalrole_admin;
      const userCount = totaluser.totalrole_user;
      const ctx = chartRef.current;

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Admin", "User"],
          datasets: [
            {
              label: "Table User",
              data: [adminCount, userCount],
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
