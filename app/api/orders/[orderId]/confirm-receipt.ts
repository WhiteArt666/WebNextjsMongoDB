// pages/api/orders/[orderId]/confirm-receipt.ts
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "@/lib/mongoDB";
import Order from "@/lib/models/Order";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }

  try {
    await connectToDB();

    const { orderId } = req.query;

    await Order.findByIdAndUpdate(orderId, { status: "Delivered" });

    res.status(200).json({ message: "Đơn hàng đã được đánh dấu là đã giao" });
  } catch (error) {
    console.error("Lỗi khi xác nhận nhận hàng:", error);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
}