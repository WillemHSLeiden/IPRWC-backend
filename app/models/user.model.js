module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username: {
            allowNull: false,
            type: Sequelize.STRING
        },
        email: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING
        },
        address: {
            allowNull: false,
            type: Sequelize.STRING
        },
        postalCode: {
            allowNull: false,
            type: Sequelize.STRING
        },
        city: {
            allowNull: false,
            type: Sequelize.STRING
        },
        country: {
            allowNull: false,
            type: Sequelize.STRING
        }
    });
    return User;
};