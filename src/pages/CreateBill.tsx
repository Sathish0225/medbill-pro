import React, { useState } from 'react';
import { Plus, Minus, Search, Calculator, Save, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BillingItem, Service, Patient, Doctor } from '@/types';
import { toast } from '@/hooks/use-toast';

// Mock data
const mockPatients: Patient[] = [
  { id: '1', name: 'John Smith', phone: '+1-555-0123', admissionType: 'outpatient', assignedDoctor: 'Dr. Johnson', insuranceInfo: { provider: 'HealthCare Plus', policyNumber: 'HC123456789', coverage: 80 } } as Patient,
  { id: '2', name: 'Sarah Wilson', phone: '+1-555-0125', admissionType: 'inpatient', assignedDoctor: 'Dr. Chen' } as Patient,
];

const mockServices: Service[] = [
  { id: '1', name: 'General Consultation', category: 'consultation', price: 500, description: 'General physician consultation' },
  { id: '2', name: 'Blood Test - Complete Panel', category: 'lab_test', price: 1200, description: 'Complete blood count and chemistry panel' },
  { id: '3', name: 'Chest X-Ray', category: 'lab_test', price: 800, description: 'Digital chest X-ray examination' },
  { id: '4', name: 'Paracetamol 500mg', category: 'medication', price: 50, description: 'Pain relief medication' },
  { id: '5', name: 'Private Room (per day)', category: 'ward_charges', price: 2000, description: 'Private room accommodation' },
  { id: '6', name: 'Cardiology Consultation', category: 'consultation', price: 1000, description: 'Specialist cardiology consultation' },
];

export function CreateBill() {
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [billingItems, setBillingItems] = useState<BillingItem[]>([]);
  const [searchService, setSearchService] = useState('');
  const [notes, setNotes] = useState('');
  const [discountRate, setDiscountRate] = useState(0);
  const [taxRate] = useState(18); // GST rate

  const selectedPatientData = mockPatients.find(p => p.id === selectedPatient);
  const filteredServices = mockServices.filter(service =>
    service.name.toLowerCase().includes(searchService.toLowerCase()) ||
    service.category.toLowerCase().includes(searchService.toLowerCase())
  );

  const addBillingItem = (service: Service) => {
    const existingItem = billingItems.find(item => item.serviceId === service.id);
    
    if (existingItem) {
      setBillingItems(prev => prev.map(item =>
        item.serviceId === service.id
          ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * item.unitPrice }
          : item
      ));
    } else {
      const newItem: BillingItem = {
        id: Date.now().toString(),
        serviceId: service.id,
        serviceName: service.name,
        quantity: 1,
        unitPrice: service.price,
        totalPrice: service.price
      };
      setBillingItems(prev => [...prev, newItem]);
    }
    setSearchService('');
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setBillingItems(prev => prev.filter(item => item.id !== itemId));
      return;
    }
    
    setBillingItems(prev => prev.map(item =>
      item.id === itemId
        ? { ...item, quantity, totalPrice: quantity * item.unitPrice }
        : item
    ));
  };

  const removeItem = (itemId: string) => {
    setBillingItems(prev => prev.filter(item => item.id !== itemId));
  };

  // Calculations
  const subtotal = billingItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const discountAmount = (subtotal * discountRate) / 100;
  const discountedAmount = subtotal - discountAmount;
  const taxAmount = (discountedAmount * taxRate) / 100;
  const insuranceCoverage = selectedPatientData?.insuranceInfo?.coverage || 0;
  const insuranceAmount = (discountedAmount * insuranceCoverage) / 100;
  const totalAmount = discountedAmount + taxAmount;
  const patientAmount = totalAmount - insuranceAmount;

  const handleSaveBill = () => {
    if (!selectedPatient || billingItems.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select a patient and add at least one service',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Bill created successfully!',
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'consultation': return 'bg-primary';
      case 'lab_test': return 'bg-secondary';
      case 'medication': return 'bg-success';
      case 'surgery': return 'bg-emergency';
      case 'ward_charges': return 'bg-warning';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-poppins">Create New Bill</h1>
          <p className="text-muted-foreground">Generate invoice for patient services</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleSaveBill}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={handleSaveBill} className="bg-gradient-to-r from-primary to-primary-light">
            <Calculator className="mr-2 h-4 w-4" />
            Generate Bill
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Patient & Services */}
        <div className="lg:col-span-2 space-y-6">
          {/* Patient Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>Select the patient for this bill</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="patient">Select Patient</Label>
                <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a patient..." />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPatients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        <div className="flex items-center space-x-2">
                          <span>{patient.name}</span>
                          <Badge variant="outline">{patient.admissionType}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedPatientData && (
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Phone:</span>
                    <span>{selectedPatientData.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Assigned Doctor:</span>
                    <span>{selectedPatientData.assignedDoctor}</span>
                  </div>
                  {selectedPatientData.insuranceInfo && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Insurance:</span>
                      <Badge variant="outline">
                        {selectedPatientData.insuranceInfo.provider} ({selectedPatientData.insuranceInfo.coverage}%)
                      </Badge>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Service Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Add Services</CardTitle>
              <CardDescription>Search and add services to the bill</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search services..."
                    value={searchService}
                    onChange={(e) => setSearchService(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {searchService && (
                  <div className="border rounded-lg max-h-60 overflow-y-auto">
                    {filteredServices.map((service) => (
                      <div
                        key={service.id}
                        className="p-3 border-b last:border-b-0 hover:bg-muted cursor-pointer"
                        onClick={() => addBillingItem(service)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{service.name}</span>
                              <Badge className={getCategoryColor(service.category) + ' text-white text-xs'}>
                                {service.category.replace('_', ' ')}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                          </div>
                          <span className="font-bold text-primary">₹{service.price.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Billing Items */}
          {billingItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Bill Items</CardTitle>
                <CardDescription>Services added to this bill</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {billingItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <span className="font-medium">{item.serviceName}</span>
                        <p className="text-sm text-muted-foreground">₹{item.unitPrice.toLocaleString()} per unit</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="font-bold w-20 text-right">₹{item.totalPrice.toLocaleString()}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Bill Summary */}
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Bill Summary</CardTitle>
              <CardDescription>Review and finalize the bill</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Discount */}
              <div>
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  value={discountRate}
                  onChange={(e) => setDiscountRate(Number(e.target.value))}
                  min="0"
                  max="100"
                />
              </div>

              <Separator />

              {/* Calculations */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                
                {discountAmount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount ({discountRate}%):</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>GST ({taxRate}%):</span>
                  <span>₹{taxAmount.toLocaleString()}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-medium">
                  <span>Total Amount:</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
                
                {insuranceAmount > 0 && (
                  <>
                    <div className="flex justify-between text-primary">
                      <span>Insurance Coverage ({insuranceCoverage}%):</span>
                      <span>-₹{insuranceAmount.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Patient Pays:</span>
                      <span>₹{patientAmount.toLocaleString()}</span>
                    </div>
                  </>
                )}
              </div>

              <Separator />

              {/* Notes */}
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-primary-light"
                  onClick={handleSaveBill}
                  disabled={!selectedPatient || billingItems.length === 0}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Generate Invoice
                </Button>
                <Button variant="outline" className="w-full">
                  <Printer className="mr-2 h-4 w-4" />
                  Preview & Print
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}