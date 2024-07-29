export function modifySvgSize(svgString: any, width: any, height: any) {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
    const svgElement = svgDoc.querySelector("svg");
    svgElement?.setAttribute("width", width);
    svgElement?.setAttribute("height", height);
    return svgDoc.documentElement.outerHTML;
}