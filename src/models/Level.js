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
    timeout: {type: DataTypes.INTEGER, defaultValue: 50},
    brush_1: {type: DataTypes.TEXT, defaultValue: "pen_000000"},
    brush_2: {type: DataTypes.TEXT, allowNull: true},
    brush_3: {type: DataTypes.TEXT, allowNull: true},
    brush_4: {type: DataTypes.TEXT, allowNull: true},
    brush_5: {type: DataTypes.TEXT, allowNull: true}
  });

  return Level;
}
