//Modificar el subdocumento PRESENTACIONES sin afectar sus subdocumentos internos {estatus[], info_vta[], archivos[]}
import axios from "axios";

export function UpdatePresentacion(id, idPresentacion, product) {
    console.log("<<EJECUTA>> API <<putPrimaryPresentacion>> Requiere:", product)
    return new Promise((resolve, reject) => {
        console.log('Antes del post axios');
      axios.put(`http://localhost:3020/api/v1/prod-serv/presentaciones/primary/${id}/${idPresentacion}`, product)
        .then((response) => {
          console.log("<<RESPONSE>> putPrimaryPresentacion", product)
          const data = response.data;
          console.log('response data:');
          console.log(data);
          if (data.length === 0) {      
            console.error("<<ERROR>> <<NO>> se ejecuto la API <<putPrimaryPresentacion>> de forma correcta", data);
            reject(data); 
          } else {
             resolve(data);
          }
        })
        .catch((error) => {
          console.error("<<ERROR>> en API <<putPrimaryPresentacion>>", error);
          reject(error); 
        });     
    });
 }