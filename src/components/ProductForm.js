import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./ProductForm.css";
import AttributesElements from "./AttributesElements";
import {
  getProducts,
  getProductsDetails,
} from "../redux/actions/product.action";

const ProductForm = () => {
  const headerInitialState = {
    sku: "",
    name: "",
    price: "",
    type_id: "",
  };
  const detailsInitialState = [
    {
      unit_id: "",
      attribute_value: "",
    },
  ];

  const [formHeader, setFormHeader] = useState(headerInitialState);
  const [formDetails, setFormDetails] = useState(detailsInitialState);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const category = useSelector((state) => state.category);
  const productHeader = useSelector((state) => state.productsHeader);
  const { categories } = category;
  const categoriesList = categories.data;
  const { products } = productHeader;

  const API_Add_ProductHeader = `${process.env.REACT_APP_BASE_URL}/api/product/create_product.php`;
  const API_Add_ProductAttribute = `${process.env.REACT_APP_BASE_URL}/api/attribute/add_product_attribute.php`;
  const API_Delete_ProductHeader = `${process.env.REACT_APP_BASE_URL}/api/product/delete_product.php/`;

  const handleHeaderChange = (event) => {
    setFormHeader({
      ...formHeader,
      [event.target.name]: event.target.value,
    });
    setFormDetails(detailsInitialState);
    setError("");
  };

  const hadleDetailsChange = (index) => (e) => {
    const newAttribute = formDetails[index]
      ? formDetails.map((item, i) => {
          if (index === i) {
            return {
              ...item,
              unit_id: e.target.getAttribute("unit-id"),
              attribute_value: e.target.value,
            };
          } else {
            return {
              ...item,
            };
          }
        })
      : [
          ...formDetails,
          {
            unit_id: e.target.getAttribute("unit-id"),
            attribute_value: e.target.value,
          },
        ];
    setFormDetails(newAttribute);
  };

  const isValidName = (value) => {
    let regex = /^[a-zA-Z-]+$/;
    if (!value.match(regex)) {
      setError("Invalid data type: Please provide product name as a string");
      return false;
    }
    return true;
  };

  const isValidPrice = (value) => {
    let regex = /[+-]?([1-9]\d*(\.\d*[1-9])?|0\.\d*[1-9]+)|\d+(\.\d*[1-9])?/;
    if (!value.match(regex)) {
      setError("Invalid data type: Please provide product price as a number");
      return false;
    }
    return true;
  };

  const isValidSku = (products) => {
    if (products) {
      if (Array.isArray(products.data)) {
        const existSku = products.data.some(
          (product) => product.SKU === formHeader.sku
        );
        if (existSku) {
          setError(
            "Invalid data: SKU already exists, Please provide a valid SKU"
          );
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      setError("Network Error: Unable to load products catalog");
      return false;
    }
  };

  const isInvalidAttribute = () => {
    let regex =
      formHeader.type_id === "1"
        ? /^[0-9]+$/
        : /[+-]?([1-9]\d*(\.\d*[1-9])?|0\.\d*[1-9]+)|\d+(\.\d*[1-9])?/;
    const validAttribute = formDetails?.some((attribute) => {
      return !attribute.attribute_value.match(regex);
    });
    if (validAttribute) {
      setError(`Invalid data type: Please provide attribute value as a number`);
    }
    return validAttribute;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    let headerContent = JSON.stringify({
      SKU: formHeader.sku,
      name: formHeader.name,
      price: formHeader.price,
      type_id: formHeader.type_id,
    });

    if (
      isValidSku(products) &&
      isValidName(formHeader.name) &&
      isValidPrice(formHeader.price) &&
      !isInvalidAttribute()
    ) {
      axios
        .post(API_Add_ProductHeader, headerContent)
        .then((response) => {
          console.log(response);
          if (response.data.Product_id > 0) {
            formDetails?.forEach((attribute) => {
              axios
                .post(
                  API_Add_ProductAttribute,
                  JSON.stringify({
                    product_id: response.data.Product_id,
                    unit_id: attribute.unit_id,
                    attribute_value: attribute.attribute_value,
                  })
                )
                .then((res) => {
                  if (res.status === 200) {
                    dispatch(getProducts());
                    dispatch(getProductsDetails());
                    navigate("/");
                  }
                })
                .catch((error) => {
                  if (error.response.status > 200) {
                    setError(error.response.statusText);
                    axios.get(API_Delete_ProductHeader, {
                      params: { SKU: formHeader.sku },
                    });
                  }
                });
            });
          }
        })
        .catch((error) => {
          if (error) {
            setError(error.message);
          }
        });
    }
  };

  return (
    <div>
      <h3 className="form-heading">Add Product</h3>

      <div className="form-layout">
        <form id="product_form" onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="name@example.com"
              id="sku"
              name="sku"
              value={formHeader.sku}
              onChange={handleHeaderChange}
              required
            />
            <label htmlFor="floatingInput">SKU:</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formHeader.name}
              onChange={handleHeaderChange}
              placeholder="name@example.com"
              required
            />
            <label htmlFor="floatingInput">Product name:</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="price"
              name="price"
              value={formHeader.price}
              onChange={handleHeaderChange}
              placeholder="name@example.com"
              required
            />
            <label htmlFor="floatingInput">Product price($):</label>
          </div>

          <div className="form-floating">
            <select
              className="form-select"
              id="productType"
              name="type_id"
              aria-label="Floating label select example"
              onChange={handleHeaderChange}
            >
              <option>Select product type</option>
              {categoriesList &&
                categoriesList.map((category) => (
                  <option
                    id={category.product_type}
                    key={category.type_id}
                    value={category.type_id}
                  >
                    {category.product_type}
                  </option>
                ))}
            </select>
            <label htmlFor="floatingSelect"> Product type:</label>
          </div>
          {formHeader.type_id && (
            <AttributesElements
              formHeader={formHeader}
              formDetails={formDetails}
              handleSubmit={handleSubmit}
              onChange={hadleDetailsChange}
            />
          )}

          <p>
            <span className="badge bg-info text-dark">
              {formHeader.type_id &&
                categoriesList.filter(
                  (category) => category.type_id === formHeader.type_id
                )[0].type_desc}
            </span>
          </p>
          {error && (
            <span className="badge bg-danger badge-error">{error}</span>
          )}
          <div className="btn-container">
            <button type="submit" className="btn btn-success">
              Save
            </button>

            <Link to={"/"} className="link">
              <button type="button" className="btn btn-danger">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
