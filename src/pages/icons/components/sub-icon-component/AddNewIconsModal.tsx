// AddNewIconsModal.tsx
import { ChangeEvent, useState } from 'react';
import { Form, Formik, Field } from 'formik';
import { Accordion, AccordionItem, Button, Input, ModalFooter, Select, SelectItem } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddIconMutation, useGetIconCategoryQuery, useGetIconStyleQuery } from '../../utility/services/iconsListById.service';
import { validationSchema } from '../../utility/validations/addIcon.validation';
import TagsInput from './TagsInput';
import FileUpload from '../../../../shared/common-ui/FileUpload';
import RightModal from '../../../../shared/common-ui/modal/RightModal';
import { IconFormResponse } from '../../utility/constants/iconForm.constant';
import { IconFormInitialValues } from '../../utility/constants/createIcon.constant';
import { IconFormValues } from '../../utility/models/iconList.model';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewIconsModal = ({ onClose, isOpen }: IProps) => {
  const params = useParams();
  const projectId = Number(params?.projectid);

  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [styleId, setStyleId] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);

  const [addIcon] = useAddIconMutation();

  const { data: categoryData } = useGetIconCategoryQuery();
  const categories = categoryData?.result || [];

  const { data: styleData } = useGetIconStyleQuery();
  const styles = styleData?.result || [];

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>, setFieldValue: (field: string, value: any) => void) => {
    const value = parseInt(e.target.value, 10);
    setCategoryId(value);
    setFieldValue('category', value);
  };

  const handleStyleChange = (e: ChangeEvent<HTMLSelectElement>, setFieldValue: (field: string, value: any) => void) => {
    const value = parseInt(e.target.value, 10);
    setStyleId(value);
    setFieldValue('style', value);
  };

  const handleTagChange = (newTags: string[], setFieldValue: (field: string, value: any) => void) => {
    setTags(newTags);
    setFieldValue('iconTags', newTags);
  };


  const onSubmit = async (values: IconFormValues) => {
    try {
      if (isNaN(projectId)) {
        console.error(IconFormResponse.INVALID_PROJECT_ID, projectId);
        return;
      }
      setIsSubmitLoading(true);
      const allFiles = [values.svgFile];
      await addIcon({
        projectId: projectId,
        iconName: values.iconName,
        categoryId: categoryId,
        styleId: styleId,
        tag: tags.join(','),
        images: allFiles.filter(file => file !== null).map(file => ({ file: file as File, imageName: (file as File).name.split('.')[0] })),
      }).unwrap().then((res: any) => { toast.success(res?.result); });
      setTags([]);
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.errors[0].message);
    } finally {
      setIsSubmitLoading(false);
    }
  };
  return (
    <>
      <RightModal
        onClose={onClose}
        isOpen={isOpen}
        headerTitle="Add New Icon"
        width="w-[400px]"
      >
        <Formik
          initialValues={IconFormInitialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, errors, setFieldTouched, touched }) => (
            <Form className="h-full flex flex-col relative">
              <section>
                {/* File Upload SVG */}
                <FileUpload
                  name="svgFile"
                  label="Upload SVG File"
                  accept="image/svg+xml"
                />
                {/* Start : Icon Name */}
                <div>
                  <Field name="iconName">
                    {({ field, meta }: any) => (
                      <div className="mt-6 py-2">
                        <Input
                          {...field}
                          labelPlacement="inside"
                          label="Icon Name"
                          isInvalid={meta.touched && !!meta.error}
                          errorMessage={meta.touched && meta.error}
                        />
                      </div>
                    )}
                  </Field>
                </div>
                {/* End : Icon Name */}
                {/* Start : Categories */}
                <div>
                  <Select
                    label="Select a category"
                    className="w-full py-2"
                    value={categoryId}
                    onChange={(e) => handleCategoryChange(e, setFieldValue)}
                    isInvalid={touched.category && !!errors.category}
                    errorMessage={errors.category}
                  >
                    {categories.map((item) => (
                      <SelectItem key={item.categoryId} value={item.categoryId.toString()}>
                        {item.categoryName}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                {/* End : Categories */}
                {/* Start : Styles */}
                <div>
                  <Select
                    label="Select a Style"
                    className="w-full py-2"
                    value={styleId}
                    onChange={(e) => handleStyleChange(e, setFieldValue)}
                    isInvalid={touched.style && !!errors.style}
                    errorMessage={errors.style}
                  >
                    {styles.map((item) => (
                      <SelectItem key={item.styleId} value={item.styleId.toString()}>
                        {item.styleName}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                {/* End : Styles */}
                {/* Start : Icon Tags */}
                <div className="py-2">
                  <Accordion
                    isCompact
                    variant="light"
                    className="rounded-lg bg-default-100 dark:bg-default-100 dark:hover:bg-default-200 hover:bg-default-200 transition-all duration-500"
                  >
                    <AccordionItem
                      key="1"
                      aria-label="tags"
                      title="Icon Tags"
                      className="px-2"
                      classNames={{
                        title: 'text-default-500 text-sm',
                        base: 'py-2',
                      }}
                    >
                      <TagsInput
                        tags={tags}
                        setTags={(newTags) => handleTagChange(newTags, setFieldValue)}
                        onBlur={() => { setFieldTouched('iconTags'); }}
                      />
                    </AccordionItem>
                  </Accordion>
                  {touched.iconTags && errors.iconTags && (
                    <span className="text-red-600 text-[12px] pt-2">{errors.iconTags}</span>
                  )}
                </div>
                {/* End : Icon Tags */}
              </section>
              {/* Action Buttons */}
              <ModalFooter className="px-5 sticky top-full">
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  isLoading={isSubmitLoading}
                >
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

export default AddNewIconsModal;
