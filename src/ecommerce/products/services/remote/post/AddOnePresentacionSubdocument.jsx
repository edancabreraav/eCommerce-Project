import axios from "axios";

export function AddOnePresentacionSubdocument(id, idPresentacion, seccionPresentacion, documento) {
    console.log("<<EJECUTA>> API <<addPresentacionSubdocument>> Requiere:", documento)
    return new Promise((resolve, reject) => {
        console.log('Antes del post axios');
      axios.post(`http://localhost:3020/api/v1/prod-serv/presentaciones/subdocs/${id}/${idPresentacion}/${seccionPresentacion}`, documento)
        .then((response) => {
          console.log("<<RESPONSE>> addPresentacionSubdocument", documento)
          const data = response.data;
          console.log('response data:');
          console.log(data);
          if (data.length === 0) {      
            console.error("🛈 No se encontro el producto", data);
            reject(data); 
          } else {
             resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<addPresentacionSubdocument - Services>>", error);
          reject(error); 
        });     
    });
 }