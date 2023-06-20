import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCountries } from "../services/api";
import { Country } from "../types/Country";
import { Filters } from "../types/Filters";
import { filterCountries } from "../utils/filterCountries";
import { sortCountries } from "../utils/sortCountries";
import FilterToggle from "./FilterToggle";
import Pagination from "./Pagination";
import SortSelector from "./SortSelector";
import Spinner from "./Spinner";
import TableControls from "./TableControls";

const DataTable = () => {
  const { data: countries, isLoading, isError, error } = useCountries();
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [filters, setFilters] = useState<Filters>({
    showOnlyOceania: false,
    showOnlySmallerThanLithuania: false,
  });
  const [sortOrder, setSortOrder] = useState<"ASC" | "DSC">("ASC");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;

  useEffect(() => {
    if (countries) {
      const filteredData = filterCountries(countries, filters);
      setFilteredCountries(filteredData);
    }
  }, [countries, filters]);

  const sortedCountries = sortCountries(filteredCountries, "name", sortOrder);
  const currentItems: Country[] = sortedCountries.slice(firstItem, lastItem);

  if (currentItems.length < itemsPerPage) {
    const emptyItemsCount = itemsPerPage - currentItems.length;
    for (let i = 0; i < emptyItemsCount; i++) {
      currentItems.push({} as Country);
    }
  }

  useEffect(() => {
    const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
    if (currentPage !== 1 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredCountries, currentPage]);

  if (isLoading) {
    return (
      <div className="flex align-middle py-8">
        <Spinner />
        <p className="pl-2">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-700 py-8">Error: {error?.message}</div>;
  }

  return (
    <>
      <TableControls>
        <FilterToggle
          filter={filters.showOnlyOceania}
          setFilter={() =>
            setFilters((prevFilters) => ({
              ...prevFilters,
              showOnlyOceania: !prevFilters.showOnlyOceania,
            }))
          }
        >
          Oceania Countries
        </FilterToggle>
        <FilterToggle
          filter={filters.showOnlySmallerThanLithuania}
          setFilter={() =>
            setFilters((prevFilters) => ({
              ...prevFilters,
              showOnlySmallerThanLithuania:
                !prevFilters.showOnlySmallerThanLithuania,
            }))
          }
        >
          Smaller than Lithuania
        </FilterToggle>
        <SortSelector
          order={sortOrder}
          sortFunction={() => {
            setSortOrder(sortOrder === "ASC" ? "DSC" : "ASC");
          }}
        />
      </TableControls>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr
              className="[&>*:nth-child(1)]:min-w-[45vw] [&>*:nth-child(2)]:min-w-[15vw] [&>*:nth-child(3)]:min-w-[8vw]"
              key="header"
            >
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Region
              </th>
              <th scope="col" className="px-6 py-3">
                Area
              </th>
            </tr>
          </thead>
          <tbody className="[&>*:nth-child(odd)]:bg-green-200">
            {currentItems?.map((country) => (
              <tr className="bg-white border-b h-[56px]" key={uuidv4()}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  key={uuidv4()}
                >
                  {country.name}
                </th>
                <td className="px-6 py-4" key={uuidv4()}>
                  {country.region}
                </td>
                <td className="px-6 py-4" key={uuidv4()}>
                  {country.area}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredCountries.length}
        changePage={setCurrentPage}
      />
    </>
  );
};

export default DataTable;
