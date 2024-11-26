//"/:id/:seccion/:idSeccion"
import axios from "axios";

export function delOnePresentacionSubdocument(id, idPresentacion, seccionPresentacion, idSubdocument) {
    console.log("<<EJECUTA>> API <<deletePresentacionSubdocument>> Requiere:", id, idPresentacion, seccionPresentacion, idSubdocument)
    return new Promise((resolve, reject) => {
        console.log('Antes del post axios');
      axios.delete(`http://localhost:3020/api/v1/prod-serv/presentaciones/subdocs/${id}/${idPresentacion}/${seccionPresentacion}/${idSubdocument}`)
        .then((response) => {
          console.log("<<RESPONSE>> delOnePresentacionSubdocument ", id)
          const data = response.data;
          console.log('response data:');
          console.log(data);
          if (data.length === 0) {      
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<deletePresentacionSubdocument>> de forma correcta", data);
            reject(data); 
          } else {
             resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<deletePresentacionSubdocument>>", error);
          reject(error); 
        });     
    });
 }