import axios from "axios";

export function UpdateOnePresentacionSubdocument(id, idPresentacion, seccionPresentacion, idSeccionPresentacion, documento) {
    console.log("<<EJECUTA>> API <<putPresentacionSubdocument>> Requiere:", documento)
    return new Promise((resolve, reject) => {
        console.log('Antes del put axios');
      axios.put(`http://localhost:3020/api/v1/prod-serv/presentaciones/subdocs/${id}/${idPresentacion}/${seccionPresentacion}/${idSeccionPresentacion}`, documento)
        .then((response) => {
          console.log("<<RESPONSE>> putPresentacionSubdocument", documento)
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
          console.error("<<ERROR>> en API <<putPresentacionSubdocument - Services>>", error);
          reject(error); 
        });     
    });
 }