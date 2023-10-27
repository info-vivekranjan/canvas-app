import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TitleIcon from "@mui/icons-material/Title";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InterestsIcon from "@mui/icons-material/Interests";
import RectangleIcon from "@mui/icons-material/Rectangle";
import HexagonIcon from "@mui/icons-material/Hexagon";
import CircleIcon from "@mui/icons-material/Circle";
import WarningIcon from "@mui/icons-material/Warning";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import DownloadIcon from "@mui/icons-material/Download";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import WallpaperIcon from "@mui/icons-material/Wallpaper";

const CanvasApp = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  const [canvasBackgroundColor, setCanvasBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#949494");
  const [selectedShape, setSelectedShape] = useState(null);
  const drawerWidth = 220;
  const [open, setOpen] = React.useState(false);

  const handleCollapseShape = () => {
    setOpen(!open);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const fabricImg = new fabric.Image(img);
        addDeleteControl(fabricImg);
        addCloneControl(fabricImg);

        canvas.add(fabricImg);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  // Function to add text to the canvas
  const addText = () => {
    if (canvas) {
      const text = new fabric.IText("Tap and Type", {
        left: 50,
        top: 100,
        fontFamily: "Arial",
        fill: textColor, // Use the selected text color
        fontSize: 50,
      });

      // Set initial values for text properties
      text.set({
        textAlign: "left",
        fontStyle: "normal",
        textDecoration: "",
        lineHeight: 1,
      });
      addDeleteControl(text);
      addCloneControl(text);

      canvas.add(text);
    }
  };

  // Functions to handle text properties
  const handleFontFamilyChange = (fontFamily) => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === "i-text") {
        activeObject.set("fontFamily", fontFamily);
        canvas.renderAll();
      }
    }
  };

  const handleTextAlignChange = (textAlign) => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === "i-text") {
        activeObject.set("textAlign", textAlign);
        canvas.renderAll();
      }
    }
  };

  const handleFontStyleChange = (style) => {
    if (canvas) {
      const currentStyle = canvas.getActiveObject().fontStyle || "";
      if (currentStyle.includes(style)) {
        // Remove the style if already applied
        canvas
          .getActiveObject()
          .set("fontStyle", currentStyle.replace(style, ""));
      } else {
        // Add the style
        canvas.getActiveObject().set("fontStyle", currentStyle + " " + style);
      }
      canvas.renderAll();
    }
  };

  const handleTextDecorationChange = (decoration) => {
    if (canvas) {
      const currentDecoration = canvas.getActiveObject().textDecoration || "";
      if (currentDecoration === decoration) {
        // Remove the decoration if already applied
        canvas.getActiveObject().set("textDecoration", "");
      } else {
        // Set the decoration
        canvas.getActiveObject().set("textDecoration", decoration);
      }
      canvas.renderAll();
    }
  };

  // Function to handle text color change
  const handleTextColorChange = (color) => {
    setTextColor(color);
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === "i-text") {
        activeObject.set("fill", color); // Use "fill" property to change text color
        canvas.renderAll();
      }
    }
  };
  const handleTextSizeChange = (fontSize) => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === "i-text") {
        activeObject.set("fontSize", fontSize);
        canvas.renderAll();
      }
    }
  };

  const addRectangle = () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fill: selectedShape ? selectedShape.color : "#949494",
    });
    addDeleteControl(rect); // Add delete control to the rectangle
    addCloneControl(rect);

    // Associate a color property with the rectangle object
    rect.color = selectedShape ? selectedShape.color : "#949494";
    canvas.add(rect);
  };

  const addCircle = () => {
    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 50,
      fill: selectedShape ? selectedShape.color : "#949494",
    });
    addDeleteControl(circle); // Add delete control to the circle
    addCloneControl(circle);
    // Associate a color property with the rectangle object
    circle.color = selectedShape ? selectedShape.color : "#949494";
    canvas.add(circle);
  };

  const addTriangle = () => {
    const triangle = new fabric.Triangle({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fill: selectedShape ? selectedShape.color : "#949494",
    });
    addDeleteControl(triangle); // Add delete control to the triangle
    addCloneControl(triangle);

    // Associate a color property with the rectangle object
    triangle.color = selectedShape ? selectedShape.color : "#949494";
    canvas.add(triangle);
  };

  const addHexagon = () => {
    var trapezoid = [
      { x: -100, y: -50 },
      { x: 100, y: -50 },
      { x: 150, y: 50 },
      { x: -150, y: 50 },
    ];
    var emerald = [
      { x: 850, y: 75 },
      { x: 958, y: 137.5 },
      { x: 958, y: 262.5 },
      { x: 850, y: 325 },
      { x: 742, y: 262.5 },
      { x: 742, y: 137.5 },
    ];
    var star4 = [
      { x: 0, y: 0 },
      { x: 100, y: 50 },
      { x: 200, y: 0 },
      { x: 150, y: 100 },
      { x: 200, y: 200 },
      { x: 100, y: 150 },
      { x: 0, y: 200 },
      { x: 50, y: 100 },
      { x: 0, y: 0 },
    ];
    var star5 = [
      { x: 350, y: 75 },
      { x: 380, y: 160 },
      { x: 470, y: 160 },
      { x: 400, y: 215 },
      { x: 423, y: 301 },
      { x: 350, y: 250 },
      { x: 277, y: 301 },
      { x: 303, y: 215 },
      { x: 231, y: 161 },
      { x: 321, y: 161 },
    ];
    var shape = new Array(trapezoid, emerald, star4, star5);

    var polyg = new fabric.Polygon(shape[1], {
      top: 180,
      left: 200,
      fill: "",
      fill: selectedShape ? selectedShape.color : "#949494",
    });
    addDeleteControl(polyg);
    addCloneControl(polyg);

    // Associate a color property with the rectangle object
    polyg.color = selectedShape ? selectedShape.color : "#949494";
    canvas.add(polyg);
  };
  fabric.Object.prototype.cornerColor = "black";
  fabric.Object.prototype.cornerStyle = "circle";
  fabric.Object.prototype.transparentCorners = true;
  fabric.Object.prototype.cornerSize = 15;
  fabric.Object.prototype.padding = 5;
  fabric.Object.prototype.borderColor = "black";

  function addDeleteControl(fabricObject) {
    fabricObject.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: -16,
      cursorStyle: "pointer",
      mouseUpHandler: deleteObject,
      render: renderDeleteIcon,
      cornerSize: 24,
    });
  }

  function deleteObject(eventData, transform) {
    const target = transform.target;
    const canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();
  }

  function renderDeleteIcon(ctx, left, top, styleOverride, fabricObject) {
    const size = fabricObject.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));

    const deleteIcon =
      "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

    const img = new Image();
    img.src = deleteIcon;
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  // Function to add a clone control to a fabricObject
  function addCloneControl(fabricObject) {
    fabricObject.controls.cloneControl = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetY: -16,
      cursorStyle: "pointer",
      mouseUpHandler: cloneObject,
      render: renderCloneIcon,
      cornerSize: 24,
    });
  }

  // Function to clone the selected object
  function cloneObject(eventData, transform) {
    const target = transform.target;
    const canvas = target.canvas;
    if (target) {
      target.clone(function (cloned) {
        cloned.set({
          left: target.left + 60,
          top: target.top + 60,
        });
        addDeleteControl(cloned); // Add a delete control to the cloned object
        canvas.add(cloned);
      });
    }
  }

  // Function to render the clone icon
  function renderCloneIcon(ctx, left, top, styleOverride, fabricObject) {
    const size = fabricObject.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));

    // Use your clone icon URL here, similar to the delete icon
    const cloneIcon =
      "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 55.699 55.699' width='100px' height='100px' xml:space='preserve'%3E%3Cpath style='fill:%23010002;' d='M51.51,18.001c-0.006-0.085-0.022-0.167-0.05-0.248c-0.012-0.034-0.02-0.067-0.035-0.1 c-0.049-0.106-0.109-0.206-0.194-0.291v-0.001l0,0c0,0-0.001-0.001-0.001-0.002L34.161,0.293c-0.086-0.087-0.188-0.148-0.295-0.197 c-0.027-0.013-0.057-0.02-0.086-0.03c-0.086-0.029-0.174-0.048-0.265-0.053C33.494,0.011,33.475,0,33.453,0H22.177 c-3.678,0-6.669,2.992-6.669,6.67v1.674h-4.663c-3.678,0-6.67,2.992-6.67,6.67V49.03c0,3.678,2.992,6.669,6.67,6.669h22.677 c3.677,0,6.669-2.991,6.669-6.669v-1.675h4.664c3.678,0,6.669-2.991,6.669-6.669V18.069C51.524,18.045,51.512,18.025,51.51,18.001z M34.454,3.414l13.655,13.655h-8.985c-2.575,0-4.67-2.095-4.67-4.67V3.414z M38.191,49.029c0,2.574-2.095,4.669-4.669,4.669H10.845 c-2.575,0-4.67-2.095-4.67-4.669V15.014c0-2.575,2.095-4.67,4.67-4.67h5.663h4.614v10.399c0,3.678,2.991,6.669,6.668,6.669h10.4 v18.942L38.191,49.029L38.191,49.029z M36.777,25.412h-8.986c-2.574,0-4.668-2.094-4.668-4.669v-8.985L36.777,25.412z M44.855,45.355h-4.664V26.412c0-0.023-0.012-0.044-0.014-0.067c-0.006-0.085-0.021-0.167-0.049-0.249 c-0.012-0.033-0.021-0.066-0.036-0.1c-0.048-0.105-0.109-0.205-0.194-0.29l0,0l0,0c0-0.001-0.001-0.002-0.001-0.002L22.829,8.637 c-0.087-0.086-0.188-0.147-0.295-0.196c-0.029-0.013-0.058-0.021-0.088-0.031c-0.086-0.03-0.172-0.048-0.263-0.053 c-0.021-0.002-0.04-0.013-0.062-0.013h-4.614V6.67c0-2.575,2.095-4.67,4.669-4.67h10.277v10.4c0,3.678,2.992,6.67,6.67,6.67h10.399 v21.616C49.524,43.26,47.429,45.355,44.855,45.355z'/%3E%3C/svg%3E%0A";

    const img = new Image();
    img.src = cloneIcon;
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  const downloadCanvas = () => {
    const dataURL = canvas.toDataURL({ format: "jpeg" });
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = `canvas_${Date.now()}_img.jpeg`;
    a.click();
  };
  const handleShapeColorChange = (color) => {
    if (selectedShape) {
      selectedShape.set("fill", color);
      selectedShape.color = color; // Update the color property for the selected shape
      canvas.renderAll();
    }
  };

  const themeColor = createTheme({
    palette: {
      primary: {
        main: "#ec3266",
      },
      secondary: {
        main: "#ffffff",
      },
    },
  });

  useEffect(() => {
    let newCanvas = new fabric.Canvas(canvasRef.current);
    setCanvas(newCanvas);

    return () => {
      newCanvas.dispose();
    };
  }, []);
  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (e) => {
        setSelectedShape(e.selected[0]); // Set the selected shape when it's created
      });

      canvas.on("selection:updated", (e) => {
        setSelectedShape(e.selected[0]); // Update the selected shape when it's updated
      });

      canvas.on("selection:cleared", () => {
        setSelectedShape(null); // Clear the selected shape
      });
    }
  }, [canvas]);

  console.log(selectedShape?.type);

  return (
    <>
      <ThemeProvider theme={themeColor}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Toolbar
              sx={{
                bgcolor: "#ec3266",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" noWrap component="div">
                CANVAS APP
              </Typography>
              <Button
                variant="outlined"
                component="span"
                size="medium"
                color="secondary"
                endIcon={<DownloadIcon />}
                onClick={downloadCanvas}
              >
                Download
              </Button>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <Toolbar />
            <Box
              sx={{
                overflow: "auto",
                bgcolor: "#ec3266",
                color: "white",
                minHeight: "93.2vh",
              }}
            >
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={addText}>
                    <ListItemIcon>
                      <TitleIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary={"Add Text"} />
                  </ListItemButton>
                </ListItem>
                <ListItemButton onClick={handleCollapseShape}>
                  <ListItemIcon>
                    <InterestsIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Shapes" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton onClick={addRectangle}>
                      <ListItemIcon>
                        <RectangleIcon sx={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText primary="Rectangle" />
                    </ListItemButton>
                    <ListItemButton onClick={addCircle}>
                      <ListItemIcon>
                        <CircleIcon sx={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText primary="Circle" />
                    </ListItemButton>
                    <ListItemButton onClick={addTriangle}>
                      <ListItemIcon>
                        <WarningIcon sx={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText primary="Triangle" />
                    </ListItemButton>
                    <ListItemButton onClick={addHexagon}>
                      <ListItemIcon>
                        <HexagonIcon sx={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText primary="Hexagon" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <label htmlFor="contained-button-file">
                  <Input
                    id="contained-button-file"
                    // multiple
                    name="file"
                    type="file"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                  <ListItemButton>
                    <ListItemIcon>
                      <InsertPhotoIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary={"Add Image"} />
                  </ListItemButton>
                </label>
                <label htmlFor="canvas-background">
                  <input
                    id="canvas-background"
                    type="color"
                    value={canvasBackgroundColor}
                    onChange={(e) => {
                      setCanvasBackgroundColor(e.target.value);
                      if (canvas) {
                        canvas.backgroundColor = e.target.value;
                        canvas.renderAll();
                      }
                    }}
                    style={{ display: "none" }}
                  />
                  <ListItemButton>
                    <ListItemIcon>
                      <WallpaperIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary={"Canvas Background"} />
                  </ListItemButton>
                </label>
              </List>
            </Box>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Box style={{ minHeight: "10vh" }}>
              {selectedShape?.type === "i-text" && (
                <Box>
                  <h4>Text control</h4>
                  <label>Text Color:</label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => handleTextColorChange(e.target.value)}
                  />
                  <select
                    onChange={(e) => handleFontFamilyChange(e.target.value)}
                  >
                    <option value="arial">Arial</option>
                    <option value="helvetica">Helvetica</option>
                    <option value="myriad pro">Myriad Pro</option>
                    <option value="delicious">Delicious</option>
                    <option value="verdana">Verdana</option>
                    <option value="georgia">Georgia</option>
                    <option value="courier">Courier</option>
                    <option value="comic sans ms">Comic Sans MS</option>
                    <option value="impact">Impact</option>
                    <option value="monaco">Monaco</option>
                    <option value="optima">Optima</option>
                    <option value="hoefler text">Hoefler Text</option>
                    <option value="plaster">Plaster</option>
                    <option value="engagement">Engagement</option>
                  </select>

                  <select
                    onChange={(e) => handleTextAlignChange(e.target.value)}
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                    <option value="justify">Justify</option>
                  </select>

                  <label>Text Style:</label>

                  <input
                    type="checkbox"
                    name="fonttype"
                    onChange={() => handleFontStyleChange("bold")}
                  />
                  <label>Bold</label>

                  <input
                    type="checkbox"
                    name="fonttype"
                    onChange={() => handleFontStyleChange("italic")}
                  />
                  <label>Italic</label>

                  <input
                    type="checkbox"
                    name="fonttype"
                    onChange={() => handleTextDecorationChange("underline")}
                  />
                  <label>Underline</label>

                  <input
                    type="checkbox"
                    name="fonttype"
                    onChange={() => handleTextDecorationChange("line-through")}
                  />
                  <label>Line-through</label>

                  <input
                    type="checkbox"
                    name="fonttype"
                    onChange={() => handleTextDecorationChange("overline")}
                  />
                  <label>Overline</label>

                  <input
                    type="range"
                    min="1"
                    max="120"
                    step="1"
                    onChange={(e) => handleTextSizeChange(e.target.value)}
                  />
                  <label>Font Size</label>
                </Box>
              )}
              {(selectedShape?.type === "rect" ||
                selectedShape?.type === "circle" ||
                selectedShape?.type === "triangle" ||
                selectedShape?.type === "polygon") && (
                <Box>
                  <h4>Shape control</h4>
                  <Box>
                    <label>Shape Color:</label>
                    <input
                      type="color"
                      value={selectedShape ? selectedShape.color : "#000000"}
                      onChange={(e) => handleShapeColorChange(e.target.value)}
                    />
                  </Box>
                </Box>
              )}
            </Box>
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <Box>
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={600}
                  style={{
                    border: "1px solid #ec3266",
                    backgroundColor: canvasBackgroundColor,
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default CanvasApp;