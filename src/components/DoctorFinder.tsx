
import React, { useState } from 'react';
import { Search, Heart, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  distance: string;
  rating: number;
  availableSlots: string[];
  acceptingNewPatients: boolean;
}

const DoctorFinder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [distance, setDistance] = useState('');
  
  // Mock data - in a real app, this would come from an API
  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      location: '123 Medical Center Dr, Suite 101',
      distance: '2.3 miles',
      rating: 4.8,
      availableSlots: ['Tomorrow at 10:00 AM', 'Apr 25 at 2:30 PM', 'Apr 26 at 11:15 AM'],
      acceptingNewPatients: true
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      location: '456 Health Parkway, Building B',
      distance: '3.7 miles',
      rating: 4.6,
      availableSlots: ['Apr 24 at 9:15 AM', 'Apr 27 at 1:00 PM'],
      acceptingNewPatients: true
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Primary Care',
      location: '789 Wellness Ave, Suite 205',
      distance: '1.8 miles',
      rating: 4.9,
      availableSlots: ['Tomorrow at 8:30 AM', 'Tomorrow at 3:45 PM', 'Apr 25 at 10:30 AM'],
      acceptingNewPatients: true
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialty: 'Neurologist',
      location: '567 Brain Health Center',
      distance: '4.2 miles',
      rating: 4.7,
      availableSlots: ['Apr 27 at 11:30 AM', 'Apr 28 at 2:15 PM'],
      acceptingNewPatients: false
    }
  ];

  // Filter doctors based on search query and filters
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = 
      searchQuery === '' || 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = 
      specialty === '' || 
      doctor.specialty.toLowerCase() === specialty.toLowerCase();
    
    return matchesSearch && matchesSpecialty;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call
    console.log('Searching for:', searchQuery, specialty, distance);
  };

  // Generate star rating display
  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-4 h-4 ${
                star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="ml-1 text-sm text-gray-500">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Find a Doctor</h2>
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by doctor name, specialty, or symptoms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="grid grid-cols-2 md:flex gap-4">
                  <Select value={specialty} onValueChange={setSpecialty}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Specialties</SelectItem>
                      <SelectItem value="cardiologist">Cardiologist</SelectItem>
                      <SelectItem value="primary care">Primary Care</SelectItem>
                      <SelectItem value="neurologist">Neurologist</SelectItem>
                      <SelectItem value="dermatologist">Dermatologist</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={distance} onValueChange={setDistance}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Distance</SelectItem>
                      <SelectItem value="5">Within 5 miles</SelectItem>
                      <SelectItem value="10">Within 10 miles</SelectItem>
                      <SelectItem value="25">Within 25 miles</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="submit" className="w-full md:w-auto">Search</Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          {filteredDoctors.length} 
          {specialty ? ` ${specialty}` : ''} doctors available
        </h3>
        
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{doctor.name}</CardTitle>
                      <div className="flex items-center mt-1">
                        <Heart size={16} className="text-primary mr-1" />
                        <span className="text-sm">{doctor.specialty}</span>
                      </div>
                    </div>
                    <Badge variant={doctor.acceptingNewPatients ? "default" : "outline"}>
                      {doctor.acceptingNewPatients ? "Accepting Patients" : "Not Accepting Patients"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2 space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm">{doctor.location}</p>
                      <p className="text-xs text-muted-foreground">{doctor.distance}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>{renderStarRating(doctor.rating)}</div>
                    <Button variant="link" size="sm" className="p-0 h-auto">View Profile</Button>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start pt-0">
                  <p className="text-sm font-medium mb-2">Next Available:</p>
                  <div className="flex flex-wrap gap-2">
                    {doctor.availableSlots.slice(0, 3).map((slot, index) => (
                      <Button key={index} variant="outline" size="sm" className="text-xs">
                        {slot}
                      </Button>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-muted/50 rounded-lg">
            <Search size={40} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No doctors found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorFinder;
