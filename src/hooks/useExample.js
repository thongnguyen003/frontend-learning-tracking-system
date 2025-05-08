import { useState, useEffect } from 'react';

function useExample() {
  const [value, setValue] = useState(null);

  useEffect(() => {
    // Example effect
    setValue('Hello from custom hook!');
  }, []);

  return value;
}

export default useExample;
