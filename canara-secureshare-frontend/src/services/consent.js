import api from './api';

export const consentService = {
  async getConsentRequests() {
    const response = await api.get('/consent/');
    return response.data;
  },

  async getConsentDetails(id) {
    const response = await api.get(`/consent/${id}/`);
    return response.data;
  },

  async approveConsent(id, data) {
    const response = await api.post(`/consent/${id}/approve/`, data);
    return response.data;
  },

  async rejectConsent(id) {
    const response = await api.post(`/consent/${id}/reject/`);
    return response.data;
  },

  async getActiveConsents() {
    const response = await api.get('/consent/active/');
    return response.data;
  },

  async revokeConsent(consentId, reason) {
    const response = await api.post('/consent/revoke/', { 
      consent_id: consentId, 
      reason 
    });
    return response.data;
  },

  async getAuditLogs() {
    const response = await api.get('/audit/');
    return response.data;
  },

  async getDashboardStats() {
    const response = await api.get('/dashboard/');
    return response.data;
  },

  async getUserStats() {
    const response = await api.get('/stats/');
    return response.data;
  }
};