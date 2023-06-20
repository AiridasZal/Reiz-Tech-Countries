import axios from 'axios';
import { useQuery } from 'react-query';
import { Country } from '../types/Country';

const API_URL = 'https://restcountries.com/v2';

const fetchCountries = async () => {
  const response = await axios.get<Country[]>(`${API_URL}/all`, {
    params: {
      fields: 'name,region,area',
    },
  });
  return response.data;
};

export const useCountries = () => {
  return useQuery<Country[], Error>({
  queryKey: 'countries',
  queryFn: fetchCountries,
  cacheTime: 6*60*60*1000
});
};