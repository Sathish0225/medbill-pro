import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Download,
  Mail,
  Calendar,
  DollarSign,
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

interface Invoice {
  id: string;
  invoiceNumber: string;
  patientName: string;
  patientId: string;
  amount: number;
  paidAmount: number;
  status: "paid" | "pending" | "overdue" | "partial";
  issueDate: string;
  dueDate: string;
  paymentMethod?: string;
  services: string[];
}

const mockInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2024-0001",
    patientName: "John Smith",
    patientId: "P001",
    amount: 850.0,
    paidAmount: 850.0,
    status: "paid",
    issueDate: "2024-01-15",
    dueDate: "2024-01-30",
    paymentMethod: "Credit Card",
    services: ["Consultation", "Blood Test", "X-Ray"],
  },
  {
    id: "2",
    invoiceNumber: "INV-2024-0002",
    patientName: "Sarah Wilson",
    patientId: "P002",
    amount: 1250.0,
    paidAmount: 500.0,
    status: "partial",
    issueDate: "2024-01-14",
    dueDate: "2024-01-29",
    services: ["Surgery", "Ward Charges", "Medication"],
  },
  {
    id: "3",
    invoiceNumber: "INV-2024-0003",
    patientName: "Mike Davis",
    patientId: "P003",
    amount: 320.0,
    paidAmount: 0,
    status: "overdue",
    issueDate: "2024-01-10",
    dueDate: "2024-01-25",
    services: ["Consultation", "Lab Test"],
  },
  {
    id: "4",
    invoiceNumber: "INV-2024-0004",
    patientName: "Emily Johnson",
    patientId: "P004",
    amount: 650.0,
    paidAmount: 0,
    status: "pending",
    issueDate: "2024-01-16",
    dueDate: "2024-01-31",
    services: ["Consultation", "MRI Scan"],
  },
];

export function Invoices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [invoices] = useState<Invoice[]>(mockInvoices);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-success text-success-foreground">Paid</Badge>
        );
      case "pending":
        return (
          <Badge className="bg-warning text-warning-foreground">Pending</Badge>
        );
      case "overdue":
        return (
          <Badge className="bg-emergency text-emergency-foreground">
            Overdue
          </Badge>
        );
      case "partial":
        return (
          <Badge className="bg-routine text-routine-foreground">Partial</Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const pendingAmount = invoices.reduce(
    (sum, inv) => sum + (inv.amount - inv.paidAmount),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-poppins">
            Invoice Management
          </h1>
          <p className="text-muted-foreground">
            Track and manage patient invoices
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-success" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
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
                  Pending Amount
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
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Invoices
                </p>
                <p className="text-2xl font-bold">{invoices.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-emergency" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Overdue
                </p>
                <p className="text-2xl font-bold">
                  {invoices.filter((i) => i.status === "overdue").length}
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
                placeholder="Search invoices by patient name or invoice number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Invoice List */}
      <div className="grid gap-4">
        {filteredInvoices.map((invoice) => (
          <Card
            key={invoice.id}
            className="hover:shadow-medical transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {invoice.invoiceNumber}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {invoice.patientName} (ID: {invoice.patientId})
                      </p>
                    </div>
                    {getStatusBadge(invoice.status)}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-muted-foreground">
                        Amount:
                      </span>
                      <p className="font-semibold">
                        ${invoice.amount.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">
                        Paid:
                      </span>
                      <p className="font-semibold text-success">
                        ${invoice.paidAmount.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">
                        Balance:
                      </span>
                      <p className="font-semibold text-warning">
                        ${(invoice.amount - invoice.paidAmount).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">
                        Due Date:
                      </span>
                      <p>{new Date(invoice.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Services:{" "}
                    </span>
                    <span className="text-sm">
                      {invoice.services.join(", ")}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInvoices.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-medium text-muted-foreground">
              No invoices found
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
