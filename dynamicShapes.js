var Square = /** @class */ (function () {
    function Square(x, y, width, heigth) {
        this.cooX = x;
        this.cooY = y;
        this.width = width;
        this.heigth = heigth;
    }
    return Square;
}());
var Circle = /** @class */ (function () {
    function Circle(x, y, radio) {
        this.cooX = x;
        this.cooY = y;
        this.radio = radio;
    }
    return Circle;
}());
var Triangle = /** @class */ (function () {
    function Triangle(side) {
        this.side = side;
        this.heigth = side * (Math.sqrt(3) / 2);
    }
    return Triangle;
}());
var Star = /** @class */ (function () {
    function Star(x, y, outerRadio, innerRadio) {
        this.cooX = x;
        this.cooY = y;
        this.outerR = outerRadio;
        this.innerR = innerRadio;
    }
    return Star;
}());
var colors = [
    { stroke: "#FFAB00", fill: "#C67C00", name: "Amber" },
    { stroke: "#D50000", fill: "#9B0000", name: "Red" },
    { stroke: "#008E76", fill: "#00BFA5", name: "Teal" }
];
var Color = /** @class */ (function () {
    function Color(fill, stroke, name) {
        this.fill = fill;
        this.stroke = stroke;
        this.name = name;
    }
    return Color;
}());
var Shape = /** @class */ (function () {
    function Shape(type, obj) {
        this.type = type;
        this.obj = obj;
        this.color = this._getColor();
    }
    Shape.prototype._getColor = function () {
        var c = colors[Math.floor(Math.random() * colors.length)];
        return new Color(c.fill, c.stroke, c.name);
    };
    return Shape;
}());
var Stage = /** @class */ (function () {
    function Stage(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.cooX = this.canvas.width / 2;
        this.cooY = this.canvas.height / 2;
    }
    Stage.prototype._drawCircle = function (circle) {
        var path = new Path2D();
        path.arc(circle.cooX, circle.cooY, circle.radio, 0, Math.PI * 2);
        return path;
    };
    Stage.prototype._drawSquare = function (square) {
        var path = new Path2D();
        path.rect(square.cooX, square.cooY, square.width, square.heigth);
        return path;
    };
    Stage.prototype._clear = function () {
        if (this.ctx != null) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    };
    Stage.prototype.draw = function (shape) {
        this._clear();
        if (shape.type == "circle") {
            shape.path = this._drawCircle(shape.obj);
        }
        if (shape.type == "square") {
            shape.path = this._drawSquare(shape.obj);
        }
        this.ctx.beginPath();
        this.ctx.fillStyle = shape.color.fill;
        this.ctx.strokeStyle = shape.color.stroke;
        this.ctx.fill(shape.path);
        this.ctx.lineWidth = 8;
        this.ctx.stroke(shape.path);
        this.ctx.closePath();
    };
    return Stage;
}());
//# sourceMappingURL=dynamicShapes.js.map