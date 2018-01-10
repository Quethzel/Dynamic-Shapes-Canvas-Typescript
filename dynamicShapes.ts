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
    spikes: number;
    outerR: number;
    innerR: number;

    constructor(x: number, y: number, spikes: number, outerRadio: number, innerRadio: number) {
        this.cooX = x;
        this.cooY = y;
        this.spikes = spikes;
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
}

class Stage {
    canvas: any;
    ctx: any;
    cooX: number;
    cooY: number;
    lineWidth: number = 8;
    
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

    _drawTriangle(triangle: Triangle) {
        
        this.ctx.save();
		this.ctx.beginPath();
		this.ctx.translate(this.canvas.width/2, this.canvas.height/2);
		this.ctx.moveTo(0, - triangle.heigth / 2);
		this.ctx.lineTo(- triangle.side / 2, triangle.heigth / 2);
		this.ctx.lineTo(triangle.side / 2, triangle.heigth / 2);
		this.ctx.lineTo(0, - triangle.heigth / 2);
        this.ctx.lineWidth = this.lineWidth;
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.closePath();
        this.ctx.restore();
    }

    _drawStar(star: Star) {
    	let rot = Math.PI / 2 * 3;
		let step = Math.PI /star.spikes;
		let x = star.cooX;
		let y = star.cooY;

		this.ctx.save();
		this.ctx.strokeStyle = "#FFAB00";
		this.ctx.beginPath();
	    this.ctx.moveTo(star.cooX, star.cooY - star.outerR)
	    for (let i = 0; i < star.spikes; i++) {
	        x = star.cooX + Math.cos(rot) * star.outerR;
	        y = star.cooY + Math.sin(rot) * star.outerR;
	        this.ctx.lineTo(x, y)
	        rot += step

	        x = star.cooX + Math.cos(rot) * star.innerR;
	        y = star.cooY + Math.sin(rot) * star.innerR;
	        this.ctx.lineTo(x, y)
	        rot += step
	    }
	    this.ctx.lineTo(star.cooX, star.cooY - star.outerR)
    	this.ctx.closePath();    
    	this.ctx.lineWidth = this.lineWidth;
    	this.ctx.strokeStyle = "#FFAB00";
    	this.ctx.stroke();
    	this.ctx.fillStyle = "#C67C00";
    	this.ctx.fill();
    	this.ctx.restore();
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

        if(shape.type == "eqTriangle") {
            this.ctx.fillStyle = shape.color.fill;
            this.ctx.strokeStyle = shape.color.stroke;            
            this._drawTriangle(shape.obj);
        }

        if(shape.type == "star") {
            this._drawStar(shape.obj);
        }

        if(shape.type != "eqTriangle" && shape.type != "star") {
            this.ctx.beginPath();
            this.ctx.fillStyle = shape.color.fill;
            this.ctx.strokeStyle = shape.color.stroke;
            this.ctx.fill(shape.path);
            this.ctx.lineWidth = 8;
            this.ctx.stroke(shape.path);
            this.ctx.closePath();
        }
    }

}

