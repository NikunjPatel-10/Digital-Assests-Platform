import { TrashIcon } from '@heroicons/react/16/solid';
import { Card, CardBody, CardHeader, Image, Button, Tooltip } from '@nextui-org/react';

interface FileProps {
    file: File;
    onRemove: (name: string) => void;
}

const FilePreview: React.FC<FileProps> = ({ file, onRemove }) => {
    return (
        <div>
            <Card isFooterBlurred radius="lg" className="border mb-4 ">
                <CardHeader className="flex justify-between border-b-1 py-1">
                    <Tooltip content={file.name.split('.')[0]}>
                        <span className="truncate ">{file.name.split('.')[0]}</span>
                    </Tooltip>
                    <Button
                        className="ms-2"
                        variant="light"
                        color="danger"
                        isIconOnly
                        onClick={() => onRemove(file.name)}
                        size="sm"
                    >
                        <TrashIcon height={20} />
                    </Button>
                </CardHeader>
                <CardBody className='items-center'>
                    <Image
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="object-cover h-[45px] bg-white p-1 rounded"
                    />
                </CardBody>
            </Card>
        </div>
    );
};

export default FilePreview;