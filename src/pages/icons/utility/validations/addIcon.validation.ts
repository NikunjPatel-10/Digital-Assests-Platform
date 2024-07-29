import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  iconName: Yup.string().required('Icon name is required'),
  svgFile: Yup.mixed().required('SVG file is required'),
  category: Yup.string().required('Category is required'),
  style: Yup.string().required('Style is required'),
  iconTags: Yup.array().min(1, 'At least one tag is required').required('Tags are required'),
});
