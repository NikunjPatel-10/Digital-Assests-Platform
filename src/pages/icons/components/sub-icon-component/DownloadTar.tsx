import { ArrowDownIcon } from "@heroicons/react/16/solid";
import { Button, Tooltip } from "@nextui-org/react";
import { PackageDownloadResponse } from "../../utility/constants/downloadPackage.constant";

interface IProps {
    projectId: number,
    projectName: string | undefined,
    page: number,
    perPage: number,
    sort: string,
}

const DownloadTar = ({ projectId, projectName, page = 0, perPage = 10, sort = '-iconId' }: IProps) => {
    const baseUrl = 'http://localhost:1000';
    const handleDownload = async () => {
        const response = await fetch(
            `${baseUrl}/download?projectId=${projectId}&projectName=${projectName}&page=${page}&perPage=${perPage}&sort=${sort}`
        );

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${projectName}.tgz`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } else {
            console.error(PackageDownloadResponse.PACKAGE_DOWNLOAD_ERROR);
        }
    };

    return (
        <>
            <Tooltip
                color="primary"
                content={`Download Package`}
                placement="bottom"
            >
                <Button
                    onClick={handleDownload}
                    className="h-[92px] w-[92px] cursor-pointer p-2 items-center justify-center flex flex-col rounded-md"
                    variant="flat"
                    color="primary"
                >
                    <ArrowDownIcon height={60} width={60} />
                </Button>
            </Tooltip>
        </>
    );
};

export default DownloadTar;
