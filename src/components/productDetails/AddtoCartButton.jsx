import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus,FaCheck , FaShoppingCart } from 'react-icons/fa';
import useCartContext from '../../hooks/useCartContext';

const AddtoCartButton = ({product}) => {

    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false)
    const [isAdded, setIsAdded] = useState(false)
    const { AddCartItem } = useCartContext()

    const increaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity((prev) => prev + 1);
        }
    };
    
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);

        if (value >= 1 && value <= product.stock) {
            setQuantity(value);
        } else if (value < 1) {
            setQuantity(1);
        } else if (value > product.stock) {
            setQuantity(product.stock);
        }
    };
    
    const addToCart = async () => {
        setIsAdding(true);
        try {
            await AddCartItem(product.id, quantity);
            setIsAdded(true);
            
        } catch (error) {
            console.error(error);
            setIsAdded(false); 
            
        } finally {
            setIsAdding(false);
        }
    };

    useEffect(() => {
		if (isAdded) {
			const timer = setTimeout(() => setIsAdded(false), 2000)
			return () => clearTimeout(timer)
		}
	}, [isAdded])
    
    if (!product || typeof product.stock !== "number") return null;

    return (
        <div className="space-y-4">
        <div className="join">

          <button
            className="btn btn-outline join-item"    
            onClick={decreaseQuantity}
            disabled={quantity <= 1}       
          >
            <FaMinus className="h-4 w-4" />
          </button>

          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className="input input-bordered join-item w-16 text-center"
            />

          <button
            className="btn btn-outline join-item"
            onClick={increaseQuantity} 
            disabled={quantity >= product.stock}
            >
            <FaPlus className="h-4 w-4" />
            </button>            
            </div>


            <button
                className="btn btn-primary w-full"
                onClick={addToCart}
                disabled={isAdding || isAdded || product.stock === 0 }
                >       
            {isAdding ? (
                <span className="flex items-center">
                 <span className='loading loading-spinner loading-sm mr-2'></span>
                 Adding...
                </span>  
                ) : isAdded ? (
                    <span className="flex items-center">
                    <FaCheck className="mr-2 h-4 w-4" />
                    Added to Cart
                     </span>
                ) :  (
                    <span className="flex items-center">
                    <FaShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                </span>
                )}

            </button>

      </div>
    );
};

export default AddtoCartButton;