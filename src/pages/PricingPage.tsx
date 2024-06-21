import React, { useEffect, useState } from "react";
import CustomCalendar from "../components/Calendar";
import { motion } from "framer-motion";
import { useAuthContext } from "../hooks/useAuthContext";
import { FaBookOpen, FaCoins, FaPiggyBank } from "react-icons/fa6";
import { APP_URL } from "../Url";
import CalendarPanel from "../components/CalendarPanel";
import { MdModeEditOutline } from "react-icons/md";
import { IoClose, IoSparkles } from "react-icons/io5";
import { toast } from "react-toastify";
import { error } from "console";

const PricingPage = () => {
  const { user } = useAuthContext();
  const port = APP_URL;

  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [editedPrice, setEditedPrice] = useState<any>({});

  const fetchPrices = async () => {
    try {
      const response = await fetch(`${port}/api/subs/prices`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prices");
      }

      const json = await response.json();
      const latestPrices = json.map((item: any) => item.latest_price);
      setPrices(latestPrices);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const editPrice = async (
    productId: string,
    nickname: string,
    priceId: string
  ) => {
    // console.log(priceId);
    // console.log(editedPrices);a
    const price = editedPrice * 100;

    const requestBody = {
      nickname: nickname,
      unit_amount: price,
      currency: "usd",
    };

    console.log(requestBody);

    const response = await fetch(`${port}/api/subs/update/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const json = await response.json();

    if (response.ok) {
      toast.success(json.message);
      fetchPrices();
      toggleEditMode(priceId);
    } else {
      toast.error("Error editing price.");
      console.log(json.error);
    }
  };

  const toggleEditMode = (id: string) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [id]: !prevEditMode[id],
    }));
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <div
      className="flex flex-row w-full h-screen space-y-0 space-x-2 p-6 bg-raisin_black-300"
      data-testid="pricing-page"
    >
      <div className="flex flex-row space-x-4 w-full h-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              type: "spring",
              duration: 1,
              delay: 0.2,
              bounce: 0.4,
            },
          }}
          className="flex flex-col items-start rounded-xl w-3/4 h-full space-x-2 space-y-2"
        >
          <div className="flex w-full h-[5%]">
            <h3 className="text-white text-3xl font-bold">Pricing</h3>
          </div>
          <div className="flex flex-row w-full space-x-2 h-[95%]">
            {prices.map((price, index) => {
              return (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      type: "spring",
                      duration: 1,
                      bounce: 0.4,
                      delay: index * 0.2 + 0.2,
                    },
                  }}
                  key={price.id}
                  className="flex flex-col items-start justify-between w-1/3 h-[45%] shadow-md rounded-md p-6 bg-gradient-to-tl from-[#201c2100] to-raisin_black-500"
                >
                  <p className="flex flex-row items-center text-lg font-semibold text-white space-x-2">
                    <div className="flex items-center justify-center text-fuchsia-400 text-xl w-10 h-10 bg-fuchsia-800 rounded-full">
                      {price.nickname === "Free" && <FaPiggyBank />}
                      {price.nickname === "Basic" && <FaCoins />}
                      {price.nickname === "Premium" && <IoSparkles />}
                    </div>
                    <span>{price.nickname}</span>
                  </p>
                  <div className="flex flex-row items-start justify-center space-x-2">
                    <h3 className="text-white font-bold text-5xl">
                      {price.unit_amount === 0 ? (
                        "Free"
                      ) : (
                        <div className="flex flex-row items-start space-x-2">
                          {editMode[price.id] ? (
                            <div className="flex flex-col items-start">
                              <input
                                type=""
                                onChange={(e) => setEditedPrice(e.target.value)}
                                className="text-white bg-transparent border-b-2 rounded-none border-fuchsia text-6xl font-bold w-full"
                              />
                              <button
                                onClick={() => {
                                  editPrice(
                                    price.product.id,
                                    price.nickname,
                                    price.id
                                  );
                                }}
                                className="text-fuchsia font-semibold text-base hover:text-fuchsia-400 transition-colors"
                              >
                                Edit
                              </button>
                            </div>
                          ) : (
                            <span className="text-white font-bold text-lg">
                              <span className="text-6xl">
                                {(price.unit_amount / 100).toFixed(2)}
                              </span>
                              USD
                            </span>
                          )}
                          {editMode[price.id] ? (
                            <button
                              onClick={() => toggleEditMode(price.id)}
                              className="text-2xl text-raisin_black-600 hover:text-fuchsia transition-colors"
                            >
                              <IoClose />
                            </button>
                          ) : (
                            <button
                              onClick={() => toggleEditMode(price.id)}
                              className="text-2xl text-raisin_black-600 hover:text-fuchsia transition-colors"
                            >
                              <MdModeEditOutline />
                            </button>
                          )}
                        </div>
                      )}
                    </h3>
                  </div>
                  <div className="text-fuchsia font-semibold text-start">
                    {price.nickname === "Free" && "Free Tier for new comers."}
                    {price.nickname === "Basic" &&
                      "Basic tier for semi-advanced courses."}
                    {price.nickname === "Premium" &&
                      "Premium Tier for full access to all courses."}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        <CalendarPanel />
      </div>
    </div>
  );
};

export default PricingPage;
