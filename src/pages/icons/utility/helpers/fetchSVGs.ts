import { baseUrl } from "../../../../environments/environment";

interface IconImage {
    iconImagePath: string;
    imageName: string;
}

interface Icon {
    iconName: string;
    iconImages: IconImage[];
}

interface IconData {
    result: {
        icons: Icon[];
    };
}

const page = 0;
const perPage = 10000;
const baseApi = `${baseUrl}/api`;
export default async function fetchSVGsForProject(projectId: number): Promise<{ [key: string]: string; }> {
    try {
        async function fetchProjectIcons(projectId: number): Promise<Icon[]> {
            try {
                const response = await fetch(`${baseApi}/project/${projectId}/icons?page=${page}&perPage=${perPage}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "categoryId": null, "styleId": null }),
                });
                const iconData = await response.json() as IconData;
                return iconData.result.icons;
            } catch (error) {
                console.error('Error fetching project icons:', error);
                return [];
            }
        }

        async function fetchSVGData(url: string): Promise<string> {
            try {
                const fullUrl = `${baseUrl}/${url}`;
                const response = await fetch(fullUrl);
                const svgData = await response.text();
                return svgData;
            } catch (error) {
                console.error('Error fetching SVG data:', error);
                return '';
            }
        }

        const icons = await fetchProjectIcons(projectId);
        const svgFiles: { [key: string]: string; } = {};
        if (icons && icons.length > 0) {
            for (const icon of icons) {
                if (icon.iconImages && icon.iconImages.length > 0) {
                    for (const image of icon.iconImages) {
                        if (image.iconImagePath.toLowerCase().endsWith('.svg')) {
                            const svgData = await fetchSVGData(image.iconImagePath);
                            const fileName = `${icon.iconName}.svg`;
                            svgFiles[fileName] = svgData;
                        }
                    }
                }
            }
        }
        return svgFiles;
    } catch (error) {
        console.error('Error fetching and writing SVGs for project:', error);
        return {};
    }
}
