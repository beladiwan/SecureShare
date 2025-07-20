export const API_BASE_URL = 'http://localhost:8000/api/v1';

export const CONSENT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  REVOKED: 'revoked',
  EXPIRED: 'expired'
};

export const DATA_CATEGORIES = {
  income_range: {
    name: 'Income Range',
    icon: '💰',
    description: 'Your income bracket information'
  },
  employment_status: {
    name: 'Employment Status',
    icon: '💼',
    description: 'Your employment details'
  },
  financial_stability: {
    name: 'Financial Stability',
    icon: '📊',
    description: 'Your financial health score'
  },
  transaction_history: {
    name: 'Transaction History',
    icon: '📝',
    description: 'Your banking transactions'
  }
};