import axios from "axios"
import { APikey, endPoint } from "../constants/Api"


export const geTranding=async(offset:number,batchsize:number)=>
{

    const response=await axios.get(endPoint+
        "/trending",{
        params:
        {
            api_key:APikey,
            limit:batchsize,
            offset:offset
               }
    })

    return response
}

// export const SearchSuggestions=(search:string)=>
// {
//     const response=await axios.get(
//         endPoint+
//     )
// }
