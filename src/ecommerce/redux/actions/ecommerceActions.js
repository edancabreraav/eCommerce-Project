import axios from 'axios';
export async function getEcommerceAll() {
	let result = await axios.get(`${import.meta.env.VITE_REST_API_PRODSERV_ECOMMERCE}/products`);
	console.log('<<AXIOS-ECOMMERCE>>: ', result.data);
	return result.data;
}