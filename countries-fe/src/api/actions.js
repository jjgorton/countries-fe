import axiosWithHeader from './axiosWithHeader';
import axios from 'axios';

// export const getAll = () => {
//     return axiosWithHeader().get('https://restcountries-v1.p.rapidapi.com/all');
// };

export const getAll = () => {
    return axios.get('https://restcountries.com/v3.1/all');
};
