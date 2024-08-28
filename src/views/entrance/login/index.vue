<script setup lang="ts">
  import { LocationQueryValue } from "vue-router";
  import { useUserStore } from "/@/store/modules/user";
  import useCode from "/@/hooks/core/useCode";
  import { getSmsCode } from "/@/api/system/user";
  const userStore = useUserStore();
  const route = useRoute();

  const formState = ref({
    userPhone: "13800138000",
    smsCode: "",
  });

  const { codeText, getCode } = useCode<any>({
    request: getSmsCode,
    options: { phone: "phone" },
  });
  function getCodeSms() {
    getCode({ scene: "login", ...formState.value }, "userPhone");
  }

  async function handleLogin() {
    try {
      await userStore.login(formState.value, {
        redirect: route?.query?.redirect as LocationQueryValue,
        // mode: 'none', //不要默认的错误提示
      });
    } catch (error) {
      alert(error);
    }
  }
</script>

<template>
  <div class="page">
    <van-form @submit="handleLogin">
      <van-cell-group inset>
        <van-field
          v-model="formState.userPhone"
          name="userPhone"
          label=""
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请输入手机号' }]"
        />
        <van-field
          v-model="formState.smsCode"
          type="digit"
          name="smsCode"
          label=""
          :maxlength="6"
          placeholder="请输入短信验证码"
          :rules="[{ required: true, message: '请输入短信验证码' }]"
        >
          <template #button>
            <van-button size="small" type="primary" class="sms_code" @click="getCodeSms">{{ codeText }}</van-button>
          </template>
        </van-field>
        <div></div>
      </van-cell-group>
      <div class="submit">
        <van-button round block type="primary" native-type="submit"> 登录 </van-button>
      </div>
    </van-form>
  </div>
</template>

<style lang="less" scoped>
  .page {
    padding-top: 360px;
    background: linear-gradient(180deg, rgb(227, 252, 242) 0%, #ffffff 510px);
    :deep(.van-cell-group) {
      background-color: transparent;
      .van-cell {
        background-color: transparent;
      }
      .sms_code {
        position: relative;
        background-color: transparent;
        color: rgb(22, 134, 93);
        border: none;
        /* 移除按压效果 */
        -webkit-tap-highlight-color: transparent; /* Safari/Chrome */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+ */
        user-select: none; /* Standard syntax */
        &::after {
          content: "";
          position: absolute;
          top: 30%;
          left: 0;
          width: 2px;
          height: 24px;
          background: #e6e6e6;
        }
      }
    }
    :deep(.submit) {
      margin: 60px 62px 0;
      .van-button--primary {
        width: 624px;
        height: 110px;
        background: linear-gradient(270deg, rgb(33, 166, 117) 0%, rgb(22, 134, 93) 100%);
        border-radius: 60px;
        border: none;
        font-weight: 500;
        font-size: 32px;
        color: #ffffff;
        line-height: 32px;
        letter-spacing: 10px;
        text-align: left;
        font-style: normal;
      }
    }
  }
</style>
