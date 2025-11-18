import React, { createContext, useEffect, useState, ReactNode } from "react";
import { getProductos, producto } from "../../src/api/producto";

interface ProductContextType {
  products: producto[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: false,
  fetchProducts: async () => {},
});

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await getProductos();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
