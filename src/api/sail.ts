import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { Rate } from "./types";

/**
 * 登录成功后获取用户信息（昵称、头像、权限集合和角色集合）
 */
export const getRate = (): AxiosPromise<Rate> =>  {
    return request({
        url: "/api/v1/sale/rate",
        method: "get",
    });
}