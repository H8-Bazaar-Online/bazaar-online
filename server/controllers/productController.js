const { Product } = require('../models/')

class productController {
  static getAllProduct(req, res, next) {
    Product.findAll()
    .then((product) => {
      res.status(200).json(product)
    }).catch((err) => {
      next(err)
    })
  }

  static createProduct(req, res, next) {
    const merchant_id = req.merchant.id
    const { name, description, price, stock, category, image_url } = req.body
    Product.create({ name, description, price, stock, category, image_url, merchant_id})
    .then((newProduct) => {
      res.status(200).json(newProduct)
    })
    .catch((err) => {
      next(err)
    })
  }

  static getProductById(req, res ,next) {
    const id = +req.params.id
    console.log(id);
    Product.findOne({
      where: {
        id
      }
    })
    .then((data) => {
      console.log(data)
      res.status(200).json(data)
    }).catch((err) => {
      next(err)
    });
  }

  static updateProduct(req, res, next) {
    const merchant_id = +req.decoded.id
    const { name, description, price, stock, category, image_url} = req.body
    const id = +req.params.id
    const option = {
      where: {
        id
      },
      returning: true
    }

    Product.update({ name, description, price, stock, category, image_url, merchant_id }, option)
    .then((updateProduct) => {
      // console.log(updateProduct, "<<update");
      if(!updateProduct[1][0]) throw { name: 'Error404', status: 404, msg: 'Error Not Found !!'}

      res.status(200).json(updateProduct[1][0])
    })
    .catch((err) => {
      next(err)
    })
  }

  static deleteProduct(req, res, next){
    const id = +req.params.id
    Product.destroy({
      where: {
        id
      }
    })
    .then((data) => {
      console.log(data);
      if(!data) throw { name: 'Error404', status: 404, msg: 'Error Not Found !!'}

      res.status(200).json({ message : 'Product success to delete!!'})
    }).catch((err) => {
      next(err)
    });
  }
}

module.exports = productController