const Cart = require('../models/cartModel');
const Wishlist = require('../models/wishlistModel');

const addToCartController = async (req, res) => {

  try {
    const { userId, productId, quantity = 1 } = req.body;

    const existingCart = await Cart.findOne({ userId });

    if (!existingCart) {
      const newCart = new Cart({ userId, products: [] });
      await newCart.save();
      
      return res.status(201).json({ message: "Cart created successfully" });
    }

    const productIndex = existingCart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex !== -1) {
      existingCart.products[productIndex].quantity += quantity;
    }    
    else {
      existingCart.products.push({ product: productId, quantity });
    }

    await existingCart.save();
    return res.status(200).json({ message: "Product added to cart successfully", success: true, carts: existingCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

  const myWishlistController =  async (req, res) => {

    const { userId } = req.body;
  
    const wishlists = await Wishlist.find({ userId }).populate("products.product");

    console.log(wishlists);
  
    if (wishlists) {
      return res.json({
          success: true,
          message: "wishlist data",
          wishlists,
        })
        .status(200);
    }
  
    return res
      .json({
        success: false,
        message: "Your wishlist is empty",
      })
      .status(404);
  
  }

  const addProductWishlist = async (req, res) => {
    try {
      const { userId, productId, quantity=1 } = req.body;

      console.log("Wishlist controller")
  
      const existingWishlist = await Wishlist.findOne({ userId });
  
      if (!existingWishlist) {
        const wishlist = new Wishlist({ userId, products: [] });
        await wishlist.save();
        
        res.status(201).json({ message: "Wishlist created successfully" });
      }
  
      const productIndex = existingWishlist.products.findIndex(
        (item) => item.product.toString() === productId
      );
  
      if (productIndex !== -1) {
        existingWishlist.products[productIndex].quantity += quantity;
      }    
      else {
        existingWishlist.products.push({ product: productId, quantity });
      }
  
      await existingWishlist.save();
      return res.status(200).json({ message: "Product added to wishlist successfully", wishlist: existingWishlist });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
      return res.status(500).json({ error: "Internal server error" });
    }

  }

  const removeProductWishlist = async (req, res) => {
    const { userId, productId } = req.body;
  
    if (!userId || !productId) {
      return res.status(400).json({ message: "User ID and Product ID are required." });
    }
  
    try {
      const wishlist = await Wishlist.findOneAndUpdate(
        { userId: userId },
        { $pull: { products: { product: productId } } }, 
        { new: true } 
      );
  
      if (!wishlist) {
        return res.status(404).json({ message: "Wishlist not found." });
      }
  
      return res.status(200).json({ message: "Product removed from wishlist.", wishlists: wishlist });
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  };

  const getAllCartsController = async (req, res) => {
    const { userId } = req.body;
  
    const carts = await Cart.find({ userId }).populate("products.product");
  
    if (carts) {
      return res
        .json({
          success: true,
          message: "cart data",
          carts,
        })
        .status(200);
    }
  
    return res
      .json({
        success: false,
        message: "Your cart is empty",
      })
      .status(404);
  };

module.exports = {
    addToCartController,
    myWishlistController,
    getAllCartsController,
    addProductWishlist,
    addProductWishlist,
    removeProductWishlist
};
