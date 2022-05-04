import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import ToolState from "../../store/ToolState";
import Brush from "../../tools/Brush";
import ConvasState from "../../store/ConvasState";
import { Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Rect from "../../tools/Rect";
import Eraser from "../../tools/Eraser";
import axios from "axios";

const Canvas = observer(() => {
  // useParams
  const { id } = useParams();
  // useRef
  const canvasRef = useRef();
  const usernameRef = useRef();
  const [showModal, setShowModal] = useState(true);
  // useEffect
  useEffect(() => {
    ConvasState.setConvas(canvasRef.current);
  }, []);
  useEffect(() => {
    if (ConvasState.username) {
      const socket = new WebSocket("ws://localhost:5000/");
      ConvasState.setSocket(socket);
      ConvasState.setSessionId(id);
      ToolState.setTool(new Brush(canvasRef.current, socket, id));
      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            id: id,
            username: ConvasState.username,
            method: "connection",
          })
        );
      };
      socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        switch (msg.method) {
          case "connection":
            console.log(`User - ${msg.username} connected`);
            break;
          case "draw":
            drawHandler(msg);
            break;
        }
      };
    }
  }, [ConvasState.username]);
  // Handlers
  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext("2d");
    switch (figure.type) {
      case "brush":
        Brush.staticDraw(ctx, figure.x, figure.y, figure.color);
        break;
      case "eraser":
        Eraser.staticDraw(ctx, figure.x, figure.y);
        break;
      case "rect":
        console.log(figure);
        Rect.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.color,
          figure.bdColor,
          figure.bdLineWidth
        );
        break;
      case "finish":
        ctx.beginPath();
        break;
    }
  };
  const mouseDownHandler = () => {
    ConvasState.pushToUndo(canvasRef.current.toDataURL());
    // axios
    //   .post(`http://localhost:5000/image?id=${id}`, {
    //     img: canvasRef.current.toDataURL(),
    //   })
    //   .then((response) => console.log(response.data));
  };
  const connectionHandler = () => {
    ConvasState.setUsername(usernameRef.current.value);
    setShowModal(false);
  };

  return (
    <div className="canvas">
      <canvas
        onMouseDown={() => mouseDownHandler()}
        ref={canvasRef}
        width={600}
        height={400}
      ></canvas>
      <Modal show={showModal} onHide={() => {}}>
        <Modal.Header>
          <Modal.Title>Write your name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input ref={usernameRef} type="text" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => connectionHandler()}>
            Log In
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
});

export default Canvas;
