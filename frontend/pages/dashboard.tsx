import React, { useEffect } from "react";
import Product from "../components/Product";
import useFetchData from "../hooks/useFetchData";

type Props = {};

const dashboard = (props: Props) => {
  const { products, loading, fetchAllData } = useFetchData();

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div>
      {products.map((item) => (
        <Product item={item} />
      ))}
    </div>
  );
};

export default dashboard;
