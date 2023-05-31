import React from "react";
import "./ProductAttribute.css";
import { useSelector } from "react-redux";

function ProductAttribute({ productId, label }) {
  const productDetails = useSelector((state) => state.productsAttribute);
  let filteredAttributes = [];

  try {
    const { attributes } = productDetails;

    const productAttribute = attributes.data
      ? attributes.data.filter((product) => product.product_id === productId)
      : [];

    filteredAttributes =
      productAttribute.length > 0 &&
      productAttribute.map((product, index) =>
        index < productAttribute.length - 1
          ? product.attribute_value + "x"
          : `${product.attribute_value} ${product.caption_end}`
      );
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      {filteredAttributes && (
        <div className="attribute">
          {label}: {filteredAttributes}
        </div>
      )}
    </>
  );
}

export default ProductAttribute;
