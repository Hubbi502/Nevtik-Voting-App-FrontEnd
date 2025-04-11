import { candidateApi } from "@/lib/api";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart: React.FC = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [persen, setPersen] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await candidateApi.getVotePercentages();
        setLabels(response.data.map((item: any) => item.name));
        setPersen(response.data.map((item: any) => parseFloat(item.percentage)));
      } catch (error) {
        console.error("Gagal ambil data persentase suara:", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        data: persen,
        backgroundColor: ["#CF4100", "#FE4F2D", "#FF0004"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            const label = context.label;
            return `${label}: ${value}%`;
          },
        },
      },
      datalabels: {
        display: true,
        color: "#ffffff",
        font: {
          size: 24,
          weight: 400,
          family: "Poppins",
          lineHeight: 1.5,
        },
        align: "center" as const,
        formatter: (_value: any, context: any) => {
          return `${context.chart.data.labels[context.dataIndex]}`;
        },
      },
    },
  };

  return (
    <div className="flex mt-4 items-center justify-center p-4">
      {labels.length > 0 && persen.length > 0 ? (
        <Pie data={data} options={options} />
      ) : (
        <p className="text-center text-gray-500">Loading chart...</p>
      )}
    </div>
  );
};

export default PieChart;
