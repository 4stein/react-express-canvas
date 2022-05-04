import React from "react";
import Brush from "../../tools/Brush";
import ToolState from "../../store/ToolState";
import ConvasState from "../../store/ConvasState";
import Rect from "../../tools/Rect";
import Eraser from "../../tools/Eraser";

const Toolbar = () => {
  const chachangeColor = (e) => {
    ToolState.setStrokeColor(e.target.value);
    ToolState.setFillColor(e.target.value);
  };

  const dawnload = async () => {
    const dataUrl = ConvasState.canvas.toDataURL();
    console.log(dataUrl)
    const image = await fetch(dataUrl);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = ConvasState.sessionId + ".png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="toolbar">
      <button
        className="toolbar__btn brush"
        onClick={() =>
          ToolState.setTool(
            new Brush(
              ConvasState.canvas,
              ConvasState.socket,
              ConvasState.sessionId
            )
          )
        }
      ></button>
      <button
        className="toolbar__btn rect"
        onClick={() =>
          ToolState.setTool(
            new Rect(
              ConvasState.canvas,
              ConvasState.socket,
              ConvasState.sessionId
            )
          )
        }
      ></button>
      {/* <button className="toolbar__btn circle"></button> */}
      <button
        className="toolbar__btn eraser"
        onClick={() =>
          ToolState.setTool(
            new Eraser(
              ConvasState.canvas,
              ConvasState.socket,
              ConvasState.sessionId
            )
          )
        }
      ></button>
      {/* <button className="toolbar__btn line"></button> */}
      <input
        type="color"
        className="toolbar__color__input"
        onChange={(e) => chachangeColor(e)}
      />
      <button
        className="toolbar__btn undo"
        onClick={() => ConvasState.undo()}
      ></button>
      <button
        className="toolbar__btn redo"
        onClick={() => ConvasState.redo()}
      ></button>
      <button className="toolbar__btn save" onClick={dawnload}></button>
    </div>
  );
};

export default Toolbar;
