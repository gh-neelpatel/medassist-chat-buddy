
import React, { useState } from 'react';
import { Menu, FileText, FileMedical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import HealthSummary from "@/components/HealthSummary";

const HealthRecords = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-offwhite">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="container max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Health Records</h1>
                <p className="text-muted-foreground">View and manage your health information</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="hidden md:flex items-center gap-2">
                  <FileText size={16} />
                  <span>Export Records</span>
                </Button>
                <Button size="icon" variant="outline" className="md:hidden" onClick={toggleSidebar}>
                  <Menu size={20} />
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="summary" className="space-y-4">
              <TabsList className="w-full grid grid-cols-3 md:w-auto md:inline-flex">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="visits">Visits & Procedures</TabsTrigger>
                <TabsTrigger value="test-results">Test Results</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary" className="space-y-4">
                <HealthSummary />
              </TabsContent>
              
              <TabsContent value="visits" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Recent Visits</h2>
                    <Button variant="outline" size="sm">See All</Button>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { 
                        date: '2024-04-10', 
                        provider: 'Dr. Sarah Johnson',
                        type: 'Annual Physical',
                        notes: 'General health assessment. Recommended lifestyle changes to address elevated blood pressure.'
                      },
                      { 
                        date: '2024-02-15', 
                        provider: 'Dr. Michael Chen',
                        type: 'Cardiology Consultation',
                        notes: 'Follow-up on heart health. Prescribed medication for blood pressure management.'
                      },
                      { 
                        date: '2024-01-08', 
                        provider: 'Dr. Emily Rodriguez',
                        type: 'Urgent Care Visit',
                        notes: 'Treatment for acute bronchitis. Prescribed antibiotics and advised rest.'
                      }
                    ].map((visit, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-gray-100">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{visit.type}</h3>
                            <p className="text-sm text-muted-foreground">{visit.provider}</p>
                          </div>
                          <p className="text-sm">
                            {new Date(visit.date).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="text-sm">{visit.notes}</p>
                        <div className="mt-3 flex justify-end">
                          <Button variant="link" size="sm" className="h-auto p-0">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="test-results" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Test Results</h2>
                    <Button variant="outline" size="sm">
                      <FileMedical size={16} className="mr-2" />
                      Add Results
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { 
                        date: '2024-04-10', 
                        test: 'Complete Blood Count (CBC)',
                        result: 'Normal',
                        details: 'All values within normal ranges.'
                      },
                      { 
                        date: '2024-04-10', 
                        test: 'Lipid Panel',
                        result: 'Abnormal',
                        details: 'LDL cholesterol slightly elevated at 160 mg/dL (normal range: <130 mg/dL).'
                      },
                      { 
                        date: '2024-02-15', 
                        test: 'Electrocardiogram (ECG)',
                        result: 'Normal',
                        details: 'Normal sinus rhythm. No significant abnormalities detected.'
                      }
                    ].map((test, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-gray-100">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{test.test}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(test.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className={`px-2 py-1 text-xs rounded-full ${
                            test.result === 'Normal' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {test.result}
                          </div>
                        </div>
                        <p className="text-sm">{test.details}</p>
                        <div className="mt-3 flex justify-end">
                          <Button variant="link" size="sm" className="h-auto p-0">
                            View Full Results
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HealthRecords;
