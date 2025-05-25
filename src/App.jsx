import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ProductTable from "./components/ProductTable";
import { getProducts, getInfoByProduct } from "./db/data";
import Graphic from "./components/Graphic";
import DefGraphic from "./components/DefGraphic";

function App() {
  const [products, _setProducts] = useState(getProducts());
  const [product, setProduct] = useState(getProducts()[0]);
  const [productInfo, setProductInfo] = useState([]);
  const [viewMode, setViewMode] = useState("Линии");

  useEffect(() => {
    setProductInfo(getInfoByProduct(product));
  }, [product]);

  return (
    <div className="min-vh-100 w-100 bg-dark text-white p-3">
      <div className="container" data-bs-theme="dark">
        <div className="d-flex justify-content-center gap-3 w-auto mx-auto">
          <label className="col-form-label">Выберите товар</label>
          <select
            className="form-select w-auto"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          >
            {products.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3 d-flex justify-content-center gap-3">
          <label className="col-form-label">Выберите вид отображения</label>
          <select
            className="form-select w-auto text-center"
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
          >
            <option value="Кластеры">Кластеры</option>
            <option value="Линии">Линии</option>
            <option value="Таблица">Таблица</option>
          </select>
        </div>
        {productInfo && productInfo.length > 0 ? (
          viewMode === "Кластеры" ? (
            <Graphic productData={productInfo} />
            // <></>
          ) : viewMode === "Линии" ? <DefGraphic productData={productInfo}/> : (
            <ProductTable productInfo={productInfo} />
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
