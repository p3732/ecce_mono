module.exports = function(sequelize, DataTypes) {
  /**
   * A ecce_mono level.
   */
  var Level = sequelize.define("Level", {
    title: {type: DataTypes.TEXT, allowNull: false},
    image: {type: DataTypes.TEXT, allowNull: false},
    overlay: {type: DataTypes.TEXT, allowNull: false},
    //upper left corner coordinates of overlay
    x: {type: DataTypes.INTEGER, allowNull: false},
    y: {type: DataTypes.INTEGER, allowNull: false},
    width: {type: DataTypes.INTEGER, allowNull: false},
    height: {type: DataTypes.INTEGER, allowNull: false},
    timeout: {type: DataTypes.INTEGER, allowNull: false},
    hex_value_1: {type: DataTypes.TEXT, allowNull: false},
    hex_value_2: {type: DataTypes.TEXT, allowNull: true},
    hex_value_3: {type: DataTypes.TEXT, allowNull: true},
    hex_value_4: {type: DataTypes.TEXT, allowNull: true},
    hex_value_5: {type: DataTypes.TEXT, allowNull: true}
  });

  return Level;
}
