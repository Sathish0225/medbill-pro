import React, { useState } from "react";
import {
  Search as SearchIcon,
  Filter,
  User,
  FileText,
  CreditCard,
  Clock,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SearchResult {
  id: string;
  type: "patient" | "invoice" | "payment";
  title: string;
  subtitle: string;
  description: string;
  date: string;
  status?: string;
  amount?: number;
  metadata: Record<string, any>;
}

const mockSearchResults: SearchResult[] = [
  {
    id: "1",
    type: "patient",
    title: "John Smith",
    subtitle: "Patient ID: P001",
    description: "Male, 38 years old • +1-555-0123 • john.smith@email.com",
    date: "2024-01-15",
    status: "active",
    metadata: {
      phone: "+1-555-0123",
      email: "john.smith@email.com",
      lastVisit: "2024-01-15",
    },
  },
  {
    id: "2",
    type: "invoice",
    title: "INV-2024-0001",
    subtitle: "John Smith",
    description: "Consultation, Blood Test, X-Ray • Due: Jan 30, 2024",
    date: "2024-01-15",
    status: "paid",
    amount: 850.0,
    metadata: {
      patientName: "John Smith",
      services: ["Consultation", "Blood Test", "X-Ray"],
    },
  },
  {
    id: "3",
    type: "payment",
    title: "Payment #TXN123456789",
    subtitle: "INV-2024-0001",
    description: "Credit Card payment for $850.00",
    date: "2024-01-15",
    status: "completed",
    amount: 850.0,
    metadata: {
      method: "Credit Card",
      transactionId: "TXN123456789",
    },
  },
  {
    id: "4",
    type: "patient",
    title: "Sarah Wilson",
    subtitle: "Patient ID: P002",
    description: "Female, 33 years old • +1-555-0125 • sarah.wilson@email.com",
    date: "2024-01-14",
    status: "active",
    metadata: {
      phone: "+1-555-0125",
      email: "sarah.wilson@email.com",
      lastVisit: "2024-01-14",
    },
  },
  {
    id: "5",
    type: "invoice",
    title: "INV-2024-0002",
    subtitle: "Sarah Wilson",
    description: "Surgery, Ward Charges, Medication • Due: Jan 29, 2024",
    date: "2024-01-14",
    status: "partial",
    amount: 1250.0,
    metadata: {
      patientName: "Sarah Wilson",
      services: ["Surgery", "Ward Charges", "Medication"],
    },
  },
];

export function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);

    // Simulate search delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Filter mock results based on search query and type
    const filteredResults = mockSearchResults.filter((result) => {
      const matchesQuery =
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = searchType === "all" || result.type === searchType;
      return matchesQuery && matchesType;
    });

    setResults(filteredResults);
    setIsSearching(false);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case "patient":
        return <User className="h-5 w-5" />;
      case "invoice":
        return <FileText className="h-5 w-5" />;
      case "payment":
        return <CreditCard className="h-5 w-5" />;
      default:
        return <SearchIcon className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (type: string, status?: string) => {
    if (!status) return null;

    switch (type) {
      case "patient":
        return status === "active" ? (
          <Badge className="bg-success text-success-foreground">Active</Badge>
        ) : (
          <Badge variant="outline">Inactive</Badge>
        );
      case "invoice":
        switch (status) {
          case "paid":
            return (
              <Badge className="bg-success text-success-foreground">Paid</Badge>
            );
          case "pending":
            return (
              <Badge className="bg-warning text-warning-foreground">
                Pending
              </Badge>
            );
          case "partial":
            return (
              <Badge className="bg-routine text-routine-foreground">
                Partial
              </Badge>
            );
          case "overdue":
            return (
              <Badge className="bg-emergency text-emergency-foreground">
                Overdue
              </Badge>
            );
          default:
            return <Badge variant="outline">{status}</Badge>;
        }
      case "payment":
        return status === "completed" ? (
          <Badge className="bg-success text-success-foreground">
            Completed
          </Badge>
        ) : (
          <Badge className="bg-warning text-warning-foreground">Pending</Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const groupedResults = {
    patients: results.filter((r) => r.type === "patient"),
    invoices: results.filter((r) => r.type === "invoice"),
    payments: results.filter((r) => r.type === "payment"),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-poppins">Global Search</h1>
        <p className="text-muted-foreground">
          Search across patients, invoices, and payments
        </p>
      </div>

      {/* Search Input */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name, ID, invoice number, phone, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10"
              />
            </div>
            <Select value={searchType} onValueChange={setSearchType}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Search type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="patient">Patients</SelectItem>
                <SelectItem value="invoice">Invoices</SelectItem>
                <SelectItem value="payment">Payments</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                  Searching...
                </>
              ) : (
                <>
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              Found {results.length} result{results.length !== 1 ? "s" : ""} for
              "{searchQuery}"
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All ({results.length})</TabsTrigger>
                <TabsTrigger value="patients">
                  Patients ({groupedResults.patients.length})
                </TabsTrigger>
                <TabsTrigger value="invoices">
                  Invoices ({groupedResults.invoices.length})
                </TabsTrigger>
                <TabsTrigger value="payments">
                  Payments ({groupedResults.payments.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-3">
                {results.map((result) => (
                  <Card
                    key={result.id}
                    className="hover:shadow-medical transition-shadow cursor-pointer"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {getResultIcon(result.type)}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold">{result.title}</h3>
                              {getStatusBadge(result.type, result.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {result.subtitle}
                            </p>
                            <p className="text-sm">{result.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>
                                  {new Date(result.date).toLocaleDateString()}
                                </span>
                              </div>
                              {result.amount && (
                                <span className="font-medium">
                                  ${result.amount.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {result.type}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="patients" className="space-y-3">
                {groupedResults.patients.map((result) => (
                  <Card
                    key={result.id}
                    className="hover:shadow-medical transition-shadow cursor-pointer"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <User className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{result.title}</h3>
                            {getStatusBadge(result.type, result.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {result.subtitle}
                          </p>
                          <p className="text-sm">{result.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="invoices" className="space-y-3">
                {groupedResults.invoices.map((result) => (
                  <Card
                    key={result.id}
                    className="hover:shadow-medical transition-shadow cursor-pointer"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{result.title}</h3>
                            {getStatusBadge(result.type, result.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {result.subtitle}
                          </p>
                          <p className="text-sm">{result.description}</p>
                          {result.amount && (
                            <p className="text-sm font-medium">
                              ${result.amount.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="payments" className="space-y-3">
                {groupedResults.payments.map((result) => (
                  <Card
                    key={result.id}
                    className="hover:shadow-medical transition-shadow cursor-pointer"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{result.title}</h3>
                            {getStatusBadge(result.type, result.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {result.subtitle}
                          </p>
                          <p className="text-sm">{result.description}</p>
                          {result.amount && (
                            <p className="text-sm font-medium">
                              ${result.amount.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* No Results */}
      {searchQuery && results.length === 0 && !isSearching && (
        <Card>
          <CardContent className="p-12 text-center">
            <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">
              No results found
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search terms or search type.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Search Tips */}
      {!searchQuery && (
        <Card>
          <CardHeader>
            <CardTitle>Search Tips</CardTitle>
            <CardDescription>
              Get better results with these search tips
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Patient Search</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Search by full name or partial name</li>
                  <li>• Use phone number with or without format</li>
                  <li>• Search by email address</li>
                  <li>• Use patient ID (e.g., P001)</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Invoice & Payment Search</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Search by invoice number (e.g., INV-2024-0001)</li>
                  <li>• Use transaction ID for payments</li>
                  <li>• Search by associated patient name</li>
                  <li>• Filter by payment method or status</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
