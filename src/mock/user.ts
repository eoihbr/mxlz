import type { ExternalTalent, InternalEmployee ,Project} from '@/types/index';

export const users=[
  {
    "id": 1,
    "username": "hr",
    "password": "123",
    "role": "HR"
  },
  {
    "id": 2,
    "username": "admin",
    "password": "321",
    "role": "Admin"
  }
]


// 示例外部人才数据
export const externalTalents: ExternalTalent[] = [
  {
    id: 1,
    name: '李明',
    position: '前端开发工程师',
    skills: ['JavaScript', 'Vue.js', 'TypeScript'],
    contactInfo: 'li.ming@example.com',
    experience: '5年',
  },
  {
    id: 2,
    name: '张伟',
    position: '产品经理',
    skills: ['产品规划', '市场分析'],
    contactInfo: 'zhang.wei@example.com',
    experience: '7年',
  },
  {
    id: 3,
    name: '王芳',
    position: 'UI设计师',
    skills: ['Sketch', 'Figma', 'Photoshop'],
    contactInfo: 'wang.fang@example.com',
    experience: '4年',
  },
  {
    id: 4,
    name: '张三',
    position: '开发工程师',
    skills: ['JavaScript', 'Vue.js', 'Node.js'],
    contactInfo: 'zhangsan@example.com',
    experience: '5年',
  },
  {
    id: 5,
    name: '李四',
    position: '产品经理',
    skills: ['需求分析', '产品设计', '项目管理'],
    contactInfo: 'lisi@example.com',
    experience: '8年',
  },
  {
    id: 6,
    name: '王五',
    position: 'UI设计师',
    skills: ['Photoshop', 'Sketch', 'Figma'],
    contactInfo: 'wangwu@example.com',
    experience: '3年',
  },
  {
    id: 7,
    name: '陈晓',
    position: '数据分析师',
    skills: ['Python', 'SQL', '数据可视化'],
    contactInfo: 'chen.xiao@example.com',
    experience: '6年',
  },
  {
    id: 8,
    name: '杨丽',
    position: '市场分析师',
    skills: ['市场调研', '数据分析', 'Excel'],
    contactInfo: 'yang.li@example.com',
    experience: '4年',
  },
  // 添加更多外部人才数据
];

// 示例公司内部员工数据
export const internalEmployees: InternalEmployee[] = [
  {
    id: 1,
    name: '陈晨',
    department: '技术部',
    position: '软件工程师',
    attendanceRecord: [
      { date: '2024-08-01', status: '正常' },
      { date: '2024-08-02', status: '迟到' },
      { date: '2024-08-03', status: '缺勤' },
    ],
    projectAssignments: [
      {
        projectId: 101,
        projectName: '项目A',
        role: '开发人员',
        startDate: '2024-01-15',
        endDate: '2024-06-30',
      },
      {
        projectId: 102,
        projectName: '项目B',
        role: '技术负责人',
        startDate: '2024-07-01',
      },
    ],
    applicationRequests: [
      {
        requestId: 1,
        type: '请假',
        date: '2024-07-15',
        status: '已批准',
        details: '因病请假一天',
      },
      {
        requestId: 2,
        type: '加班',
        date: '2024-08-01',
        status: '待处理',
        details: '加班申请',
      },
    ],
  },
  {
    id: 2,
    name: '刘婷',
    department: '人事部',
    position: '人事专员',
    attendanceRecord: [
      { date: '2024-08-01', status: '正常' },
      { date: '2024-08-02', status: '正常' },
      { date: '2024-08-03', status: '缺勤' },
    ],
    projectAssignments: [
      {
        projectId: 201,
        projectName: '招聘系统升级',
        role: '项目经理',
        startDate: '2024-04-01',
        endDate: '2024-08-01',
      },
    ],
    applicationRequests: [
      {
        requestId: 3,
        type: '转岗',
        date: '2024-08-05',
        status: '已驳回',
        details: '转岗申请未批准',
      },
    ],
  },
  {
    id: 3,
    name: '赵强',
    department: '市场部',
    position: '市场推广经理',
    attendanceRecord: [
      { date: '2024-08-01', status: '正常' },
      { date: '2024-08-02', status: '正常' },
      { date: '2024-08-03', status: '正常' },
    ],
    projectAssignments: [
      {
        projectId: 301,
        projectName: '产品发布会',
        role: '组织者',
        startDate: '2024-05-01',
        endDate: '2024-08-01',
      },
    ],
    applicationRequests: [
      {
        requestId: 4,
        type: '请假',
        date: '2024-08-10',
        status: '待处理',
        details: '休假申请',
      },
    ],
  },
  {
    id: 4,
    name: '孙敏',
    department: '财务部',
    position: '财务分析师',
    attendanceRecord: [
      { date: '2024-08-01', status: '正常' },
      { date: '2024-08-02', status: '正常' },
      { date: '2024-08-03', status: '正常' },
    ],
    projectAssignments: [
      {
        projectId: 401,
        projectName: '年度财务报告',
        role: '负责人',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
      },
    ],
    applicationRequests: [
      {
        requestId: 5,
        type: '请假',
        date: '2024-08-15',
        status: '待处理',
        details: '因私事请假两天',
      },
    ],
  },
  // 添加更多公司内部员工数据
];

export const projects: Project[] = [
  {
    id: 1,
    projectName: '市场推广计划',
    manager: '张伟',
    status: '进行中',
    startDate: '2024-06-01',
    endDate: '2024-12-31',
    description: '计划通过多种渠道提升品牌知名度和市场份额。'
  },
  {
    id: 2,
    projectName: '新产品研发',
    manager: '李娜',
    status: '已完成',
    startDate: '2023-01-15',
    endDate: '2023-12-30',
    description: '开发新款智能手表，包括硬件设计和软件开发。'
  },
  {
    id: 3,
    projectName: '员工培训与发展',
    manager: '王刚',
    status: '已延期',
    startDate: '2024-04-01',
    endDate: '2024-10-01',
    description: '为员工提供专业技能培训，提高整体业务水平。'
  },
  {
    id: 4,
    projectName: '公司内部系统升级',
    manager: '赵敏',
    status: '已取消',
    startDate: '2024-02-01',
    endDate: '2024-06-30',
    description: '升级公司内部管理系统，以支持新的业务需求。'
  }
];