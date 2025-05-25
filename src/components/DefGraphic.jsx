import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function getChartData(productInfo) {
  if (!productInfo || productInfo.length === 0) {
    return {
      labels: [],
      datasets: [],
    };
  }

  return {
    labels: productInfo.map((item) => item.date),
    datasets: [
      {
        label: "Спрос",
        data: productInfo.map((item) => item.flow),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
    ],
  };
}

const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
      title: {
        display: true,
        text: "Спрос",
      },
    },
  },
};

export default function DefGraphic({productData}) {
  return (
    <Line data={getChartData(productData)} options={options} />
  )
}
