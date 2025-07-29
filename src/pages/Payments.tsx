import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  DollarSign,
  CreditCard,
  Banknote,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Payment {
  id: string;
  invoiceNumber: string;
  patientName: string;
  amount: number;
  paymentMethod: "cash" | "card" | "insurance" | "upi" | "online";
  status: "completed" | "pending" | "failed" | "refunded";
  transactionId?: string;
  paymentDate: string;
  processedBy: string;
}

const mockPayments: Payment[] = [
  {
    id: "1",
    invoiceNumber: "INV-2024-0001",
    patientName: "John Smith",
    amount: 850.0,
    paymentMethod: "card",
    status: "completed",
    transactionId: "TXN123456789",
    paymentDate: "2024-01-15T10:30:00Z",
    processedBy: "Emily Davis",
  },
  {
    id: "2",
    invoiceNumber: "INV-2024-0002",
    patientName: "Sarah Wilson",
    amount: 500.0,
    paymentMethod: "insurance",
    status: "completed",
    transactionId: "INS987654321",
    paymentDate: "2024-01-14T14:20:00Z",
    processedBy: "Michael Chen",
  },
  {
    id: "3",
    invoiceNumber: "INV-2024-0003",
    patientName: "Mike Davis",
    amount: 320.0,
    paymentMethod: "cash",
    status: "pending",
    paymentDate: "2024-01-16T09:15:00Z",
    processedBy: "Emily Davis",
  },
  {
    id: "4",
    invoiceNumber: "INV-2024-0004",
    patientName: "Emily Johnson",
    amount: 75.0,
    paymentMethod: "upi",
    status: "failed",
    transactionId: "UPI456789123",
    paymentDate: "2024-01-16T16:45:00Z",
    processedBy: "Michael Chen",
  },
];

export function Payments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [methodFilter, setMethodFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [payments] = useState<Payment[]>(mockPayments);

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod =
      methodFilter === "all" || payment.paymentMethod === methodFilter;
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesMethod && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-success text-success-foreground">
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-warning text-warning-foreground">Pending</Badge>
        );
      case "failed":
        return (
          <Badge className="bg-emergency text-emergency-foreground">
            Failed
          </Badge>
        );
      case "refunded":
        return (
          <Badge className="bg-routine text-routine-foreground">Refunded</Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "cash":
        return <Banknote className="h-4 w-4" />;
      case "card":
        return <CreditCard className="h-4 w-4" />;
      case "upi":
        return <Smartphone className="h-4 w-4" />;
      case "online":
        return <DollarSign className="h-4 w-4" />;
      case "insurance":
        return <DollarSign className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const getMethodBadge = (method: string) => {
    const icon = getMethodIcon(method);
    const label = method.charAt(0).toUpperCase() + method.slice(1);
    return (
      <Badge variant="outline" className="flex items-center space-x-1">
        {icon}
        <span>{label}</span>
      </Badge>
    );
  };

  const totalAmount = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-poppins">
            Payment Management
          </h1>
          <p className="text-muted-foreground">
            Track and process patient payments
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary-light">
          <Plus className="mr-2 h-4 w-4" />
          Record Payment
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-success" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Collected
                </p>
                <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-warning" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending
                </p>
                <p className="text-2xl font-bold">
                  ${pendingAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Transactions
                </p>
                <p className="text-2xl font-bold">{payments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-8 w-8 text-emergency" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Failed
                </p>
                <p className="text-2xl font-bold">
                  {payments.filter((p) => p.status === "failed").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by patient, invoice, or transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="insurance">Insurance</SelectItem>
                <SelectItem value="upi">UPI</SelectItem>
                <SelectItem value="online">Online</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payment List */}
      <div className="grid gap-4">
        {filteredPayments.map((payment) => (
          <Card
            key={payment.id}
            className="hover:shadow-medical transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {payment.invoiceNumber}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {payment.patientName}
                      </p>
                    </div>
                    {getStatusBadge(payment.status)}
                    {getMethodBadge(payment.paymentMethod)}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-muted-foreground">
                        Amount:
                      </span>
                      <p className="font-semibold text-lg">
                        ${payment.amount.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">
                        Date:
                      </span>
                      <p>
                        {new Date(payment.paymentDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">
                        Time:
                      </span>
                      <p>
                        {new Date(payment.paymentDate).toLocaleTimeString()}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">
                        Processed by:
                      </span>
                      <p>{payment.processedBy}</p>
                    </div>
                  </div>

                  {payment.transactionId && (
                    <div className="text-sm">
                      <span className="font-medium text-muted-foreground">
                        Transaction ID:{" "}
                      </span>
                      <span className="font-mono">{payment.transactionId}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {payment.status === "failed" && (
                    <Button variant="outline" size="sm">
                      Retry Payment
                    </Button>
                  )}
                  {payment.status === "completed" && (
                    <Button variant="outline" size="sm">
                      Print Receipt
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPayments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-medium text-muted-foreground">
              No payments found
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search terms or filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
