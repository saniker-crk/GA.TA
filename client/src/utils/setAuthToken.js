import axios from 'axios';

// const setAuthToken = token => {
//     if (token) {
//         axios.defaults.headers.common['x-auth-token'] = token;
//     } else {
//         delete axios.defaults.headers.common['x-auth-token'];
//     }
// }


const setAuthToken = token => {
    if(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;
