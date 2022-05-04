import Tool from "./Tool";

export default class Eraser extends Tool {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);
    this.listen();
    this.defaultFillStyle = this.ctx.fillStyle;
    this.defaultStrokeStyle = this.ctx.strokeStyle;
    this.defaultLineWidth = this.ctx.lineWidth;
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
      this.socket.send(
        JSON.stringify({
          method: "draw",
          id: this.id,
          figure: {
            type: "eraser",
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop,
          },
        })
      );
    }
  }
  mouseUpHandler(e) {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "eraser",
          type: "finish",
        },
      })
    );
    this.ctx.fillStyle = this.defaultFillStyle;
    this.ctx.strokeStyle = this.defaultStrokeStyle;
    this.ctx.lineWidth = this.defaultLineWidth;
  }
  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.fillStyle = "#fff";
    this.ctx.strokeStyle = "#fff";
    this.ctx.lineWidth = 25;
    this.ctx.beginPath();
    this.ctx.moveTo(
      e.pageX - e.target.offsetLeft,
      e.pageY - e.target.offsetTop
    );
  }

  draw(x, y) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  static staticDraw(ctx, x, y) {
    // ctx.fillStyle = "#fff";
    // ctx.strokeStyle = "#fff";
    // ctx.lineWidth = 25;
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
