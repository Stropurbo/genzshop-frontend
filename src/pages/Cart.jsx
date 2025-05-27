import React, { Suspense, useEffect, useState } from 'react';
import useCartContext from '../hooks/useCartContext';
import CartItemList from '../components/CartFolder/CartItemList';
import CartSummary from '../components/CartFolder/CartSummary';

const Cart = () => {
    const {
        cart, 
        createOrGetCart, 
        updateCartItemQuantity, 
        loading,
        deleteCartItem,
        cartId,
    } = useCartContext();

    const [localCart, setLocalCart] = useState(cart)

    useEffect(() => {
       if(!cart && !loading)  createOrGetCart();
    }, [createOrGetCart, cart, loading])

    useEffect(() => {
        setLocalCart(cart)
    }, [cart])

    // update quantity
    const handleUpdateQuantity = async(itemId, newQuantity) => {
        const prevLocalCartCopy = localCart; 
        setLocalCart((preLocalCart) => {
        const updateItem = preLocalCart.items.map((item) => 
                item.id === itemId ? {
                    ...item, 
                    quantity: newQuantity,
                    total_price: item.product.price * newQuantity,
                } : item );

        return {
            ...preLocalCart, 
            items: updateItem,
            total_price: updateItem.reduce((sum, item) => sum + item.total_price, 0)
        }               
        });

        try {
            await updateCartItemQuantity(itemId, newQuantity)
        } catch (error) {
            console.log(error);
            setLocalCart(prevLocalCartCopy)  
        }
    }


    // delete cart item
    const handleRemoveItem = async(itemId) => {
        setLocalCart((prevLocalCart) => {
            const updatedItem = prevLocalCart.items.filter((item) => item.id != itemId);

           return {
            ...prevLocalCart, 
            items: updatedItem,
            total_price: updatedItem.reduce((sum, item) => sum + item.total_price, 0)
        }

        });

        try {
            await deleteCartItem(itemId)
        } catch (error) {
            console.log(error);
        }
    }

    if(loading) return <p>Loading... </p>
    if(!localCart) return <p>No Cart Found</p>
    return (
		<div className="container mx-auto px-4 py-0">
			<div className="grid  grid-cols-1 md:grid-cols-2 gap-8">
				<div>
					<Suspense>
						<CartItemList
							items={localCart.items}
							handleUpdateQuantity={handleUpdateQuantity}
							handleRemoveItem={handleRemoveItem}
						/>
					</Suspense>
				</div>
				<div>
					<CartSummary
						totalPrice={localCart.total_price}
						itemCount={localCart.items.length}
						cartId={cartId}
						discount={localCart.discount}
					/>
				</div>
			</div>
		</div>
	)
};

export default Cart;