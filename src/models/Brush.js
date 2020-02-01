module.exports = function(sequelize, DataTypes) {
  /**
   * A ecce_mono level.
   */
  var Brush = sequelize.define("Brush", {
    title: {type: DataTypes.TEXT, allowNull: false},
    // image of the tool (e.g. picture of a tooth brush, shoe, …)
    image: {type: DataTypes.TEXT, allowNull: false},
    // image file for drawing, as in the print of the brush
    brush: {type: DataTypes.TEXT, allowNull: false},
    // color in hex notation (as in "FF0000")
    color: {type: DataTypes.TEXT, allowNull: false}
  });

  return Brush;
}
