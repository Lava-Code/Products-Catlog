import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProductHeader.css";
import ProductAttribute from "./ProductAttribute";
import {
  getProducts,
  getProductsDetails,
} from "../redux/actions/product.action";

function ProductHeader() {
  const dispatch = useDispatch();

  const API_Delete_ProductHeader = `${process.env.REACT_APP_BASE_URL}/api/product/delete_product.php/`;
  const API_Delete_ProductAttribute = `${process.env.REACT_APP_BASE_URL}/api/attribute/delete_product_attribute.php`;

  const productHeader = useSelector((state) => state.productsHeader);
  const { products, loading, error } = productHeader;
  const [arrayOfDelete, setArrayOfDelete] = useState([]);

  let selectedProducts = [...arrayOfDelete];

  const isExist = (e) => {
    let index;
    arrayOfDelete.some((object, idx) => {
      if (object.product_id === e.target.value) {
        index = idx;
        return true;
      } else {
        return false;
      }
    });
    return index;
  };

  const handleOnChange = (event) => {
    const isChcked = event.target.checked;
    const currentIndex = isExist(event);
    if (isChcked) {
      console.log(event.target.id);
      if (currentIndex == null) {
        setArrayOfDelete([
          ...arrayOfDelete,
          {
            product_id: event.target.value,
            sku: event.target.getAttribute("sku"),
          },
        ]);
      }
    } else {
      selectedProducts.splice(currentIndex, 1);
      setArrayOfDelete(selectedProducts);
    }
  };

  const handleDelete = () => {
    console.log(arrayOfDelete);
    if (arrayOfDelete.length > 0) {
      arrayOfDelete?.forEach((item) => {
        axios
          .get(API_Delete_ProductAttribute, {
            params: { product_id: item.product_id },
          })
          .then((res) => {
            if (res.status === 200) {
              axios
                .get(API_Delete_ProductHeader, {
                  params: { SKU: item.sku },
                })
                .then(() => {
                  dispatch(getProducts());
                  dispatch(getProductsDetails());
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  };
  console.log(arrayOfDelete);
  return (
    <div className="header">
      <div className="btn-sec">
        <Link to={"/add-product"}>
          <button
            id="add-product-btn"
            type="button"
            className="btn btn-success"
          >
            ADD
          </button>
        </Link>
        <button
          id="delete-product-btn"
          type="button"
          className="btn btn-danger"
          onClick={handleDelete}
        >
          MASS DELETE
        </button>
      </div>
      {!loading && !error && (
        <>
          <div className="hd-sec">
            <h3 className="form-heading  ">Product List</h3>
          </div>

          <div className="container">
            {products.data?.map((product, index) => (
              <div key={product.product_id} className="child overflow-auto">
                <div className="form-check">
                  <input
                    className="delete-checkbox form-check-input"
                    type="checkbox"
                    value={product.product_id}
                    sku={product.SKU}
                    id={index}
                    onChange={(e) => handleOnChange(e)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckChecked"
                  ></label>
                </div>

                <h6>{product.SKU}</h6>
                <h6>{product.name}</h6>
                <h6>{product.product_type}</h6>
                <h6 className="txt-special">{product.price} $</h6>
                <hr></hr>
                <ProductAttribute
                  productId={product.product_id}
                  label={product.label}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
export default ProductHeader;
