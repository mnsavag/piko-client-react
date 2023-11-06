import { $host } from "./http.js"

export default class ContestService {
    static async create(contest){
        const response = await $host.post("/api/contest/", contest)
        return response
    }

    static async uploadImages(id, previewFirst, previewSecond, optionsFiles){
        const bodyFormData = new FormData()
        bodyFormData.append('previewFirst', previewFirst)
        bodyFormData.append('previewSecond', previewSecond)
        optionsFiles.forEach((item) => {
            bodyFormData.append('optionsFiles', item);
        });

        const response = await $host.patch(`/api/contest/${id}/upload`, bodyFormData)
        return response
    }

    static async getAll(filterName=null, limit=null, offset=0) {
        const response = await $host.get("/api/contest/", {
            params: {
                limit: limit,
                offset: offset,
                nameFilter: filterName
            }
        })
        return response
    }

    static async getById(id) {
        const response = await $host.get("/api/contest/" + id)
        return response
    }

    static async updateVictory(id, winOptionId) {
        const response = await $host.patch(`/api/contest/${id}/option/${winOptionId}/victory`)
        return response
    }

    static async getTierList(id) {
        const response = await $host.get(`/api/contest/${id}/top-list`)
        return response
    }
}
