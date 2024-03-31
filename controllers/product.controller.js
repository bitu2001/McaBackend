const product_model = require("../models/product.models.js");
const fs = require("fs");

//Product Create
exports.createProduct = async (req, res) => {
  //Fetch Data From Fields
  const { name, description, price, category, quantity, shipping } = req.fields;
  const { photo } = req.files;
  //validation
  switch (true) {
    case !name:
      return res.status(500).send({ error: "Name is Required" });
    case !description:
      return res.status(500).send({ error: "Description is Required" });
    case !price:
      return res.status(500).send({ error: "Price is Required" });
    case !category:
      return res.status(500).send({ error: "Category is Required" });
    case !quantity:
      return res.status(500).send({ error: "Quantity is Required" });
    case photo && photo.size > 1000000:
      return res
        .status(500)
        .send({ success:false,error: "Photo is Required and Photo Should be less than 1mb" });
  }
  try {
    const product = new product_model({
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      photo: {
        data: fs.readFileSync(photo.path),
        contentType: photo.type,
      },
    });
    // Save the product to the database
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Cannot Create Product Problem In Server",
    });
  }
};

//Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const Products = await product_model
      .find({})
      .populate('category')
      .select("-photo")
      .sort({createdAt:-1});

    if (!Products) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Product fetched successfully",
      Products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Failed to Fetch Product Problem In Server",
    });
  }
};

//get Single Product
exports.getSingleProducts = async (req, res) => {
  try {
    const Product = await product_model.findOne({name:req.params.name}).select("-photo").populate('category');
    if(!Product)
    {
      return res.status(400).send({
        success:false,
        message:"No Product Avilable"
      })
    }
    return res.status(200).send({
      success:true,
      message:"Single Product Retrive Sucessful",
      Product
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Failed to Fetch Product Problem In Server",
    });
  }
};

//get photo
exports.productPhotoController = async (req, res) => {
  try {
    const product = await product_model
      .findById(req.params.pid)
      .select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error while getting product photo",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    // Fetch Data From Fields
    const { name, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;

    // Validation
    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Find the existing product
    const productId = req.params.productId; //product ID is part of the URL
    const existingProduct = await product_model.findById(productId);

    if (!existingProduct) {
      return res.status(404).send({ success: false, message: "Product not found" });
    }

    // Update the fields you want to change
    existingProduct.name = name;
    existingProduct.description = description;
    existingProduct.price = price;
    existingProduct.category = category;
    existingProduct.quantity = quantity;
    existingProduct.shipping = shipping;

    // Update the photo if provided
    if (photo) {
      existingProduct.photo.data = fs.readFileSync(photo.path);
      existingProduct.photo.contentType = photo.type;
    }

    // Save the updated product to the database
    await existingProduct.save();

    return res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product: existingProduct,
    });
  } catch (error) {
    console.log("Error:", error); // Log the error for debugging
    return res.status(500).send({ success: false, error, message: "Error in Update Product" });
  }
};

//delete Product
exports.deleteProduct = async (req, res) => {
  try {
    await product_model.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success:true,
      message: "Product Deleted SucessFul",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error While Deleting Product",
    });
  }
};
