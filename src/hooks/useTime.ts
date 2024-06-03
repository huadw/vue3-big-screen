/**
 * create by daowei on 2024/06/03
 * 支持在某一个ref的dom中自动定时器显示时间
 * 也支持使用format函数进行格式化
 */
import { onUnmounted, ref } from "vue";
const useTime = (
  time?: string | number | Date | undefined | null
): {timeRef:any,init: Function,format: Function} => {
  const timeRef = ref();
  // * 定时函数
	const timer = ref(0);

  const format = (matchVal: string): string => {
    let date = time ? new Date(time) : new Date();
    const match = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "H+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "q+": Math.floor((date.getMonth() + 3) / 3),
      "W+": ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][
        date.getDay()
      ],
      S: date.getMilliseconds(),
    };
    if (/(y+)/.test(matchVal))
      matchVal = matchVal.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (const k in match) {
      if (new RegExp("(" + k + ")").test(matchVal)) {
        matchVal = matchVal.replace(
          RegExp.$1,
          // @ts-ignore: Unreachable code error
          RegExp.$1.length === 1 ? match[k] : ("00" + match[k]).substr(("" + match[k]).length)
        );
      }
    }
    return matchVal;
  };

  const init =  () => {
    clearInterval(timer.value);
    timer.value = window.setInterval(() => {
      timeRef.value.innerHTML = `${format('HH: mm: ss')}&nbsp;&nbsp;&nbsp;${format('yyyy-MM-dd')}&nbsp;&nbsp;&nbsp;${format('W')}`
    },1000);
  };


  onUnmounted(() => {
    clearInterval(timer.value);
  });
  return {timeRef,init,format};
};
export default useTime;