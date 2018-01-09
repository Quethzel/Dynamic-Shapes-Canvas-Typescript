class Square {
    cooX: number;
    cooY: number;
    width: number;
    heigth: number;

    constructor(x: number, y: number, width: number, heigth: number) {
        this.cooX = x;
        this.cooY = y;
        this.width = width;
        this.heigth = heigth;
    }
}

class Circle {
    cooX: number;
    cooY: number;
    radio: number;

    constructor(x: number, y: number, radio: number) {
        this.cooX = x;
        this.cooY = y;
        this.radio = radio;
    }
}

class Triangle {
    side: number;
    heigth: number;

    constructor( side: number) {
        this.side = side;
        this.heigth = side * (Math.sqrt(3)/2);
    }
}

class Star {
    cooX: number;
    cooY: number;
    spikers: number;
    outerR: number;
    innerR: number;

    constructor(x: number, y: number, outerRadio: number, innerRadio: number) {
        this.cooX = x;
        this.cooY = y;
        this.outerR = outerRadio;
        this.innerR = innerRadio;
    }
}

let colors = [
    { stroke: "#FFAB00", fill: "#C67C00", name: "Amber" },
	{ stroke: "#D50000", fill: "#9B0000", name: "Red" },
	{ stroke: "#008E76", fill: "#00BFA5", name: "Teal" }
];

class Color {
    fill: string;
    stroke: string;
    name: string;
    
    constructor(fill: string, stroke: string, name: string) {
        this.fill = fill;
        this.stroke = stroke;
        this.name = name;
    }
}

class Shape {
    type: string;
    color: Color;
    obj: any;
    path: any;

    constructor(type: string, obj: any) {
        this.type = type;
        this.obj = obj;
        this.color = this._getColor();
    }

    _getColor() {
        let c = colors[Math.floor(Math.random() * colors.length)];
        return new Color(c.fill, c.stroke, c.name);
    }

    // circle(x: number, y: number, radio: number) {
    //     return new Circle(x, y, radio);
    // }

    // _drawCircle(circle) {
    //     let path = new Path2D();
    //     path.arc(circle.cooX, circle.cooY, circle.radio, 0, Math.PI * 2);
    //     return path;
    // }
}

class Stage {
    canvas: any;
    ctx: any;
    cooX: number;
    cooY: number;

    constructor(canvas: any, ctx: any) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.cooX = this.canvas.width / 2;
        this.cooY = this.canvas.height / 2;
    }

     _drawCircle(circle: Circle) {
         let path = new Path2D();
         path.arc(circle.cooX, circle.cooY, circle.radio, 0, Math.PI * 2);
         return path;
    }

    _drawSquare(square: Square) {
        let path = new Path2D();
        path.rect(square.cooX, square.cooY, square.width, square.heigth);
        return path;
    }

    _clear() {
        if(this.ctx != null) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    draw(shape) {
        this._clear();

        if(shape.type == "circle") {
            shape.path = this._drawCircle(shape.obj);
        }

        if(shape.type == "square") {
            shape.path = this._drawSquare(shape.obj);
        }

        this.ctx.beginPath();
        this.ctx.fillStyle = shape.color.fill;
        this.ctx.strokeStyle = shape.color.stroke;
        this.ctx.fill(shape.path);
        this.ctx.lineWidth = 8;
        this.ctx.stroke(shape.path);
        this.ctx.closePath();
    }

}

