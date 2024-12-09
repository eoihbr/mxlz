<template>
  <div class="login-container">
    <div class="talent-search-container">
      <h2>应聘人员搜索</h2>
      <el-form :model="searchForm" class="search-form" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="searchForm.name" placeholder="请输入应聘人员姓名"/>
        </el-form-item>
        <el-form-item label="理想岗位">
          <el-select v-model="searchForm.idealPosition" placeholder="选择理想岗位" clearable>
            <el-option
              v-for="position in idealPositions"
              :key="position"
              :label="position"
              :value="position"
            />
            <!-- 添加一个空值选项以允许清空选择 -->
          <el-option :label="'空'" :value="null" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="success" @click="recommend">应聘人员推荐</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="talents" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80"/>
        <el-table-column prop="name" label="姓名"/>
        <el-table-column prop="position" label="理想职位"/>
        <el-table-column label="技能">
          <template v-slot="scope">
            <div>
              <el-tag
                v-for="skill in scope.row.skills"
                :key="skill"
                style="margin-right: 5px;"
              >
                {{ skill }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="contactInfo" label="联系方式"/>
        <el-table-column prop="experience" label="工作经验"/>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { externalTalents } from '@/mock/user'; // 引入 HR 人才数据
import {useExternalTalentStore} from '@/modules/cross-company-talent/store/searchManagement'

// 定义搜索表单数据和人才列表
const searchForm = ref({
  name: '',
  idealPosition: null // 初始值设置为 null
});
const talents = ref<any[]>([]);

// 固定的理想岗位列表
const idealPositions = ['开发工程师', '测试工程师', '产品经理', 'UI设计师', '前端开发工程师', '数据分析师'];

// 初始化时加载所有外部人才数据
onMounted(() => {
  talents.value = externalTalents;
});

// 搜索函数
const search = () => {
  try {
    talents.value = externalTalents.filter(
      (talent) =>
        (!searchForm.value.name || talent.name.includes(searchForm.value.name)) &&
        (searchForm.value.idealPosition === null || talent.position === searchForm.value.idealPosition)
    );
  } catch (error) {
    ElMessage.error('搜索失败，请重试');
  }
};

// 推荐函数，按工作经验降序排序
const recommend = () => {
  try {
    talents.value = [...externalTalents].sort((a, b) => {
      const expA = parseInt(a.experience?.replace(/\D/g, '') || '0', 10);
      const expB = parseInt(b.experience?.replace(/\D/g, '') || '0', 10);
      return expB - expA; // 降序排序
    });
  } catch (error) {
    ElMessage.error('推荐失败，请重试');
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: flex-start; /* 顶部对齐 */
  height: 100vh; /* 占满整个视口高度 */
  background-image: url('https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png'); /* 使用你的图片 URL */
  background-size: cover; /* 背景图片覆盖 */
  background-position: center; /* 背景图片居中对齐 */
  background-repeat: no-repeat; /* 背景图片不重复 */
}

.talent-search-container {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8); /* 背景颜色与透明度 */
  border-radius: 10px;
  width: 80%; /* 适当调整宽度 */
  margin-top: 20px; /* 上边距调整 */
}

.search-form {
  margin-bottom: 20px;
}
</style>
