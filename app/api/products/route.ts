
import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import Collection from "@/lib/models/Collection";
import { auth } from "@clerk/nextjs/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
      discount, // Add discount field
      quantity, // Add quantity field
      variants, // Thêm variants vào đây
    } = await req.json();

    if (variants && variants.length > 0) {
      const isValidVariants = variants.every((variant: any) =>
        variant.size &&
        variant.color &&
        typeof variant.price === 'number' &&
        variant.price >= 0.1
      );

      if (!isValidVariants) {
        return new NextResponse("Invalid variants data", { status: 400 });
      }
    }

    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("Not enough data to create a product", {
        status: 400,
      });
    }

    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
      discount, // Add discount field
      quantity, // Add quantity field
      variants: variants || [], // Thêm variants vào đây
    });

    await newProduct.save();

    console.log(newProduct);

    if (collections) {
      for (const collectionId of collections) {
        const collection = await Collection.findById(collectionId);
        if (collection) {
          collection.products.push(newProduct._id);
          await collection.save();
        }
      }
    }

    return NextResponse.json(newProduct, { status: 200 });
  } catch (err) {
    console.log("[products_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const products = await Product.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "collections", model: Collection });

    // return NextResponse.json(products, { status: 200 });
    const response = NextResponse.json(products, { status: 200 });
    response.headers.set('Access-Control-Allow-Origin', '*'); // Thêm dòng này
    return response;
  } catch (err) {
    console.log("[products_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";

