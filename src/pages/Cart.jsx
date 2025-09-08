import { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total price (price × quantity)
  const totalPrice = cart.reduce(
    (sum, cartItem) => sum + (cartItem.item.price || 0) * (cartItem.quantity || 1),
    0
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">No items in cart</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((cartItem) => (
              <div
                key={cartItem._id}
                className="flex items-center justify-between border p-4 rounded-lg bg-white shadow"
              >
                {/* Product info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{cartItem.item.name}</h3>
                    <p className="text-sm text-gray-500">{cartItem.item.category}</p>
                    <p className="text-lg font-bold">${cartItem.item.price}</p>
                    <p className="text-sm">Qty: {cartItem.quantity}</p>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(cartItem._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Total */}
          <div className="mt-8 p-6 bg-gray-100 rounded-lg flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Total:</h3>
              <p className="text-2xl font-bold text-green-600">${totalPrice.toFixed(2)}</p>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => alert("Proceeding to Checkout...")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
