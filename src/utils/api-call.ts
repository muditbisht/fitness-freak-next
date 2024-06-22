import axios from "axios";
import networkProblem from '@/utils/NetworkProblem';

type ApiMethods = "GET" | "POST";

export default async function apiRequest<Req, Res>(
    method: ApiMethods, 
    url: string, 
    obj?: Req
) {
    try {
        const res = await axios({
            method: method,
            url: url,
            data: JSON.stringify(obj),
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            withCredentials: true,
            
        });
        return res;
    } catch (err) {
        networkProblem();
        return ({ data: { success: false } });
    }
}
