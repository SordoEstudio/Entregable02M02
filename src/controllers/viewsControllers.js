import * as service from "../services/productServices.js";

export const index = async (req, res, next) => {
  try {
    const{page, limit}=req.query
    const payload = await service.getAll(page,limit);
    const products = payload.docs;
    const obj = products.map((p)=>p.toObject());
    res.render("index", { products: obj ,info:payload, email: req.session.email});
  } catch (error) {
    console.log("Error al obtener productos");
    next(error);
  }
};
