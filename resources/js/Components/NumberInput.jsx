import React, { useState } from 'react';

function NumberInput({ name, valueInput }) {
    const [value, setValue] = useState(valueInput);

    const handleChange = (event) => {
        let value = event.target.value;
        value = value.replace(/[^0-9,]/g, ""); // remove all non-digit and non-comma characters

        if (value !== "" && !isNaN(value.replace(/,/g, "")) && parseFloat(value.replace(/,/g, "")) > 0) {
            value = parseInt(value.replace(/,/g, "")).toLocaleString("de-DE"); // convert to string with commas
        } else {
            value = "";
        }
        setValue(value);
    };
    const handleBlur = () => {
        let newValue = value.replace(/,/g, "");
        newValue = parseFloat(newValue);
        newValue = newValue.toLocaleString('de-DE');
        setValue(newValue);
    };
    return (
        <input
            name={name}
            value={value}
            className="block w-full p-2 border border-gray-300 rounded-md"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
        />
    );
}

export default NumberInput;

