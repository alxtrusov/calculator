class Canvas {
    constructor({WIN, id, width = 600, height = 600}) {
        this.WIN = WIN;
        this.canvas = document.getElementById(id);
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext(`2d`);
    }

    xs(x) {
        return this.canvas.width * (x - this.WIN.LEFT) / this.WIN.WIDTH;
    }
    ys(y) {
        return this.canvas.height - (this.canvas.height * (y - this.WIN.BOTTOM) / this.WIN.HEIGHT);
    }

    sx(x) {
        return this.WIN.WIDTH * x / this.canvas.width;
    }
    sy(y) {
        return this.WIN.HEIGHT * y / this.canvas.height;
    }

    clear() {
        this.context.fillStyle = '#eee';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    line(x1, y1, x2, y2, color = '#9e066b', width = 1, isDash) {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.lineWidth = width;
        //пунктирная линия
        if (isDash) {
            this.context.setLineDash([7, 5]);
        } else {
            this.context.setLineDash([]);
        }
        this.context.moveTo(this.xs(x1), this.ys(y1));
        this.context.lineTo(this.xs(x2), this.ys(y2));
        this.context.stroke();
    }

    point(x1, y1, r = 2, color = 'black') {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.fillStyle = color;
        this.context.arc(this.xs(x1), this.ys(y1), r, 0, Math.PI * 2, true);
        this.context.stroke();
        this.context.fill();
    }

    text(str, x, y, colorfill) {
        this.context.font = '25px serif';
        this.context.fillStyle = colorfill;
        this.context.fillText(str, this.xs(x), this.ys(y));
    }
}

export default Canvas;