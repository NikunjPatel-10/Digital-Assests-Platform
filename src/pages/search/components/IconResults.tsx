import { Card, Tooltip } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { addCurrentIconDetails } from "../../../core/store/iconListData";
import { baseUrl } from "../../../environments/environment";

const IconResults = ({ searchResults, onOpen }: any) => {
    const dispatch = useDispatch();

    const openIconDetailModal = (item: any) => {
        dispatch(addCurrentIconDetails(item));
        onOpen();
    };
    if (searchResults.icons?.length === 0) {
        return <span>no results found</span>;
    }
    return (
        <>
            {searchResults?.icons?.map((item: any) => (
                <div
                    key={item.iconId}
                    onClick={() => { openIconDetailModal(item); }}
                    className="flex"
                >
                    <Tooltip
                        key={item.iconId}
                        content={item.iconName}
                        placement="bottom"
                        color="primary"
                    >
                        <Card
                            className="p-0 flex items-center justify-center cursor-pointer h-[92px] w-[92px] hover:bg-blue-100/[.9] group overflow-hidden shadow-md hover:shadow-none">
                            <img
                                className="h-[40px] group-hover:h-[54px] transition-all duration-300 ease-in-out rounded-none"
                                src={`${baseUrl}/${item?.iconImages[0]?.iconImagePath}`}
                                height={100}
                                width={100}
                                alt={`Image of ${item[0]?.iconImages[0]?.iconName} icon`}
                            />
                            {/* <span className="max-h-0 group-hover:max-h-10 overflow-hidden transition-all duration-300 ease-in-out text-center w-[69px] text-ellipsis text-nowrap">{item.iconName}</span> */}
                        </Card>
                    </Tooltip>
                </div>
            ))}
        </>
    );
};

export default IconResults;