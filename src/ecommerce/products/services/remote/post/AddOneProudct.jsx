import axios from "axios";

export function AddOneProduct(product) {
    console.log("<<EJECUTA>> API <<AddOneProduct>> Requiere:", product)
    return new Promise((resolve, reject) => {
        console.log('Antes del post axios');
      axios.post(import.meta.env.VITE_REST_API_PRODSERV, product)
        .then((response) => {
          console.log("<<RESPONSE>> AddOneProduct", product)
          const data = response.data;
          console.log('response data:');
          console.log(data);
          if (data.length === 0) {      
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<AddOneProduct>> de forma correcta", data);
            reject(data); 
          } else {
             resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<AddOneProduct>>", error);
          reject(error); 
        });     
    });
 }