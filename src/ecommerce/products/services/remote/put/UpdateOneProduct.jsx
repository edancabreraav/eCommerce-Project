import axios from "axios";

export function UpdateOneProduct(id, product) {
    console.log("<<EJECUTA>> API <<UpdateOneProduct>> Requiere:", product)
    return new Promise((resolve, reject) => {
        console.log('Antes del post axios');
      axios.put(`http://localhost:3020/api/v1/prod-serv/update/${id}`, product)
        .then((response) => {
          console.log("<<RESPONSE>> UpdateOneProduct", product)
          const data = response.data;
          console.log('response data:');
          console.log(data);
          if (data.length === 0) {      
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<UpdateOneProduct>> de forma correcta", data);
            reject(data); 
          } else {
             resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<UpdateOneProduct>>", error);
          reject(error); 
        });     
    });
 }