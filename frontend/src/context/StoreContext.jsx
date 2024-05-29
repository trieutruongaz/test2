import axios from "axios";
import { createContext, useEffect, useState } from "react";



export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
  const [cartItems, setcartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setcartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }
    const removeFromCart = (itemId) => {
        setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    const getTotalCartAmount = () => {
        let total = 0;
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            let itemInfo = food_list.find((product) => product._id === item);
            if (itemInfo) { // Check if itemInfo is found
              total += itemInfo.price * cartItems[item];
            } else {
              console.error("Item not found in food_list:", item); // Handle error if not found (optional)
            }
          }
        }
        return total;
      };

      const loadCartData = async (token) => {
        const response = await axios.post(
          url + "/api/cart/get",
          {},
          { headers: { token } }
        );
        setCartItems(response.data.cartData);
      };
    
      useEffect(() => {
        async function loadData() {
          await fetchFoodList();
          if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
          }
        }
        loadData();
      }, []);
      const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
      };
      



      

    const contextValue = {
        food_list,
        cartItems,
        setcartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
}


export default StoreContextProvider