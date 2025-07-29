import React from 'react';
import { DollarSign, FileText, Users, AlertCircle, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
  icon: React.ComponentType<any>;
  description?: string;
}

function StatCard({ title, value, change, changeType, icon: Icon, description }: StatCardProps) {
  return (
    <Card className="hover:shadow-medical transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-poppins">{value}</div>
        {change && (
          <div className="flex items-center space-x-1 mt-1">
            <Badge variant={changeType === 'increase' ? 'default' : 'destructive'} className="text-xs">
              {change}
            </Badge>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <StatCard
        title="Total Revenue"
        value="₹1,24,580"
        change="+12.5%"
        changeType="increase"
        icon={DollarSign}
        description="Total earnings this month"
      />
      
      <StatCard
        title="Unpaid Invoices"
        value="23"
        change="-8.2%"
        changeType="increase"
        icon={AlertCircle}
        description="Invoices pending payment"
      />
      
      <StatCard
        title="Total Patients"
        value="1,247"
        change="+15.3%"
        changeType="increase"
        icon={Users}
        description="Registered patients"
      />
      
      <StatCard
        title="Today's Revenue"
        value="₹8,450"
        change="+5.7%"
        changeType="increase"
        icon={TrendingUp}
        description="Revenue generated today"
      />
      
      <StatCard
        title="Total Invoices"
        value="456"
        change="+20.1%"
        changeType="increase"
        icon={FileText}
        description="Invoices generated this month"
      />
      
      <StatCard
        title="Pending Payments"
        value="₹45,230"
        change="-2.4%"
        changeType="increase"
        icon={Clock}
        description="Outstanding payment amount"
      />
    </div>
  );
}