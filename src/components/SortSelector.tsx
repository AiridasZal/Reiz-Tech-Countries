import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

interface Props {
  order: string;
  sortFunction: () => void;
}

const SortSelector = ({ order, sortFunction }: Props) => {
  return (
    <button
      type="button"
      className="inline-flex items-center max-w-min bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
      onClick={() => sortFunction()}
    >
      {order === "ASC" ? (
        <AiOutlineSortAscending className="w-5 h-5 mr-2 -ml-1" />
      ) : (
        <AiOutlineSortDescending className="w-5 h-5 mr-2 -ml-1" />
      )}
      <p>Sort</p>
    </button>
  );
};

export default SortSelector;
