module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        name: {
            allowNull: false,
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING(4000) 
            
        },
        imagePath: {
            type: Sequelize.STRING
        },
        catalog: {
            type: Sequelize.STRING
        },
        price: {
            allowNull: false,
            type: Sequelize.FLOAT
        }
    });
    return Product;
};