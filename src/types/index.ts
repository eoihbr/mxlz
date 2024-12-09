// 外部人才接口
export interface ExternalTalent {
  id: number;
  name: string;
  position: string; // 理想职位
  skills: string[]; // 技能列表
  contactInfo?: string; // 联系方式
  experience?: string; // 工作经验
}

// 公司内部员工接口
export interface InternalEmployee {
  id: number;
  name: string;
  department: string; // 所在部门
  position: string; // 职位
  attendanceRecord: AttendanceRecord[]; // 考勤记录
  projectAssignments: ProjectAssignment[]; // 项目分配
  applicationRequests: ApplicationRequest[]; // 事务申请
}

// 考勤记录接口
export interface AttendanceRecord {
  date: string;
  status: '正常' | '迟到' | '缺勤'; // 考勤状态
}

// 项目分配接口
export interface ProjectAssignment {
  projectId: number;
  projectName: string;
  role: string; // 在项目中的角色
  startDate: string;
  endDate?: string;
  project?: Project; // 项目详细信息（可选）
}

// 事务申请接口
export interface ApplicationRequest {
  requestId: number;
  type: '请假' | '加班' | '转岗'; // 申请类型
  date: string;
  status: '待处理' | '已批准' | '已驳回'; // 申请状态
  details: string; // 申请详细内容
}

// 项目接口
export interface Project {
  id: number;
  projectName: string;
  manager: string;
  status: '进行中' | '已完成' | '已延期' | '已取消'; // 项目状态
  startDate: string;
  endDate?: string;
  description?: string; // 项目描述
}

// 项目表单接口
export interface ProjectForm {
  projectName: string;
  manager: string; // 更改为负责人的字段
  status: '进行中' | '已完成' | '已延期' | '已取消'; // 项目状态
  startDate: string;
  endDate: string;
  description?: string;
}


// 项目搜索表单接口
export interface ProjectSearchForm {
  projectName?: string;
  manager?: string;
  status?: '进行中' | '已完成' | '已延期' | '已取消'; // 项目状态
}

// 员工表单接口
export interface EmployeeForm {
  name: string;
  department: string;
  position: string;
}

// 员工搜索表单接口
export interface EmployeeSearchForm {
  name?: string;
  department?: string;
  position?: string;
}
