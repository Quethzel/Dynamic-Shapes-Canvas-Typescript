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
    function Star(x, y, spikes, outerRadio, innerRadio) {
        this.cooX = x;
        this.cooY = y;
        this.spikes = spikes;
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
        this.lineWidth = 8;
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
    Stage.prototype._drawTriangle = function (triangle) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.moveTo(0, -triangle.heigth / 2);
        this.ctx.lineTo(-triangle.side / 2, triangle.heigth / 2);
        this.ctx.lineTo(triangle.side / 2, triangle.heigth / 2);
        this.ctx.lineTo(0, -triangle.heigth / 2);
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
        /*
        this.ctx.strokeStyle = "red";
        this.ctx.moveTo(100,100);
        this.ctx.lineTo(50, 50);
        this.ctx.stroke();
        */
    };
    Stage.prototype._drawStar = function (star) {
        var rot = Math.PI / 2 * 3;
        var step = Math.PI / star.spikes;
        var x = star.cooX;
        var y = star.cooY;
        this.ctx.save();
        this.ctx.strokeStyle = "#FFAB00";
        this.ctx.beginPath();
        this.ctx.moveTo(star.cooX, star.cooY - star.outerR);
        for (var i = 0; i < star.spikes; i++) {
            x = star.cooX + Math.cos(rot) * star.outerR;
            y = star.cooY + Math.sin(rot) * star.outerR;
            this.ctx.lineTo(x, y);
            rot += step;
            x = star.cooX + Math.cos(rot) * star.innerR;
            y = star.cooY + Math.sin(rot) * star.innerR;
            this.ctx.lineTo(x, y);
            rot += step;
        }
        this.ctx.lineTo(star.cooX, star.cooY - star.outerR);
        this.ctx.closePath();
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = "#FFAB00";
        this.ctx.stroke();
        this.ctx.fillStyle = "#C67C00";
        this.ctx.fill();
        this.ctx.restore();
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
        if (shape.type == "eqTriangle") {
            this.ctx.fillStyle = shape.color.fill;
            this.ctx.strokeStyle = shape.color.stroke;
            this._drawTriangle(shape.obj);
        }
        if (shape.type == "star") {
            this._drawStar(shape.obj);
        }
        if (shape.type != "eqTriangle" && shape.type != "star") {
            this.ctx.beginPath();
            this.ctx.fillStyle = shape.color.fill;
            this.ctx.strokeStyle = shape.color.stroke;
            this.ctx.fill(shape.path);
            this.ctx.lineWidth = 8;
            this.ctx.stroke(shape.path);
            this.ctx.closePath();
        }
    };
    return Stage;
}());
//# sourceMappingURL=dynamicShapes.js.map