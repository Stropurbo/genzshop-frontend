import { useEffect, useState } from 'react';
import OrderCart from '../components/Order/OrderCart';
import AuthApiClient from '../services/auth-api-client';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    AuthApiClient.get("/orders/")
      .then((res) => {
        setOrders(res.data.results); 
      })
      .catch((err) => console.error("Failed to fetch orders:", err));
  }, []);
  
  

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await AuthApiClient.post(`/orders/${orderId}/cancel/`);
      console.log(response);
      if (response.status === 200) {
        setOrders((prevOrder) =>
          prevOrder.map((order) =>
            order.id === orderId ? { ...order, status: "Canceled" } : order
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
		<div className="container mx-auto py-5 px-5">
			<h1 className="text-2xl font-bold mb-4">Order Details</h1>
			{Array.isArray(orders) && orders.length > 0 ? (
				orders.map((order) => (
					<OrderCart
						key={order.id}
						order={order}
						onCancel={handleCancelOrder}
					/>
				))
			) : (
				<p className='flex justify-center items-center'>
					<span className="loading loading-spinner loading-lg"></span>
				</p>
			)}
		</div>
  )
  
};
export default OrderPage;