<template>
  <div class="container">
    <div class="content" ref="screenRef">
      <div v-if="loading" class="mask">
        <dv-loading>
          <span class="loading-title">加载中..</span>
        </dv-loading>
      </div>
      <div>
        <ScreenHeader></ScreenHeader>
      </div>
      <div class="chart-section1">
        <dv-border-box-12>
          <ScreenTopLeft1></ScreenTopLeft1>
        </dv-border-box-12>
        <dv-border-box-12>
          <ScreenTopLeft2></ScreenTopLeft2>
        </dv-border-box-12>
        <dv-border-box-8 :dur="10">
          <ScreenTopCenter></ScreenTopCenter>
        </dv-border-box-8>
        <dv-border-box-12>
          <ScreenTopRight1></ScreenTopRight1>
        </dv-border-box-12>
        <dv-border-box-13>
          <ScreenTopRight2></ScreenTopRight2>
        </dv-border-box-13>
      </div>
      <div class="chart-section2">
        <dv-border-box-13>
          <ScreenBottomLeft></ScreenBottomLeft>
        </dv-border-box-13>
        <dv-border-box-12>
          <ScreenBottomRight></ScreenBottomRight>
        </dv-border-box-12>
      </div>
      <div class="footer-section">
        <ScreenFooter></ScreenFooter>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useWindowResize from "@/hooks/useWindowResize";
import { onMounted, ref } from "vue";
import ScreenHeader from "./header/index.vue";
import ScreenFooter from "./footer/index.vue";
import ScreenTopLeft1 from "./top-left1/index.vue";
import ScreenTopLeft2 from "./top-left2/index.vue";
import ScreenTopCenter from "./top-center/index.vue";
import ScreenTopRight1 from "./top-right1/index.vue";
import ScreenTopRight2 from "./top-right2/index.vue";
import ScreenBottomLeft from "./bottom-left/index.vue";
import ScreenBottomRight from "./bottom-right/index.vue";

const loading = ref(true);
const { screenRef } = useWindowResize();


onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 300);
});

</script>

<style lang="scss" scoped>
@import "@/assets/scss/common/variables.scss";

.container {
  width: 100vw;
  height: 100vh;
  background-color: $theme-color;
  display: flex;
  justify-content: center;
  align-items: center;

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: $theme-color;
    z-index: 9999;
    background-image: url("@/assets/home_bg.png");
  }

  .content {
    width: 1920px;
    height: 1080px;
    box-sizing: border-box;
    padding: 12px;
    background-image: url("@/assets/home_bg.png");
    transition: all 0.2s ease-in-out;

    .loading-title {
      font-size: $base-font-size;
      color: #fff;
      margin-top: 10px;
    }

    .chart-section1 {
      margin-top: 10px;
      display: grid;
      grid-template-columns: 2fr 3fr 5fr 3fr 2fr;
      grid-column-gap: 5px;
    }

    .chart-section2 {
      margin-top: 5px;
      display: grid;
      grid-template-columns: 5fr 5fr;
      grid-column-gap: 5px;
    }
  }
}
</style>
