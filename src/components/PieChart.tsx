import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import React from "react";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart: React.FC = () => {
  const data = {
    labels: ["Calon 1", "Calon 2", ],
    datasets: [
      {
        data: [40, 30],
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
            const percentage = ((value / 100) * 100).toFixed(2);
            return `${label}: ${percentage}%`;
          },
        },
      },
      datalabels: {
        display: true,
        color: "#ffffff", // Warna teks
        font: {
          size: 24,
          weight: "200",
          family: "Poppins",
          lineHeight: 1.5,
        },
        align: "center", // Posisi teks
        formatter: (value: any, context: any) => {
          return `${context.chart.data.labels[context.dataIndex]}`; // Tampilkan nama calon
        },
      },
    },
  };

  return (
    <div className="flex mt-4 items-center justify-center p-4">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
