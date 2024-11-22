type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
}

type RatingType = {
  _id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  images: string[];
  createdAt: string;
}

type VariantType = {
  size: string;
  color: string;
  price: number;
}

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: string;
  collections: [CollectionType];
  tags: [string];
  sizes: [string];
  colors: [string];
  price: number;
  expense: number;
  discount: number; // Add discount field
  quantity: number; // Add quantity field
  createdAt: Date;
  updatedAt: Date;
  ratings: RatingType[];
  variants: VariantType[];
}

type OrderColumnType = {
  _id: string;
  customer: string;
  products: number;
  totalAmount: number;
  createdAt: string;
  status: "Pending Confirmation" | "In Transit" | "Delivered";
}

type OrderItemType = {
  product: ProductType
  color: string;
  size: string;
  quantity: number;
}

type CustomerType = {
  clerkId: string;
  name: string;
  email: string;
}