"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<OrderItemType>[] = [
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original.product;
      if(product){
      return (
        <Link
          href={`/products/${product._id}`}
          className="hover:text-red-1"
        >
          {row.original.product.title}
        </Link>
      );
    }
    return '`No product found`';
    },
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "size",
    header: "Option",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
];
