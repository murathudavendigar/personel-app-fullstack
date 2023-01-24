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
    <div className="flex flex-wrap items-center justify-center mt-20 gap-10">
      {products.map((item) => (
        <Product item={item} />
      ))}
    </div>
  );
};

export default dashboard;
