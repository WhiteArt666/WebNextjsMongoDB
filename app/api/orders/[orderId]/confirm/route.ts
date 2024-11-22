// app/api/orders/[orderId]/confirm/route.ts
import { connectToDB } from "@/lib/mongoDB";
import Order from "@/lib/models/Order";
import { NextResponse } from "next/server";

// Export hàm PATCH như một named export
export async function PATCH(request: Request, { params }: { params: { orderId: string } }) {
  try {
    await connectToDB();

    const { orderId } = params;

    if (typeof orderId !== "string") {
      return NextResponse.json({ error: "Invalid orderId" }, { status: 400 });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: "In Transit" },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ error: "Order Not Found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order confirmed successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error confirming order:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}