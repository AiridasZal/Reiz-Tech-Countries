import { ChangeEvent } from "react";

interface Props {
  children: string;
  filter: boolean;
  setFilter: (filter: boolean) => void;
}

const FilterToggle = ({ children, filter, setFilter }: Props) => {
  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.checked);
  };

  return (
    <div className="flex items-center px-4 border border-gray-200 rounded cursor-pointer mr-4">
      <input
        id={children}
        type="checkbox"
        value=""
        name="bordered-checkbox"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
        checked={filter}
        onChange={handleFilterChange}
      />
      <label
        htmlFor={children}
        className="w-full py-4 ml-2 text-sm font-medium text-gray-900 cursor-pointer"
      >
        {children}
      </label>
    </div>
  );
};

export default FilterToggle;
