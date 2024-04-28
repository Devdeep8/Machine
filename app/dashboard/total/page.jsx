'use client';
import fetchDataFromApi from "@/app/fetchdata/data";
import { useEffect, useState } from "react";

export default function GrandTotal() {
  const [expenses, setExpenses] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesData = await fetchDataFromApi();
        const allPrice = salesData.map((s) => s.price * s.quantity);
        const totalPrice = allPrice.reduce((a, b) => a + b, 0);
        setTotalPrice(totalPrice);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const calculateGrandTotal = () => {
    const newTotalprice = parseFloat(totalPrice);
    const newTotalExpense = parseFloat(expenses);
    const grandTotal = newTotalprice - newTotalExpense;
    return grandTotal.toFixed(2); // Ensure decimal places are fixed
  };

  return (
    <>
      <div className="container my-8 mx-auto">
        <input
          type="number"
          className="rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2"
          onChange={(e) => setExpenses(e.target.value)}
        />
      </div>
      <div className="container my-8 mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Total price = {totalPrice}</h2>
        <h2 className="text-3xl font-semibold mb-6">Total expense = {expenses}</h2>
      </div>
      <div className="container my-8 mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Grand Total = {calculateGrandTotal()}</h2>
      </div>
    </>
  );
}

