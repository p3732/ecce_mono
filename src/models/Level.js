module.exports = function(sequelize, DataTypes) {
  /**
   * A ecce_mono level.
   */
  var Level = sequelize.define("Level", {
    image_uri: {type: DataTypes.TEXT, allowNull: false},
    x1: {type: DataTypes.INTEGER, allowNull: false},
    x2: {type: DataTypes.INTEGER, allowNull: false},
    y1: {type: DataTypes.INTEGER, allowNull: false},
    y2: {type: DataTypes.INTEGER, allowNull: false},
    overlay_uri: {type: DataTypes.TEXT, allowNull: false},
    time: {type: DataTypes.INTEGER, allowNull: false},
    hex_value_1: {type: DataTypes.INTEGER, allowNull: false},
    hex_value_2: {type: DataTypes.INTEGER, allowNull: false},
    hex_value_3: {type: DataTypes.INTEGER, allowNull: false},
    hex_value_4: {type: DataTypes.INTEGER, allowNull: false},
    hex_value_5: {type: DataTypes.INTEGER, allowNull: false}
  });

  return Level;
}
