"use client";

import Link from "next/link";
import Search from "../components/Search";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import RemoveBtn from "../components/Removebtn";
import fetchDataFromApi from "../fetchdata/data";
// import { useRouter } from "next/router";
export default function Sales() {
  const session = useSession();
  // const router2 = useRouter()
  const [sales, setsales] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const router = useRouter();

  useEffect(() => {

    const sales = async () => {
      setLoading(true); // Set loading to true as soon as search starts
      setsales(await fetchDataFromApi());
      setLoading(false); // Set loading to false once data fetching is complete

    }
    sales();
  }, []);



  if (session.status === "unauthenticated") {
    router.replace("/");
    return null;
  }

  // Render loading SVG while data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/loading2.svg" width={200} alt="Loading..." />
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto  my-8">
        <h1 className="text-3xl font-semibold mb-6">Search the Product</h1>
        <Search placeholder={`Search...`} />
      </div>
      <div className="container my-8 mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Display Current Stock</h1>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2"> Name</th>
              <th className="px-4 py-2"> Number</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Payment</th>
              {session?.data?.user?.name === "Devdeep" ||
      session?.data?.user?.name === "Devdeep Patidar" ? (
        <>
        <th className="px-4 py-2"> update</th>
        <th className="px-4 py-2"> delete</th>
        </>
        
      ) : (
        null
      )}
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id}>

                <td className="border px-4 py-2 text-center">{sale.name}</td>
                <td className="border px-4 py-2 text-center">{sale.number}</td>
                <td className="border px-4 py-2 text-center">
                  {sale.quantity}
                </td>
                <td className="border px-4 py-2 text-center">₹{sale.price}</td>
                <td className="border px-4 py-2 text-center">
                  ₹{sale.price * sale.quantity}
                </td>
                <td
                  className={`border px-4 py-2 text-center ${
                    sale.paid === "paid" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {sale.paid === "paid" ? "Paid" : "Unpaid"}
                </td>
                {session?.data?.user?.name === "Devdeep" ||
      session?.data?.user?.name === "Devdeep Patidar" ? (
        <>
        <td className="border px-4 py-2 text-center"> <Link href={`/dashboard/editSale/${sale._id}`} ><ArrowPathIcon width={20}/></Link>  </td>
        <td className="border px-4 py-2 text-center"> <RemoveBtn id = {sale._id} />  </td>
        </>
      ) : (
        null
      )}
              </tr>
            ))}
          </tbody>
        </table>
       
        
      </div>
      {session?.data?.user?.name === "Devdeep" ||
      session?.data?.user?.name === "Devdeep Patidar" ? (
        <div className="container mx-auto flex flex-col justify-center items-center my-8">
          <h1 className="text-3xl font-semibold mb-6">Add a Product</h1>
          <Link href={`/dashboard/addproduct`}>
            <button
              
              className="bg-royalblue hover:bg-purple-600 hover:shadow-3xl hover:scale-105 transition ease-in-out text-white px-4 py-2 rounded-lg shadow-md font-semibold"
            >
              Add Product
            </button>
          </Link>
        </div>
      ) : (
        <div className="container mx-auto flex flex-col justify-center items-center my-8">
          <h3 className="text-3xl font-semibold mb-6">Done</h3>
        </div>
      )}
    </>
  );
}
