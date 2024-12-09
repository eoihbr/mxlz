import { defineStore } from 'pinia';
import { externalTalents } from '@/mock/user';
import type { ExternalTalent } from '@/types/index';

export const useExternalTalentStore = defineStore('ExternalTalent', {
  state: () => ({
    Talents: externalTalents as ExternalTalent[],
  }),
  getters: {
    getEmployees: (state) => state.Talents,
    findEmployeeById: (state) => (id: number) => state.Talents.find(Talents => Talents.id === id),
  },
});
