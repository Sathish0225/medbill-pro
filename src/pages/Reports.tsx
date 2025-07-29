import React, { useState } from "react";
import {
  Calendar,
  Download,
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ReportData {
  period: string;
  revenue: number;
  patients: number;
  invoices: number;
  collections: number;
  outstandings: number;
}

const mockReportData: ReportData[] = [
  {
    period: "January 2024",
    revenue: 125000,
    patients: 342,
    invoices: 456,
    collections: 118500,
    outstandings: 6500,
  },
  {
    period: "December 2023",
    revenue: 132000,
    patients: 358,
    invoices: 472,
    collections: 127600,
    outstandings: 4400,
  },
  {
    period: "November 2023",
    revenue: 128500,
    patients: 335,
    invoices: 441,
    collections: 122300,
    outstandings: 6200,
  },
];

export function Reports() {
  const [reportType, setReportType] = useState("revenue");
  const [dateRange, setDateRange] = useState("monthly");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const generateReport = () => {
    // Mock report generation
    console.log("Generating report...", {
      reportType,
      dateRange,
      startDate,
      endDate,
    });
  };

  const exportReport = (format: string) => {
    // Mock export functionality
    console.log(`Exporting report as ${format}...`);
  };

  const currentData = mockReportData[0];
  const previousData = mockReportData[1];

  const calculateGrowth = (current: number, previous: number) => {
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-poppins">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground">
            Financial and operational reports
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => exportReport("pdf")}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => exportReport("excel")}>
            <Download className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
          <CardDescription>Configure your report parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue Report</SelectItem>
                  <SelectItem value="patient">Patient Report</SelectItem>
                  <SelectItem value="payment">Payment Report</SelectItem>
                  <SelectItem value="doctor">Doctor Performance</SelectItem>
                  <SelectItem value="department">Department Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dateRange">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {dateRange === "custom" && (
              <>
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="flex items-end">
              <Button onClick={generateReport} className="w-full">
                <BarChart3 className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold">
                  ${currentData.revenue.toLocaleString()}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-success mr-1" />
                  <span className="text-sm text-success">
                    +
                    {calculateGrowth(currentData.revenue, previousData.revenue)}
                    %
                  </span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Patients
                </p>
                <p className="text-2xl font-bold">
                  {currentData.patients.toLocaleString()}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-primary mr-1" />
                  <span className="text-sm text-primary">
                    +
                    {calculateGrowth(
                      currentData.patients,
                      previousData.patients
                    )}
                    %
                  </span>
                </div>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Invoices Generated
                </p>
                <p className="text-2xl font-bold">
                  {currentData.invoices.toLocaleString()}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-routine mr-1" />
                  <span className="text-sm text-routine">
                    +
                    {calculateGrowth(
                      currentData.invoices,
                      previousData.invoices
                    )}
                    %
                  </span>
                </div>
              </div>
              <FileText className="h-8 w-8 text-routine" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Collections
                </p>
                <p className="text-2xl font-bold">
                  ${currentData.collections.toLocaleString()}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-warning mr-1" />
                  <span className="text-sm text-warning">
                    +
                    {calculateGrowth(
                      currentData.collections,
                      previousData.collections
                    )}
                    %
                  </span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance Trends</CardTitle>
          <CardDescription>
            Revenue and patient trends over the last 3 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReportData.map((data, index) => (
              <div
                key={data.period}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <Calendar className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">{data.period}</h3>
                    <p className="text-sm text-muted-foreground">
                      {data.patients} patients • {data.invoices} invoices
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="font-semibold">
                      ${data.revenue.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Collections</p>
                    <p className="font-semibold text-success">
                      ${data.collections.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Outstanding</p>
                    <p className="font-semibold text-warning">
                      ${data.outstandings.toLocaleString()}
                    </p>
                  </div>
                  <Badge variant={index === 0 ? "default" : "outline"}>
                    {index === 0 ? "Current" : `${index + 1} month ago`}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reports</CardTitle>
          <CardDescription>
            Generate commonly used reports instantly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start space-y-2"
            >
              <FileText className="h-6 w-6" />
              <div className="text-left">
                <p className="font-medium">Daily Sales Report</p>
                <p className="text-sm text-muted-foreground">
                  Today's revenue and transactions
                </p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start space-y-2"
            >
              <Users className="h-6 w-6" />
              <div className="text-left">
                <p className="font-medium">Patient Demographics</p>
                <p className="text-sm text-muted-foreground">
                  Age, gender, and location analysis
                </p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start space-y-2"
            >
              <DollarSign className="h-6 w-6" />
              <div className="text-left">
                <p className="font-medium">Outstanding Payments</p>
                <p className="text-sm text-muted-foreground">
                  Unpaid invoices and follow-ups
                </p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
