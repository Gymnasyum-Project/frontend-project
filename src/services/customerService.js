import api from "./api";

export const getCustomer = async ({ page = 1, limit = 20, search="" } = {}) => {
    const response = await api.get("/customers", {
        params: {page, limit, sort: "priority", search:search || undefined

        }});
    return {
        data: response.data.data,
        meta: response.data.meta
    }

}