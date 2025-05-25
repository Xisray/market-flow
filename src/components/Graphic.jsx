import { Scatter } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
} from "chart.js";
import { kMeansClustering } from "../utils/utils";
import { useMemo } from "react";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale);

const options = {
  responsive: true,
  // interaction: {
  //   mode: "index",
  //   intersect: false,
  // },
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
    x: {
      type: 'time',
      time: {
        unit: 'day',
        tooltipFormat: 'dd.MM.yyyy',
        displayFormats: {
          day: 'dd.MM.yyyy'
        }
      },
      title: {
        display: true,
        text: 'Дата'
      }
    }
  },
};

function parseDate(dateString) {
  const [day, month, year] = dateString.split(".");
  return new Date(`${year}-${month}-${day}`);
}

function getChartData(productInfo) {
  if (!productInfo || productInfo.length === 0 || !Array.isArray(productInfo)) {
    return {
      labels: [],
      datasets: [],
    };
  }

  return {
    datasets: [
      {
        label: "Низкий спрос",
        data: productInfo
          .filter((point) => point.cluster === 0)
          .map((point) => ({
            x: parseDate(point.date),
            y: point.flow,
          })),
        backgroundColor: "rgba(255, 0, 55, 0.5)",
        pointRadius: 8,
      },
      {
        label: "Средний спрос",
        data: productInfo
          .filter((point) => point.cluster === 1)
          .map((point) => ({
            x: parseDate(point.date),
            y: point.flow,
          })),
        backgroundColor: 'rgba(51, 121, 168, 0.7)',
        pointRadius: 8,
      },
      {
        label: "Высокий спрос",
        data: productInfo
          .filter((point) => point.cluster === 2)
          .map((point) => ({
            x: parseDate(point.date),
            y: point.flow,
          })),
        backgroundColor: 'rgba(43, 255, 0, 0.7)',
        pointRadius: 8,
      },
    ],
  };
}

export default function Graphic({ productData }) {
  const chartData = useMemo(() => {
    const clusteredData = kMeansClustering(productData || []);
    return getChartData(clusteredData);
  }, [productData]);

  return <Scatter data={chartData} options={options} />;
}
