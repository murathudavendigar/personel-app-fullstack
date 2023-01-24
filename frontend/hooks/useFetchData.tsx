import axios from "axios";
import { useState } from "react";
import { PRODUCTS_URL, PRODUCT_BY_ID_URL } from "../constant/urls";
import { ProductType } from "../types";

const useFetchData = () => {
  const [products, setProducts] = useState<ProductType[] | []>([]);
  const [productId, setProductId] = useState();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(PRODUCTS_URL);
      setProducts(data);
    } catch (error) {}
    setLoading(false);
  };

  const fetchDataById = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${PRODUCT_BY_ID_URL}/${id}`);
      setProductId(data);
    } catch (error) {}
    setLoading(false);
  };

  return { products, productId, loading, fetchAllData, fetchDataById };
};

export default useFetchData;
