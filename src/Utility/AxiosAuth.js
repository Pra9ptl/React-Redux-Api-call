import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'https://node-expresss-api.herokuapp.com/api/v1'
});

export default instance;