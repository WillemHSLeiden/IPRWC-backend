module.exports = function(app) {
    const products = require("../controllers/product.controller.js");
    var router = require("express").Router();

    router.post("/", products.create);
    router.get("/", products.findAll);
    router.get("/:catalog", products.findByCatalog);
    router.delete("/:id", products.delete);
    router.delete("/", products.deleteAll);
    router.put("/:id", products.update);

    app.use('/api/products', router);
};