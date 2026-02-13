import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { getLanguages } from "../../../components/services/translate.services";
import { SubmitLabels } from "../../../components/services/dashboard.services";

const Languages = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [labels, setLabels] = useState([]);
  const [dataCounts, setDataCounts] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await getLanguages();
        const langs = res?.data;

        if (!Array.isArray(langs) || langs.length === 0) {
          console.log("Data kosong / salah format");
          return;
        }

        const labelNames = langs.map((item) => item.label);
        setLabels(labelNames);

        const counts = await Promise.all(
          labelNames.map(async (label) => {
            const result = await SubmitLabels(label);
            return result.total;
          })
        );

        setDataCounts(counts);

      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchLanguages();
  }, []);

  useEffect(() => {
    if (!labels.length) return;

    const ctx = chartRef.current;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Languages",
            data: dataCounts, 
            backgroundColor: "rgb(25, 60, 184)",
            borderColor: "rgb(25, 60, 184)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

  }, [labels, dataCounts]);

  return <canvas ref={chartRef}></canvas>;
};


export default Languages;
