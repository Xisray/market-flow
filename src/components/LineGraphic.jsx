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
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { kMeansClustering } from "../utils/utils";
import { useMemo } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

function parseDate(dateString) {
  const [day, month, year] = dateString.split(".");
  return new Date(`${year}-${month}-${day}`);
}

function getChartData(productInfo) {
  if (!productInfo || productInfo.length === 0) {
    return {
      labels: [],
      datasets: [],
    };
  }

  return {
    // labels: productInfo.map((item) => item.date),
    datasets: [
      {
        label: "Спрос",
        data: productInfo.map((item) => ({
          x: parseDate(item.date),
          y: item.flow,
          cluster: item.cluster,
        })),
        borderColor: (context) => {
          if (!context.dataset.data) return getColorForCluster(-1);
          const point = context.dataset.data[context.dataIndex];
          return point
            ? getColorForCluster(point.cluster)
            : getColorForCluster(-1);
        },
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        segment: {
          borderColor: (ctx) => {
            const prevIndex = ctx.p0DataIndex;
            const nextIndex = ctx.p1DataIndex;

            if (prevIndex >= 0 && nextIndex >= 0) {

              // Используем цвет предыдущей точки для сегмента
              return ctx.p0
                ? getColorForCluster(ctx.p0.raw.cluster)
                : getColorForCluster(-1);
            }
            return getColorForCluster(-1);
          },
        },
      },
    ],
  };
}

const getColorForCluster = (cluster) => {
  switch (cluster) {
    case 0:
      return "rgba(255, 0, 55, 1)"; // Низкий спрос
    case 1:
      return "rgba(51, 121, 168, 1)"; // Средний спрос
    case 2:
      return "rgba(43, 255, 0, 1)"; // Высокий спрос
    default:
      return "rgba(169, 169, 169, 1)";
  }
};

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
      type: "time",
      time: {
        unit: "day",
        tooltipFormat: "dd.MM.yyyy",
        displayFormats: {
          day: "dd.MM.yyyy",
        },
      },
      title: {
        display: true,
        text: "Дата",
      },
    },
  },
};

export default function DefGraphic({ productData }) {
  const chartData = useMemo(() => {
    const clusteredData = kMeansClustering(productData || []);
    return getChartData(clusteredData);
  }, [productData]);
  return <Line data={chartData} options={options} />;
}
