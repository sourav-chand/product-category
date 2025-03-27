import Product from "../models/Product.js";
import mongoose from "mongoose";

// ✅ Add Product
export const addProduct = async (req, res) => {
    try {
        const { category, name, description, price, image } = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({ error: "Invalid category ID" });
        }

        const newProduct = new Product({ category, name, description, price, image });
        await newProduct.save();
        
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get All Products with Category Details
export const getProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "categoryDetails",
                },
            },
            { $unwind: "$categoryDetails" }, // Ensure the categoryDetails array is flattened
        ]);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get Product by ID with Category Details
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category");
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get Product Count by Category
export const getProductCountByCategory = async (req, res) => {
    try {
        const result = await Product.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } },
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "_id",
                    as: "categoryDetails",
                },
            },
            { $unwind: "$categoryDetails" },
            {
                $project: {
                    _id: 0,
                    category: "$categoryDetails.categoryName",
                    productCount: "$count",
                },
            },
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





















// import Product from "../models/Product.js";

// export const addProduct = async (req, res) => {
//     try {
//         const { category, name, description, price, image } = req.body;
//         const newProduct = new Product({ category, name, description, price, image });
//         await newProduct.save();
//         res.status(201).json({ message: "Product added successfully", product: newProduct });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const getProducts = async (req, res) => {
//     try {
//         const products = await Product.aggregate([
//             { $lookup: { from: "categories", localField: "category", foreignField: "_id", as: "categoryDetails" } },
//         ]);
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const getProductById = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id).populate("category");
//         res.status(200).json(product);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const getProductCountByCategory = async (req, res) => {
//     try {
//         const result = await Product.aggregate([
//             { $group: { _id: "$category", count: { $sum: 1 } } }
//         ]);
//         res.status(200).json(result);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
