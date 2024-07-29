import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/16/solid";
import {
    Button,
    Input,
    Select,
    SelectItem,
    Spinner,
    Tooltip,
    useDisclosure
} from "@nextui-org/react";

import { useEffect, useState } from "react";
import { InView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { onChangeIconsPerPage } from "../../../core/store/iconListData";
import { RootState } from "../../../core/store/store";
import PageHeader from "../../../shared/common-ui/header/PageHeader";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import { useGetIconCategoryQuery, useGetIconListByIdQuery, useGetIconStyleQuery } from "../utility/services/iconsListById.service";
import AddNewIconsModal from "./sub-icon-component/AddNewIconsModal";
import IconListWrapper from "./sub-icon-component/IconListWrapper";
import DownloadTar from "./sub-icon-component/DownloadTar";
import { IIcon } from "../../projects/utility/models/projectList.model";

const IconsList = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const projectId = Number(params.projectid);
    const [query, setQuery] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedStyle, setSelectedStyle] = useState<string>("");
    const [sort,] = useState<string>("");
    const [hasMore, setHasMore] = useState<boolean>(true);

    const { currentPage, iconsPerPage } = useSelector(
        (state: RootState) => state.iconData
    );
    const searchQuery = useDebounce(query, 500);
    const { isOpen, onOpen, onClose } = useDisclosure();

    //** Fetch Icons */
    const { data: icons, isLoading: iconsLoading } = useGetIconListByIdQuery({
        projectId: projectId,
        page: currentPage,
        perPage: iconsPerPage,
        searchQuery,
        sort
    });
    const projectName = icons?.projectName;
    useEffect(() => {
        if (icons && icons.icons.length < iconsPerPage) {
            setHasMore(false);
        } else {
            setHasMore(true);
        }
    }, [icons, iconsPerPage]);

    //** Fetch Cateories */
    const { data: categoryData } = useGetIconCategoryQuery();
    const categories = categoryData?.result || [];
    //** Fetch Styles */ 
    const { data: styleData } = useGetIconStyleQuery();
    const styles = styleData?.result || [];

    //**  Filter Icon Data */
    const filteredIcons = icons?.icons?.filter((icon: IIcon) => {
        const matchesCategory =
            !selectedCategory || icon.categoryId === parseInt(selectedCategory);
        const matchesStyle =
            !selectedStyle || icon.styleId === parseInt(selectedStyle);
        const matchesSearch = icon.iconName
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesTags = icon.iconTags.some((tag: { tagName: string; }) => {
            return tag.tagName.toLowerCase().includes(searchQuery.toLowerCase());
        });
        return matchesCategory && matchesStyle && (matchesSearch || matchesTags);
    });

    const handleInview = (inView: boolean) => {
        setTimeout(() => {
            if (inView && hasMore) {
                dispatch(onChangeIconsPerPage(iconsPerPage + 10));
            }
        }, 2000);
    };

    return (
        <>
            <ToastContainer />
            <div className="flex">
                <div className="flex-grow">
                    <div className="flex justify-between">
                        <div className="flex">
                            <PageHeader
                                title={projectName || ""}
                                url={"/projects"}
                            ></PageHeader>
                        </div>
                        <Input
                            type="search"
                            placeholder="Type to search"
                            size="sm"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            startContent={<MagnifyingGlassIcon height={20} width={20} fill="#636363" />}
                            classNames={{
                                base: "max-w-[13rem] h-10 w-auto",
                                mainWrapper: "flex items-center",
                                input: "text-small",
                                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                            }}
                        />
                    </div>
                    <main>
                        <div className="flex mt-4 justify-end">
                            <Select
                                label="Category"
                                labelPlacement="outside"
                                className="w-full mt-auto max-w-52"
                                classNames={{ trigger: "py-0" }}
                                value={selectedCategory.toString()}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categories?.map((category) => (
                                    <SelectItem
                                        key={category.categoryId}
                                        value={category.categoryId}
                                    >
                                        {category.categoryName}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Select
                                label="Style"
                                labelPlacement="outside"
                                className="w-full mt-auto max-w-52 ms-2"
                                classNames={{ trigger: "py-0" }}
                                value={selectedStyle.toString()}
                                onChange={(e) => {
                                    setSelectedStyle(e.target.value);
                                }}
                            >
                                {styles?.map((style) => (
                                    <SelectItem key={style.styleId} value={style.styleId}>
                                        {style.styleName}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                        <section className="flex gap-5 flex-wrap mt-5 justify-center sm:justify-start">
                            {/* Start : Add New Icons */}
                            <Tooltip
                                color="primary"
                                content={"Add new Icons"}
                                placement="bottom"
                            >
                                <Button
                                    onClick={onOpen}
                                    className="h-[92px] w-[92px] cursor-pointer p-2 items-center justify-center flex flex-col rounded-md"
                                    variant="flat"
                                    color="primary"
                                >
                                    <PlusIcon height={60} width={60} />
                                </Button>
                            </Tooltip>
                            {/* End : Add New Icons */}
                            {/* Start : Download SVG Component Zip */}
                            {!iconsLoading && filteredIcons && filteredIcons.length > 0 && (
                                <DownloadTar
                                    projectId={projectId}
                                    projectName={projectName}
                                    page={0}
                                    perPage={10}
                                    sort="-iconId"
                                />
                            )}
                            {/* End : Download SVG Component Zip */}
                            {/* Start : Icon Cards */}
                            <IconListWrapper
                                iconListData={{ data: { result: { icons: filteredIcons } } }}
                            ></IconListWrapper>
                            {/* End : Icon Cards */}
                        </section>
                    </main>
                    {hasMore && (
                        <InView
                            as="div"
                            onChange={handleInview}
                            className="flex justify-center w-full p-16"
                        >
                            <Spinner />
                        </InView>
                    )}
                    <AddNewIconsModal isOpen={isOpen} onClose={onClose} />
                </div>
            </div>
        </>
    );
};

export default IconsList;
