import axios from "axios";

const client = axios.create({
    baseURL: 'https://podcastd-test.azurewebsites.net/api'
})

export default client;