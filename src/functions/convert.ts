import { toast } from "./toast";

export function convertSvgShapesToPaths(button: HTMLButtonElement) {
  button.addEventListener("click", () => {
    // svg: SVGSVGElement

    const textArea = document.querySelector<HTMLTextAreaElement>("#svg-paste")!;

    if (!textArea.value.trim()) {
      toast("Please paste SVG code first");
      return;
    }

    const pathArea = document.querySelector<HTMLTextAreaElement>("#svg-copy")!;
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(textArea.value, "image/svg+xml");

    // Check for parsing errors
    const parserError = svgDoc.querySelector("parsererror");
    if (parserError) {
      toast("Invalid SVG format");
      return;
    }

    const svgPaste = svgDoc.documentElement;
    const shapes = svgPaste.querySelectorAll(
      "circle, ellipse, line, polygon, polyline, rect"
    );

    // convert each shape
    let shapesConverted = 0;
    for (const shape of shapes) {

      try {
        const shapeAttributes = shape.attributes;
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const { pathAttributes, attributesToExclude } = shapeToPath(shape);

        if (!pathAttributes) {
          toast(`Failed to convert ${shape.tagName} to path`, "warning");
          continue;
        }

        // Copy attributes that shouldn't be excluded
        path.setAttribute("d", pathAttributes);
        for (const attribute of shapeAttributes) {
          if (!attributesToExclude.includes(attribute.name)) {
            path.setAttribute(attribute.name, attribute.value);
          }
        }
        shape.replaceWith(path);
        shapesConverted++
      } catch (shapeError) {
        console.error(`Error converting shape: ${shape.tagName}`, shapeError);
      }
    }

    // update output to render
    pathArea.value = svgPaste.outerHTML;

    // // select preview wrapper element
    // const previewWrapper = document.querySelector<HTMLDivElement>('.svg-preview-wrapper')!

    //  // remove previous svg preview if exists
    // const previousSvgPreview = document.querySelector<HTMLDivElement>('.svg-preview')
    // if (previousSvgPreview) {
    //      previewWrapper.setAttribute("data-preview", "false")
    //      previousSvgPreview.remove()
    //    }
    
    // // create svg preview element
    // const svgPreview = document.createElement("div")
    // svgPreview.classList.add("svg-preview")
    // previewWrapper.appendChild(svgPreview)

    // // Set the innerHTML to the SVG string
    // svgPreview.innerHTML = svgPaste.outerHTML

    // // update data preview attribute
    // previewWrapper.setAttribute("data-preview", "true")

    updatePreview(svgPaste)
 
  });
}

// Update the preview area with the converted SVG
function updatePreview(svgElement: HTMLElement) {
  const previewWrapper = document.querySelector<HTMLDivElement>('.svg-preview-wrapper');
  
  if (!previewWrapper) {
    console.warn("Preview wrapper not found")
    toast("Preview wrapper not found", "warning");
    return;
  }
  
  // Remove previous preview
  const previousSvgPreview = document.querySelector<HTMLDivElement>('.svg-preview');
  if (previousSvgPreview) {
    previewWrapper.setAttribute("data-preview", "false");
    previousSvgPreview.remove();
  }
  
  // Create new preview
  const svgPreview = document.createElement("div");
  svgPreview.classList.add("svg-preview");
  previewWrapper.appendChild(svgPreview);
  
  // Set the innerHTML safely
  try {
    svgPreview.innerHTML = svgElement.outerHTML;
    previewWrapper.setAttribute("data-preview", "true");
  } catch (error) {
    toast("Error setting preview HTML")
    console.error("Error setting preview HTML:", error);
  }
}

// Type guard for narrowing down the type
function isSVGRectElement(shape: Element): shape is SVGRectElement {
  return shape.tagName === "rect";
}

function isSVGCircleElement(shape: Element): shape is SVGCircleElement {
  return shape.tagName === "circle";
}

function isSVGEllipseElement(shape: Element): shape is SVGEllipseElement {
  return shape.tagName === "ellipse";
}

function isSVGLineElement(shape: Element): shape is SVGLineElement {
  return shape.tagName === "line";
}

function isSVGPolygonElement(shape: Element): shape is SVGPolygonElement {
  return shape.tagName === "polygon";
}

function isSVGPolylineElement(shape: Element): shape is SVGPolylineElement {
  return shape.tagName === "polyline";
}

const shapeToPath = (shape: Element) => {
  if (isSVGRectElement(shape)) {
    return rectToPath(shape);
  }
  else if (isSVGCircleElement(shape)) {
      return circleToPath(shape)
  } 
  else if (isSVGLineElement(shape)) {
        return lineToPath(shape)
  }
  else if (isSVGEllipseElement(shape)) {
        return ellipseToPath(shape)
  }
  else if (isSVGPolygonElement(shape)) {
        return polygonToPath(shape)
  }
  else if (isSVGPolylineElement(shape)) {
        return polylineToPath(shape)
  }
 
  else {
    return { pathAttributes: "", attributesToExclude: [] };
  }
};

// function to convert rect to path
const rectToPath = (rect: SVGRectElement) => {
  const attributes = rect.attributes;
  const x = Number(attributes.getNamedItem("x")?.value ?? 0);
  const y = Number(attributes.getNamedItem("y")?.value ?? 0);
  const width = Number(attributes.getNamedItem("width")?.value ?? 0);
  const height = Number(attributes.getNamedItem("height")?.value ?? 0);
  const rx = Number(attributes.getNamedItem("rx")?.value ?? 0);
  const ry = Number(attributes.getNamedItem("ry")?.value ?? rx);

  // console.log(x, y, width, height, rx, ry, 'rect values')

  if (!rx && !ry) {
    return {
      pathAttributes: `M ${x},${y} l ${width},0 l 0,${height} l -${width},0  Z`,
      attributesToExclude: ["x", "y", "width", "height"],
    };
  }

  return {
    pathAttributes: `M ${x + rx},${y} H ${x + width - rx} A ${rx},${ry} 0 0 1 ${x + width
    },${y + ry} V ${y + height - ry} A ${rx},${ry} 0 0 1 ${x + width - rx},${
      y + height
    } H ${x + rx} A ${rx},${ry} 0 0 1 ${x},${y + height - ry} V ${
      y + ry
    } A ${rx},${ry} 0 0 1 ${x + rx},${y}`,
    attributesToExclude: ["x", "y", "width", "height", "rx", "ry"],
  };
};

// function to convert circle to path
const circleToPath = (circle: SVGCircleElement) => {

  try {
    
    const attributes = circle.attributes;
    const cx = Number(attributes.getNamedItem("cx")?.value ?? 0);
    const cy = Number(attributes.getNamedItem("cy")?.value ?? 0);
    const r = Number(attributes.getNamedItem("r")?.value ?? 0);

    if(isNaN(r) || r <= 0){
      throw new Error(`Invalid circle radius: ${r}`)
    }
    
    return {
        pathAttributes: `M ${cx + r},${cy} A ${r},${r} 0 1 0 ${cx - r},${cy} A ${r},${r} 0 1 0 ${cx + r},${cy}`,
        attributesToExclude: ["cx", "cy", "r"],
    };
  } catch (error:any) {
    toast(error, 'failure')
    return { pathAttributes: "", attributesToExclude: [] }
  }
    }
    


// function to convert line to path
const lineToPath = (line: SVGLineElement) => {
    const attributes = line.attributes;
    const x1 = Number(attributes.getNamedItem("x1")?.value ?? 0);
    const y1 = Number(attributes.getNamedItem("y1")?.value ?? 0);
    const x2 = Number(attributes.getNamedItem("x2")?.value ?? 0);
    const y2 = Number(attributes.getNamedItem("y2")?.value ?? 0);
    
    return {
        pathAttributes: `M ${x1},${y1} L ${x2},${y2}`,
        attributesToExclude: ["x1", "y1", "x2", "y2"],
    };
    }

// function to convert ellipse to path
const ellipseToPath = (ellipse: SVGEllipseElement) => {
    const attributes = ellipse.attributes;
    const cx = Number(attributes.getNamedItem("cx")?.value ?? 0);
    const cy = Number(attributes.getNamedItem("cy")?.value ?? 0);
    const rx = Number(attributes.getNamedItem("rx")?.value ?? 0);
    const ry = Number(attributes.getNamedItem("ry")?.value ?? 0);
    
    return {
        pathAttributes: `M ${cx + rx},${cy} A ${rx},${ry} 0 1 0 ${cx - rx},${cy} A ${rx},${ry} 0 1 0 ${cx + rx},${cy}`,
        attributesToExclude: ["cx", "cy", "rx", "ry"],
    };
    }

// function to convert polygon to path
const polygonToPath = (polygon: SVGPolygonElement) => {
    const attributes = polygon.attributes;
    const points = attributes.getNamedItem("points")?.value ?? "";
    // console.log(points, 'polygon points')
    // console.log(typeof points, 'polygon points type')
    
    return {
        pathAttributes: `M ${points} Z`,
        attributesToExclude: ["points"],
    };
    }

    // function to convert polyline to path
const polylineToPath = (polyline: SVGPolylineElement) => {
    const attributes = polyline.attributes;
    const points = attributes.getNamedItem("points")?.value ?? "";
    
    return {
        pathAttributes: `M ${points}`,
        attributesToExclude: ["points"],
    };
    }
