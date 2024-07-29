import { TrashIcon } from '@heroicons/react/16/solid';
import { Chip } from '@nextui-org/react';
import { useField } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";

const FileUpload = ({ label, ...props }: any) => {
    const [field, meta, helpers] = useField(props.name);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (field.value) {
            const objectUrl = URL.createObjectURL(field.value);
            setPreview(objectUrl);

            // Free memory when component is unmounted or file is changed
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreview(null);
        }
    }, [field.value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        helpers.setValue(file);
    };

    const handleRemove = () => {
        helpers.setValue(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset file input value
        }
    };

    return (
        <div className="mb-4">
            <label htmlFor={props.name} className="block text-sm text-default-500 mb-3">
                {label}
            </label>
            <div className="mt-1 flex items-center">
                <input
                    id={props.name}
                    name={props.name}
                    type="file"
                    accept={props.accept}
                    onChange={handleChange}
                    className="hidden"
                    ref={fileInputRef} // Add ref to input
                />
                <div className="flex-1">
                    {field.value ? (
                        <div className="flex items-center space-x-2">
                            {preview && (
                                <img src={preview} alt="Preview" className="w-16 h-16 object-cover" />
                            )}
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.8 }}
                            >
                                <Chip
                                    variant="flat"
                                    color="danger"
                                    size="sm"
                                    onClick={handleRemove}
                                    className='cursor-pointer'
                                >
                                    <TrashIcon height={20} width={20} />
                                </Chip>
                            </motion.div>
                        </div>
                    ) : (
                        <label
                            htmlFor={props.name}
                            className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            Upload File
                        </label>
                    )}
                </div>
            </div>
            {meta.touched && meta.error ? (
                <div className="text-red-600 text-sm mt-3">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default FileUpload;
