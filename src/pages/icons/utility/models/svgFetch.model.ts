// types.ts
export interface Project {
    projectId: number;
    projectName: string;
}

export interface IconImage {
    iconImagePath: string;
    imageName: string;
}

export interface Icon {
    iconName: string;
    iconImages: IconImage[];
}

export interface ProjectData {
    result: {
        projects: Project[];
    };
}

export interface IconData {
    result: {
        icons: Icon[];
    };
}
