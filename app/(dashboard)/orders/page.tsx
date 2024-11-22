// app/(dashboard)/orders/page.tsx
"use client";

import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { getOrderColumns } from "@/components/orders/OrderColumns"; // Đảm bảo đường dẫn đúng
import { Separator } from "@/components/ui/separator";

import { useEffect, useState } from "react";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrderColumnType[]>([]);

  // Hàm lấy dữ liệu đơn hàng
  const getOrders = async () => {
    try {
      const res = await fetch(`/api/orders`);
      if (!res.ok) throw new Error("Không thể lấy dữ liệu đơn hàng");
      
      const data = await res.json();
      console.log("Đơn hàng nhận được:", data); // Thêm dòng này
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.log("[orders_GET]", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // Lấy columns với hàm refreshData là getOrders
  const columns = getOrderColumns(getOrders);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Orders</p>
      <Separator className="bg-grey-1 my-5" />
      <DataTable columns={columns} data={orders} searchKey="_id" />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Orders;