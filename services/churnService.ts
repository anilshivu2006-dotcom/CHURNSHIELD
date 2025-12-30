import { ChurnPrediction, Customer, DashboardMetrics } from '../types';

// Subset of the CSV data provided
const RAW_CSV_DATA = [
  { id: 'C00001', tenure: 20, monthly: 107, contract: 'Yearly', issue: false },
  { id: 'C00002', tenure: 30, monthly: 25, contract: 'Yearly', issue: false },
  { id: 'C00003', tenure: 7, monthly: 105, contract: 'Monthly', issue: false },
  { id: 'C00004', tenure: 1, monthly: 44, contract: 'Monthly', issue: true },
  { id: 'C00005', tenure: 56, monthly: 20, contract: 'Monthly', issue: false },
  { id: 'C00006', tenure: 49, monthly: 109, contract: 'Yearly', issue: false },
  { id: 'C00007', tenure: 38, monthly: 48, contract: 'Yearly', issue: true },
  { id: 'C00008', tenure: 58, monthly: 83, contract: 'Yearly', issue: true },
  { id: 'C00009', tenure: 21, monthly: 55, contract: 'Yearly', issue: false },
  { id: 'C00010', tenure: 45, monthly: 23, contract: 'Monthly', issue: true },
  { id: 'C00011', tenure: 57, monthly: 22, contract: 'Yearly', issue: false },
  { id: 'C00012', tenure: 47, monthly: 56, contract: 'Yearly', issue: true },
  { id: 'C00013', tenure: 37, monthly: 64, contract: 'Yearly', issue: true },
  { id: 'C00014', tenure: 45, monthly: 42, contract: 'Yearly', issue: true },
  { id: 'C00015', tenure: 38, monthly: 57, contract: 'Yearly', issue: false },
  { id: 'C00016', tenure: 36, monthly: 44, contract: 'Monthly', issue: false },
  { id: 'C00017', tenure: 22, monthly: 102, contract: 'Monthly', issue: false },
  { id: 'C00018', tenure: 47, monthly: 114, contract: 'Yearly', issue: false },
  { id: 'C00019', tenure: 43, monthly: 54, contract: 'Yearly', issue: false },
  { id: 'C00020', tenure: 11, monthly: 97, contract: 'Monthly', issue: true },
  { id: 'C00021', tenure: 49, monthly: 81, contract: 'Monthly', issue: false },
  { id: 'C00022', tenure: 60, monthly: 62, contract: 'Yearly', issue: false },
  { id: 'C00023', tenure: 4, monthly: 91, contract: 'Monthly', issue: false },
  { id: 'C00024', tenure: 19, monthly: 66, contract: 'Monthly', issue: false },
  { id: 'C00025', tenure: 19, monthly: 100, contract: 'Monthly', issue: false },
  { id: 'C00026', tenure: 53, monthly: 63, contract: 'Monthly', issue: false },
  { id: 'C00027', tenure: 21, monthly: 66, contract: 'Yearly', issue: true },
  { id: 'C00028', tenure: 60, monthly: 100, contract: 'Monthly', issue: false },
  { id: 'C00029', tenure: 43, monthly: 85, contract: 'Monthly', issue: false },
  { id: 'C00030', tenure: 6, monthly: 36, contract: 'Yearly', issue: false },
  { id: 'C00031', tenure: 48, monthly: 23, contract: 'Yearly', issue: false },
  { id: 'C00032', tenure: 9, monthly: 63, contract: 'Yearly', issue: true },
  { id: 'C00033', tenure: 27, monthly: 20, contract: 'Yearly', issue: true },
  { id: 'C00034', tenure: 6, monthly: 61, contract: 'Yearly', issue: false },
  { id: 'C00035', tenure: 36, monthly: 106, contract: 'Yearly', issue: false },
  { id: 'C00036', tenure: 14, monthly: 95, contract: 'Monthly', issue: true },
  { id: 'C00037', tenure: 50, monthly: 21, contract: 'Yearly', issue: true },
  { id: 'C00038', tenure: 37, monthly: 32, contract: 'Yearly', issue: false },
  { id: 'C00039', tenure: 5, monthly: 29, contract: 'Monthly', issue: true },
  { id: 'C00040', tenure: 47, monthly: 84, contract: 'Yearly', issue: true },
  { id: 'C00041', tenure: 22, monthly: 97, contract: 'Monthly', issue: false },
  { id: 'C00042', tenure: 52, monthly: 97, contract: 'Monthly', issue: true },
  { id: 'C00043', tenure: 49, monthly: 48, contract: 'Yearly', issue: false },
  { id: 'C00044', tenure: 51, monthly: 46, contract: 'Yearly', issue: true },
  { id: 'C00045', tenure: 50, monthly: 69, contract: 'Monthly', issue: true },
  { id: 'C00046', tenure: 20, monthly: 66, contract: 'Yearly', issue: true },
  { id: 'C00047', tenure: 32, monthly: 118, contract: 'Yearly', issue: false },
  { id: 'C00048', tenure: 29, monthly: 39, contract: 'Monthly', issue: true },
  { id: 'C00049', tenure: 55, monthly: 58, contract: 'Yearly', issue: true },
  { id: 'C00050', tenure: 24, monthly: 92, contract: 'Yearly', issue: true }
];

const NAMES = [
  'Alex Dran', 'Sarah Connor', 'John Snow', 'Diana Prince', 'Bruce Wayne', 
  'Clark Kent', 'Tony Stark', 'Steve Rogers', 'Natasha Romanoff', 'Clint Barton', 
  'Wanda Maximoff', 'Vision', 'Sam Wilson', 'Bucky Barnes', 'Peter Parker', 
  'Strange', 'TChalla', 'Scott Lang', 'Hope Pym', 'Carol Danvers',
  'Nick Fury', 'Maria Hill', 'Phil Coulson', 'Peggy Carter', 'Howard Stark',
  'Thor Odinson', 'Loki Laufeyson', 'Jane Foster', 'Odin Borson', 'Frigga',
  'Heimdall', 'Sif', 'Hogun', 'Fandral', 'Volstagg',
  'Bruce Banner', 'Betty Ross', 'Emil Blonsky', 'Thaddeus Ross', 'Jennifer Walters',
  'Matt Murdock', 'Foggy Nelson', 'Karen Page', 'Frank Castle', 'Jessica Jones',
  'Luke Cage', 'Danny Rand', 'Colleen Wing', 'Misty Knight', 'Claire Temple'
];

// Transform raw data to rich Customer objects
const MOCK_CUSTOMERS: Customer[] = RAW_CSV_DATA.map((row, index) => ({
  id: row.id,
  name: NAMES[index % NAMES.length],
  email: `user${row.id}@example.com`,
  plan: row.monthly > 90 ? 'Premium' : row.monthly > 50 ? 'Standard' : 'Basic',
  monthlyBill: row.monthly,
  tenureMonths: row.tenure,
  contract: row.contract,
  paymentIssue: row.issue,
  totalSpend: row.monthly * row.tenure,
  avatarUrl: `https://i.pravatar.cc/150?u=${row.id}`
}));

export const getAllCustomers = async (): Promise<Customer[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_CUSTOMERS;
}

export const fetchDashboardMetrics = async (): Promise<DashboardMetrics> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    currentChurnRate: 14.2,
    revenueAtRisk: 42500,
    activeSubscribers: 40120,
    churnTrend: [
      { month: 'Jan', rate: 12 },
      { month: 'Feb', rate: 13.5 },
      { month: 'Mar', rate: 11 },
      { month: 'Apr', rate: 14 },
      { month: 'May', rate: 14.2 },
      { month: 'Jun', rate: 15.8 },
    ],
    riskDistribution: [
      { name: 'Retained', value: 3500, color: '#22c55e' },
      { name: 'At Risk', value: 800, color: '#eab308' },
      { name: 'High Risk', value: 220, color: '#ef4444' }
    ]
  };
};

export const searchCustomers = async (query: string): Promise<Customer[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // If no query, return a larger list so the table is populated by default
  if (!query) return MOCK_CUSTOMERS; 
  
  return MOCK_CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    c.email.toLowerCase().includes(query.toLowerCase()) ||
    c.id.toLowerCase().includes(query.toLowerCase())
  );
};

export const predictChurnForCustomer = async (customerId: string): Promise<ChurnPrediction> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const customer = MOCK_CUSTOMERS.find(c => c.id === customerId);
  if (!customer) throw new Error("Customer not found");

  // Heuristic Logic based on dataset fields to simulate ML model
  let score = 10; // Base churn probability
  const riskFactors = [];

  // Factor 1: Contract Type
  if (customer.contract === 'Monthly') {
    score += 40;
    riskFactors.push({ factor: 'Month-to-Month Contract', impactScore: 8 });
  }

  // Factor 2: Payment Issue
  if (customer.paymentIssue) {
    score += 30;
    riskFactors.push({ factor: 'History of Payment Issues', impactScore: 9 });
  }

  // Factor 3: Tenure (New customers churn more)
  if (customer.tenureMonths < 6) {
    score += 15;
    riskFactors.push({ factor: 'Low Tenure (< 6 months)', impactScore: 6 });
  } else if (customer.tenureMonths > 24) {
    score -= 10; // Loyal
  }

  // Factor 4: Monthly Bill High
  if (customer.monthlyBill > 100) {
    score += 10;
    riskFactors.push({ factor: 'High Monthly Cost', impactScore: 5 });
  }

  score = Math.min(score, 99); // Cap at 99

  let riskLevel: 'Low' | 'Medium' | 'High' | 'Critical' = 'Low';
  if (score > 80) riskLevel = 'Critical';
  else if (score > 60) riskLevel = 'High';
  else if (score > 30) riskLevel = 'Medium';

  return {
    churnProbability: score,
    riskLevel,
    topRiskFactors: riskFactors,
    recommendedActions: [
      { id: 'act-1', type: 'email', title: 'Send "Miss You" Campaign', description: 'Personalized re-engagement email.' },
      { id: 'act-2', type: 'discount', title: 'Offer 20% Discount', description: 'Apply 20% off next 3 months.' },
      { id: 'act-3', type: 'content', title: 'Suggest New Sci-Fi', description: 'Recommend "Stranger Things" or similar.' }
    ],
    contentRecommendations: ['Stranger Things', 'Black Mirror', 'Dark', 'Altered Carbon']
  };
};