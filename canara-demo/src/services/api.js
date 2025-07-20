const mockData = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  user: {
    username: 'priya.sharma',
    name: 'Priya Sharma',
    email: 'priya@example.com'
  }
};

export const api = {
  login: async (username, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, ...mockData };
  },

  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: 'Registration successful' };
  },

  getConsentRequests: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      requests: [
        {
          id: 'demo-request-123',
          partner: 'Canara HSBC Life Insurance',
          purpose: 'Term life insurance underwriting',
          dataRequested: ['Income Range', 'Employment Status', 'Financial Stability']
        }
      ]
    };
  },

  approveConsent: async (id, conditions) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      token: 'eyJhbGciOiJIUzI1NiIs...',
      consentId: 'c123-456-789'
    };
  },

  getAuditLogs: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      logs: [
        {
          id: 1,
          timestamp: '2025-01-18 10:30:15',
          partner: 'Canara HSBC Life Insurance',
          action: 'consent_granted',
          details: 'User approved consent with conditions',
          ip: '192.168.1.1'
        },
        {
          id: 2,
          timestamp: '2025-01-18 10:31:45',
          partner: 'Canara HSBC Life Insurance',
          action: 'data_accessed',
          details: 'Accessed income_range, employment_status',
          ip: '203.0.113.45'
        }
      ]
    };
  },

  getDataAccessLogs: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      {
        id: 1,
        time: new Date(),
        partner: 'Canara HSBC Life Insurance',
        action: 'Data Accessed',
        status: 'success',
        details: 'Accessed income_range, employment_status'
      }
    ];
  }
};
