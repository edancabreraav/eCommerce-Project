import axios from "axios";

export function getOneProduct(id) {
    return new Promise((resolve, reject) => {

        axios.get(`http://localhost:3020/api/v1/prod-serv/${id}`)
            .then((response) => {
                const data = response.data;

                if (data.length === 0) {
                    console.info("🛈 No se encontro el producto");
                    resolve([]);
                } else{
                    //console.log("Colección: <<cat_prod_serv>>", ProductsData);
                    
                    resolve(data);
                }
            })
            .catch((error) => {
                console.error("Error en <<getOneProduct - Services>>", error);
                reject(error); // Rechaza la promesa en caso de error
            });
    });

}