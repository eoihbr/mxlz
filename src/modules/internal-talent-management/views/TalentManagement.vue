<template>
  <div class="talent-management-container">
    <!-- 顶部导航组件 -->
    <el-tabs v-model="activeTab" class="tabs-container">
      <el-tab-pane label="人员管理" name="employee-management">
        <div v-if="activeTab === 'employee-management'">
          <h2>公司内部员工管理</h2>
          
          <!-- 员工搜索表单 -->
          <el-form :model="searchForm" class="search-form" label-width="100px">
            <el-form-item label="姓名">
              <el-input v-model="searchForm.name" placeholder="请输入员工姓名"/>
            </el-form-item>
            <el-form-item label="部门">
              <el-select v-model="searchForm.department" placeholder="选择部门" clearable>
                <el-option
                  v-for="dept in departments"
                  :key="dept"
                  :label="dept"
                  :value="dept"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="职位">
              <el-select v-model="searchForm.position" placeholder="选择职位" clearable>
                <el-option
                  v-for="pos in positions"
                  :key="pos"
                  :label="pos"
                  :value="pos"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchEmployees">搜索</el-button>
            </el-form-item>
          </el-form>

          <!-- 员工列表表格 -->
          <el-table :data="filteredEmployees" style="width: 100%">
            <el-table-column prop="id" label="ID" width="80"/>
            <el-table-column prop="name" label="姓名"/>
            <el-table-column prop="department" label="部门"/>
            <el-table-column prop="position" label="职位"/>
            <el-table-column label="考勤记录">
              <template #default="{ row }">
                <el-tag v-for="record in row.attendanceRecord" :key="record.date" :type="getAttendanceTagType(record.status)">
                  {{ formatDate(record.date) }}: {{ record.status }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="{ row }">
                <el-button size="large" @click="viewEmployeeDetails(row)">查看详情</el-button>
                <el-button size="large" type="primary" @click="openProjectAssignmentDialog(row)">分配项目</el-button>
              </template>
            </el-table-column>
          </el-table>
          
          <!-- 员工详情对话框 -->
          <el-dialog v-model="dialogVisible" title="员工详情">
            <div v-if="selectedEmployee">
              <el-form :model="selectedEmployee" label-width="120px">
                <el-form-item label="姓名">
                  <el-input v-model="selectedEmployee.name" disabled/>
                </el-form-item>
                <el-form-item label="部门">
                  <el-input v-model="selectedEmployee.department" disabled/>
                </el-form-item>
                <el-form-item label="职位">
                  <el-input v-model="selectedEmployee.position" disabled/>
                </el-form-item>
                <el-form-item label="考勤记录">
                  <el-tag v-for="record in selectedEmployee.attendanceRecord" :key="record.date" :type="getAttendanceTagType(record.status)">
                    {{ formatDate(record.date) }}: {{ record.status }}
                  </el-tag>
                </el-form-item>
                <el-form-item label="项目分配">
                  <el-tag v-for="assignment in selectedEmployee.projectAssignments" :key="assignment.projectId">
                    {{ assignment.projectName }} ({{ assignment.role }}) - {{ formatDate(assignment.startDate) }} ~ {{ formatDate(assignment.endDate ?? '') || '至今' }}
                  </el-tag>
                </el-form-item>
                <el-form-item label="事务申请">
                  <el-tag v-for="request in selectedEmployee.applicationRequests" :key="request.requestId" :type="getApplicationRequestTagType(request.status)">
                    {{ request.type }}: {{ request.details }} - {{ request.date }}
                  </el-tag>
                </el-form-item>
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">关闭</el-button>
            </span>
          </el-dialog>
          
          <!-- 项目分配对话框 -->
          <el-dialog v-model="projectDialogVisible" title="项目分配">
            <el-form :model="projectForm" label-width="120px">
              <el-form-item label="项目名称">
                <el-input v-model="projectForm.projectName" placeholder="请输入项目名称"/>
              </el-form-item>
              <el-form-item label="角色">
                <el-input v-model="projectForm.role" placeholder="请输入员工在项目中的角色"/>
              </el-form-item>
              <el-form-item label="开始日期">
                <el-date-picker v-model="projectForm.startDate" type="date" placeholder="选择开始日期"/>
              </el-form-item>
              <el-form-item label="结束日期">
                <el-date-picker v-model="projectForm.endDate" type="date" placeholder="选择结束日期"/>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="projectDialogVisible = false">取消</el-button>
              <el-button type="primary" @click="assignProject">分配</el-button>
            </span>
          </el-dialog>
        </div>
      </el-tab-pane>
      <el-tab-pane label="项目流程管理" name="project-management">
        <div v-if="activeTab === 'project-management'">
          <h2>项目流程管理</h2>
          
          <!-- 项目筛选表单 -->
          <el-form :model="projectSearchForm" class="search-form" label-width="100px">
            <el-form-item label="项目名称">
              <el-input v-model="projectSearchForm.projectName" placeholder="请输入项目名称"/>
            </el-form-item>
            <el-form-item label="负责人">
              <el-input v-model="projectSearchForm.manager" placeholder="请输入负责人姓名"/>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="projectSearchForm.status" placeholder="选择状态" clearable>
                <el-option
                  v-for="status in projectStatuses"
                  :key="status"
                  :label="status"
                  :value="status"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchProjects">搜索</el-button>
            </el-form-item>
          </el-form>

          <!-- 项目列表表格 -->
          <el-table :data="filteredProjects" style="width: 100%">
            <el-table-column prop="id" label="ID" width="80"/>
            <el-table-column prop="projectName" label="项目名称"/>
            <el-table-column prop="manager" label="负责人"/>
            <el-table-column label="状态">
              <template #default="{ row }">
                <el-tag :type="getProjectTagType(row.status)">
                  {{ row.status }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="startDate" label="开始日期" width="150"/>
            <el-table-column prop="endDate" label="结束日期" width="150"/>
            <el-table-column label="操作">
              <template #default="{ row }">
                <el-button size="large" @click="viewProjectDetails(row)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          
          <!-- 项目详情对话框 -->
          <el-dialog v-model="projectDetailsVisible" title="项目详情">
            <div v-if="selectedProject">
              <el-form :model="selectedProject" label-width="120px">
                <el-form-item label="项目名称">
                  <el-input v-model="selectedProject.projectName" disabled/>
                </el-form-item>
                <el-form-item label="负责人">
                  <el-input v-model="selectedProject.manager" disabled/>
                </el-form-item>
                <el-form-item label="状态">
                  <el-tag :type="getProjectTagType(selectedProject.status)">
                    {{ selectedProject.status }}
                  </el-tag>
                </el-form-item>
                <el-form-item label="开始日期">
                  <el-input v-model="selectedProject.startDate" disabled/>
                </el-form-item>
                <el-form-item label="结束日期">
                  <el-input v-model="selectedProject.endDate" disabled/>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input type="textarea" v-model="selectedProject.description" disabled/>
                </el-form-item>
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="projectDetailsVisible = false">关闭</el-button>
            </span>
          </el-dialog>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useInternalEmployeeStore } from '@/modules/internal-talent-management/store/talentManagementStore';
import { useProjectStore } from '@/modules/internal-talent-management/store/projectManagementStore';
import type { InternalEmployee, Project } from '@/types/index';

export default defineComponent({
  name: 'TalentManagement',
  setup() {
    const employeeStore = useInternalEmployeeStore();
    const projectStore = useProjectStore();
    
    // 员工管理的状态
    const searchForm = ref({
      name: '',
      department: '',
      position: '',
    });
    const dialogVisible = ref(false);
    const selectedEmployee = ref<InternalEmployee | null>(null);
    const projectDialogVisible = ref(false);
    const projectForm = ref({
      projectName: '',
      role: '',
      startDate: '',
      endDate: ''
    });
    
    // 项目管理的状态
    const activeTab = ref('employee-management');
    const projectSearchForm = ref({
      projectName: '',
      manager: '',
      status: ''
    });
    const projectDetailsVisible = ref(false);
    const selectedProject = ref<Project | null>(null);
    
    // 计算属性
    const departments = ['技术部', '人事部', '市场部', '财务部'];
    const positions = ['软件工程师', '人事专员', '市场推广经理', '财务分析师'];
    const projectStatuses = ['进行中', '已完成', '已延期', '已取消'];
    
    const filteredEmployees = computed(() => {
      return employeeStore.getEmployees.filter(employee => {
        return (!searchForm.value.name || employee.name.includes(searchForm.value.name))
          && (!searchForm.value.department || employee.department === searchForm.value.department)
          && (!searchForm.value.position || employee.position === searchForm.value.position);
      });
    });

    const filteredProjects = computed(() => {
      return projectStore.getProjects.filter(project => {
        return (!projectSearchForm.value.projectName || project.projectName.includes(projectSearchForm.value.projectName))
          && (!projectSearchForm.value.manager || project.manager.includes(projectSearchForm.value.manager))
          && (!projectSearchForm.value.status || project.status === projectSearchForm.value.status);
      });
    });

    const searchEmployees = () => {
      // 过滤逻辑由计算属性自动处理
    };

    const searchProjects = () => {
      // 过滤逻辑由计算属性自动处理
    };

    const viewEmployeeDetails = (employee: InternalEmployee) => {
      selectedEmployee.value = employee;
      dialogVisible.value = true;
    };

    const openProjectAssignmentDialog = (employee: InternalEmployee) => {
      selectedEmployee.value = employee;
      projectDialogVisible.value = true;
    };

    const assignProject = () => {
      if (selectedEmployee.value && projectForm.value.projectName) {
        // 在这里实现将项目分配给选定员工的逻辑
        // 目前仅在控制台中输出
        console.log('Assigning project', projectForm.value, 'to', selectedEmployee.value.name);
        projectDialogVisible.value = false;
      }
    };

    const viewProjectDetails = (project: Project) => {
      selectedProject.value = project;
      projectDetailsVisible.value = true;
    };

    const formatDate = (date: string) => {
      return new Date(date).toLocaleDateString();
    };

    const getAttendanceTagType = (status: string) => {
      switch (status) {
        case '缺勤':
          return 'danger';
        case '迟到':
          return 'warning';
        case '正常':
          return 'success';
        default:
          return 'default';
      }
    };

    const getApplicationRequestTagType = (status: string) => {
      switch (status) {
        case '待审批':
          return 'warning';
        case '已批准':
          return 'success';
        case '已拒绝':
          return 'danger';
        default:
          return 'default';
      }
    };

    const getProjectTagType = (status: string) => {
      switch (status) {
        case '已取消':
          return 'info';
        case '已完成':
          return 'success';
        case '已延期':
          return 'warning';
        case '进行中':
          return 'danger';
        default:
          return 'default';
      }
    };

    return {
      activeTab,
      searchForm,
      dialogVisible,
      selectedEmployee,
      projectDialogVisible,
      projectForm,
      projectSearchForm,
      projectDetailsVisible,
      selectedProject,
      departments,
      positions,
      projectStatuses,
      filteredEmployees,
      filteredProjects,
      searchEmployees,
      searchProjects,
      viewEmployeeDetails,
      openProjectAssignmentDialog,
      assignProject,
      viewProjectDetails,
      formatDate,
      getAttendanceTagType,
      getApplicationRequestTagType,
      getProjectTagType,
    };
  },
});
</script>

<style scoped>
.talent-management-container {
  padding: 20px;
}

.tabs-container {
  margin-bottom: 20px;
}

.search-form {
  margin-bottom: 20px;
}

.el-table {
  margin-top: 20px;
}
</style>
