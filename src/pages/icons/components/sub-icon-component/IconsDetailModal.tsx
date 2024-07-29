import { XMarkIcon } from "@heroicons/react/16/solid";
import {
  Button,
  Card,
  CardBody,
  Image,
  Tab,
  Tabs,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addCurrentIconDetails } from "../../../../core/store/iconListData";
import { toggleIconsDetailModal } from "../../../../core/store/slice";
import { baseUrl } from "../../../../environments/environment";
import { modifySvgSize } from "../../utility/functions/modifySvgSize";
import TabsTechnology from "./TabsTechnology";

const IconDetail = ({ onClose }: any) => {
  const [color, setColor] = useState<string>("#000000");
  const [svg, setSvg] = useState<any>();
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const dispatch = useDispatch();
  const IconDetails = useSelector((store: any) => {
    return store.iconData.currentIconDetail;
  });

  //** Function to close the icon detail modal */
  const closeIconDetailModal = () => {
    onClose();
    setTimeout(() => {
      dispatch(addCurrentIconDetails(null));
      dispatch(toggleIconsDetailModal());
    }, 400);
  };

  //** Function to remove XML and DOCTYPE declarations from the SVG string */
  const removeXmlAndDoctype = (svgString: any) => {
    // Remove XML declaration
    let cleanedSvg = svgString.replace(/<\?xml(.+?)\?>/g, "");
    // Remove DOCTYPE declaration
    cleanedSvg = cleanedSvg.replace(/<!DOCTYPE(.+?)>/g, "");
    return cleanedSvg;
  };

  //** Construct the URL to fetch the SVG */
  const svgUrl = `${baseUrl}/${IconDetails?.iconImages[0]?.iconImagePath}`;

  //** Helper function to fetch and clean SVG */
  const fetchAndCleanSvg = async (url: string) => {
    try {
      const response = await axios.get(url, { responseType: 'blob' });
      const reader = new FileReader();
      return new Promise<string>((resolve, reject) => {
        reader.onload = (e: any) => {
          const svgCode: any = e.target.result;
          const cleanedSvg = removeXmlAndDoctype(svgCode);
          resolve(cleanedSvg);
        };
        reader.onerror = reject;
        reader.readAsText(response.data);
      });
    } catch (error) {
      console.error("Error fetching SVG:", error);
      throw error;
    }
  };


  //** Fetch the SVG data when the component mounts */
  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const cleanedSvg = await fetchAndCleanSvg(svgUrl);
        setSvg(cleanedSvg);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSvg();
  }, [svgUrl]);

  //** Function to set the color in input type color */
  const handleColorChange = (event: any) => {
    setColor(event.target.value);
  };

  //** Function to change the color of svg icon */
  const changeSvgColor = () => {
    if (svg) {
      let updatedSvg = svg.replace(
        /fill="#[a-fA-F0-9]{6}"|stroke="#[a-fA-F0-9]{6}"/g,
        (match: any) => {
          if (match.includes("fill")) {
            return `fill="${color}"`;
          } else if (match.includes("stroke")) {
            return `stroke="${color}"`;
          }
        }
      );
      return updatedSvg;
    }
    return "";
  };

  //** Function to copy SVG to clipboard */
  const copySvgToClipboard = async () => {
    try {
      let svgContent;
      if (IconDetails.styleId === 3) {
        svgContent = await fetchAndCleanSvg(svgUrl);
      } else {
        svgContent = changeSvgColor();
      }
      await navigator.clipboard.writeText(svgContent);
      toast.success("SVG copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy SVG:", err);
    }
  };

  //** Combined function to download SVG and other image formats */
  const downloadImage = async (format: any, width: any, height: any) => {
    let svgContent;

    if (IconDetails.styleId === 3) {
      svgContent = await fetchAndCleanSvg(svgUrl);
    } else {
      svgContent = changeSvgColor();
    }

    const fixedSizeSvg = modifySvgSize(svgContent, 50, 50); // Adjust the function as needed
    const svgBlob = new Blob([fixedSizeSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);

    if (format === "svg") {
      // Download SVG
      const fileName = `${IconDetails?.iconName}.svg`;
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(a.href);
      document.body.removeChild(a);
    } else {
      // Download other formats
      const img = new window.Image();
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width || img.width;
        canvas.height = height || img.height;
        const ctx: any = canvas.getContext("2d");

        if (format === "jpg") {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob: any) => {
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = `${IconDetails?.iconName}.${format}`;
          document.body.appendChild(a);
          a.click();
          URL.revokeObjectURL(a.href);
          document.body.removeChild(a);
        }, `image/${format}`);
      };
    }
  };

  const handleFormatChange = (format: string) => {
    setSelectedFormat(format);
  };

  return (
    <div className="p-4">
      {IconDetails && (
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex flex-row lg:flex-col gap-5 justify-between">
            <div>
              <div className="bg-gray-100 shadow flex justify-center items-center rounded-md p-5 w-max">
                {IconDetails.styleId === 3 ? (
                  <Image
                    src={svgUrl}
                    alt={IconDetails?.iconName}
                    style={{ width: "100px", height: "100px" }}
                  />
                ) : (
                  svg && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: modifySvgSize(changeSvgColor(), 100, 100),
                      }}
                    />
                  )
                )}
              </div>
              {IconDetails.styleId !== 3 && (
                <div color="primary" className="text-center mt-4">
                  <input
                    type="color"
                    id="favcolor"
                    name="favcolor"
                    value="#ff0000"
                    onChange={handleColorChange}
                    className="cursor-pointer"
                  />
                </div>
              )}
            </div>
            <Button
              type="button"
              isIconOnly
              variant="flat"
              color="danger"
              size="sm"
              onClick={() => closeIconDetailModal()}
              className="lg:hidden"
            >
              <XMarkIcon className="h-5"></XMarkIcon>
            </Button>
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl ">{IconDetails?.iconName}</h2>
              <Button
                type="button"
                isIconOnly
                variant="flat"
                color="danger"
                size="sm"
                onClick={() => closeIconDetailModal()}
                className="hidden lg:flex"
              >
                <XMarkIcon className="h-5"></XMarkIcon>
              </Button>
            </div>
            <Tabs
              selectedKey={selectedFormat}
              onSelectionChange={(key: any) => handleFormatChange(key)}
              variant="underlined"
              aria-label="Image Format Tabs"
              color={'primary'}
            >
              <Tab key="svg" title="SVG">
                <Card >
                  <CardBody >
                    <div className="flex flex-col sm:flex-row justify-center items-center sm:items-baseline">
                      <Button
                        color="primary"
                        size="md"
                        variant="flat"
                        className="sm:me-2 w-52 mb-2 sm:mb-0"
                        onClick={() => downloadImage("svg", null, null)}
                      >
                        Download SVG
                      </Button>
                      <Button
                        color="primary"
                        size="md"
                        variant="flat"
                        className=" w-52"
                        onClick={copySvgToClipboard}
                      >
                        Copy SVG to clipboard
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Tab>
              {["png", "jpg", "webp"].map((format) => (
                <Tab key={format} title={format.toUpperCase()}>
                  <Card className="w-full mb-4">
                    <CardBody className="">
                      <div className="flex flex-wrap  gap-2">
                        {[16, 20, 24, 32, 48, 64, 128, 256, 512, 1024].map((size) => (
                          <Button
                            key={size}
                            color="primary"
                            size="md"
                            variant="flat"
                            onClick={() => downloadImage(format, size, size)}
                          >
                            {size}px
                          </Button>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                </Tab>
              ))}
            </Tabs>
            <TabsTechnology iconDetails={IconDetails}></TabsTechnology>
          </div>
        </div>
      )}
    </div>
  );
};

export default IconDetail;
