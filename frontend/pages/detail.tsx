import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loader from "../components/Loader";
import useFetchData from "../hooks/useFetchData";

type Props = {};

const detail = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const { productId, sellerProfile, loading, getSellerById, fetchDataById } =
    useFetchData();

  useEffect(() => {
    if (typeof id === "string") {
      fetchDataById(id);
    }
  }, []);

  useEffect(() => {
    if (productId?.id) {
      getSellerById(productId?.seller_id);
    }
  }, [productId]);

  const defaultAvatar = "https://static.thenounproject.com/png/5034901-200.png";

  return (
    <div className="flex justify-center items-center mt-24">
      {loading ? (
        <Loader color="#bcc" />
      ) : (
        <div className="bg-gray-500 p-10 rounded-lg shadow-md">
          <h1 className="text-xl font-bold">{productId?.brand}</h1>
          <div className="mt-4 mb-10">
            <p className="text-gray-600">{productId?.amount}</p>
            <div className="bg-gray-400 w-64 h-3 rounded-lg mt-2 overflow-hidden">
              <div className="bg-pink-400 w-3/4 h-full rounded-lg shadow-md" />
            </div>
          </div>
          <h3 className="text-xs uppercase">{productId?.name}</h3>
          <div className="flex items-center gap-5">
            <h4 className="text-lg">
              Seller :{" "}
              <span className="text-xl capitalize font-semibold">
                {sellerProfile?.user || "anonim"}
              </span>
            </h4>
            <img
              className="w-12 h-12"
              src={sellerProfile?.avatar || defaultAvatar}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default detail;
