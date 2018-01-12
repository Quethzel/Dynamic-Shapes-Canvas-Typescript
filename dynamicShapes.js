var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(xCoo, yCoo, radio) {
        return _super.call(this, "circle", { x: xCoo, y: yCoo, r: radio }) || this;
    }
    return Circle;
}(Shape));
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(xCoo, yCoo, width, heigth) {
        return _super.call(this, "square", { x: xCoo, y: yCoo, w: width, h: heigth }) || this;
    }
    return Square;
}(Shape));
var Triangle = /** @class */ (function (_super) {
    __extends(Triangle, _super);
    function Triangle(side) {
        return _super.call(this, "eqTriangle", { s: side, h: side * (Math.sqrt(3) / 2) }) || this;
    }
    return Triangle;
}(Shape));
var Star = /** @class */ (function (_super) {
    __extends(Star, _super);
    function Star(xCoo, yCoo, spikes, outerR, innerR) {
        return _super.call(this, "star", {
            x: xCoo,
            y: yCoo,
            spikes: spikes,
            outerR: outerR,
            innerR: innerR
        }) || this;
    }
    return Star;
}(Shape));
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
        path.arc(circle.obj.x, circle.obj.y, circle.obj.r, 0, Math.PI * 2);
        return path;
    };
    Stage.prototype._drawSquare = function (square) {
        var path = new Path2D();
        path.rect(square.obj.x, square.obj.y, square.obj.w, square.obj.h);
        return path;
    };
    Stage.prototype._drawTriangle = function (triangle) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.moveTo(0, -triangle.obj.h / 2);
        this.ctx.lineTo(-triangle.obj.s / 2, triangle.obj.h / 2);
        this.ctx.lineTo(triangle.obj.s / 2, triangle.obj.h / 2);
        this.ctx.lineTo(0, -triangle.obj.h / 2);
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    };
    Stage.prototype._drawStar = function (star) {
        var rot = Math.PI / 2 * 3;
        var step = Math.PI / star.obj.spikes;
        var x = star.obj.x;
        var y = star.obj.y;
        this.ctx.save();
        this.ctx.strokeStyle = star.color.stroke;
        this.ctx.beginPath();
        this.ctx.moveTo(star.obj.x, star.obj.y - star.obj.outerR);
        for (var i = 0; i < star.obj.spikes; i++) {
            x = star.obj.x + Math.cos(rot) * star.obj.outerR;
            y = star.obj.y + Math.sin(rot) * star.obj.outerR;
            this.ctx.lineTo(x, y);
            rot += step;
            x = star.obj.x + Math.cos(rot) * star.obj.innerR;
            y = star.obj.y + Math.sin(rot) * star.obj.innerR;
            this.ctx.lineTo(x, y);
            rot += step;
        }
        this.ctx.lineTo(star.obj.x, star.obj.y - star.obj.outerR);
        this.ctx.closePath();
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = star.color.stroke;
        this.ctx.stroke();
        this.ctx.fillStyle = star.color.fill;
        this.ctx.fill();
        this.ctx.restore();
    };
    Stage.prototype.draw = function (shape) {
        this._clear();
        if (shape.type == "circle") {
            shape.path = this._drawCircle(shape);
        }
        if (shape.type == "square") {
            shape.path = this._drawSquare(shape);
        }
        if (shape.type == "eqTriangle") {
            this.ctx.fillStyle = shape.color.fill;
            this.ctx.strokeStyle = shape.color.stroke;
            this._drawTriangle(shape);
        }
        if (shape.type == "star") {
            this._drawStar(shape);
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
    Stage.prototype._clear = function () {
        if (this.ctx != null) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    };
    Stage.prototype.genRandomShape = function () {
        var seed = Math.floor(Math.random() * 4);
        var s = null;
        switch (seed) {
            case 0:
                s = new Circle(this.cooX, this.cooY, 80);
                break;
            case 1:
                s = new Square(this.canvas.width - 180, this.canvas.height - 180, 150, 150);
                break;
            case 2:
                s = new Triangle(180);
                break;
            case 3:
                s = new Star(100, 100, 5, 80, 40);
                break;
        }
        return s;
    };
    return Stage;
}());
//# sourceMappingURL=dynamicShapes.js.map