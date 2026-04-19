import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { getLanguages } from "../../../components/services/translate.services";
import { SubmitLanguageInput, SubmitLanguageResult } from "../../../components/services/dashboard.services";

const Languages = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [labels, setLabels] = useState([]);
  const [dataCountsLanguageInput, setDataCountsLanguageInput] = useState([]);
  const [dataCountsLanguageResult, setDataCountsLanguageResult] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await getLanguages();
        const langs = res?.data;
        // console.log(langs)

        if (!Array.isArray(langs) || langs.length === 0) {
          console.log("Data kosong / salah format");
          return;
        }

        const labelNames = langs.map((item) => item.label);
        setLabels(labelNames);

        const countsInput = await Promise.all(
          labelNames.map(async (label) => {
            const input = await SubmitLanguageInput(label);
            return input.total;
            console.log("input", input)
          })
        );

        const countsResult = await Promise.all(
          labelNames.map(async (label) => {
            const result = await SubmitLanguageResult(label);
            return result.total;
            console.log("result", result)
          })
        );

        setDataCountsLanguageInput(countsInput);
        setDataCountsLanguageResult(countsResult);
        console.log("hasil fetch result", dataCountsLanguageResult);

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
            label: "Languages Input",
            data: dataCountsLanguageInput, 
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(225, 99, 132)",
            borderWidth: 2,
          },
          {
            label: "Languages Result",
            data: dataCountsLanguageResult, 
            backgroundColor: "rgb(54, 162, 235)",
            borderColor: "rgb(54, 162, 235)",
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

  }, [labels, dataCountsLanguageInput, dataCountsLanguageResult]);

  return <canvas ref={chartRef}></canvas>;
};


export default Languages;
