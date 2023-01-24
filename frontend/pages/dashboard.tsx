import React, { useEffect } from "react";
import useFetchData from "../hooks/useFetchData";

type Props = {};

const dashboard = (props: Props) => {
  const { products, loading, fetchAllData } = useFetchData();

  useEffect(() => {
    fetchAllData();
  }, []);

  return <div>dashboard</div>;
};

export default dashboard;
