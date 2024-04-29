'use client'
import  { useState, useEffect} from "react";
import GeneratePDF from "@/app/components/GeneratePdf";
import fetchDataFromApi from "@/app/fetchdata/data";

export default function GrandTotal() {
  const [expenses, setExpenses] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const [grandTotalPrice, setGrandTotalPrice] = useState(0);

  useEffect(() => {
    fetchData();

  }, []);

  const fetchData = async () => {
    try {
      const salesData = await fetchDataFromApi();
      const allPrice = salesData.map((s) => s.price * s.quantity);
      const totalPrice = allPrice.reduce((a, b) => a + b, 0);
      setSalesData(salesData);
      setTotalPrice(totalPrice);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const calculateGrandTotal = () => {
    const newTotalprice = parseFloat(totalPrice);
    const newTotalExpense = parseFloat(expenses);
    const grandTotal = newTotalprice - newTotalExpense;
    setGrandTotalPrice(grandTotal.toFixed(2));
  };

  const handleGenerateTotal = () => {
    // Calculate grand total
    calculateGrandTotal();
    // Additional logic or actions if needed
  };

  return (
    <>
      <div className="container my-8 mx-auto">
        <input
          type="number"
          className="rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2"
          placeholder="Enter expenses"
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
        />
      </div>
      <div className="container my-8 mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Total price = {totalPrice}</h2>
        <h2 className="text-3xl font-semibold mb-6">Total expense = {expenses}</h2>
      </div>
      {grandTotalPrice !== 0 && (
        <div className="container my-8 mx-auto">
          <h2 className="text-3xl font-semibold mb-6">Grand Total = {grandTotalPrice}</h2>
        </div>
      )}
      <div className="container my-8 mx-auto">
        <button className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleGenerateTotal}>Generate Grand Total</button>
      </div>
       <div className="container my-8 mx-auto">

      <GeneratePDF invoice={salesData} totalprice={grandTotalPrice} expense={expenses}/>
       </div>
      </>
  )}