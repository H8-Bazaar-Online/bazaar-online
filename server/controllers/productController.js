const { Product, Merchant } = require('../models/')
const { cloudinary } = require('../utils/cloudinary');

class productController {
  static getAllProduct(req, res, next) {
    Product.findAll({
      where: {user_id: req.decoded.id}
    })
    .then((product) => {
      res.status(200).json(product)
    }).catch((err) => {
      next(err)
    })
  }

  static getAllDataProduct(req, res, next) {
    Product.findAll()
    .then((product) => {
      res.status(200).json(product)
    }).catch((err) => {
      next(err)
    })
  }

  static async uploadImage (req,res, next){
      try {
          const fileStr = req.body.data;
          const uploadResponse = await cloudinary.uploader.upload(fileStr, {
              upload_preset: 'dev_setups',
          });
          res.status(200).json(uploadResponse.url)
      } catch (err) {
          next(err)
      }
  } 

  static getAllProductCustomer(req, res, next) {
    const user_id = +req.params.user_id
    Product.findAll({
      where: {
        user_id
      },
      include: {
        model: Merchant
      }
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static createProduct (req, res, next) {
    const user_id = req.decoded.id
    const { name, description, price, stock, category, image_url, merchant_id } = req.body
    
    Product.create({ name, description, price, stock, category, image_url, merchant_id, user_id})
    .then((newProduct) => {
      res.status(201).json(newProduct)
    })
    .catch((err) => {
      next(err)
    })
  }

  static getProductById(req, res ,next) {
    const id = +req.params.id
    Product.findOne({
      where: {
        id
      }
    })
    .then((data) => {
      if (!data) throw { name: 'CustomError', message: 'Data Not Found', status: 404 }
      res.status(200).json(data)
    }).catch((err) => {
      next(err)
    });
  }

  static updateProduct(req, res, next) {
    const user_id = req.decoded.id
    const { name, description, price, stock, category, image_url } = req.body
    const merchant_id = +req.body.merchant_id
    const id = +req.params.id
    const option = {
      where: {
        id,
        merchant_id
      },
      returning: true
    }

    Product.update({ name, description, price, stock, category, image_url, merchant_id, user_id }, option)
    .then((updateProduct) => {
      if(!updateProduct[1][0]) throw { name: 'CustomError', status: 404, message: 'Error Not Found !!'}
      res.status(200).json(updateProduct[1][0])
    })
    .catch((err) => {
      console.log(err);
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
      if(!data) throw { name: 'CustomError', status: 404, message: 'Error Not Found !!'}

      res.status(200).json({ message : 'Product success to delete!!'})
    }).catch((err) => {
      next(err)
    });
  }
}

module.exports = productController