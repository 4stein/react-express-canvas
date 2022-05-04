import React from "react";
import ToolState from "../../store/ToolState";

const SettingBar = () => {
  return (
    <div className="settingbar">
      <label htmlFor="line-width">Line thickness</label>
      <input
        id="line-width"
        type="number"
        min={1}
        max={50}
        defaultValue={1}
        onChange={(e) => ToolState.setLineWidth(e.target.value)}
        style={{ margin: "0 10px" }}
      />
      <label htmlFor="stroke-color">Stroke color</label>
      <input
        id="stroke-color"
        type="color"
        className="toolbar__color__input"
        onChange={(e) => ToolState.setStrokeColor(e.target.value)}
      />
    </div>
  );
};

export default SettingBar;
