export default function ProductTable({ productInfo }) {
  return (
    <table className="table w-auto mx-auto">
      <thead>
        <tr>
          <th>Дата</th>
          <th>Кол-во людей купивших товар</th>
          <th>Общее кол-во</th>
          <th>Средняя цена потребления</th>
          <th>Спрос</th>
        </tr>
      </thead>
      <tbody>
        {productInfo.map((item, index) => (
          <tr key={index}>
            <td>{item.date}</td>
            <td>{item.costumers}</td>
            <td>{item.quantity}</td>
            <td>{item.price.toFixed(2)}</td>
            <td>{item.flow.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
