const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a User
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      address: req.body.address,
      postalCode: req.body.postalCode,
      city: req.body.city,
      country: req.body.country,
      roles: req.body.roles
    };

    // Save User in the database
    User.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
    });
};
// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    User.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
    });
};
// Find a single User with an email
exports.findOne = (req, res) => {
    const email = req.params.email;
    User.findOne({ where: {email: email} })
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
// Update a User by the id in the request
exports.update = (req, res) => {
    const username = req.params.username;
    User.update(req.body, {
      where: { username: username }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with username username. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const username = req.params.username;
    User.destroy({
      where: { username: username }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with username ${username}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with user " + username
        });
      });
};
// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
  .then(nums => {
    res.send({ message: `${nums} User were deleted successfully!` });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all users."
    });
  });
};

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};