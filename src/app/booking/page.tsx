"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User, Mail, Phone, Calendar as CalendarIcon, CheckCircle2, X, FileText, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface ExamType {
  id: string;
  name: string;
  duration: string;
  fee: string;
}

interface TimeSlot {
  id: string;
  time: string;
}

interface Feature {
  id: string;
  icon: string;
  text: string;
}

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [examTypes, setExamTypes] = useState<ExamType[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    exam: "",
    date: "",
    time: "",
    fee: ""
  });

  // Fetch data from API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/data');
        const data = await response.json();
        setExamTypes(data.examTypes);
        setTimeSlots(data.timeSlots);
        setFeatures(data.features);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      
      const bookingData = {
        examTypeId: selectedExam,
        timeSlotId: selectedTime,
        date: selectedDate.toISOString(),
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        notes: formData.get('notes') as string,
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const booking = await response.json();
        
        // Set booking details for success modal
        setBookingDetails({
          name: formData.get('name') as string,
          exam: examTypes.find(e => e.id === selectedExam)?.name || "",
          date: selectedDate.toLocaleDateString(),
          time: timeSlots.find(t => t.id === selectedTime)?.time || "",
          fee: examTypes.find(e => e.id === selectedExam)?.fee || ""
        });
        
        // Show success modal
        setShowSuccess(true);
        
        // Reset form
        (e.target as HTMLFormElement).reset();
        setSelectedExam("");
        setSelectedTime("");
        setSelectedDate(new Date());
        
      } else {
        throw new Error('Failed to create booking');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Clock, CheckCircle2, MapPin, User
    };
    return icons[iconName] || User;
  };
if (loading) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8">
          
          {/* Booking-specific Animation */}
          <div className="relative">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center border-2 border-primary/20">
              <CalendarIcon className="w-10 h-10 text-primary/40 animate-pulse" />
            </div>
            <div className="absolute -inset-2 border-2 border-primary/10 rounded-2xl animate-ping"></div>
          </div>

          {/* Booking-specific Content */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Preparing Your Booking
            </h2>
            <p className="text-muted-foreground text-lg">
              Loading available exam dates and time slots...
            </p>
          </div>

          {/* Booking Progress Steps */}
          <div className="w-full max-w-md space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Loading Exam Types</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Fetching Available Dates</span>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Loading Time Slots</span>
              <div className="w-2 h-2 bg-primary/50 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Calendar Skeleton */}
          <div className="bg-card border border-border rounded-xl p-6 animate-pulse w-full max-w-md">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="h-6 bg-muted rounded text-center"></div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {[...Array(35)].map((_, i) => (
                <div key={i} className="h-8 bg-muted rounded"></div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-semibold">
              🎯 Secure Your Test Date
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Book Your <span className="text-primary">Exam</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Reserve your preferred test date and time. Our team will confirm your booking within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Calendar & Exam Selection */}
            <div className="lg:col-span-2 space-y-8">
              {/* Exam Type Selection */}
              <Card className="shadow-lg border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    Select Exam Type
                  </CardTitle>
                  <CardDescription>
                    Choose your preferred exam and available time slot
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <Label htmlFor="exam-type" className="text-base font-semibold">
                      Exam Type *
                    </Label>
                    <Select value={selectedExam} onValueChange={setSelectedExam}>
                      <SelectTrigger className="w-full h-12">
                        <SelectValue placeholder="Choose your exam" />
                      </SelectTrigger>
                      <SelectContent>
                        {examTypes.map((exam) => (
                          <SelectItem key={exam.id} value={exam.id} className="py-3">
                            <div className="flex justify-between items-center w-full">
                              <span>{exam.name}</span>
                              <Badge variant="outline" className="ml-2">
                                {exam.fee}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Calendar Section */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">
                      Select Date *
                    </Label>
                    <div className="flex justify-center border rounded-lg p-4 bg-card">
                      <Calendar
                        mode="single"
                        selected={selectedDate ?? undefined}
                        onSelect={(date) => setSelectedDate(date || new Date())}
                        required={true}
                        className="rounded-md"
                        disabled={(date) => date < new Date()}
                      />
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">
                      Available Time Slots *
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot.id}
                          variant={selectedTime === slot.id ? "default" : "outline"}
                          onClick={() => setSelectedTime(slot.id)}
                          className="h-12"
                        >
                          {slot.time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {features.map((feature) => {
                  const IconComponent = getIconComponent(feature.icon);
                  return (
                    <Card key={feature.id} className="text-center p-4 shadow-sm border-0 bg-card/50">
                      <IconComponent className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">{feature.text}</p>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Right Column - Booking Form */}
            <div className="space-y-8">
              <Card className="shadow-xl border-0 sticky top-8">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Details
                  </CardTitle>
                  <CardDescription>
                    Complete your reservation details
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name" className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Full Name *
                        </Label>
                        <Input 
                          id="name" 
                          name="name"
                          placeholder="Jane Doe" 
                          className="h-12"
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email Address *
                        </Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email" 
                          placeholder="you@example.com" 
                          className="h-12"
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone Number *
                        </Label>
                        <Input 
                          id="phone" 
                          name="phone"
                          type="tel" 
                          placeholder="+1 555 000 0000" 
                          className="h-12"
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="notes">
                          Additional Notes
                        </Label>
                        <Textarea 
                          id="notes" 
                          name="notes"
                          placeholder="Special requirements, accessibility needs, etc." 
                          className="min-h-[100px] resize-none"
                        />
                      </div>
                    </div>

                    {/* Booking Summary */}
                    <Card className="bg-muted/50 border">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3">Booking Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Exam:</span>
                            <span className="font-medium">
                              {selectedExam ? examTypes.find(e => e.id === selectedExam)?.name : "Not selected"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Date:</span>
                            <span className="font-medium">
                              {selectedDate?.toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Time:</span>
                            <span className="font-medium">
                              {selectedTime ? timeSlots.find(t => t.id === selectedTime)?.time : "Not selected"}
                            </span>
                          </div>
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between font-semibold">
                              <span>Total:</span>
                              <span>
                                {selectedExam ? examTypes.find(e => e.id === selectedExam)?.fee : "$0"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      size="lg"
                      disabled={submitting || !selectedExam || !selectedTime}
                    >
                      {submitting ? 'Creating Booking...' : 'Confirm Booking'}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By booking, you agree to our terms and conditions. 
                      Cancellation policy applies.
                    </p>
                  </form>
                </CardContent>
              </Card>

              {/* Support Card */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <Phone className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h4 className="font-semibold mb-2">Need Help?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our support team is here to assist you
                  </p>
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-background rounded-2xl shadow-2xl max-w-md w-full border border-border animate-in fade-in-90 zoom-in-90">
            {/* Close Button */}
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-muted/80 hover:bg-muted flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            >
              <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Success Content */}
            <div className="p-8 text-center">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>

              {/* Success Title */}
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Booking Confirmed!
              </h2>
              
              <p className="text-muted-foreground mb-6">
                Your exam has been successfully booked. We've sent a confirmation to your email.
              </p>

              {/* Booking Details */}
              <Card className="bg-muted/30 border-border/50 mb-6">
                <CardContent className="p-4">
                  <div className="space-y-3 text-left">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Name:</span>
                      <span className="font-medium">{bookingDetails.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Exam:</span>
                      <span className="font-medium">{bookingDetails.exam}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Date:</span>
                      <span className="font-medium">{bookingDetails.date}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Time:</span>
                      <span className="font-medium">{bookingDetails.time}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-border/50">
                      <span className="text-sm font-semibold">Total Paid:</span>
                      <span className="font-bold text-green-600">{bookingDetails.fee}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  What's Next?
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Confirmation email within 24 hours</li>
                  <li>• Test center details will be provided</li>
                  <li>• Bring valid ID on exam day</li>
                  <li>• Arrive 30 minutes before your slot</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowSuccess(false)}
                >
                  Close
                </Button>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}