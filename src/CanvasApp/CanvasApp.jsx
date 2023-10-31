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
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import Slider from "@mui/material/Slider";
import Crop32Icon from "@mui/icons-material/Crop32";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import DrawIcon from "@mui/icons-material/Draw";
import EditOffIcon from "@mui/icons-material/EditOff";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

// Image Imports

import burgur from "../utils/images/burgur.jpeg";
import pizza from "../utils/images/pizza.jpg";
import apples from "../utils/images/apples.jpg";
import apple from "../utils/images/one-apple.jpeg";
import rasmalai from "../utils/images/rasmalai.jpg";
import background1 from "../utils/images/background1.jpg";
import background2 from "../utils/images/background2.jpg";
import background3 from "../utils/images/background3.jpg";
import background4 from "../utils/images/background4.jpg";
import background5 from "../utils/images/background5.jpg";
import background6 from "../utils/images/background6.png";
import background7 from "../utils/images/background7.jpg";
import background8 from "../utils/images/background8.jpg";

const CanvasApp = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  const [canvasBackgroundColor, setCanvasBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#949494");
  const [selectedShape, setSelectedShape] = useState(null); // for selected component not only shape
  const drawerWidth = 250;
  const [open, setOpen] = React.useState(false);
  const [openTemplate, setOpenTemplate] = React.useState(false);
  const [openDraw, setOpenDraw] = React.useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedTemplateOption, setSelectedTemplateOption] = useState("");
  const [nextComponentStackingOrder, setNextComponentStackingOrder] =
    useState(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [pencilMode, setPencilMode] = useState(false);
  const [markerMode, setMarkerMode] = useState(false);
  const [highlighterMode, setHighlighterMode] = useState(false);
  const imageTemplates = {
    template1: burgur,
    template2: pizza,
    template3: apples,
    template4: apple,
    template5: rasmalai,
    template6: background1,
    template7: background2,
    template8: background3,
    template9: background4,
    template10: background5,
    template11: background6,
    template12: background7,
    template13: background8,
  };
  const handleCollapseShape = () => {
    setOpen(!open);
  };

  const handleCollapseTemplate = () => {
    setOpenTemplate(!openTemplate);
  };

  const handleCollapseDraw = () => {
    setOpenDraw(!openDraw);
  };

  //=============================================================================================<<Theme for material>>=======================================================

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

  const addComponentToCanvas = (component) => {
    // Set the stacking order of the component and increment for the next component
    component.set("stackingOrder", nextComponentStackingOrder);
    setNextComponentStackingOrder(nextComponentStackingOrder + 1);

    // Add the component to the canvas
    canvas.add(component);

    // Deselect any active object to prevent rearrangement in stacking order
    canvas.discardActiveObject();
  };

  //=============================================================================================<<Image>>=======================================================

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const fabricImg = new fabric.Image(img);
        // addDeleteControl(fabricImg);
        // addCloneControl(fabricImg);

        addComponentToCanvas(fabricImg);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handleTemplateChange = (option) => {
    setSelectedTemplateOption(option);
    const templateName = option;
    const templatePath = imageTemplates[templateName];

    if (canvas && templatePath) {
      fabric.Image.fromURL(templatePath, (template) => {
        template.set({ left: 10, top: 10 });
        template.scaleToWidth(500);
        addComponentToCanvas(template);
        // addDeleteControl(template);
        // addCloneControl(template);
        setSelectedTemplate(template);
      });
    }
  };

  const zoomIn = () => {
    if (selectedShape) {
      selectedShape.scaleX *= 1.1; // Increase scale (zoom in)
      selectedShape.scaleY *= 1.1; // Increase scale (zoom in)
      canvas.renderAll();
    }
  };

  const zoomOut = () => {
    if (selectedShape) {
      selectedShape.scaleX /= 1.1; // Decrease scale (zoom out)
      selectedShape.scaleY /= 1.1; // Decrease scale (zoom out)
      canvas.renderAll();
    }
  };

  //=============================================================================================<<Text>>=======================================================

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
      // addDeleteControl(text);
      // addCloneControl(text);

      addComponentToCanvas(text);
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

  //=============================================================================================<<Filled Shape>>=======================================================

  const addRectangle = () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fill: selectedShape ? selectedShape.color : "#949494",
    });
    // addDeleteControl(rect);
    // addCloneControl(rect);

    // Associate a color property with the rectangle object
    rect.color = selectedShape ? selectedShape.color : "#949494";
    addComponentToCanvas(rect);
  };

  const addCircle = () => {
    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 50,
      fill: selectedShape ? selectedShape.color : "#949494",
    });
    // addDeleteControl(circle);
    // addCloneControl(circle);
    // Associate a color property with the rectangle object
    circle.color = selectedShape ? selectedShape.color : "#949494";
    addComponentToCanvas(circle);
  };

  const addTriangle = () => {
    const triangle = new fabric.Triangle({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fill: selectedShape ? selectedShape.color : "#949494",
    });
    // addDeleteControl(triangle);
    // addCloneControl(triangle);

    // Associate a color property with the rectangle object
    triangle.color = selectedShape ? selectedShape.color : "#949494";
    addComponentToCanvas(triangle);
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
    // addDeleteControl(polyg);
    // addCloneControl(polyg);

    // Associate a color property with the rectangle object
    polyg.color = selectedShape ? selectedShape.color : "#949494";
    addComponentToCanvas(polyg);
  };

  const add4Star = () => {
    // Define the points for the star shape
    const starPoints = [
      { x: 0, y: -50 },
      { x: 15, y: -15 },
      { x: 50, y: 0 },
      { x: 15, y: 15 },
      { x: 0, y: 50 },
      { x: -15, y: 15 },
      { x: -50, y: 0 },
      { x: -15, y: -15 },
    ];

    // Create a star shape
    const star = new fabric.Polygon(starPoints, {
      left: 100, // Set the initial position
      top: 100,
      fill: selectedShape ? selectedShape.color : "#949494",
      selectable: true, // Make it selectable
    });

    star.color = selectedShape ? selectedShape.color : "#949494";
    addComponentToCanvas(star);
  };

  const add5StarPoints = () => {
    // Define the points for the star shape with 5 sides (pentagon)
    const star5Points = [
      { x: 0, y: -70 },
      { x: 20, y: -20 },
      { x: 70, y: -20 },
      { x: 30, y: 20 },
      { x: 50, y: 70 },
      { x: 0, y: 45 },
      { x: -50, y: 70 },
      { x: -30, y: 20 },
      { x: -70, y: -20 },
      { x: -20, y: -20 },
    ];

    // Create a star shape with 5 sides (pentagon)
    const star5 = new fabric.Polygon(star5Points, {
      left: 100,
      top: 100,
      fill: selectedShape ? selectedShape.color : "#949494",
      selectable: true, // Make it selectable
    });

    star5.color = selectedShape ? selectedShape.color : "#949494";

    // Add the star shape with 5 sides to the canvas
    addComponentToCanvas(star5);
  };

  //=============================================================================================<<Stroked Shape>>=======================================================

  const addRectangleStroke = () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      stroke: selectedShape ? selectedShape.color : "#949494",
      strokeWidth: 3,
      fill: "",
    });
    // addDeleteControl(rect);
    // addCloneControl(rect);

    // Associate a color property with the rectangle object
    rect.color = selectedShape ? selectedShape.color : "#949494";
    addComponentToCanvas(rect);
  };

  const addCircleStroke = () => {
    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 50,
      stroke: selectedShape ? selectedShape.color : "#949494",
      strokeWidth: 3,
      fill: "",
    });
    // addDeleteControl(circle);
    // addCloneControl(circle);
    // Associate a color property with the rectangle object
    circle.color = selectedShape ? selectedShape.color : "#949494";
    addComponentToCanvas(circle);
  };

  const addTriangleStroke = () => {
    const triangle = new fabric.Triangle({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      stroke: selectedShape ? selectedShape.color : "#949494",
      strokeWidth: 3,
      fill: "",
    });
    // addDeleteControl(triangle);
    // addCloneControl(triangle);

    // Associate a color property with the rectangle object
    triangle.color = selectedShape ? selectedShape.color : "#949494";
    addComponentToCanvas(triangle);
  };

  const addHexagonStroke = () => {
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
      stroke: selectedShape ? selectedShape.color : "#949494",
      strokeWidth: 3,
      fill: "",
    });
    // addDeleteControl(polyg);
    // addCloneControl(polyg);

    // Associate a color property with the rectangle object
    polyg.color = selectedShape ? selectedShape.color : "#949494";
    addComponentToCanvas(polyg);
  };

  const add4StarStroke = () => {
    // Define the points for the star shape
    const starPoints = [
      { x: 0, y: -50 },
      { x: 15, y: -15 },
      { x: 50, y: 0 },
      { x: 15, y: 15 },
      { x: 0, y: 50 },
      { x: -15, y: 15 },
      { x: -50, y: 0 },
      { x: -15, y: -15 },
    ];

    // Create a star shape
    const star = new fabric.Polygon(starPoints, {
      left: 100, // Set the initial position
      top: 100,
      stroke: selectedShape ? selectedShape.color : "#949494",
      strokeWidth: 3,
      fill: "",
      selectable: true, // Make it selectable
    });

    star.color = selectedShape ? selectedShape.color : "#949494";
    addComponentToCanvas(star);
  };

  const add5StarPointsStroke = () => {
    // Define the points for the star shape with 5 sides (pentagon)
    const star5Points = [
      { x: 0, y: -70 },
      { x: 20, y: -20 },
      { x: 70, y: -20 },
      { x: 30, y: 20 },
      { x: 50, y: 70 },
      { x: 0, y: 45 },
      { x: -50, y: 70 },
      { x: -30, y: 20 },
      { x: -70, y: -20 },
      { x: -20, y: -20 },
    ];

    // Create a star shape with 5 sides (pentagon)
    const star5 = new fabric.Polygon(star5Points, {
      left: 100,
      top: 100,
      stroke: selectedShape ? selectedShape.color : "#949494",
      strokeWidth: 3,
      fill: "",
      selectable: true, // Make it selectable
    });

    star5.color = selectedShape ? selectedShape.color : "#949494";

    // Add the star shape with 5 sides to the canvas
    addComponentToCanvas(star5);
  };

  //=============================================================================================<<Delete and Clone>>=======================================================

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
        addComponentToCanvas(cloned);
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
  //=============================================================================================<<Download>>=======================================================

  const downloadCanvas = () => {
    const dataURL = canvas.toDataURL({ format: "jpeg" });
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = `canvas_${Date.now()}_img.jpeg`;
    a.click();
  };
  const handleShapeColorChange = (color) => {
    if (selectedShape) {
      if (selectedShape.fill !== "") {
        selectedShape.set("fill", color);
      } else if (selectedShape.fill == "") {
        selectedShape.set("stroke", color);
      }
      selectedShape.color = color; // Update the color property for the selected shape
      canvas.renderAll();
    }
  };

  //=============================================================================================<<useEffect>>=======================================================
  useEffect(() => {
    let newCanvas = new fabric.Canvas(canvasRef.current, {
      preserveObjectStacking: true, // Prevent objects from changing stacking order
    });

    // Drawing feature
    newCanvas.freeDrawingBrush.color = "black";
    newCanvas.freeDrawingBrush.width = 2;

    newCanvas.on("mouse:down", (event) => {
      if (newCanvas.isDrawingMode) {
        setIsDrawing(true);
      }
    });

    newCanvas.on("mouse:up", () => {
      setIsDrawing(false);
    });

    newCanvas.on("mouse:move", (event) => {
      event.e.stopPropagation();
    });
    newCanvas.backgroundColor = "#ffffff";
    setCanvas(newCanvas);

    return () => {
      newCanvas.dispose();
    };
  }, []);

  const togglePencilMode = () => {
    if (canvas) {
      canvas.isDrawingMode = !pencilMode;
      canvas.freeDrawingBrush.color = pencilMode ? "transparent" : "black";
      setPencilMode(!pencilMode);
      setIsDrawing(false);
    }
  };

  const toggleMarkerMode = () => {
    if (canvas) {
      canvas.isDrawingMode = !markerMode;
      canvas.freeDrawingBrush.width = 5;
      canvas.freeDrawingBrush.color = markerMode ? "transparent" : "red";
      setMarkerMode(!markerMode);
      setIsDrawing(false);
    }
  };

  const toggleHighlighterMode = () => {
    if (canvas) {
      const highlighterBrushColor = "rgba(255, 255, 0, 0.3)";
      canvas.isDrawingMode = !highlighterMode;
      canvas.freeDrawingBrush.width = 20;
      canvas.freeDrawingBrush.color = highlighterMode
        ? "transparent"
        : highlighterBrushColor;
      setHighlighterMode(!highlighterMode);
      setIsDrawing(false);
    }
  };
  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (e) => {
        setSelectedShape(e.selected[0]); // Set the selected shape when it's created
        addDeleteControl(e.selected[0]);
        addCloneControl(e.selected[0]);
      });

      canvas.on("selection:updated", (e) => {
        setSelectedShape(e.selected[0]); // Update the selected shape when it's updated
        addDeleteControl(e.selected[0]);
        addCloneControl(e.selected[0]);
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
                <label htmlFor="contained-button-file">
                  <Input
                    id="contained-button-file"
                    accept="image/*"
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
                    <ListItemButton onClick={add4Star}>
                      <ListItemIcon>
                        <svg
                          fill="#ffffff"
                          width="30px"
                          height="30px"
                          version="1.1"
                          x="0px"
                          y="0px"
                          viewBox="0 0 100 125"
                        >
                          <polygon points="50,10 35.8578491,35.8578491 10,50 35.8578491,64.1420898 50,90 64.1421509,64.1420898 90,50   64.1421509,35.8578491 " />
                        </svg>
                      </ListItemIcon>
                      <ListItemText primary="Star 1" />
                    </ListItemButton>
                    <ListItemButton onClick={add5StarPoints}>
                      <ListItemIcon>
                        <StarIcon sx={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText primary="Star 2" />
                    </ListItemButton>
                    <ListItemButton onClick={addRectangleStroke}>
                      <ListItemIcon>
                        <Crop32Icon sx={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText primary="Rectangle Stroke" />
                    </ListItemButton>
                    <ListItemButton onClick={addCircleStroke}>
                      <ListItemIcon>
                        <PanoramaFishEyeIcon sx={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText primary="Circle Stroke" />
                    </ListItemButton>
                    <ListItemButton onClick={addTriangleStroke}>
                      <ListItemIcon>
                        <ChangeHistoryIcon sx={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText primary="Triangle Stroke" />
                    </ListItemButton>
                    <ListItemButton onClick={addHexagonStroke}>
                      <ListItemIcon>
                        <svg
                          fill="#ffffff"
                          version="1.1"
                          id="Capa_1"
                          width="25px"
                          height="25px"
                          viewBox="0 0 485.688 485.688"
                        >
                          <g>
                            <g>
                              <path
                                d="M364.269,453.155H121.416L0,242.844L121.416,32.533h242.853l121.419,210.312L364.269,453.155z M131.905,434.997h221.878
			l110.939-192.152L353.783,50.691H131.905L20.966,242.844L131.905,434.997z"
                              />
                            </g>
                          </g>
                        </svg>
                      </ListItemIcon>
                      <ListItemText primary="Hexagon Stroke" />
                    </ListItemButton>
                    <ListItemButton onClick={add4StarStroke}>
                      <ListItemIcon>
                        <svg
                          width="25px"
                          height="25px"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 2L14.012 7.23109C14.294 7.96432 14.435 8.33093 14.6542 8.63931C14.8486 8.91262 15.0874 9.15141 15.3607 9.34575C15.6691 9.56503 16.0357 9.70603 16.7689 9.98804L22 12L16.7689 14.012C16.0357 14.294 15.6691 14.435 15.3607 14.6542C15.0874 14.8486 14.8486 15.0874 14.6542 15.3607C14.435 15.6691 14.294 16.0357 14.012 16.7689L12 22L9.98804 16.7689C9.70603 16.0357 9.56503 15.6691 9.34575 15.3607C9.15141 15.0874 8.91262 14.8486 8.63931 14.6542C8.33093 14.435 7.96432 14.294 7.23109 14.012L2 12L7.23108 9.98804C7.96431 9.70603 8.33093 9.56503 8.63931 9.34575C8.91262 9.15141 9.15141 8.91262 9.34575 8.63931C9.56503 8.33093 9.70603 7.96431 9.98804 7.23108L12 2Z"
                            stroke="#ffffff"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </ListItemIcon>
                      <ListItemText primary="Star 1 Stroke" />
                    </ListItemButton>
                    <ListItemButton onClick={add5StarPointsStroke}>
                      <ListItemIcon>
                        <StarBorderIcon sx={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText primary="Star 2 Stroke" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleCollapseTemplate}>
                  <ListItemIcon>
                    <PhotoLibraryIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Image Templates" />
                  {openTemplate ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openTemplate} timeout="auto" unmountOnExit>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      marginLeft: "25px",
                    }}
                  >
                    {Object.entries(imageTemplates).map(([key, image]) => (
                      <div
                        key={key}
                        onClick={() => handleTemplateChange(key)}
                        style={{
                          cursor: "pointer",
                          margin: "4px",
                        }}
                      >
                        <img
                          src={image}
                          alt={key}
                          style={{
                            border:
                              key === selectedTemplateOption
                                ? "2px solid white"
                                : "2px solid transparent",
                            width: "90px",
                            height: "80px",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </Collapse>
                <ListItemButton onClick={handleCollapseDraw}>
                  <ListItemIcon>
                    <DrawIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Draw" />
                  {openDraw ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openDraw} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton onClick={togglePencilMode}>
                      <ListItemIcon>
                        {pencilMode ? (
                          <EditOffIcon sx={{ color: "white" }} />
                        ) : (
                          <EditIcon sx={{ color: "white" }} />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={`${pencilMode ? "Erase Pencil" : "Pencil"}`}
                      />
                    </ListItemButton>
                    <ListItemButton onClick={toggleMarkerMode}>
                      <ListItemIcon>
                        {markerMode ? (
                          <svg
                            version="1.1"
                            id="Uploaded to svgrepo.com"
                            fill="#ffffff"
                            width="25px"
                            height="25px"
                            viewBox="0 0 32 32"
                          >
                            <path
                              class="sharpcorners_een"
                              d="M30,14l-8,8L11,11l8-8L30,14z M10.293,11.707L2,20l8,8h6l5.293-5.293L10.293,11.707z"
                            />
                          </svg>
                        ) : (
                          <svg
                            fill="#ffffff"
                            height="25px"
                            width="25px"
                            version="1.1"
                            id="Layer_1"
                            viewBox="0 0 512 512"
                          >
                            <g>
                              <g>
                                <path
                                  d="M497.453,131.515l-93.576-93.576c-19.393-19.394-50.786-19.397-70.182,0L99.758,271.88
			c-2.265,2.265-3.915,5.3-4.546,8.562l-22.39,111.949L4.846,460.369C0.114,465.1-1.3,472.215,1.259,478.396
			c2.561,6.18,8.592,10.211,15.283,10.211h93.576c4.388,0,8.595-1.744,11.696-4.846l21.19-21.19l112.057-22.411
			c3.217-0.643,6.218-2.288,8.453-4.525L450.66,248.49c0.002-0.002,0.003-0.003,0.005-0.006c0.002-0.002,0.003-0.003,0.006-0.005
			l46.782-46.782C516.847,182.302,516.851,150.911,497.453,131.515z M140.286,429.376l-34.267-34.267l15.596-77.979l96.652,96.651
			L140.286,429.376z M321.999,330.365l-46.787-46.788l93.577-93.576l46.787,46.787L321.999,330.365z"
                                />
                              </g>
                            </g>
                          </svg>
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={`${markerMode ? "Erase Marker" : "Marker"}`}
                      />
                    </ListItemButton>
                    <ListItemButton onClick={toggleHighlighterMode}>
                      <ListItemIcon>
                        {highlighterMode ? (
                          <svg
                            fill="#ffffff"
                            height="25px"
                            width="25px"
                            version="1.1"
                            id="Layer_1"
                            viewBox="0 0 512 512"
                          >
                            <g>
                              <g>
                                <path
                                  d="M267.537,412.71l-89.353-100.514c-1.604-1.801-4.378-1.92-6.127-0.256l-64.99,61.747
                             c-20.258,22.238-15.394,56.175,11.827,82.517c15.087,14.601,35.883,24.926,57.293,24.926c16.051,0,32.461-5.811,47.036-19.977
                             l44.083-42.539C268.954,417.028,269.056,414.416,267.537,412.71z"
                                />
                              </g>
                            </g>
                            <g>
                              <g>
                                <path
                                  d="M506.837,1.002c-3.14-1.357-6.775-0.7-9.242,1.656L256.418,231.786c-1.673,1.587-1.775,4.207-0.247,5.931l88.747,99.84
                             c1.613,1.809,4.403,1.92,6.153,0.239L509.389,185.04c1.672-1.604,2.611-3.823,2.611-6.144V8.844
                             C512,5.431,509.969,2.342,506.837,1.002z"
                                />
                              </g>
                            </g>
                            <g>
                              <g>
                                <path
                                  d="M332.86,349.682l-88.883-99.994c-1.604-1.801-4.378-1.92-6.127-0.256l-47.232,44.868
                             c-1.664,1.587-1.775,4.207-0.247,5.922l89.216,100.369c1.613,1.809,4.403,1.92,6.153,0.239l46.891-45.244
                             C334.276,354,334.379,351.389,332.86,349.682z"
                                />
                              </g>
                            </g>
                            <g>
                              <g>
                                <path
                                  d="M93.867,494.63H8.533c-4.719,0-8.533,3.823-8.533,8.533s3.814,8.533,8.533,8.533h85.333c4.719,0,8.533-3.823,8.533-8.533
                             S98.586,494.63,93.867,494.63z"
                                />
                              </g>
                            </g>
                            <g>
                              <g>
                                <path
                                  d="M503.467,494.63H264.533c-4.719,0-8.533,3.823-8.533,8.533s3.814,8.533,8.533,8.533h238.933
                             c4.719,0,8.533-3.823,8.533-8.533S508.186,494.63,503.467,494.63z"
                                />
                              </g>
                            </g>
                          </svg>
                        ) : (
                          <svg
                            fill="#ffffff"
                            width="25px"
                            height="25px"
                            viewBox="0 -16 544 544"
                          >
                            <path d="M0 479.98L99.92 512l35.45-35.45-67.04-67.04L0 479.98zm124.61-240.01a36.592 36.592 0 0 0-10.79 38.1l13.05 42.83-50.93 50.94 96.23 96.23 50.86-50.86 42.74 13.08c13.73 4.2 28.65-.01 38.15-10.78l35.55-41.64-173.34-173.34-41.52 35.44zm403.31-160.7l-63.2-63.2c-20.49-20.49-53.38-21.52-75.12-2.35L190.55 183.68l169.77 169.78L530.27 154.4c19.18-21.74 18.15-54.63-2.35-75.13z" />
                          </svg>
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={`${
                          highlighterMode ? "Erase Highlight" : "Highlighter"
                        }`}
                      />
                    </ListItemButton>
                  </List>
                </Collapse>
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
                <ListItemButton onClick={() => canvas.clear()}>
                  <ListItemIcon>
                    <CleaningServicesIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Clear Canvas"} />
                </ListItemButton>
              </List>
            </Box>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Box style={{ minHeight: "12vh" }}>
              {selectedShape?.type === "i-text" && (
                <Box>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      height: "5vh",
                    }}
                  >
                    <label id="text-color">
                      <input
                        id="text-color"
                        type="color"
                        value={textColor}
                        onChange={(e) => handleTextColorChange(e.target.value)}
                        style={{ display: "none" }}
                      />
                      <Button
                        variant="outlined"
                        component="span"
                        size="small"
                        endIcon={<FormatColorTextIcon />}
                      >
                        Text color
                      </Button>
                    </label>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="select-font-type">Font Type</InputLabel>
                      <Select
                        labelId="select-font-type"
                        id="font-type"
                        // value={age}
                        label="Font Type"
                        onChange={(e) => handleFontFamilyChange(e.target.value)}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="arial">Arial</MenuItem>
                        <MenuItem value="helvetica">Helvetica</MenuItem>
                        <MenuItem value="myriad pro">Myriad Pro</MenuItem>
                        <MenuItem value="delicious">Delicious</MenuItem>
                        <MenuItem value="verdana">Verdana</MenuItem>
                        <MenuItem value="georgia">Georgia</MenuItem>
                        <MenuItem value="courier">Courier</MenuItem>
                        <MenuItem value="comic sans ms">Comic Sans MS</MenuItem>
                        <MenuItem value="impact">Impact</MenuItem>
                        <MenuItem value="monaco">Monaco</MenuItem>
                        <MenuItem value="optima">Optima</MenuItem>
                        <MenuItem value="hoefler text">Hoefler Text</MenuItem>
                        <MenuItem value="plaster">Plaster</MenuItem>
                        <MenuItem value="engagement">Engagement</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="select-align-text">Align Text</InputLabel>
                      <Select
                        labelId="select-align-text"
                        id="demo-align-text"
                        // value={age}
                        label="Align Text"
                        onChange={(e) => handleTextAlignChange(e.target.value)}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="left">Left</MenuItem>
                        <MenuItem value="center">Center</MenuItem>
                        <MenuItem value="right">Right</MenuItem>
                        <MenuItem value="justify">Justify</MenuItem>
                      </Select>
                    </FormControl>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="fonttype"
                            onChange={() => handleFontStyleChange("bold")}
                          />
                        }
                        label="Bold"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="fonttype"
                            onChange={() => handleFontStyleChange("italic")}
                          />
                        }
                        label="Italic"
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            name="fonttype"
                            onChange={() =>
                              handleTextDecorationChange("underline")
                            }
                          />
                        }
                        label="Underline"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="fonttype"
                            onChange={() =>
                              handleTextDecorationChange("line-through")
                            }
                          />
                        }
                        label="Line-through"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="fonttype"
                            onChange={() =>
                              handleTextDecorationChange("overline")
                            }
                          />
                        }
                        label="Overline"
                      />
                    </FormGroup>
                    <label>
                      <Slider
                        size="small"
                        defaultValue={70}
                        min={1}
                        max={120}
                        step={1}
                        aria-label="Font Size"
                        valueLabelDisplay="auto"
                        orientation="vertical"
                        onChange={(e) => handleTextSizeChange(e.target.value)}
                      />
                      Font Size
                    </label>
                  </Box>
                </Box>
              )}
              {(selectedShape?.type === "rect" ||
                selectedShape?.type === "circle" ||
                selectedShape?.type === "triangle" ||
                selectedShape?.type === "polygon") && (
                <Box>
                  <Box>
                    <label id="shape-color">
                      <input
                        id="shape-color"
                        type="color"
                        value={selectedShape ? selectedShape.color : "#000000"}
                        onChange={(e) => handleShapeColorChange(e.target.value)}
                        style={{ display: "none" }}
                      />
                      <Button
                        variant="outlined"
                        component="span"
                        size="small"
                        endIcon={<FormatColorTextIcon />}
                      >
                        Shape color
                      </Button>
                    </label>
                  </Box>
                </Box>
              )}
              {selectedShape && (
                <>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={zoomIn}
                    style={{ marginRight: "8px" }}
                  >
                    Zoom In
                  </Button>
                  <Button variant="outlined" size="small" onClick={zoomOut}>
                    Zoom Out
                  </Button>
                </>
              )}
            </Box>
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <Box>
                <Paper elevation={4}>
                  <canvas
                    ref={canvasRef}
                    width={850}
                    height={600}
                    style={{
                      backgroundColor: canvasBackgroundColor,
                    }}
                  />
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          style={{
            position: "fixed",
            left: 0,
            bottom: 0,
            width: "100%",
            backgroundColor: "#f5f5f5",
            color: "#848482",
            boxShadow: "0 -5px 4px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            padding: "12px 0",
            backdropFilter: "blur(2px)",
          }}
        >
          Made by Vivek Ranjan © 2023
        </Box>
      </ThemeProvider>
    </>
  );
};

export default CanvasApp;
