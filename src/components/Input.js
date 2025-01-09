import React, { useCallback, useState } from "react";
import { debounce } from "../features/debounce";

export const Input = React.memo(
  ({ value, onChange, fieldName, fieldType, isRequired, errorMessage }) => {
    const [inputValue, setInputValue] = useState(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedOnChange = useCallback(
      debounce((newValue) => {
        onChange(fieldName.toLowerCase(), newValue);
      }, 500),
      [debounce, onChange, fieldName]
    );

    const handleValueChange = (e) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      debouncedOnChange(newValue);
      console.log("input");
    };

    return (
      <label
        key={fieldName}
        htmlFor="name"
        className="form-label row align-items-center"
      >
        <p className={`col-12  ${fieldName === 'Quantity' ? 'col-md-auto' : 'col-md-3'} fw-medium text-md-end text-muted fs-5`}>
          {fieldName}
          {isRequired && (
            <sup
              className={`text-secondary fw-bolder fs-6 ${
                errorMessage.length > 0 ? "text-danger" : ""
              }`}
            >
              {" "}
              required
            </sup>
          )}
        </p>
        <div className="col-12 col-md-8">
          <input
            type={fieldType}
            className={`form-control form-control-lg ${
              errorMessage.length > 0 ? "is-invalid" : ""
            }`}
            id="name"
            value={inputValue}
            onChange={handleValueChange}
            max={1000}
            min={1}
          ></input>
          <div className="mb-2 text-danger">
            {errorMessage.length > 0 ? errorMessage : ""}
          </div>
        </div>
      </label>
    );
  }
);
