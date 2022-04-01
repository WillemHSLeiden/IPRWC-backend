const db = require("../models");
const Product = db.product;

exports.create = (req, res) => {
    let products = [];

    for (i=0; i < req.body.length; i++) {
    // Create a User
        const product = {
            name: req.body[i].name,
            description: req.body[i].description,
            imagePath: req.body[i].imagePath,
            catalog: req.body[i].catalog,
            price: req.body[i].price
        };

        products.push(product);
    }

    // Save User in the database
    Product.bulkCreate(products)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the product."
        });
    });
};

exports.findAll = (req, res) => {
    Product.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving product."
        });
    });
};

exports.findByCatalog = (req, res) => {
    const catalog = req.params.catalog;
    Product.findAll({ where: {catalog: catalog} })
      .then(data => {
        if (data) {
            res.send(data);
          } else {
            res.status(404).send({
              message: `Cannot find products in catalog ${catalog}`
            });
          }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products."
        });
    });
};

exports.findOne = (req, res) => {
    const email = req.params.email;
    User.findAll({ where: {email: email} })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find User with email ${email}`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with email " + email
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Product.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Product was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Product with id ${id}. Maybe Product was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Product with product " + id
        });
      });
};

exports.deleteAll = (req, res) => {
    Product.destroy({
      where: {},
      truncate: false
    })
    .then(nums => {
      res.send({ message: `${nums} products were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products."
      });
    });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
    Product.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update product with id ${id}. Maybe product was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };