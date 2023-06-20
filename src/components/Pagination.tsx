import {
  BsChevronBarLeft,
  BsChevronBarRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";

interface Props {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  changePage: (page: number) => void;
}

const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  changePage,
}: Props) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  return (
    <>
      <nav
        className="flex flex-col gap-2 items-center justify-between pt-4 sm:gap-0 sm:flex-row sm:justify-between"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {startItem} - {endItem}
          </span>{" "}
          of <span className="font-semibold text-gray-900">{totalItems}</span>
        </span>

        <div className="flex align-middle gap-2">
          <button
            className="inline-flex flex-col items-center justify-center transition-colors duration-200 h-8 w-8 active:bg-gray-300 rounded-full focus:outline-none disabled:active:bg-transparent disabled:opacity-40"
            disabled={currentPage === 1}
            onClick={() => changePage(1)}
          >
            <span className="sr-only">First Page</span>
            <BsChevronBarLeft color="black" size={20} />
          </button>
          <button
            className="inline-flex flex-col items-center justify-center transition-colors duration-200 h-8 w-8 active:bg-gray-300 rounded-full focus:outline-none disabled:active:bg-transparent disabled:opacity-40"
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
          >
            <span className="sr-only">Previous</span>
            <BsChevronLeft color="black" />
          </button>
          <p className="py-1 text-md mx-2 min-w-[18px]">{currentPage}</p>
          <button
            className="inline-flex flex-col items-center justify-center transition-colors duration-200 h-8 w-8 active:bg-gray-300 rounded-full focus:outline-none disabled:active:bg-transparent disabled:opacity-40"
            disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
            onClick={() => changePage(currentPage + 1)}
          >
            <span className="sr-only">Next</span>
            <BsChevronRight color="black" />
          </button>
          <button
            className="inline-flex flex-col items-center justify-center transition-colors duration-200 h-8 w-8 active:bg-gray-300 rounded-full focus:outline-none disabled:active:bg-transparent disabled:opacity-40"
            disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
            onClick={() => changePage(Math.ceil(totalItems / itemsPerPage))}
          >
            <span className="sr-only">Last Page</span>
            <BsChevronBarRight color="black" size={20} />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Pagination;
