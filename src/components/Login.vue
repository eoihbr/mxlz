<template>
  <div class="login-container">
    <div class="form-container">
      <h2>微小企业人员管理系统</h2>
      <div class="form-item">
        <label for="username">账号:</label>
        <el-input v-model="inputusername" id="username" placeholder="请输入账号"/>
      </div>
      <div class="form-item">
        <label for="password">密码:</label>
        <el-input v-model="inputpassword" id="password" type="password" placeholder="请输入密码"/>
      </div>
      <div class="form-item">
        <el-radio-group v-model="radio1">
          <el-radio value="1" size="large">HR</el-radio>
          <el-radio value="2" size="large">管理员</el-radio>
        </el-radio-group>
      </div>
      <el-button class="mb-4" type="primary" @click="login">登陆</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/useUserStore';
import { users } from '@/mock/user'; // 引入mock数据

const inputusername = ref('');
const inputpassword = ref('');
const radio1 = ref('1'); // 默认选择HR
const router = useRouter();
const userStore = useUserStore();

const login = async () => {
  if (!inputusername.value || !inputpassword.value) {
    ElMessage.error('请输入账号和密码');
    return;
  }

  // 使用 mock 数据进行验证
  const user = users.find(
    (u) => u.username === inputusername.value && u.password === inputpassword.value
  );

  if (user) {
    // 检查选中的角色是否与用户的实际角色匹配
    if ((radio1.value === '1' && user.role !== 'HR') || (radio1.value === '2' && user.role !== 'Admin')) {
      ElMessage.error('角色选择与账号信息不符');
      return;
    }

    // 更新用户的登录状态和角色信息
    userStore.login(user);

    // 根据角色导航到不同的页面
    if (user.role === 'HR') {
      router.push('/talent-search');
    } else if (user.role === 'Admin') {
      router.push('/talent-management');
    }
  } else {
    ElMessage.error('用户名或密码错误');
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png'); /* 使用你的图片 URL */
  background-size: cover; /* 覆盖整个背景 */
  background-position: center; /* 居中对齐背景图片 */
  background-repeat: no-repeat; /* 不重复背景图片 */
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中 */
  justify-content: center; /* 垂直居中 */
  background-color: rgba(255, 255, 255, 0.8); /* 设置背景颜色并稍微透明 */
  padding: 20px;
  border-radius: 10px;
  width: 300px; /* 固定宽度 */
  text-align: center; /* 文本居中 */
}

.form-item {
  display: flex;
  align-items: center; /* 垂直对齐 */
  margin-bottom: 24px; /* 间距 */
}

.form-item label {
  width: 80px; /* 标签宽度 */
  text-align: right; /* 标签文字右对齐 */
  margin-right: 10px; /* 标签和输入框间距 */
}
</style>
