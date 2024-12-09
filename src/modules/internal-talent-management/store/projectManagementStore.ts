import { defineStore } from 'pinia';
import { projects } from '@/mock/user';
import type { Project } from '@/types/index';

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: projects as Project[],
  }),
  getters: {
    getProjects: (state) => state.projects,
    findProjectById: (state) => (id: number) => state.projects.find(project => project.id === id),
  },
});
