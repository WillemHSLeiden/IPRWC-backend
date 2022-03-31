const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/test/all", controller.allAccess);
    app.get(
        "/api/test/user",
        [authJwt.verifyToken],
        controller.userBoard
    );
    app.get(
        "/api/test/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );
    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
    
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    // Create a new User
    router.post("/", users.create);
    // Retrieve all Users
    router.get("/", users.findAll);
    // Retrieve a single User with email
    router.get("/:email", users.findOne);
    // Update a User with id
    //router.put("/:username", users.update);
    // Delete a User with id
    router.delete("/:id", users.delete);
    // Delete all Users
    router.delete("/", users.deleteAll);
    app.put(
        "/api/users/:username",
        users.update
    )
    app.delete(
        "/api/users/:username",
        users.delete
    )
    app.use('/api/users', router);
};