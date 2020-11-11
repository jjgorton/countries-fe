import axios from 'axios';

export default () => {

    return axios.create({
        headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-key': `${process.env.REACT_APP_API_KEY}`,
            'x-rapidapi-host': `${process.env.REACT_APP_API_HOST}`
        }
    });
};