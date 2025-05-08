import { useEffect, useState } from "react"
import apiClient from "../services/api-client";

const useFetchProduct = ( 
    currentpage, 
    priceRange, 
    selectedCategory,
    searchQuery,
    sortOrder

    ) => {

    const [myproduct, setProduct] = useState([]);
    const [isloading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [totalpage, settotalpage] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            const url = `products/?category_id=&price__gt=${priceRange[0]}&price__lt=${priceRange[1]}
            &page=${currentpage}&category_id=${selectedCategory}&search=${searchQuery}&ordering=${sortOrder}`;

            try {
            const res = await apiClient.get(url);
                    
            setProduct(res.data.results)
            settotalpage(Math.ceil(res.data.count / res.data.results.length))

           } catch (error) {
            setError(error);
           }finally{
            setLoading(false)
           }
        };
        fetchProduct();
    }, [currentpage, priceRange, selectedCategory, searchQuery,sortOrder]);

    return {myproduct, isloading,error, totalpage}
}

export default useFetchProduct;