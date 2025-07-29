import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Stethoscope,
  TestTube,
  Pill,
  Scissors,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface Service {
  id: string;
  name: string;
  category:
    | "consultation"
    | "lab_test"
    | "medication"
    | "surgery"
    | "ward"
    | "imaging";
  price: number;
  description: string;
  duration?: number;
  department: string;
  isActive: boolean;
}

const mockServices: Service[] = [
  {
    id: "1",
    name: "General Consultation",
    category: "consultation",
    price: 150.0,
    description: "General physician consultation and examination",
    duration: 30,
    department: "General Medicine",
    isActive: true,
  },
  {
    id: "2",
    name: "Blood Test - Complete Blood Count",
    category: "lab_test",
    price: 45.0,
    description: "Complete blood count analysis",
    duration: 15,
    department: "Laboratory",
    isActive: true,
  },
  {
    id: "3",
    name: "X-Ray Chest",
    category: "imaging",
    price: 120.0,
    description: "Chest X-ray imaging",
    duration: 20,
    department: "Radiology",
    isActive: true,
  },
  {
    id: "4",
    name: "Paracetamol 500mg",
    category: "medication",
    price: 2.5,
    description: "Pain relief medication (per tablet)",
    department: "Pharmacy",
    isActive: true,
  },
  {
    id: "5",
    name: "Appendectomy",
    category: "surgery",
    price: 2500.0,
    description: "Surgical removal of appendix",
    duration: 120,
    department: "Surgery",
    isActive: true,
  },
  {
    id: "6",
    name: "General Ward (per day)",
    category: "ward",
    price: 200.0,
    description: "General ward accommodation per day",
    department: "Ward Management",
    isActive: true,
  },
];

export function Services() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [services, setServices] = useState<Service[]>(mockServices);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    category: "consultation" as Service["category"],
    price: "",
    description: "",
    duration: "",
    department: "",
  });

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || service.category === categoryFilter;
    return matchesSearch && matchesCategory && service.isActive;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "consultation":
        return <Stethoscope className="h-4 w-4" />;
      case "lab_test":
        return <TestTube className="h-4 w-4" />;
      case "medication":
        return <Pill className="h-4 w-4" />;
      case "surgery":
        return <Scissors className="h-4 w-4" />;
      default:
        return <Stethoscope className="h-4 w-4" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    const icon = getCategoryIcon(category);
    const label = category
      .replace("_", " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    return (
      <Badge variant="outline" className="flex items-center space-x-1">
        {icon}
        <span>{label}</span>
      </Badge>
    );
  };

  const handleAddService = () => {
    if (!newService.name || !newService.price || !newService.department) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const service: Service = {
      id: `${Date.now()}`,
      name: newService.name,
      category: newService.category,
      price: parseFloat(newService.price),
      description: newService.description,
      duration: newService.duration ? parseInt(newService.duration) : undefined,
      department: newService.department,
      isActive: true,
    };

    setServices([...services, service]);
    setNewService({
      name: "",
      category: "consultation",
      price: "",
      description: "",
      duration: "",
      department: "",
    });
    setIsAddDialogOpen(false);

    toast({
      title: "Service Added",
      description: `${service.name} has been added to the services list`,
    });
  };

  const handleDeleteService = (serviceId: string) => {
    setServices(
      services.map((s) => (s.id === serviceId ? { ...s, isActive: false } : s))
    );
    toast({
      title: "Service Removed",
      description: "The service has been deactivated",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-poppins">
            Service Management
          </h1>
          <p className="text-muted-foreground">
            Manage hospital services and pricing
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-primary-light">
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>
                Create a new service for the hospital billing system
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="serviceName">Service Name *</Label>
                <Input
                  id="serviceName"
                  value={newService.name}
                  onChange={(e) =>
                    setNewService({ ...newService, name: e.target.value })
                  }
                  placeholder="e.g., General Consultation"
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={newService.category}
                  onValueChange={(value: Service["category"]) =>
                    setNewService({ ...newService, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="lab_test">Lab Test</SelectItem>
                    <SelectItem value="medication">Medication</SelectItem>
                    <SelectItem value="surgery">Surgery</SelectItem>
                    <SelectItem value="ward">Ward</SelectItem>
                    <SelectItem value="imaging">Imaging</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newService.price}
                    onChange={(e) =>
                      setNewService({ ...newService, price: e.target.value })
                    }
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (min)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newService.duration}
                    onChange={(e) =>
                      setNewService({ ...newService, duration: e.target.value })
                    }
                    placeholder="30"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  value={newService.department}
                  onChange={(e) =>
                    setNewService({ ...newService, department: e.target.value })
                  }
                  placeholder="e.g., General Medicine"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newService.description}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      description: e.target.value,
                    })
                  }
                  placeholder="Service description..."
                />
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button onClick={handleAddService} className="flex-1">
                  Add Service
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search services by name, description, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="lab_test">Lab Test</SelectItem>
                <SelectItem value="medication">Medication</SelectItem>
                <SelectItem value="surgery">Surgery</SelectItem>
                <SelectItem value="ward">Ward</SelectItem>
                <SelectItem value="imaging">Imaging</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            className="hover:shadow-medical transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  {getCategoryBadge(service.category)}
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl font-bold text-primary">
                ${service.price.toFixed(2)}
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  <span className="font-medium">Department:</span>{" "}
                  {service.department}
                </p>
                {service.duration && (
                  <p>
                    <span className="font-medium">Duration:</span>{" "}
                    {service.duration} minutes
                  </p>
                )}
              </div>

              {service.description && (
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-medium text-muted-foreground">
              No services found
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search terms or add a new service.
            </p>
            <Button className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Service
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
