module.exports = function(sequelize, DataTypes){
    var History = sequelize.define("History", {
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return History;
};