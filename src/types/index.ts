export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "receptionist" | "billing_clerk" | "doctor";
  department?: string;
  phone?: string;
}

export interface Patient {
  id: string;
  name: string;
  email?: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  emergencyContact: string;
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
    coverage: number; // percentage
  };
  admissionType: "inpatient" | "outpatient";
  admissionDate: string;
  assignedDoctor: string;
  status: "active" | "discharged" | "transferred";
}

export interface Service {
  id: string;
  name: string;
  category:
    | "consultation"
    | "lab_test"
    | "medication"
    | "surgery"
    | "ward_charges"
    | "equipment"
    | "other";
  price: number;
  description?: string;
  department?: string;
}

export interface BillingItem {
  id: string;
  serviceId: string;
  serviceName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discount?: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  items: BillingItem[];
  subtotal: number;
  discount: number;
  taxRate: number;
  taxAmount: number;
  insuranceCoverage: number;
  insuranceAmount: number;
  totalAmount: number;
  amountPaid: number;
  balanceDue: number;
  status: "draft" | "sent" | "paid" | "partially_paid" | "overdue";
  createdAt: string;
  dueDate: string;
  paidAt?: string;
  notes?: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  paymentMethod:
    | "cash"
    | "card"
    | "insurance"
    | "upi"
    | "online"
    | "bank_transfer";
  transactionId?: string;
  paidAt: string;
  notes?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  department: string;
  email: string;
  phone: string;
  consultationFee: number;
}

export interface DashboardStats {
  totalRevenue: number;
  unpaidInvoices: number;
  totalPatients: number;
  todayRevenue: number;
  pendingPayments: number;
  totalInvoices: number;
}

export interface ReportFilter {
  startDate?: string;
  endDate?: string;
  doctorId?: string;
  patientId?: string;
  paymentMethod?: string;
  status?: string;
}
