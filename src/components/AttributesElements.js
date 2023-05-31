import { React } from "react";
import { useSelector } from "react-redux";

function AttributesElements(props) {
  const listUnits = useSelector((state) => state.units);
  const { units } = listUnits;
  const attributes = units.data.filter(
    (attribute) => attribute.type_id === props.formHeader.type_id
  );

  return (
    <div>
      {attributes &&
        attributes.map((attribute, index) => (
          <div key={attribute.unit_id} className="form-floating">
            <input
              type="text"
              className="form-control"
              id={attribute.unit_name.toLowerCase()}
              unit-id={attribute.unit_id}
              placeholder="name@example.com"
              required
              onChange={props.onChange(index)}
              value={
                props.formDetails[index]
                  ? props.formDetails[index].attribute_value
                  : ""
              }
            />
            <label htmlFor="floatingInput">
              {attribute.unit_name}: ({attribute.measure_unit})
            </label>
          </div>
        ))}
    </div>
  );
}

export default AttributesElements;
