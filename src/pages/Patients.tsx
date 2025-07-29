import React, { useState } from "react";
import { Search, Plus, Filter, Eye, Edit, Phone, Mail } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Patient } from "@/types";

// Mock patient data
const mockPatients: Patient[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1-555-0123",
    address: "123 Main St, City, State 12345",
    dateOfBirth: "1985-06-15",
    gender: "male",
    emergencyContact: "+1-555-0124",
    admissionType: "outpatient",
    admissionDate: "2024-01-15",
    assignedDoctor: "Dr. Johnson",
    status: "active",
    insuranceInfo: {
      provider: "HealthCare Plus",
      policyNumber: "HC123456789",
      coverage: 80,
    },
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    phone: "+1-555-0125",
    address: "456 Oak Ave, City, State 12346",
    dateOfBirth: "1990-03-22",
    gender: "female",
    emergencyContact: "+1-555-0126",
    admissionType: "inpatient",
    admissionDate: "2024-01-14",
    assignedDoctor: "Dr. Chen",
    status: "active",
  },
  {
    id: "3",
    name: "Mike Davis",
    email: "mike.davis@email.com",
    phone: "+1-555-0127",
    address: "789 Pine St, City, State 12347",
    dateOfBirth: "1978-11-08",
    gender: "male",
    emergencyContact: "+1-555-0128",
    admissionType: "outpatient",
    admissionDate: "2024-01-13",
    assignedDoctor: "Dr. Brown",
    status: "discharged",
  },
];

export function Patients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients] = useState<Patient[]>(mockPatients);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm) ||
      patient.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-success text-success-foreground">Active</Badge>
        );
      case "discharged":
        return <Badge variant="outline">Discharged</Badge>;
      case "transferred":
        return (
          <Badge className="bg-warning text-warning-foreground">
            Transferred
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getAdmissionBadge = (type: string) => {
    return type === "inpatient" ? (
      <Badge className="bg-emergency text-emergency-foreground">
        Inpatient
      </Badge>
    ) : (
      <Badge className="bg-routine text-routine-foreground">Outpatient</Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-poppins">
            Patient Management
          </h1>
          <p className="text-muted-foreground">
            Manage patient records and information
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary-light">
          <Plus className="mr-2 h-4 w-4" />
          Register New Patient
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search patients by name, phone, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Patient List */}
      <div className="grid gap-4">
        {filteredPatients.map((patient) => (
          <Card
            key={patient.id}
            className="hover:shadow-medical transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src="/placeholder-avatar.jpg"
                      alt={patient.name}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold">{patient.name}</h3>
                      {getStatusBadge(patient.status)}
                      {getAdmissionBadge(patient.admissionType)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{patient.phone}</span>
                      </div>
                      {patient.email && (
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>{patient.email}</span>
                        </div>
                      )}
                      <div>
                        <span className="font-medium">Doctor:</span>{" "}
                        {patient.assignedDoctor}
                      </div>
                      <div>
                        <span className="font-medium">Admitted:</span>{" "}
                        {new Date(patient.admissionDate).toLocaleDateString()}
                      </div>
                    </div>

                    {patient.insuranceInfo && (
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="font-medium text-foreground">
                          Insurance:
                        </span>
                        <span className="text-muted-foreground">
                          {patient.insuranceInfo.provider}
                        </span>
                        <Badge variant="outline">
                          {patient.insuranceInfo.coverage}% Coverage
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-medium text-muted-foreground">
              No patients found
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search terms or register a new patient.
            </p>
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Register New Patient
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
