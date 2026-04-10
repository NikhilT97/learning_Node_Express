//shopRoutes.js

const express = require("express");
const Product = require("../model/shopModels");
const shopRouter = express.Router();

shopRouter.post("/products", async (req, res) => {
  try {
    await Product.create(req.body);
    res.status(201).json({ message: "product added" });
  } catch (error) {
    res.status(400).json({ message: "error occured, cannot add product" });
  }
});

//get all products
shopRouter.get("/products", async (req, res) => {
  try {
    const products = await Product.find(); //all products
    res.status(200).json({ message: "products list", products });
  } catch (error) {
    res.status(400).json({ message: "no products found" });
  }
});


//Find all products where inStock is true
shopRouter.get("/products", async (req, res) => {
  try {
    const filter = { inStock: true }; //object

    if (req.query.inStock) {
      filter.inStock = req.query.inStock === "true";
    }

    const products = await Product.find(filter); // in stock
    res.status(200).json({ message: "products list inStock", products });
  } catch (error) {
    res.status(400).json({ message: "failed to fetch products" });
  }
});

//product by its id
shopRouter.get("/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const foundProd = await Product.findById(productId);
    if (!foundProd) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "found by Id", foundProd });
  } catch (error) {
    res.status(404).json({ message: "invalid id or request" });
  }
});

//Update one product's price using .findByIdAndUpdate()

shopRouter.patch("/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProd = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });

    res.status(201).json({ message: "product is updated", updatedProd });
  } catch (error) {
    res.status(400).json({ message: "invalid id or request" });
  }
});

shopRouter.delete("/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProd = await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "product is deleted", deletedProd });
  } catch (error) {
    res.status(400).json({ message: "invalid id or request" });
  }
});

module.exports = { shopRouter };
