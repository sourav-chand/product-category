import Category from "../models/Category.js";

export const addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        // console.log(categoryName);
        const newCategory = new Category({ categoryName });
        await newCategory.save();
        res.status(201).json({ message: "Category added successfully", category: newCategory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, { categoryName }, { new: true });
        res.status(200).json({ message: "Category updated", updatedCategory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Category deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
