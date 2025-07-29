import React from "react";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  User,
  FileText,
  AlertTriangle,
  CheckCircle,
  Plus,
  Search,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Mock data for recent activities
const recentInvoices = [
  {
    id: "1",
    invoiceNumber: "INV-2024-001",
    patientName: "John Smith",
    amount: 1250,
    status: "paid",
    date: "2024-01-15",
    doctor: "Dr. Johnson",
  },
  {
    id: "2",
    invoiceNumber: "INV-2024-002",
    patientName: "Sarah Wilson",
    amount: 2340,
    status: "pending",
    date: "2024-01-14",
    doctor: "Dr. Chen",
  },
  {
    id: "3",
    invoiceNumber: "INV-2024-003",
    patientName: "Mike Davis",
    amount: 890,
    status: "overdue",
    date: "2024-01-13",
    doctor: "Dr. Brown",
  },
];

const upcomingAppointments = [
  {
    id: "1",
    patientName: "Emma Thompson",
    time: "09:30 AM",
    doctor: "Dr. Johnson",
    type: "Consultation",
  },
  {
    id: "2",
    patientName: "Robert Lee",
    time: "10:15 AM",
    doctor: "Dr. Wilson",
    type: "Follow-up",
  },
  {
    id: "3",
    patientName: "Lisa Garcia",
    time: "11:00 AM",
    doctor: "Dr. Chen",
    type: "Lab Review",
  },
];

export function Dashboard() {
  const { user } = useAuth();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-paid text-paid-foreground">Paid</Badge>;
      case "pending":
        return (
          <Badge className="bg-pending text-pending-foreground">Pending</Badge>
        );
      case "overdue":
        return (
          <Badge className="bg-overdue text-overdue-foreground">Overdue</Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-poppins text-foreground">
            Welcome back, {user?.name}
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening in your hospital today.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-gradient-to-r from-primary to-primary-light">
            <Plus className="mr-2 h-4 w-4" />
            Quick Actions
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <DashboardStats />

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Invoices */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Recent Invoices</span>
                </CardTitle>
                <CardDescription>Latest billing activity</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Search className="mr-2 h-4 w-4" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInvoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <FileText className="h-8 w-8 text-primary bg-primary/10 p-2 rounded-full" />
                    </div>
                    <div>
                      <p className="font-medium">{invoice.invoiceNumber}</p>
                      <p className="text-sm text-muted-foreground">
                        {invoice.patientName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {invoice.doctor}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ₹{invoice.amount.toLocaleString()}
                    </p>
                    {getStatusBadge(invoice.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Today's Schedule</span>
            </CardTitle>
            <CardDescription>Upcoming appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Clock className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {appointment.patientName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {appointment.doctor}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {appointment.type}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-primary">
                    {appointment.time}
                  </span>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              View Full Schedule
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions based on role */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks for your role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {user?.role === "receptionist" && (
              <>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <User className="h-6 w-6" />
                  <span className="text-sm">Register Patient</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Calendar className="h-6 w-6" />
                  <span className="text-sm">Schedule Appointment</span>
                </Button>
              </>
            )}

            {(user?.role === "billing_clerk" || user?.role === "admin") && (
              <>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">Create Invoice</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <CheckCircle className="h-6 w-6" />
                  <span className="text-sm">Process Payment</span>
                </Button>
              </>
            )}

            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Search className="h-6 w-6" />
              <span className="text-sm">Search Records</span>
            </Button>

            {user?.role === "admin" && (
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <AlertTriangle className="h-6 w-6" />
                <span className="text-sm">System Alerts</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
