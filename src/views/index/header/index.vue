<template>
    <div class="screen-header">
        <div class="screen-header-top-section">
            <dv-decoration-10 :color="['#45a1f1', '#000000']" class="dv-dec-10" :dur="10"/>
            <div class="screen-header-title-section">
                <dv-decoration-8 :color="['#45a1f1', '#000000']" class="dv-dec-8" />
                <div class="title-section">
                    <p class="header-title">大数据测试可视化平台</p>
                </div>
                <dv-decoration-8 :color="['#45a1f1', '#000000']" class="dv-dec-8" :reverse="true" />
            </div>
            <dv-decoration-10 :color="['#45a1f1', '#000000']" class="dv-dec-10 dev-reverse" :reverse="true" :dur="10"/>
        </div>
        <div class="screen-header-bottom-section">
            <div class="sub-section">
                <div class="sub-item flex-l sub-item-common-r">
                    <span @click="downloadHandler('github')" class="sub-title special">github地址</span>
                </div>
                <div class="sub-item flex-c react-l">
                    <span @click="downloadHandler('gitee')" class="sub-title special">gitee地址</span>
                </div>
            </div>
            <div class="sub-dec-section">
                <dv-decoration-6 class="dv-dec-6" :reverse="true" :color="['#50e3c2', '#67a1e5']" />
            </div>
            <div class="sub-section">
                <div class="sub-item flex-c react-r item-special">
                    <span class="sub-title">版本号：1.0.001</span>
                </div>
                <div class="sub-item flex-r sub-item-common-l">
                    <span class="sub-title" ref="timeRef"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useTime from '@/hooks/useTime';
const { timeRef,init } = useTime();

onMounted(() => {
    init();
})


const downloadHandler = (type: string) => {
    switch (type) {
        case 'github':
            window.open('https://github.com/huadw/vue3-big-screen');
            break;
        case 'gitee':
            window.open('https://gitee.com/huadaowei/vue3-big-screen');
            break;
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common/variables.scss';

.screen-header {

    .screen-header-top-section {
        display: flex;

        .screen-header-title-section {
            width: 50%;
            display: flex;
            padding-top: 10px;

            .dv-dec-8 {
                width: 30%;
                height: 20px;
            }

            .title-section {
                width: 40%;
                text-align: center;

                .header-title {
                    background-color: transparent;
                    font-size: $lg-font-size;
                    font-weight: 550;
                    background-image: linear-gradient(#fff, #45a1f1);
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }
        }

        .dv-dec-10 {
            width: 25%;
            height: $dv-dec-height;
        }
    }

    .screen-header-bottom-section {
        display: flex;

        .sub-section {
            width: 40%;
            display: flex;
            justify-content: space-between;
            height: 50px;

            .sub-item {
                width: calc(50% - 20px);
                // background-color: #0f1325;
                padding: 0 20px;

                .sub-title {
                    color: #fff;
                    font-size: $base-font-size;
                }

                .special {
                    cursor: pointer;
                    color: #37a2da;
                    font-weight: 550;
                }
            }

            .sub-item-common-l {
                background-color: $theme-sub-color;
                position: relative;

                &::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 0;
                    // border: transparent transparent $theme-sub-color $theme-sub-color;
                    border-top: 25px solid transparent;
                    border-bottom: 25px solid $theme-sub-color;
                    border-left: 25px solid transparent;
                    border-right: 25px solid $theme-sub-color;
                    position: absolute;
                    top: 0;
                    left: -50px;
                }
            }

            .sub-item-common-r {
                background-color: $theme-sub-color;
                position: relative;

                &::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 0;
                    // border: transparent transparent $theme-sub-color $theme-sub-color;
                    border-top: 25px solid transparent;
                    border-bottom: 25px solid $theme-sub-color;
                    border-left: 25px solid $theme-sub-color;
                    border-right: 25px solid transparent;
                    position: absolute;
                    top: 0;
                    left: 100%;
                }
            }
        }

        .sub-dec-section {
            width: 20%;
            padding: 0 40px;

            .dv-dec-6 {
                height: 20px;
                margin-top: 15px;
            }
        }
    }
}
</style>