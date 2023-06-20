import { Country } from "../types/Country";

export const sortCountries = (countries: Country[], sortingField: keyof Country, sortOrder: "ASC" | "DSC") => {
    const sortedCountries = [...countries];
  
    sortedCountries.sort((a, b) => {
      const valueA = a[sortingField];
      const valueB = b[sortingField];
  
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortOrder === 'ASC' ? valueA - valueB : valueB - valueA;
      }
  
      const stringA = String(valueA);
      const stringB = String(valueB);
  
      return sortOrder === 'ASC' ? stringA.localeCompare(stringB) : stringB.localeCompare(stringA);
    });
  
    return sortedCountries;
  };