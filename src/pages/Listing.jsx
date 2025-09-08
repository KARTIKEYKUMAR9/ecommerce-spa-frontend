// src/pages/Listing.jsx
import React, { useEffect, useState } from "react";
import API from "../api";

export default function Listing() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [loading, setLoading] = useState(false);
  const [addingId, setAddingId] = useState(null); // id of item currently being added

  // Fetch categories dynamically (optional endpoint /items/categories)
  const fetchCategories = async () => {
    try {
      const res = await API.get("/items/categories");
      if (Array.isArray(res.data)) setCategories(res.data);
    } catch (err) {
      // If categories endpoint is not available, fall back to a sensible default
      setCategories([
        "Electronics",
        "Clothing",
        "Footwear",
        "Accessories",
      ]);
    }
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const params = {};
      if (category) params.category = category;
      if (minPrice > 0) params.minPrice = minPrice;
      if (maxPrice < 2000) params.maxPrice = maxPrice;

      const res = await API.get("/items", { params });
      setItems(res.data || []);
    } catch (err) {
      console.error("Error fetching items:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    // initial fetch
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // refetch when filters change
  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, minPrice, maxPrice]);

  // merge item into localStorage cart (increment quantity if exists)
  const mergeLocalCart = (item) => {
    try {
      const raw = localStorage.getItem("cart");
      const cart = raw ? JSON.parse(raw) : [];
      const idx = cart.findIndex(
        (c) => c._id === item._id || c.id === item._id
      );
      if (idx >= 0) {
        cart[idx].quantity = (cart[idx].quantity || 1) + 1;
      } else {
        // store minimal fields to keep cart small
        cart.push({
          _id: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
          quantity: 1,
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      // notify other parts of the app (Navbar could listen to this)
      window.dispatchEvent(
        new CustomEvent("cartUpdated", { detail: { count: cart.length } })
      );
      return cart;
    } catch (err) {
      console.error("Error updating local cart", err);
      return null;
    }
  };

  const addToCart = async (item) => {
    setAddingId(item._id);
    try {
      // Try backend first (will work for logged-in users)
      const res = await API.post("/cart/add", {
        itemId: item._id,
        quantity: 1,
      });

      // If backend returns updated cart array (common pattern), persist locally too
      if (res?.data) {
        // backend may return { cart: [...] } or an array directly
        if (Array.isArray(res.data.cart)) {
          localStorage.setItem("cart", JSON.stringify(res.data.cart));
          window.dispatchEvent(
            new CustomEvent("cartUpdated", {
              detail: { count: res.data.cart.length },
            })
          );
        } else if (Array.isArray(res.data)) {
          localStorage.setItem("cart", JSON.stringify(res.data));
          window.dispatchEvent(
            new CustomEvent("cartUpdated", {
              detail: { count: res.data.length },
            })
          );
        } else {
          // fallback: merge single item locally
          mergeLocalCart(item);
        }
      } else {
        // fallback
        mergeLocalCart(item);
      }

      alert(`${item.name} added to cart`);
    } catch (err) {
      console.warn("Add to cart API failed, falling back to local cart.", err);
      mergeLocalCart(item);

      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        alert(`${item.name} added to cart locally. Log in to save your cart.`);
      } else {
        alert(`${item.name} added to cart (offline/local).`);
      }
    } finally {
      setAddingId(null);
    }
  };

  const resetFilters = () => {
    setCategory("");
    setMinPrice(0);
    setMaxPrice(2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Shop Products</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center items-end">
        <div className="w-full sm:w-48">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg p-2 w-full"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-40">
          <label className="block text-sm font-medium mb-1">Min Price</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value || 0))}
            placeholder="0"
            className="border rounded-lg p-2 w-full"
            min={0}
          />
        </div>

        <div className="w-full sm:w-40">
          <label className="block text-sm font-medium mb-1">Max Price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value || 2000))}
            placeholder="2000"
            className="border rounded-lg p-2 w-full"
            min={0}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={fetchItems}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
          >
            Apply
          </button>
          <button
            onClick={resetFilters}
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Items */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-500">No items found</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-3"
                onError={(e) => {
                  // fallback image if URL invalid
                  e.currentTarget.src =
                    "https://via.placeholder.com/300x300?text=No+Image";
                }}
              />
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">${item.price}</p>
              <p className="text-sm text-gray-500 mb-3">{item.category}</p>

              <button
                onClick={() => addToCart(item)}
                disabled={addingId === item._id}
                className={`mt-auto py-2 rounded-lg text-white ${
                  addingId === item._id
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {addingId === item._id ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
