import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getProducts,
  getProductsDetails,
} from "../src/redux/actions/product.action";
import { getCategory } from "../src/redux/actions/category.action";
import { getUnits } from "../src/redux/actions/units.action";
import ProductForm from "./components/ProductForm";
import Home from "./components/Home";
import PageNotFound from "./components/404";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getProductsDetails());
    dispatch(getCategory());
    dispatch(getUnits());
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/add-product" Component={ProductForm} />
        <Route exact path="*" Component={PageNotFound} />
      </Routes>
    </Router>
  );
}

export default App;
