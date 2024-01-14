import React, { useState } from 'react';

function NumberInput( ) {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        let value = event.target.value;
        value = value.replace(/,/g, ""); // remove existing commas
        if (!isNaN(value) && value.trim() !== "") {
            value = parseInt(value).toLocaleString('en-US'); // convert to string with commas
        }
        setValue(value);
    };

    return (
        <input className="block w-full p-2 border border-gray-300 rounded-md" type="text" value={value} onChange={handleChange} step={1000}/>
    );
}

export default NumberInput;
