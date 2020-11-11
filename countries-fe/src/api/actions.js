import axiosWithHeader from './axiosWithHeader'


export const getAll = () => {
    return axiosWithHeader()
        .get('https://restcountries-v1.p.rapidapi.com/all')
}