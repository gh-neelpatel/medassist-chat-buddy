
import React from 'react';
import { Calendar, Heart, Pill, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkText: string;
  linkTo: string;
}

const DashboardCard = ({ title, description, icon, linkText, linkTo }: DashboardCardProps) => {
  return (
    <Card className="health-card h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-md">
            {icon}
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-sm">{description}</CardDescription>
        <Button variant="outline" className="mt-4 w-full" asChild>
          <a href={linkTo}>{linkText}</a>
        </Button>
      </CardContent>
    </Card>
  );
};

const DashboardCards = () => {
  const cards = [
    {
      title: "Health Records",
      description: "View your medical history, test results, and previous diagnoses all in one place.",
      icon: <FileText size={20} className="text-primary" />,
      linkText: "View Records",
      linkTo: "/health-records"
    },
    {
      title: "Find Doctors",
      description: "Get doctor recommendations based on your symptoms and medical history.",
      icon: <Heart size={20} className="text-primary" />,
      linkText: "Find Doctors",
      linkTo: "/doctor-finder"
    },
    {
      title: "Medication Tracker",
      description: "Track your medications, get reminders, and manage your prescriptions.",
      icon: <Pill size={20} className="text-primary" />,
      linkText: "Manage Medications",
      linkTo: "/medications"
    },
    {
      title: "Appointments",
      description: "Schedule and manage your appointments with healthcare providers.",
      icon: <Calendar size={20} className="text-primary" />,
      linkText: "View Appointments",
      linkTo: "/appointments"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <DashboardCard
          key={index}
          title={card.title}
          description={card.description}
          icon={card.icon}
          linkText={card.linkText}
          linkTo={card.linkTo}
        />
      ))}
    </div>
  );
};

export default DashboardCards;
