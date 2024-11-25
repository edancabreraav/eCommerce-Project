import axios from 'axios';
export async function getProdServAll() {
	let result = await axios.get(`${import.meta.env.VITE_REST_API_PRODSERV}`);
	console.log('<<AXIOS-PRODSERV>>: ', result.data);
	return result.data;
}