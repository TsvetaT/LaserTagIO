var uuid = require('uuid');
var SAT = require('sat');

var WALL_DEFAULT_DIAMETER = 80;
var WALL_DEFAULT_SPEED = 0;
var WALL_DEFAULT_MASS = 100000000;

var WallManager = function (options) {
  this.worldWidth = options.worldWidth;
  this.worldHeight = options.worldHeight;
  this.wallMass = options.wallMass || WALL_DEFAULT_MASS;
  this.wallDefaultDiameter = options.wallDefaultDiameter || WALL_DEFAULT_DIAMETER;
};

WallManager.prototype.generateRandomPosition = function (wallRadius) {
  var wallDiameter = wallRadius * 2;
  var position = {
    x: Math.round(Math.random() * (this.worldWidth - wallDiameter) + wallRadius),
    y: Math.round(Math.random() * (this.worldHeight - wallDiameter) + wallRadius)
  };
  return position;
};

WallManager.prototype.addWall = function (options) {
  if (!options) {
    options = {};
  }
  var diameter = options.diam || this.wallDefaultDiameter;
  var radius = Math.round(diameter / 2);
  var wallId = uuid.v4();

  var wall = {
    id: wallId,
    type: 'player',
    subtype: 'wall',
    name: options.name || 'wall-' + Math.round(Math.random() * 10000),
    score: options.score || 0,
    speed: options.speed == null ? this.wallMoveSpeed : options.speed,
    mass: options.mass || this.wallMass,
    diam: diameter,
    op: {}
  };
  if (options.x && options.y) {
    wall.x = options.x;
    wall.y = options.y;
  } else {
    var position = this.generateRandomPosition(radius);
    if (options.x) {
      wall.x = options.x;
    } else {
      wall.x = position.x;
    }
    if (options.y) {
      wall.y = options.y;
    } else {
      wall.y = position.y;
    }
  }

  return wall;
};

WallManager.prototype.removeWall = function (wall) {
  all.delete = 1;
};

module.exports.WallManager = WallManager;
