import { MockMethod } from "vite-plugin-mock";
export default [
    {
        url: "/api/v1/sale/rate",
        method: "get",
        response: () => {
          return {
            code: "00000",
            data: {
                title: ['比亚迪秦', '哪吒V', '零跑TO3', '问界M5', '零跑C11', '小鹏P7'],
                data: [
                    { value: 2496, name: '比亚迪秦' },
                    { value: 7884, name: '哪吒V' },
                    { value: 5724, name: '零跑TO3' },
                    { value: 5033, name: '问界M5' },
                    { value: 3345, name: '零跑C11' },
                    { value: 4224, name: '小鹏P7' },
                ]
            }
          }
        }
    }
] as MockMethod[];