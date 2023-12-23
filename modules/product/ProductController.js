const Product = require("./Product");

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get single product
const singleProduct= async (req,res)=>{
  try {
    const orderId = req.params.id;
    const result = await Product.findOne({ _id: orderId });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error single product" });
  }
}



module.exports = { getProducts,singleProduct};
