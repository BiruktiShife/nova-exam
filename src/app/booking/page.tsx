"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User, Mail, Phone, Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const examTypes = [
    { id: "ielts", name: "IELTS Academic", duration: "2 hours 45 min", fee: "$245" },
    { id: "toefl", name: "TOEFL iBT", duration: "3 hours", fee: "$225" },
    { id: "pte", name: "PTE Academic", duration: "2 hours", fee: "$200" },
    { id: "duolingo", name: "Duolingo English Test", duration: "1 hour", fee: "$49" }
  ];

  const timeSlots = [
    "09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "03:30 PM", "05:00 PM"
  ];

  const features = [
    { icon: Clock, text: "Quick Results" },
    { icon: CheckCircle2, text: "Official Certification" },
    { icon: MapPin, text: "Convenient Location" },
    { icon: User, text: "Expert Proctors" }
  ];

  return (
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
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className="h-12"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="text-center p-4 shadow-sm border-0 bg-card/50">
                  <feature.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">{feature.text}</p>
                </Card>
              ))}
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
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name *
                      </Label>
                      <Input 
                        id="name" 
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
                            {selectedTime || "Not selected"}
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
                  >
                    Confirm Booking
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
  );
}