export function sortInvoicesByDate(invoices) {
  return invoices.slice().sort((a, b) => {
    const parseDate = (dateStr) => {
      const [day, month, year] = dateStr.split(".");
      return new Date(`${year}-${month}-${day}`);
    };

    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);

    return dateA - dateB;
  });
}

export function addDates(invoices) {
  const startDate = new Date(2014, 0, 1); // 1 января 2014
  return invoices.map((invoice, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index); // Добавляем дни

    // Форматируем дату с ведущими нулями
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы 0-11
    const year = date.getFullYear();

    // Создаем новый объект, а не мутируем исходный
    return {
      ...invoice,
      date: `${day}.${month}.${year}`
    };
  });
}

export function mergeInvoicesByDate(invoices) {
  const mergedInvoices = {};

  invoices.forEach((invoice) => {
    if (!mergedInvoices[invoice.date]) {
      mergedInvoices[invoice.date] = {
        date: invoice.date,
        items: [...invoice.items],
      };
    } else {
      mergedInvoices[invoice.date].items.push(...invoice.items);
    }
  });

  return Object.values(mergedInvoices);
}

export function kMeansClustering(data, k = 3, maxIterations = 100) {
  // Нормализация данных
  const normalize = arr => {
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    return arr.map(val => (val - min) / (max - min));
  };

  const demands = data.map(d => d.flow);
  const normalizedDemands = normalize(demands);

  // Инициализация центроидов
  let centroids = [];
  for (let i = 0; i < k; i++) {
    centroids.push({
      demand: Math.random(),
      originalIndex: Math.floor(Math.random() * data.length)
    });
  }

  let clusters = Array(k).fill().map(() => []);
  let iterations = 0;

  while (iterations < maxIterations) {
    // Распределение точек по кластерам
    clusters = Array(k).fill().map(() => []);

    normalizedDemands.forEach((demand, index) => {
      let minDist = Infinity;
      let clusterIndex = 0;

      centroids.forEach((centroid, i) => {
        const dist = Math.abs(demand - centroid.demand);
        if (dist < minDist) {
          minDist = dist;
          clusterIndex = i;
        }
      });

      clusters[clusterIndex].push(index);
    });

    // Обновление центроидов
    const newCentroids = clusters.map(cluster => {
      if (cluster.length === 0) return { demand: Math.random() };

      const avgDemand = cluster.reduce((sum, idx) => sum + normalizedDemands[idx], 0) / cluster.length;
      return { demand: avgDemand };
    });

    // Проверка на сходимость
    if (centroids.every((c, i) => Math.abs(c.demand - newCentroids[i].demand) < 0.001)) {
      break;
    }

    centroids = newCentroids;
    iterations++;
  }

  // Сортировка кластеров по уровню спроса
  const sortedClusters = clusters
    .map((cluster, i) => ({
      indices: cluster,
      centroid: centroids[i].demand
    }))
    .sort((a, b) => a.centroid - b.centroid);

  // Помечаем данные кластерами
  const result = data.map((item, index) => {
    let cluster = 0;
    sortedClusters.forEach((c, i) => {
      if (c.indices.includes(index)) cluster = i;
    });
    return { ...item, cluster };
  });

  return result;
}
