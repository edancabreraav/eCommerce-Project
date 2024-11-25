//"/:id/:seccion/:idSeccion"
import axios from "axios";

export function delOneSubdocument(id, seccion, idSeccion) {
    console.log("<<EJECUTA>> API <<deleteProdServSubdocument>> Requiere:", id, seccion, idSeccion)
    return new Promise((resolve, reject) => {
        console.log('Antes del post axios');
      axios.delete(`http://localhost:3020/api/v1/prod-serv/${id}/${seccion}/${idSeccion}`)
        .then((response) => {
          console.log("<<RESPONSE>> delOneSubdocument ", id)
          const data = response.data;
          console.log('response data:');
          console.log(data);
          if (data.length === 0) {      
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<deleteProdServSubdocument>> de forma correcta", data);
            reject(data); 
          } else {
             resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<deleteProdServSubdocument>>", error);
          reject(error); 
        });     
    });
 }