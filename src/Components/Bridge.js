import http from "../Config/http"
import { ACCESS_POINT } from "../Config"


const GetData = async (table, data, id) => {
    const result = await http.get(ACCESS_POINT + `/cr/getRightdata`)
    // const result = await http.get(ACCESS_POINT + `/web/UpdatewithFileUpload/${table}/${id}`, data, {
    //     headers: {
    //         "Content-Type": "multipart/form-data",
    //     },
    // })
    return result
}
const getsingledata = async (table, id) => {
    let body = {}
    body.id = id
    console.log(body.id);
    const result = await http.put(ACCESS_POINT + `/cr/getsingledata`, body)
    // const result = await http.get(ACCESS_POINT + `/web/UpdatewithFileUpload/${table}/${id}`, data, {
    //     headers: {
    //         "Content-Type": "multipart/form-data",
    //     },
    // })
    // console.log(result);
    return result
}
const Search = async (keyword) => {
    let body = {}
    body.keyword = keyword
    const result = await http.post(ACCESS_POINT + `/cr/search`, body)
    // const result = await http.get(ACCESS_POINT + `/web/UpdatewithFileUpload/${table}/${id}`, data, {
    //     headers: {
    //         "Content-Type": "multipart/form-data",
    //     },
    // })
    // console.log(result);
    return result
}



export default {
    GetData,
    getsingledata,
    Search
}