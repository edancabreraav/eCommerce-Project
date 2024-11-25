import axios from "axios";
export function getAllProducts() {
    return new Promise ((resolve, reject) => {
        axios.get(import.meta.env.VITE_REST_API_PRODSERV)
        .then((response)=>{
            const data = response.data;
                if (data.length === 0) {
                    console.info("🛈 No se encontraron documentos en <<cat_prod_serv>>");
                    resolve([]);
                  } else {
                    resolve(data);
                  }
        })
        .catch((error) => {
            console.error("Error en <<getProdServList - Services>>");
            reject(error);
        });
    });
}