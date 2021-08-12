//Source github nyan-matt/marvel-api-react
import axios from "axios";
import { PUBLIC_KEY } from './config'
const BASE_URL = 'https://gateway.marvel.com:443/v1/public'
const authParams = `apikey=${PUBLIC_KEY}`

async function fetchResponseByURL(relativeURL, queryString) {
    console.log(`call made to ${relativeURL}?${queryString}`)
    console.time('total')

    try {
        const response = await axios.get(`${BASE_URL}/${relativeURL}?${queryString}`);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export async function fetchCharacter(resource, id) {
    const response = await fetchResponseByURL(`${resource}/${id}`, authParams);
    return {
        data: response.data
    };
}

export async function fetchAllCharacters(resource, queryParams = {}) {
    queryParams.apikey = PUBLIC_KEY
    //adding folder and API keys to the back of main URL to be used by fetchResponseByURL 
    //to pull entire character database
    const queryString = Object
        .keys(queryParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join('&')
    const response = await fetchResponseByURL(resource, queryString);
    return {
        data: response.data
    };
}