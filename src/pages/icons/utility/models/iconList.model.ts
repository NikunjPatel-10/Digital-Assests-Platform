export interface IconFormValues {
    iconName: string;
    svgFile: File | null;
    pngFile: File | null;
    category: number;
    style: number;
    iconTags: string[];
}
export interface IconTag {
    tagName: string;
}

export interface IIcon {
    iconId: number;
    iconName: string;
    categoryId: number;
    styleId: number;
    iconTags: IconTag[];
}

export interface IconsResult {
    icons: IIcon[];
}

export interface IconListData {
    data: {
        result: IconsResult;
    };
}
