const Model = require("../models");
const { Product, Category, OrderDetail } = Model;
const sequelize = require("sequelize");

const getProduct = async (req, res) => {
  try {
    const query = req.query;
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit;
    const options = {
      order: ["id"],
      limit,
      offset,
      include: [
        {
          model: Category,
          as: "Category",
        },
      ],
    };
    const products = await Product.findAndCountAll(options);
    res.status(200).json({
      message: "Successfully get all products",
      currentPage: page,
      totalPages: Math.ceil(products.count / limit),
      products: products.rows,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      message: error.message,
    });
  }
};

const getDetailProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const options = {
      where: { id },
      include: [
        {
          model: Category,
          as: "Category",
        },
      ],
    };
    const product = await Product.findOne(options);
    res.status(200).json({
      message: "Successfully get detail a product",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, CategoryId, imageUrl } = req.body;
    const options = {
      where: {
        name,
      },
      defaults: {
        price,
        CategoryId,
        imageUrl,
      },
    };
    let [data, created] = await Product.findOrCreate(options);
    if (created) {
      res.status(200).json({
        message: "Your product has been created!",
        data,
      });
    } else {
      res.status(400).json({
        message: "The name of product is already exist!",
        data,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, price, CategoryId, imageUrl } = req.body;
    const options = {
      where: { id },
    };
    let product = await Product.findOne(options);
    if (product) {
      await Product.update(
        {
          name,
          price,
          CategoryId,
          imageUrl,
        },
        options
      );
      res.status(200).json({
        message: "The data has been successfully updated",
      });
    } else {
      res.status(400).json({
        message: "Product is not found!",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const options = {
      where: { id },
    };
    let product = await Product.findOne(options);
    if (!product) {
      res.status(400).json({
        message: "Product is not found!",
      });
    } else {
      await Product.destroy(options);
      res.status(200).json({
        message: "The data has been successfully deleted",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getDetailProductUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Please Provide ID",
    });
  }
  try {
    const options = {
      where: { id },
      include: [
        {
          model: Category,
          as: "Category",
        },
      ],
    };
    const product = await Product.findOne(options);
    if (!product) {
      res.status(400).json({
        message: "Product not Found",
      });
    }
    res.status(200).json({
      message: "Successfully get detail a product",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getProductPopular = async (req, res) => {
  try {
    const options = {
      attributes: [
        "ProductId",
        [sequelize.fn("sum", sequelize.col("qty")), "totalQty"],
      ],
      group: ["ProductId", `"Product"."id"`],
      order: [["totalQty", "DESC"]],
      include: [
        {
          model: Product,
        },
      ],
    };
    const productPopuler = await OrderDetail.findAll(options);
    if (!productPopuler) {
      res.status(400).json({
        message: "Product not Found",
      });
    }
    res.status(200).json({
      message: "Successfully get detail a product",
      productPopuler,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProduct,
  getDetailProduct,
  createProduct,
  editProduct,
  deleteProduct,
  getDetailProductUser,
  getProductPopular,
};
