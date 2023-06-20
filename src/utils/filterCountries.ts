import { Country } from "../types/Country";
import { Filters } from "../types/Filters";

export const filterCountries = (countries: Country[], filters: Filters) => {
    let filteredData = countries || [];

    if (filters.showOnlySmallerThanLithuania) {
      const lithuania = countries?.find(
        (country) => country.name === "Lithuania"
      );
      if (lithuania)
        filteredData = filteredData.filter(
          (country) => country.area < lithuania.area
        );
    }

    if (filters.showOnlyOceania) {
      filteredData = filteredData.filter(
        (country) => country.region === "Oceania"
      );
    }

    return filteredData;
  }