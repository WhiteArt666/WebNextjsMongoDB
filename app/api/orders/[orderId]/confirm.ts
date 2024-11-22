// pages/api/orders/[orderId]/confirm.ts
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "@/lib/mongoDB";
import Order from "@/lib/models/Order";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectToDB();

    const { orderId } = req.query;

    if (typeof orderId !== "string") {
      return res.status(400).json({ error: "Invalid orderId" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: "In Transit" },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Đơn hàng đã được xác nhận" });
  } catch (error) {
    console.error("Lỗi khi xác nhận đơn hàng:", error);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};