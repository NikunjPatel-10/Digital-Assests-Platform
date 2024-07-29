import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { IProject } from "../../../pages/projects/utility/models/projectList.model";
import { useDebounce } from "../../hooks/useDebounce";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useGetProjectListQuery } from "../../../pages/projects/utility/services/projectList.service";
import { baseUrl } from "../../../environments/environment";


const Search = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState<string>('');
    const debouncedQuery = useDebounce(query, 500);
    const [projectList, setProjectList] = useState<IProject[]>([]);

    const handleSearchQuery = (value: string) => {
        setQuery(value);
    };
    const handleSearch = () => {
        if (debouncedQuery.trim() !== '') {
            navigate(`/search?q=${encodeURIComponent(debouncedQuery)}`);
        }
    };

    //** Fetch Project Data */
    const { data: projects } = useGetProjectListQuery({
        page: 0,
        perPage: 10,
        searchQuery: debouncedQuery,
        sort: '-projectId'
    });

    useEffect(() => {
        if (projects) {
            setProjectList(projects.projects);
        }
    }, [projects]);

    return (
        <Autocomplete
            allowsCustomValue
            inputValue={query}
            defaultItems={projectList}
            onInputChange={handleSearchQuery}
            onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
            classNames={{
                base: "max-w-xs",
                listboxWrapper: "max-h-[320px]",
                selectorButton: "text-default-500",
            }}
            inputProps={{
                classNames: {
                    input: "ml-1",
                    inputWrapper: "h-[48px] data-[focus-within=true]:ring-blue-500 focus:ring-blue-500",
                    innerWrapper: ' data-[focus-within=true]:ring-blue-500 focus:ring-blue-500'
                },
            }}
            listboxProps={{
                hideSelectedIcon: true,
                itemClasses: {
                    base: [
                        "rounded-medium",
                        "text-default-500",
                        "transition-opacity",
                        "data-[hover=true]:text-foreground",
                        "dark:data-[hover=true]:bg-default-50",
                        "data-[pressed=true]:opacity-70",
                        "data-[hover=true]:bg-default-200",
                        "data-[selectable=true]:focus:bg-default-100",
                        "data-[focus-visible=true]:ring-default-500",
                    ],
                },
            }}
            aria-label="Search Projects or Icons"
            placeholder="Search Projects or Icons"
            popoverProps={{
                offset: 10,
                classNames: {
                    base: "rounded-large",
                    content: "p-1 border-small border-default-100 bg-background",
                },
            }}
            startContent={<MagnifyingGlassIcon height={30} width={30} fill="#636363" />}
            radius="full"
            variant="bordered"

        //     onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
        >
            {(item) => (
                <AutocompleteItem key={item.projectId} textValue={item.projectName}>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <Avatar
                                alt={item.projectName}
                                size="sm"
                                src={`${baseUrl}/${item.projectImagePath}`}
                                className="flex-shrink-0"
                            />
                            <Link to={`/projects/${item.projectId}`} className="flex flex-col">
                                <span className="text-small">{item.projectName}</span>
                                <span className="text-tiny text-default-400">{item.projectName}</span>
                            </Link>
                        </div>
                    </div>
                </AutocompleteItem>
            )}
        </Autocomplete>
    );
};

export default Search;