

import express from "express";
import { addProduct, getProducts, getProductById, getProductCountByCategory,deleteProduct, updateProduct } from "../controllers/productController.js";

const router = express.Router();

router.post("/", addProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/count/by-category", getProductCountByCategory);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;











// import express from "express";
// import { addProduct, getProducts, getProductById, getProductCountByCategory } from "../controllers/productController.js";

// const router = express.Router();

// router.post("/", addProduct);
// router.get("/", getProducts);
// router.get("/:id", getProductById);
// router.get("/count/by-category", getProductCountByCategory);

// export default router;
