import React, { useState, useMemo, useEffect } from 'react';
import { Button, Link } from '@nextui-org/react';
import CartService from './CartService';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import NavBar from '../../utils/NavBar.jsx';
import AddressInputs from './AddressInputs';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Checkout from './Checkout';
import axios from 'axios';
import UserControls from '../../utils/UserControlls.jsx';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const ShoppingCart = ({}) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    let vendors = JSON.parse(localStorage.getItem('vendors'));
    if (vendors.length > 0) {
      let copyOfServices = [...vendors];
      setServices(copyOfServices);
    }
  }, []);

  const removeService = (serviceId) => {
    let vendors = JSON.parse(localStorage.getItem('vendors'));
    let updatedVendors = vendors.filter(vendor => vendor._id !== serviceId);
    localStorage.setItem('vendors', JSON.stringify(updatedVendors));
    setServices(updatedVendors);
  };

  // Calculate the total amount of the services
  const total = useMemo(() => {
    return services.reduce((acc, service) => acc + service.price, 0);
  }, [services]);

  const proceedToCheckOut = async (e) => {
    e.preventDefault();
    try {
      const stripe = await stripePromise;
      const apiUrl = import.meta.env.VITE_API_URL;
      const { data: session } = await axios.post(`${apiUrl}/checkout`, {
        totalAmount: total,
      });
      // proceed with stripe.redirectToCheckout
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Failed to redirect to Stripe Checkout:", error.response || error.message || error);
    }
  };

  if (services.length === 0) {
    return (
      <>
      <NavBar>
        <UserControls />
      </NavBar>
      <section className='bg-mmblue min-h-screen'>
        <div className='my-4 flex flex-col gap-4 items-center'>
          <p className='text-3xl font-semibold text-mmcream mt-6'>Your Service Cart is Empty</p>
          <Link href='/home' className='text-2xl font-semibold text-mmcream'>
            <ChevronLeftIcon className={'w-4 mr-2 '} />
            Continue Booking
          </Link>
        </div>
      </section>
      </>
    );
  }

  return (
    <>
    <NavBar>
      <UserControls/>
    </NavBar>
    <section className="bg-mmblue min-h-screen px-8">
      <div className="flex justify-between gap-8">
        <div className="w-full lg:w-2/3 xl:w-1/2 mt-6">
          <Link href='/home' className='text-primary font-semibold flex items-center text-mmcream '>
            <ChevronLeftIcon className={'w-4 mr-2 '} />
            Continue Booking
          </Link>
          <h2 className='text-xl font-semibold text-mmcream my-4'>Selected Services</h2>
          <div>
            {services.map(service => (
              <CartService
                key={service._id}
                service={service.category}
                photo={service.photo}
                price={service.price}
                onRemove={() => removeService(service._id)}
              />
            ))}
              <div className='grid grid-cols-8 gap-4 pt-2 mt-4 items-center'>
                <div className='col-span-5 px-4'>
                  <p className='font-semibold text-mmcream'>Total:</p>
                </div>
                <div className='col-span-2 text-right font-semibold text-mmcream'>
                  ${total}
                </div>
                <div className='col-span-1'></div>
              </div>
            </div>
          </div>
        <div className="w-full lg:w-1/3 xl:w-1/2 max-w-md">
          <h2 className='text-xl font-semibold text-mmcream my-4'>Check Out</h2>
          <div className='rounded-xl p-6 bg-mmsand text-mmblue'>
            <form onSubmit={proceedToCheckOut} className="flex flex-col gap-6">
              <AddressInputs />
              <Button type='submit' color='primary' fullWidth className="bg-mmblue border border-mmblue font-semibold text-mmcream">Submit Payment</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </>
);
};

export default ShoppingCart;
