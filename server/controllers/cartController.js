const Book = require('../models/bookModel');

const addToCartController = async (req, res) => {
    const { itemId } = req.body;
    const userId = req.user.id;
  
    try {
      let userData = await Users.findOne({ _id: userId });
  
      if (!userData) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
  
      if (!userData.cartData.hasOwnProperty(itemId)) {
        return res.status(400).json({
          success: false,
          message: 'Item not found in cart data'
        });
      }
  
      // Increment the item quantity
      userData.cartData[itemId] += 1;
  
      // Update the user document
      await Users.findOneAndUpdate({ _id: userId }, { cartData: userData.cartData });
  
      console.log("Added", itemId);
  
      return res.status(200).json({
        success: true,
        message: 'Item added to cart'
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message,
      });
    }
  };








module.exports = {
    addToCartController
};
