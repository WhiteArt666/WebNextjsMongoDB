// components/orders/OrderColumns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React from "react";

// Hàm xác nhận đơn hàng
const confirmOrder = async (orderId: string, refreshData: () => void) => {
  const isConfirmed = confirm("Are you sure you want to confirm this order?");
  if (!isConfirmed) return;

  try {
    const res = await fetch(`/api/orders/${orderId}/confirm`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error("Không thể xác nhận đơn hàng");

    alert("The order has been successfully confirmed.");
    refreshData(); // Làm mới dữ liệu sau khi xác nhận
  } catch (error) {
    console.error(error);
    alert("Có lỗi xảy ra khi xác nhận đơn hàng. Vui lòng thử lại.");
  }
};

// Hàm xác nhận nhận hàng
const confirmReceipt = async (orderId: string, refreshData: () => void) => {
  const isConfirmed = confirm("Are you sure you want to mark this order as delivered?");
  if (!isConfirmed) return;

  try {
    const res = await fetch(`/api/orders/${orderId}/confirm-receipt`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error("Không thể đánh dấu đơn hàng là đã giao");

    alert("The order has been marked as successfully delivered.");
    refreshData(); // Làm mới dữ liệu sau khi đánh dấu
  } catch (error) {
    console.error(error);
    alert("Có lỗi xảy ra khi đánh dấu đơn hàng. Vui lòng thử lại.");
  }
};

// Hàm trả về mảng columns
export const getOrderColumns = (refreshData: () => void): ColumnDef<OrderColumnType>[] => [
  {
    accessorKey: "_id",
    header: "Order",
    cell: ({ row }) => (
      <Link href={`/orders/${row.original._id}`} className="hover:text-red-1">
        {row.original._id}
      </Link>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "totalAmount",
    header: "Total ($)",
    cell: ({ row }) => `$${row.original.totalAmount.toFixed(2)}`,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => row.original.createdAt,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      console.log("Rendering status for row:", row.original._id, "Status:", status);
      let displayStatus = "";

      if (status === "Pending Confirmation") {
        displayStatus = "Pending Confirmation";
      } else if (status === "In Transit") {
        displayStatus = "Delivering";
      } else if (status === "Delivered") {
        displayStatus = "Successfully delivered";
      }

      return <span>{displayStatus}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        {row.original.status === "Pending Confirmation" && (
          <button
          onClick={() => confirmOrder(row.original._id, refreshData)}
            className="btn-primary"
          >
            Confirm Order
          </button>
        )}
        {row.original.status === "In Transit" && (
          <button
          onClick={() => confirmReceipt(row.original._id, refreshData)}
            className="btn-secondary"
          >
            Mark delivered
          </button>
        )}
      </div>
    ),
  },
];