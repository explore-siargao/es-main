import React, { useEffect, useState } from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface CountInputProps {
  label: string;
  count: number | null;
  setCount: (count: number | null) => void;
}

const CountInput: React.FC<CountInputProps> = ({ label, count, setCount }) => {
  const [inputValue, setInputValue] = useState<string | number>(count === null ? "Any" : count);

  useEffect(() => {
    setInputValue(count === null ? "Any" : count);
  }, [count]);

  const handleMinusClick = () => {
    if (count !== null && count > 1) {
      setCount(count - 1);
    } else {
      setCount(null);
    }
  };

  const handlePlusClick = () => {
    setCount((count === null ? 0 : count) + 1);
  };

  const handleChange = (value: string) => {
    if (value === "any") {
      setCount(null);
    } else {
      const num = parseInt(value, 10);
      setCount(isNaN(num) || num < 1 ? null : num);
    }
    setInputValue(value);
  };

  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <div className="flex">
        <button
          className="inline-flex items-center rounded-l-xl border border-r-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
          type="button"
          onClick={handleMinusClick}
        >
          <MinusIcon className="h-3 w-3" />
        </button>
        <input
          type="text"
          className="block w-16 min-w-0 text-center rounded-none border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
        />
        <button
          className="inline-flex items-center rounded-r-xl border border-l-0 text-gray-900 border-gray-300 px-3 sm:text-sm"
          type="button"
          onClick={handlePlusClick}
        >
          <PlusIcon className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default CountInput;
