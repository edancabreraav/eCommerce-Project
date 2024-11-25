import axios from "axios";

export function delOneProduct(id) {
    console.log("<<EJECUTA>> API <<delOneProduct>> Requiere:", id)
    return new Promise((resolve, reject) => {
        console.log('Antes del post axios');
      axios.delete(`http://localhost:3020/api/v1/prod-serv/${id}`)
        .then((response) => {
          console.log("<<RESPONSE>> delOneProduct ", id)
          const data = response.data;
          console.log('response data:');
          console.log(data);
          if (data.length === 0) {      
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<delOneProduct>> de forma correcta", data);
            reject(data); 
          } else {
             resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<delOneProduct>>", error);
          reject(error); 
        });     
    });
 }