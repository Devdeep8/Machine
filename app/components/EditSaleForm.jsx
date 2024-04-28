'use client';

import { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function UpdateSale( sale , {params} ) {
    // console.log(sale)
    const id = sale.sale._id
  const session = useSession();
  const router = useRouter();

  if (session.status === "unauthenticated") {
    router.replace("/login");
  }

  const [saleForm, setsaleForm] = useState({
    name: sale.sale.name,
    number: sale.sale.number,
    quantity: sale.sale.quantity,
    price: sale.sale.price,
    paid: sale.sale.paid,
    _id: sale.id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsaleForm({ ...saleForm, [name]: value });
  };

  const handlePaidChange = (e) => {
    setsaleForm({ ...saleForm, paid: e.target.value });
  };

  const updateSales = async (e) => {

    e.preventDefault();

      if (saleForm.quantity <= 0) {
        toast.error("Quantity should not be Zero", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
         return
      }

    try {
        
      const response = await fetch(`/api/stock/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saleForm),
      });


      if (response.error) {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success("sale update successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-semibold mb-6">Add a sale</h1>

        <form onSubmit={updateSales}>
          <div className="mb-4">
            <label htmlFor="saleName" className="block mb-2">
               Name
            </label>
            <input
              value={saleForm.name}
              name="name"
              onChange={handleChange}
              type="text"
              id="saleName"
              className="w-full border border-gray-300 px-4 py-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="saleNumber" className="block mb-2">
               Number
            </label>
            <input
              value={saleForm.number}
              name="number"
              onChange={handleChange}
              type="text"
              id="saleNumber"
              className="w-full border border-gray-300 px-4 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Paid Status</label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="paid"
                  value="paid"
                  checked={saleForm.paid === "paid"}
                  onChange={handlePaidChange}
                />
                Paid
              </label>
              <label>
                <input
                  type="radio"
                  name="paid"
                  value="unpaid"
                  checked={saleForm.paid === "unpaid"}
                  onChange={handlePaidChange}
                />
                Unpaid
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="quantity" className="block mb-2">
              Quantity
            </label>
            <input
              value={saleForm.quantity}
              name="quantity"
              onChange={handleChange}
              type="number"
              id="quantity"
              className="w-full border border-gray-300 px-4 py-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block mb-2">
              Price
            </label>
            <input
              value={saleForm.price}
              name="price"
              onChange={handleChange}
              type="number"
              id="price"
              className="w-full border border-gray-300 px-4 py-2"
            />
          </div>

          <button
            type="submit"
            className="bg-royalblue mr-4 hover:shadow-3xl hover:bg-purple-600 hover:scale-105 transition ease-in-out text-white px-4 py-2 rounded-lg shadow-md font-semibold"
          >
            update sale
          </button>

          <Link href={`/dashboard`}>
            <button
              type="button"
              className="bg-royalblue hover:bg-purple-600 hover:shadow-3xl hover:scale-105 transition ease-in-out text-white px-4 py-2 rounded-lg shadow-md font-semibold"
            >
              Dashboard
            </button>
          </Link>
        </form>
      </div>
    </>
  );
}
