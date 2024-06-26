/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLongArrowAltLeft } from "react-icons/fa";

const Vendors = ({ selectedCategory, goToPreviousPage, setSelectedVendor, goToNextPage }) => {

  const [vendors, setVendors] = useState([]);
  const [category, setCategory] = useState(selectedCategory);

  const handleVendorClick = (vendor) => {
    setSelectedVendor(vendor);
    goToNextPage();
  }

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    if (category) {
      const apiUrl = import.meta.env.VITE_API_URL;
      axios.get(`${apiUrl}/vendors`, {
        params: {
          category: `${category}`
        }
      })
      .then((response) => {
      setVendors(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }, []);

  // on hover of photo set border

  return (
    <div>
      <div className="text-mmcream fixed inset-0 flex items-center justify-center outline-none overflow-auto">
        <view className="relative w-1/2 h-3/5 bg-mmblue p-6 rounded shadow-lg h-quto mx-auto overflow-auto">
          <h1 className="text-4xl font-thin mb-8 border-b">Select a Vendor</h1>
          <div className="flex flex-wrap justify-evenly gap-5">
            {vendors.map((vendor, index) => {
              return (
                <div key={index} onClick={() => handleVendorClick(vendor)} className="flex-none w-64 bg-white text-mmblue hover:scale-110 transition duration-200 text-center hover:border hover:border-mmcream z-10 rounded-lg cursor-pointer">
                  <img className="rounded-md" src={vendor.photo} alt="Vendor Logo" />
                  <h1 className="font-bold">{vendor.name}</h1>
                  <h2>{capitalize(vendor.serviceDescription)}</h2>
                </div>
              )
            })}
          </div>
          <button onClick={() => goToPreviousPage()}
            className="text-3xl hover:scale-110 transform transition duration-200 ease-in-out mt-8"
          ><FaLongArrowAltLeft /></button>
        </view>
      </div>
    </div>
  )
}

export default Vendors;