
import React, { useState } from 'react';
import { Search, MapPin, Stethoscope } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  distance: string;
  rating: number;
  availability: string;
}

const DoctorFinder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  
  // Mock data for doctors
  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      location: 'Downtown Medical Center',
      distance: '1.2 miles',
      rating: 4.8,
      availability: 'Next available: Today'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Family Medicine',
      location: 'Community Health Clinic',
      distance: '0.8 miles',
      rating: 4.6,
      availability: 'Next available: Tomorrow'
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrician',
      location: 'Children\'s Medical Group',
      distance: '2.4 miles',
      rating: 4.9,
      availability: 'Next available: In 2 days'
    }
  ];
  
  // Filter doctors based on search term, specialty, and location
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialty === '' || doctor.specialty === specialty;
    const matchesLocation = location === '' || doctor.location.includes(location);
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });
  
  // Generate star rating display
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-yellow-400">★</span>
        ))}
        {hasHalfStar && <span className="text-yellow-400">★</span>}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <span key={i} className="text-gray-300">★</span>
        ))}
        <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Find a Doctor</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search by name or specialty"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div>
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                <SelectItem value="Family Medicine">Family Medicine</SelectItem>
                <SelectItem value="Pediatrician">Pediatrician</SelectItem>
                <SelectItem value="Dermatologist">Dermatologist</SelectItem>
                <SelectItem value="Orthopedist">Orthopedist</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Downtown Medical Center">Downtown Medical Center</SelectItem>
                <SelectItem value="Community Health Clinic">Community Health Clinic</SelectItem>
                <SelectItem value="Children's Medical Group">Children's Medical Group</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map(doctor => (
            <Card key={doctor.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-primary/5 p-6 flex items-center justify-center md:w-1/4">
                    <div className="rounded-full bg-primary/10 p-6">
                      <Stethoscope className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="p-6 md:w-3/4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-lg font-bold">{doctor.name}</h3>
                      <div className="mt-1 md:mt-0">
                        {renderStars(doctor.rating)}
                      </div>
                    </div>
                    <p className="text-primary font-medium">{doctor.specialty}</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-2">
                      <MapPin size={16} className="mr-1" />
                      {doctor.location} ({doctor.distance})
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
                      <p className="text-sm font-medium text-green-600">{doctor.availability}</p>
                      <div className="mt-3 md:mt-0 space-x-2">
                        <Button variant="outline" size="sm">View Profile</Button>
                        <Button size="sm">Book Appointment</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p>No doctors found matching your criteria. Try adjusting your search filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorFinder;
