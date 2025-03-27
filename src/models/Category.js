import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true, unique: true },
    creationDate: { type: Date, default: Date.now },
    creationTime: { 
        type: String,
        default: () => new Date().toLocaleTimeString()
    }
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
