import { NextResponse } from "next/server";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { currentUser } from "@clerk/nextjs/server";

// Cấu hình CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
};

// Xử lý OPTIONS request (preflight)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    // Log để debug
    console.log("Incoming headers:", req.headers);

    const user = await currentUser();
    const userId = user ? user.id : "guest";

    const { rating, comment, images } = await req.json();

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: "Đánh giá không hợp lệ" },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    await connectToDB();

    const product = await Product.findById(params.productId);

    if (!product) {
      return NextResponse.json(
        { message: "Không tìm thấy sản phẩm" },
        {
          status: 404,
          headers: corsHeaders,
        }
      );
    }

    // Chỉ kiểm tra đánh giá tồn tại nếu người dùng đã đăng nhập
    if (userId !== "guest") {
      const existingRating = product.ratings.find(
        (r: any) => r.userId.toString() === userId
      );

      if (existingRating) {
        return NextResponse.json(
          { message: "Bạn đã đánh giá sản phẩm này rồi" },
          {
            status: 400,
            headers: corsHeaders,
          }
        );
      }
    }

    // Thêm đánh giá mới vào sản phẩm
    product.ratings.push({
      userId,
      rating,
      comment,
      images,
      createdAt: new Date(),
    });

    await product.save();

    return NextResponse.json(product, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("[PRODUCT_RATING_ERROR]", err);
    return NextResponse.json(
      { message: "Lỗi hệ thống, vui lòng thử lại sau" },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}