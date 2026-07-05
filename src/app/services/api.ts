import { IS_MOCK_MODE, apiClient } from './apiClient';
import {
  mockStore,
  Alert,
  ServiceUser,
  StaffMember,
  ClockEvent,
  LeaveRequest,
  HistoryRecord,
  LeaveStatus,
  MedicationRecord
} from '../mockData/mockStore';

// Helper to simulate network latency in mock mode
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // --- Dashboard Services ---
  getDashboardAlerts: async (): Promise<Alert[]> => {
    if (IS_MOCK_MODE) {
      await delay();
      return mockStore.getAlerts();
    }
    return apiClient<Alert[]>('/dashboard/alerts');
  },

  // --- Service Users Services ---
  getServiceUsers: async (): Promise<ServiceUser[]> => {
    if (IS_MOCK_MODE) {
      await delay();
      return mockStore.getServiceUsers();
    }
    return apiClient<ServiceUser[]>('/service-users');
  },

  getServiceUserById: async (id: number): Promise<ServiceUser | undefined> => {
    if (IS_MOCK_MODE) {
      await delay();
      return mockStore.getServiceUserById(id);
    }
    return apiClient<ServiceUser>(`/service-users/${id}`);
  },

  addServiceUser: async (user: Omit<ServiceUser, 'id'>): Promise<ServiceUser> => {
    if (IS_MOCK_MODE) {
      await delay();
      return mockStore.addServiceUser(user);
    }
    return apiClient<ServiceUser>('/service-users', {
      method: 'POST',
      body: JSON.stringify(user)
    });
  },

  // --- Staff Management Services ---
  getStaffMembers: async (): Promise<StaffMember[]> => {
    if (IS_MOCK_MODE) {
      await delay();
      return mockStore.getStaffMembers();
    }
    return apiClient<StaffMember[]>('/staff');
  },

  addStaffMember: async (staff: Omit<StaffMember, 'id'>): Promise<StaffMember> => {
    if (IS_MOCK_MODE) {
      await delay();
      return mockStore.addStaffMember(staff);
    }
    return apiClient<StaffMember>('/staff', {
      method: 'POST',
      body: JSON.stringify(staff)
    });
  },

  getClockEvents: async (): Promise<ClockEvent[]> => {
    if (IS_MOCK_MODE) {
      await delay();
      return mockStore.getClockEvents();
    }
    return apiClient<ClockEvent[]>('/attendance/clock-events');
  },

  clockOutStaff: async (staffId: number, note?: string): Promise<ClockEvent> => {
    if (IS_MOCK_MODE) {
      await delay();
      const res = mockStore.clockOutStaff(staffId, note);
      if (!res) throw new Error('Staff member clock event not found');
      return res;
    }
    return apiClient<ClockEvent>(`/attendance/clock-out/${staffId}`, {
      method: 'POST',
      body: JSON.stringify({ note })
    });
  },

  clockInStaff: async (staffId: number): Promise<ClockEvent> => {
    if (IS_MOCK_MODE) {
      await delay();
      const res = mockStore.clockInStaff(staffId);
      if (!res) throw new Error('Staff member clock event not found');
      return res;
    }
    return apiClient<ClockEvent>(`/attendance/clock-in/${staffId}`, {
      method: 'POST'
    });
  },

  getLeaveRequests: async (): Promise<LeaveRequest[]> => {
    if (IS_MOCK_MODE) {
      await delay();
      return mockStore.getLeaveRequests();
    }
    return apiClient<LeaveRequest[]>('/leave-requests');
  },

  updateLeaveRequestStatus: async (
    id: number,
    status: LeaveStatus,
    note?: string
  ): Promise<LeaveRequest> => {
    if (IS_MOCK_MODE) {
      await delay();
      const res = mockStore.updateLeaveRequestStatus(id, status, note);
      if (!res) throw new Error('Leave request not found');
      return res;
    }
    return apiClient<LeaveRequest>(`/leave-requests/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, note })
    });
  },

  logLeaveRequest: async (
    request: Omit<LeaveRequest, 'id' | 'submittedOn'>
  ): Promise<LeaveRequest> => {
    if (IS_MOCK_MODE) {
      await delay();
      return mockStore.logLeaveRequest(request);
    }
    return apiClient<LeaveRequest>('/leave-requests', {
      method: 'POST',
      body: JSON.stringify(request)
    });
  },

  getAttendanceHistory: async (): Promise<HistoryRecord[]> => {
    if (IS_MOCK_MODE) {
      await delay();
      return mockStore.getAttendanceHistory();
    }
    return apiClient<HistoryRecord[]>('/attendance/history');
  },

  getMedications: async (): Promise<MedicationRecord[]> => {
    if (IS_MOCK_MODE) {
      await delay();
      return mockStore.getMedications();
    }
    return apiClient<MedicationRecord[]>('/medications');
  },

  addMedications: async (newMeds: Omit<MedicationRecord, 'id' | 'status' | 'administeredBy' | 'administeredAt' | 'notes'>[]): Promise<MedicationRecord[]> => {
    if (IS_MOCK_MODE) {
      await delay();
      return mockStore.addMedications(newMeds);
    }
    return apiClient<MedicationRecord[]>('/medications', {
      method: 'POST',
      body: JSON.stringify({ medications: newMeds })
    });
  },

  administerMedication: async (id: number, administeredBy: string, notes?: string): Promise<MedicationRecord> => {
    if (IS_MOCK_MODE) {
      await delay();
      const res = mockStore.administerMedication(id, administeredBy, notes);
      if (!res) throw new Error('Medication record not found');
      return res;
    }
    return apiClient<MedicationRecord>(`/medications/${id}/administer`, {
      method: 'POST',
      body: JSON.stringify({ administeredBy, notes })
    });
  },

  updateMedicationStatus: async (id: number, status: string, notes?: string): Promise<MedicationRecord> => {
    if (IS_MOCK_MODE) {
      await delay();
      const res = mockStore.updateMedicationStatus(id, status, notes);
      if (!res) throw new Error('Medication record not found');
      return res;
    }
    return apiClient<MedicationRecord>(`/medications/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, notes })
    });
  },

  updateMedicationSchedule: async (id: number, schedule: Partial<MedicationRecord>): Promise<MedicationRecord> => {
    if (IS_MOCK_MODE) {
      await delay();
      const res = mockStore.updateMedicationSchedule(id, schedule);
      if (!res) throw new Error('Medication record not found');
      return res;
    }
    return apiClient<MedicationRecord>(`/medications/${id}/schedule`, {
      method: 'PUT',
      body: JSON.stringify(schedule)
    });
  }
};
