import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    insertDate: { type: Date, default: Date.now },
    insertTime: { 
        type: String, 
        default: () => new Date().toLocaleTimeString() 
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
