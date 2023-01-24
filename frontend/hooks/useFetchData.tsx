import axios from "axios";
import { useState } from "react";
import { PRODUCTS_URL } from "../constant/urls";

const useFetchData = () => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(PRODUCTS_URL);
      setProducts(data);
      console.log(data);
    } catch (error) {}
    setLoading(false);
  };

  return { products, loading, fetchAllData };
};

export default useFetchData;
