import axios from "axios";
import { baseUrl } from "../../../../environments/environment";

//** Global Search */
const baseApi = `${baseUrl}/api`;
const getGlobalData = (
    page: number,
    perPage: number,
    searchQuery: string,
    sort: string,
) => {
    return axios.post(
        `${baseApi}/home/search`,
        { "categoryId": null, "styleId": null },
        {
            params: {
                page: page,
                perPage: perPage,
                q: searchQuery,
                sort: sort,
            }
        }
    );
};

export default getGlobalData;