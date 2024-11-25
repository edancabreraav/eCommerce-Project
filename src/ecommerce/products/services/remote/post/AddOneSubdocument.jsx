import axios from "axios";

export function AddOneSubdocument(id, seccion, documento) {
    console.log("<<EJECUTA>> API <<AddOneProduct>> Requiere:", documento)
    return new Promise((resolve, reject) => {
        console.log('Antes del post axios');
      axios.post(`http://localhost:3020/api/v1/prod-serv/${id}/${seccion}`, documento)
        .then((response) => {
          console.log("<<RESPONSE>> addSubdocumentProdServ", documento)
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
          console.error("<<ERROR>> en API <<addSubdocumentProdServ - Services>>", error);
          reject(error); 
        });     
    });
 }