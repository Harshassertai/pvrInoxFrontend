import React, { useState } from "react";

function useInputs(input) {
	const [value, setValue] = useState(input);

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return {
		value,
		onChange: handleChange,
	};
}

export default useInputs;
