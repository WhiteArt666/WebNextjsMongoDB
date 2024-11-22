import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema({
  size: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true }
});


// const ProductSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   media: [String],
//   category: String,
//   collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
//   tags: [String],
//   sizes: [String],
//   colors: [String],
//   price: { type: mongoose.Schema.Types.Decimal128, get: (v: mongoose.Schema.Types.Decimal128) => { return parseFloat(v.toString()) }},
//   expense: { type: mongoose.Schema.Types.Decimal128, get: (v: mongoose.Schema.Types.Decimal128) => { return parseFloat(v.toString()) }},
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
//   variants: [{
//     size: String,
//     color: String,
//     price: Number
//   }]
// }, { toJSON: { getters: true } });

const ratingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  images: [String],
  createdAt: { type: Date, default: Date.now }
});

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  media: [String],
  category: { type: String, required: true },
  collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
  tags: [String],
  sizes: [String],
  colors: [String],
  price: { 
    type: mongoose.Schema.Types.Decimal128, 
    required: true,
    get: (v: mongoose.Schema.Types.Decimal128) => parseFloat(v.toString())
  },
  expense: { 
    type: mongoose.Schema.Types.Decimal128, 
    required: true,
    get: (v: mongoose.Schema.Types.Decimal128) => parseFloat(v.toString())
  },
  discount: { type: Number, default: 0 }, // Add discount field
  quantity: { type: Number, default: 1 }, // Add quantity field
  ratings: [ratingSchema],
  variants: [VariantSchema], // Define variants as a subdocument array
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { 
  toJSON: { getters: true },
  timestamps: true // This will auto-update the updatedAt field
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
