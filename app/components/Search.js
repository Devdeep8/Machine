"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import Image from "next/image";
export default function Search({ placeholder }) {
  const [loading, setLoading] = useState(false);
  const [dropdown, setDropdown] = useState([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(async (term) => {
    // console.log(`Searching... ${term}`);
    setLoading(true); // Set loading to true as soon as search starts

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
      setDropdown([])
    }
    replace(`${pathname}?${params.toString()}`);

    // Inside handleSearch function in your Search component

    try {
      const response = await fetch("/api/search?query=" + term);
      const data = await response.json();
      // console.log(data);
      // console.log(data.searchResult);
      if (Array.isArray(data)) {
        setDropdown(data);
      } else {
        setDropdown([]); // Set dropdown to empty array if data is not an array
      }
    } catch (error) {
      console.log("Error fetching data:");
      setDropdown([]); // Set dropdown to empty array on fetch error
    }
  
    setLoading(false); // Set loading to false once search completes
  }, 300);

  return (
    <>
      <div>
        <div className="relative flex flex-1 flex-shrink-0">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            placeholder={placeholder}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get("query")?.toString()}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-5 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        {loading && (
          <div className=" transition ease-in-out">
            <Image width={80} height={80} src="/loading.svg" alt="" />
          </div>
        )}
        <div className="dropcontainer border-1 bg-purple-100 rounded-md">
          {dropdown && dropdown.map((search) => (
              <div
                key={search._id}
                className="container flex justify-between p-2 my-1 border-b-2"
              >
                <span className="slug">
                  {search.name} ({search.quantity} available for ₹
                  {search.price * search.quantity})
                </span>
                <div className="mx-5">
                  <button className="subtract inline-block px-3 py-1 cursor-pointer bg-purple-500 text-white font-semibold rounded-lg shadow-md disabled:bg-purple-200">
                    {" "}
                    -{" "}
                  </button>
                  <span className="quantity inline-block  min-w-3 mx-3">
                    {search.quantity}
                  </span>
                  <button className="add inline-block px-3 py-1 cursor-pointer bg-purple-500 text-white font-semibold rounded-lg shadow-md disabled:bg-purple-200">
                    {" "}
                    +{" "}
                  </button>
                </div>
                {/* Display paid status in green for "paid" and red for "unpaid" */}
                <span
                  className={`text-center text-${
                    search.paid === "paid" ? "green" : "red"
                  }-500`}
                >
                  {search.paid}
                </span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
