import * as yup from 'yup';
import { ProjectFormValidation } from '../constants/projectForm.constant';

const CreateProjectFormValidationSchema = yup.object({
    projectName: yup.string().required(ProjectFormValidation.REQUIRED),
    uploadImage: yup.mixed().required(ProjectFormValidation.UPLOAD_IMAGE),
});

export { CreateProjectFormValidationSchema };