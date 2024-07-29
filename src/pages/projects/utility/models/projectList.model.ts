export interface IProject {
  projectId: number;
  projectName: string;
  projectLogo: string;
  imagetype: string;
  uniqueImageName: string;
  projectImagePath: string;
}

export interface IGetProjectListResponse {
  totalCount: number;
  projects: IProject[];
}

export interface IProjectListType {
  projectList: any;
  isLoading: boolean;
}

export interface IAddProjectResponse {
  result: {
    message: string;
  };
}
export interface IGetCategoryResponse {
  result: {
    categoryId: number;
    categoryName: string;
  }[];
  error?: {
    message: string | null;
  }[];
}

export interface IGetStyleResponse {
  result: {
    styleId: number;
    styleName: string;
  }[];
  error?: {
    message: string | null;
  }[];
}


// Define the IIconImage interface
export interface IIconImage {
  imageId: number;
  imageName: string;
  uniqueImageName: string;
  imageType: string;
  iconImagePath: string;
}

// Define the IIcon interface
export interface IIcon {
  iconId: number;
  iconName: string;
  categoryId: number;
  styleId: number;
  iconImages: IIconImage[];
  iconTags: { tagName: string; }[];
}

export interface IGetIconList {
  projectId: number;
  projectName: string;
  totalCount: number;
  icons: IIcon[];
}

export interface ProjectId {
  projectId: number,
  projectName: string;
}
