import axios from "axios";

export function UpdateOneSubdocument(id, seccion, idSeccion, documento) {
    console.log("<<EJECUTA>> API <<putProdServSubdocument>> Requiere:", documento)
    return new Promise((resolve, reject) => {
        console.log('Antes del put axios');
      axios.put(`http://localhost:3020/api/v1/prod-serv/${id}/${seccion}/${idSeccion}`, documento)
        .then((response) => {
          console.log("<<RESPONSE>> putProdServSubdocument", documento)
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
          console.error("<<ERROR>> en API <<putProdServSubdocument - Services>>", error);
          reject(error); 
        });     
    });
 }