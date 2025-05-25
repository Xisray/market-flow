import { createWriteStream } from 'fs';
import { join } from 'path';

const products = [
  {
    name: "Смартфон",
    quantity: { from: 1, to: 15 },
    price: { from: 8000, to: 150000 }
  },
  {
    name: "Ноутбук",
    quantity: { from: 1, to: 8 },
    price: { from: 25000, to: 300000 }
  },
  {
    name: "Наушники беспроводные",
    quantity: { from: 1, to: 20 },
    price: { from: 1000, to: 40000 }
  },
  {
    name: "Умные часы",
    quantity: { from: 1, to: 12 },
    price: { from: 2000, to: 50000 }
  },
  {
    name: "Планшет",
    quantity: { from: 1, to: 10 },
    price: { from: 10000, to: 120000 }
  },
  {
    name: "Электронная книга",
    quantity: { from: 1, to: 15 },
    price: { from: 5000, to: 30000 }
  },
  {
    name: "Игровая консоль",
    quantity: { from: 1, to: 5 },
    price: { from: 20000, to: 80000 }
  },
  {
    name: "Фотоаппарат",
    quantity: { from: 1, to: 7 },
    price: { from: 15000, to: 150000 }
  },
  {
    name: "Телевизор",
    quantity: { from: 1, to: 6 },
    price: { from: 15000, to: 250000 }
  },
  {
    name: "Монитор",
    quantity: { from: 1, to: 9 },
    price: { from: 8000, to: 100000 }
  },
  {
    name: "Компьютерная мышь",
    quantity: { from: 1, to: 25 },
    price: { from: 300, to: 10000 }
  },
  {
    name: "Клавиатура",
    quantity: { from: 1, to: 20 },
    price: { from: 500, to: 15000 }
  },
  {
    name: "Внешний жесткий диск",
    quantity: { from: 1, to: 12 },
    price: { from: 2000, to: 25000 }
  },
  {
    name: "Роутер",
    quantity: { from: 1, to: 10 },
    price: { from: 1000, to: 30000 }
  },
  {
    name: "Колонка Bluetooth",
    quantity: { from: 1, to: 15 },
    price: { from: 1500, to: 50000 }
  },
  {
    name: "Микрофон",
    quantity: { from: 1, to: 8 },
    price: { from: 1000, to: 40000 }
  },
  {
    name: "Веб-камера",
    quantity: { from: 1, to: 10 },
    price: { from: 800, to: 20000 }
  },
  {
    name: "Игровая мышь",
    quantity: { from: 1, to: 12 },
    price: { from: 1500, to: 25000 }
  },
  {
    name: "SSD-накопитель",
    quantity: { from: 1, to: 15 },
    price: { from: 1500, to: 30000 }
  },
  {
    name: "Принтер",
    quantity: { from: 1, to: 6 },
    price: { from: 5000, to: 60000 }
  },
  {
    name: "Электросамокат",
    quantity: { from: 1, to: 5 },
    price: { from: 15000, to: 120000 }
  },
  {
    name: "Умный дом (комплект)",
    quantity: { from: 1, to: 4 },
    price: { from: 10000, to: 150000 }
  },
  {
    name: "VR-очки",
    quantity: { from: 1, to: 7 },
    price: { from: 5000, to: 60000 }
  },
  {
    name: "Дрон",
    quantity: { from: 1, to: 5 },
    price: { from: 10000, to: 200000 }
  },
  {
    name: "Электронная сигарета",
    quantity: { from: 1, to: 20 },
    price: { from: 500, to: 15000 }
  },
  {
    name: "Электрочайник",
    quantity: { from: 1, to: 10 },
    price: { from: 1000, to: 15000 }
  },
  {
    name: "Блендер",
    quantity: { from: 1, to: 8 },
    price: { from: 1500, to: 25000 }
  },
  {
    name: "Кофемашина",
    quantity: { from: 1, to: 5 },
    price: { from: 10000, to: 80000 }
  },
  {
    name: "Мультиварка",
    quantity: { from: 1, to: 7 },
    price: { from: 2000, to: 30000 }
  },
  {
    name: "Фитнес-браслет",
    quantity: { from: 1, to: 15 },
    price: { from: 1000, to: 20000 }
  }
];
function getRandomFloat(min, max, decimals = 2) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const startDate = new Date(2014, 0, 1);

function getDate(dayOffset) {
  const date = new Date(startDate);
  date.setDate(date.getDate() + dayOffset);
  return date.toLocaleDateString('ru-RU'); // Формат DD.MM.YYYY
}


async function generateInvoices(days = 100, productsCountRange = { from: 20, to: 300 }) {
  const outputFile = 'invoices.json'; // Просто имя файла в текущей директории
  const writeStream = createWriteStream(outputFile);

  // Пишем начало массива
  writeStream.write('[\n');

  let firstItem = true;

  for (let i = 0; i < days; i++) {
    const productCount = getRandomInt(productsCountRange.from, productsCountRange.to);
    const items = [];

    for (let j = 0; j < productCount; j++) {
      const product = products[getRandomInt(0, products.length - 1)];
      items.push({
        product: product.name,
        quantity: getRandomInt(product.quantity.from, product.quantity.to),
        price: getRandomFloat(product.price.from, product.price.to)
      });
    }

    const invoice = {
      date: getDate(i),
      items
    };

    // Записываем с разделителями между элементами
    const success = writeStream.write(
      (firstItem ? ' ' : ',\n ') +
      JSON.stringify(invoice, null, 2).split('\n').join('\n ')
    );

    firstItem = false;

    // Если буфер полон, ждем освобождения
    if (!success) {
      await new Promise(resolve => writeStream.once('drain', resolve));
    }
  }

  // Завершаем массив и закрываем поток
  writeStream.write('\n]');
  writeStream.end();

  return new Promise(resolve => {
    writeStream.on('finish', () => {
      console.log(`Данные успешно записаны в ${outputFile}`);
      resolve();
    });
  });
}

// Запускаем генерацию
generateInvoices(365).catch(console.error);
