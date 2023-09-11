import { useState, useRef } from 'react';

export const useBoolean = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const updateValue = useRef({
        toggle: () => setValue((oldValue) => !oldValue),
        on: () => setValue(true),
        off: () => setValue(false),
    });

    return [value, updateValue.current];
};