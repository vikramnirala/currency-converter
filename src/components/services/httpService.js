import axios from "axios";

axios.interceptors.response.use(null, error => {
    const expectedError = 
        error.response &&
        error.response.status >=400 &&
        error.response.status < 500;

    if (!expectedError) {
        console.log("Loggin the error", error);
        alert("An unexpexted error has occurred.");
    }

    return Promise.reject(error);
});

export default {
    get: axios.get
}