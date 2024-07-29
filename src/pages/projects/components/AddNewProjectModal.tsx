import { Button, Input, ModalFooter } from '@nextui-org/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEvent, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import FilePreview from '../../../shared/common-ui/FilePreview';
import RightModal from '../../../shared/common-ui/modal/RightModal';
import { useAddProjectMutation } from '../utility/services/projectList.service';
import ProjectCardPreview from './ProjectCardPreview';

import ProjectListTooltipConstant from '../utility/constants/tooltip.constant';
import { ProjectFormConstants, ProjectFormInitialValues } from '../utility/constants/createProject.constant';
import { ProjectFormValidation } from '../utility/constants/projectForm.constant';
import { CreateProjectFormValidationSchema } from '../utility/validations/projectForm.validation';

const cardMotion = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.1 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.1 } },
};

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewProjectModal = ({ isOpen, onClose }: IProps) => {
  const [addProject] = useAddProjectMutation();
  const [pickedImage, setPickedImage] = useState<File | undefined>(undefined);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);

  const { } = useDropzone({
    accept: {
      'image/svg+xml': ['.svg'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setFiles(acceptedFiles);
        setPickedImage(acceptedFiles[0]);
      }
    },
  });

  const onCloseModal = () => {
    onClose();
    setFiles([]);
    setPickedImage(undefined);
  };

  const removeFile = () => {
    setFiles([]);
    setPickedImage(undefined);
  };

  const onSubmit = async (values: any) => {
    if (!pickedImage) {
      toast.error(ProjectFormConstants.ERROR_TOASTER);
      return;
    }
    try {
      setIsSubmitLoading(true);
      await addProject({ projectName: values.projectName, projectLogo: pickedImage }).unwrap().then((res: any) => { toast.success(res?.result); });
      onCloseModal();
    } catch (error: any) {
      toast.error(error?.data?.errors[0].message);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <>
      <RightModal
        onClose={onCloseModal}
        isOpen={isOpen}
        headerTitle={ProjectListTooltipConstant.AddNewProject}
        width="w-[500px]"

      >
        <Formik
          initialValues={ProjectFormInitialValues}
          validationSchema={CreateProjectFormValidationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className="h-full flex flex-col">
              <Field name="projectName">
                {({ field, meta }: any) => (
                  <div className="mt-6">
                    <Input
                      {...field}
                      autoFocus
                      labelPlacement="outside"
                      label="Name"
                      isInvalid={meta.touched && !!meta.error}
                      errorMessage={meta.touched && meta.error}
                      placeholder="Enter Project Name"
                    />
                  </div>
                )}
              </Field>

              <div className="mt-6">
                <AnimatePresence>
                  {pickedImage ? (
                    <motion.div
                      key="preview"
                      className="bg-slate-100 dark:bg-slate-950 p-3 rounded-lg mt-4"
                      variants={cardMotion}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <div className="w-[300px]">
                        <h3 className="my-2 text-lg font-medium">Preview</h3>
                        <ProjectCardPreview projectName={values.projectName} projectLogo={pickedImage} />
                        <Button color="danger" variant="light" onPress={removeFile} className="mt-4">
                          Remove File
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="upload"
                      className="mt-6"
                      variants={cardMotion}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <input
                        type="file"
                        id="uploadImage"
                        className="hidden"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const files = e.target.files;
                          if (files && files[0]) {
                            setPickedImage(files[0]);
                            setFieldValue('uploadImage', files[0]);
                          } else {
                            setPickedImage(undefined);
                            setFieldValue('uploadImage', null);
                          }
                        }}
                      />

                      <label
                        htmlFor="uploadImage"
                        className="cursor-pointer p-2 bg-transparent border-dashed border-2 text-center rounded-xl flex-grow flex items-center justify-center w-full mt-1"
                      >
                        <span className="font-md font-medium">{ProjectFormValidation.UPLOAD_IMAGE}</span>
                      </label>
                      <ErrorMessage name="uploadImage" component="div" className="text-tiny text-danger p-1" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.aside className="grid-sm gap-5">
                {files.map((file, index) => (
                  <FilePreview key={index} file={file} onRemove={() => removeFile()} />
                ))}
              </motion.aside>

              <ModalFooter className="px-5 mt-auto">
                <Button color="danger" variant="light" onPress={onCloseModal}>
                  Close
                </Button>
                <Button color="primary" type="submit" isLoading={isSubmitLoading}>
                  Submit
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </RightModal>
    </>
  );
};

export default AddNewProjectModal;