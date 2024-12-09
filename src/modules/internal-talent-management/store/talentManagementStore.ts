import { defineStore } from 'pinia';
import { internalEmployees } from '@/mock/user';
import type { InternalEmployee } from '@/types/index';

export const useInternalEmployeeStore = defineStore('internalEmployee', {
  state: () => ({
    employees: internalEmployees as InternalEmployee[],
  }),
  getters: {
    getEmployees: (state) => state.employees,
    findEmployeeById: (state) => (id: number) => state.employees.find(employee => employee.id === id),
  },
});
