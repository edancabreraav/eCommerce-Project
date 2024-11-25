import { ProductsModel } from "../models/ProductsModel";

//Obtiene los valores capturados en la ventana modal enviados desde el evento onSubmit de Formik
export const ProductsValues = (values) => {
  let Product = ProductsModel();
  //Product.IdInstitutoOK = values.IdInstitutoOK;
  Product.IdProdServOK = values.IdProdServOK;
  Product.IdProdServBK = values.IdProdServBK;
  Product.CodigoBarras = values.CodigoBarras;
  Product.DesProdServ = values.DesProdServ;
  Product.Indice= values.Indice;
  return Product
};
