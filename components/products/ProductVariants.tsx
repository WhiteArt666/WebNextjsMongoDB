import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

// Variant type definition
interface VariantType {
  size: string;
  color: string;
  price: number;
}

interface ProductVariantsProps {
    variants: VariantType[];
    onChange: (variants: VariantType[]) => void;
    sizes: string[];
    colors: string[];
  }

const ProductVariants = ({ 
  variants = [], 
  onChange,
  sizes,
  colors
}: {
  variants: VariantType[];
  onChange: (variants: VariantType[]) => void;
  sizes: string[];
  colors: string[];
}) => {
  const [newSize, setNewSize] = useState("");
  const [newColor, setNewColor] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const handleAddVariant = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newSize && newColor && newPrice) {
      e.preventDefault();
      const priceValue = parseFloat(newPrice);

      // Log các giá trị trước khi thêm
    console.log('Adding variant:', {
      size: newSize,
      color: newColor,
      price: priceValue
    });

    
      if (isNaN(priceValue) || priceValue < 0.1) {
        console.log('Invalid price:', priceValue);
        return; // Don't add invalid prices
      }
      const newVariant = {
        size: newSize,
        color: newColor,
        price: priceValue
      };
      onChange([...variants, newVariant]);
      setNewSize("");
      setNewColor("");
      setNewPrice("");
    }
  };

  const removeVariant = (index: number) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    onChange(updatedVariants);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <select 
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1"
          value={newSize}
          onChange={(e) => setNewSize(e.target.value)}
           aria-label="Select Size"
        >
          <option value="">Select Option</option>
          {sizes.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        <select 
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          aria-label="Select Color"
        >
          <option value="">Select Color</option>
          {colors.map((color) => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>
        <Input
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          onKeyDown={handleAddVariant}
          placeholder="Price"
          className="w-32"
          step="0.01"
          min="0.1"
        />
      </div>

      <div className="space-y-2">
        {variants.map((variant, index) => (
          <div key={index} className="flex items-center gap-4 p-2 border rounded-md">
            <span className="min-w-20">{variant.size}</span>
            <span className="min-w-20">{variant.color}</span>
            <span className="min-w-20">
              ${typeof variant.price === 'number' ? variant.price.toFixed(2) : '0.00'}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeVariant(index)}
              className="ml-auto"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductVariants;