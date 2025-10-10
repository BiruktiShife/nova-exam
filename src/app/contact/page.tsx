"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactTopics = [
    { value: "booking", label: "Exam Booking & Scheduling" },
    { value: "support", label: "Technical Support" },
    { value: "results", label: "Results & Certificates" },
    { value: "partnership", label: "Partnership & Corporate" },
    { value: "general", label: "General Inquiry" },
    { value: "feedback", label: "Feedback & Suggestions" }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our team",
      details: "+234 800 000 0000",
      action: "Call Now",
      color: "text-blue-600"
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us a detailed message",
      details: "hello@novaexam.com",
      action: "Send Email",
      color: "text-green-600"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Instant help available",
      details: "Available 9AM-6PM",
      action: "Start Chat",
      color: "text-purple-600"
    }
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "b90454d5-1515-493a-97f6-c4f1081ec5de",
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          topic: selectedTopic,
          message: formData.get("message"),
          subject: `Contact Form: ${selectedTopic} - ${formData.get("firstName")} ${formData.get("lastName")}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        form.reset();
        setSelectedTopic("");
        console.log("Form submitted successfully:", result);
      } else {
        console.error("Form submission failed:", result);
        alert("There was an error submitting the form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-semibold">
              ✅ Message Sent
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Thank You for <span className="text-primary">Contacting Us</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Your message has been received successfully. We'll get back to you within 24 hours.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="h-12 text-base font-semibold"
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-semibold">
            💬 Get In Touch
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Contact <span className="text-primary">Our Team</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We&apos;re here to help you with any questions about exam booking, preparation, or support.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Methods & Info */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <Card className="shadow-lg border-0">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Quick Contact
                </CardTitle>
                <CardDescription>
                  Choose your preferred way to reach us
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => (
                  <Card key={index} className="p-4 border hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg bg-primary/10 ${method.color}`}>
                        <method.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{method.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{method.description}</p>
                        <p className="text-sm font-medium">{method.details}</p>
                        <Button variant="outline" size="sm" className="mt-2 w-full">
                          {method.action}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Office Hours & Info */}
            <Card className="shadow-lg border-0">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Office Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Visit Our Center</h4>
                    <p className="text-sm text-muted-foreground">
                      123 Nova Street, Central Business District<br />
                      Abuja, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Operating Hours</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span className="font-medium">8:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday:</span>
                        <span className="font-medium">9:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span className="font-medium text-red-500">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Contact Form */}
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Send Us a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we&apos;ll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name *
                    </Label>
                    <Input 
                      id="firstName" 
                      name="firstName"
                      placeholder="Jane" 
                      className="h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name *
                    </Label>
                    <Input 
                      id="lastName" 
                      name="lastName"
                      placeholder="Doe" 
                      className="h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
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

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    type="tel" 
                    placeholder="+234 800 000 0000" 
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic" className="text-sm font-medium">
                    Inquiry Topic *
                  </Label>
                  <Select value={selectedTopic} onValueChange={setSelectedTopic} required>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {contactTopics.map((topic) => (
                        <SelectItem key={topic.value} value={topic.value}>
                          {topic.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Your Message *
                  </Label>
                  <Textarea 
                    id="message" 
                    name="message"
                    placeholder="Please describe your inquiry in detail..." 
                    className="min-h-[140px] resize-none"
                    required
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4" />
                  We typically respond within 24 hours during business days
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Right Column - Map */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Visit Our Center
                </CardTitle>
                <CardDescription>
                  Come see us at our conveniently located test center
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-square">
                  <iframe
                    title="NovaPrep Test Center Location"
                    className="w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.715834242073!2d7.489125275019195!3d9.057844291048492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b292c8d5f5f%3A0x6a3e315c3a8d7a0f!2sCentral%20Business%20District%2C%20Abuja%2C%20Federal%20Capital%20Territory!5e0!3m2!1sen!2sng!4v1710950400000"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Info Card */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="text-center">
                  <Phone className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h4 className="font-semibold mb-2">Emergency Support</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    For urgent exam-related issues on test days
                  </p>
                  <div className="bg-background rounded-lg p-3 mb-3">
                    <p className="font-mono text-sm font-semibold">+234 800 000 0001</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Emergency Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}