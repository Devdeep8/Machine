"use client"
import { useEffect, useState } from "react";
import UpdateSale from "@/app/components/EditSaleForm";

// Fetch sale data based on ID
const getData = async (id) => {
  try {
    const response = await fetch(`/api/stock/${id}`);
    const data = await response.json();
    return data.sale;
  } catch (error) {
    console.error(error);
    return null; // Return null or handle error appropriately
  }
};

export default function UpdateSalePage({ params }) {
  const { id } = params;
  const [sale, setSale] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const saleData = await getData(id);
      setSale(saleData);
    };
    fetchData();
  }, [id]);

  if (!sale) {
    return <div>Loading...</div>; // or handle loading state
  }

  return <UpdateSale sale={sale} />;
}
