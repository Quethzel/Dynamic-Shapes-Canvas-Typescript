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

    private _getColor() {
        let c = colors[Math.floor(Math.random() * colors.length)];
        return new Color(c.fill, c.stroke, c.name);
    }
}

class Circle extends Shape {
    constructor(xCoo: number, yCoo: number, radio: number) { 
        super("circle", {x: xCoo, y: yCoo, r:radio});
    }
}

class Square extends Shape {
    constructor(xCoo: number, yCoo: number, width: number, heigth: number) {
        super("square", {x: xCoo, y: yCoo, w: width, h: heigth});
    }
}

class Triangle extends Shape {
    constructor(side: number) {
        super( "eqTriangle", {s: side, h: side * (Math.sqrt(3)/2)} );
    }
}

class Star extends Shape {
    constructor(xCoo: number, yCoo: number, spikes: number, outerR: number, innerR: number) {
        super("star", {
            x: xCoo,
            y: yCoo,
            spikes: spikes,
            outerR: outerR,
            innerR: innerR
        });
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

     private _drawCircle(circle: Circle) {
         let path = new Path2D();
         path.arc(circle.obj.x, circle.obj.y, circle.obj.r, 0, Math.PI * 2);
         return path;
    }

    private _drawSquare(square: Square) {
        let path = new Path2D();
        path.rect(square.obj.x, square.obj.y, square.obj.w, square.obj.h);
        return path;
    }

    private _drawTriangle(triangle: Triangle) {  
        this.ctx.save();
		this.ctx.beginPath();
		this.ctx.translate(this.canvas.width/2, this.canvas.height/2);
		this.ctx.moveTo(0, - triangle.obj.h / 2);
		this.ctx.lineTo(- triangle.obj.s / 2, triangle.obj.h / 2);
		this.ctx.lineTo(triangle.obj.s / 2, triangle.obj.h / 2);
		this.ctx.lineTo(0, - triangle.obj.h / 2);
        this.ctx.lineWidth = this.lineWidth;
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.closePath();
        this.ctx.restore();
    }

    private _drawStar(star: Star) {
    	let rot = Math.PI / 2 * 3;
		let step = Math.PI /star.obj.spikes;
		let x = star.obj.x;
		let y = star.obj.y;

		this.ctx.save();
		this.ctx.strokeStyle = star.color.stroke;
		this.ctx.beginPath();
	    this.ctx.moveTo(star.obj.x, star.obj.y - star.obj.outerR)
	    for (let i = 0; i < star.obj.spikes; i++) {
	        x = star.obj.x + Math.cos(rot) * star.obj.outerR;
	        y = star.obj.y + Math.sin(rot) * star.obj.outerR;
	        this.ctx.lineTo(x, y)
	        rot += step

	        x = star.obj.x + Math.cos(rot) * star.obj.innerR;
	        y = star.obj.y + Math.sin(rot) * star.obj.innerR;
	        this.ctx.lineTo(x, y)
	        rot += step
	    }
	    this.ctx.lineTo(star.obj.x, star.obj.y - star.obj.outerR)
    	this.ctx.closePath();    
    	this.ctx.lineWidth = this.lineWidth;
    	this.ctx.strokeStyle = star.color.stroke;
    	this.ctx.stroke();
    	this.ctx.fillStyle = star.color.fill;
    	this.ctx.fill();
    	this.ctx.restore();
	}

    public draw(shape) {
        this._clear();

        if(shape.type == "circle") {
            shape.path = this._drawCircle(shape);
        }

        if(shape.type == "square") {
            shape.path = this._drawSquare(shape);
        }

        if(shape.type == "eqTriangle") {
            this.ctx.fillStyle = shape.color.fill;
            this.ctx.strokeStyle = shape.color.stroke;            
            this._drawTriangle(shape);
        }

        if(shape.type == "star") {
            this._drawStar(shape);
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

    private _clear() {
        if(this.ctx != null) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    public genRandomShape() {
        let seed = Math.floor(Math.random() * 4);
        let s = null;
        switch(seed) {
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
    }
}

