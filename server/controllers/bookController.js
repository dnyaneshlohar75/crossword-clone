const Book = require('../models/bookModel');

const addbookController = async (req, res) => {
    console.log(req.body); 
    
    try {
        const book = new Book({
            id: req.body.id,  
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            price: req.body.price,
        });

        await book.save();

        res.json({
            success: true,
            message: 'Book added successfully',
            book: book,
        });
    } catch (error) {
        console.error('Error saving book:', error);

        res.status(500).json({
            success: false,
            error: error.message || 'Internal Server Error'
        });
    }
};

// app.post('/removebook', async (req, res) => {
//     await Book.findOneAndDelete({ id: req.body.id });
//     console.log("Removed");
//     res.json({
//         success: true,
//         name: req.body.name,
//     })
// })

// app.get('/allbooks', async(req, res)=> {
//     let books = await Book.find({});
//     console.log("All Products Fetched");
//     res.send(books);
// })

// app.get('/sudha-murthy', async (req, res) => {
//     let books = await Book.find({});
//     let sudhamurthy = books.slice(1).slice(-8);
//     console.log("Sudha Murthy Fetched");
//     res.send(sudhamurthy);
// })

const getProductsByCategoryController = async (req, res) => {
  const category = req.params.category;

  try {
      const products = await Product.find({ category: category });

      if (products.length === 0) {
          return res.status(404).json({
              success: false,
              message: 'No products found in this category'
          });
      }

      // Send the products 
      res.json({
          success: true,
          products: products
      });
  } catch (error) {
      console.error('Error retrieving products by category:', error);

      res.status(500).json({
          success: false,
          error: error.message || 'Internal Server Error'
      });
  }
};

module.exports = {
    addbookController ,
    getProductsByCategoryController
};
