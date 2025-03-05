import { Schema, model } from 'mongoose';

const dimensionSchema = new Schema({
  length: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
});

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, min: 0 },
  weight: { type: Number, required: true },
  dimensions: {
    type: dimensionSchema,
    required: true,
  },
  description: { type: String },
}, { timestamps: true });


const Product = model('Product', productSchema);
export default Product;