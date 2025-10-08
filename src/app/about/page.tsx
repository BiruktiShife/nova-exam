'use client';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Award, Globe, BookOpen, Star, GraduationCap, Calendar, MessageCircle } from 'lucide-react';

export default function AboutUs() {
  const stats = [
    { number: "10,000+", label: "Students Helped", icon: Users },
    { number: "98%", label: "Success Rate", icon: Target },
    { number: "4.9/5", label: "Student Rating", icon: Star },
    { number: "50+", label: "Expert Tutors", icon: Award }
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for the highest standards in test preparation and student outcomes."
    },
    {
      icon: Users,
      title: "Student-Centric",
      description: "Every decision we make is focused on our students' success and growth."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Helping students worldwide achieve their international education dreams."
    },
    {
      icon: BookOpen,
      title: "Innovation",
      description: "Continuously evolving our methods with the latest teaching technologies."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Academic Director",
      expertise: "PhD in Linguistics, 15+ years experience",
      initials: "SC"
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Test Preparation",
      expertise: "TOEFL/IELTS Specialist, 12 years experience",
      initials: "MR"
    },
    {
      name: "Emily Johnson",
      role: "Student Success Manager",
      expertise: "Education Psychology, 10 years experience",
      initials: "EJ"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/5 to-primary/10 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-semibold">
              🎓 About NovaPrep
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Your Trusted Partner in <span className="text-primary">Exam Success</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Empowering students worldwide to achieve their academic dreams through 
              innovative test preparation and personalized guidance since 2015.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <a href="/booking">Book Your Exam</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/contact">Contact Our Team</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <stat.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-semibold">
              🎯 Our Purpose
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Driving <span className="text-primary">Educational Excellence</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Committed to transforming test preparation through innovation and student-centered approaches
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-lg text-foreground leading-relaxed">
                    To provide world-class test preparation that empowers students to achieve 
                    their highest potential. We believe every student deserves access to 
                    quality education and the opportunity to pursue their international academic dreams.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-lg text-foreground leading-relaxed">
                    To become the most trusted and innovative test preparation platform globally, 
                    transforming how students prepare for international exams and opening doors 
                    to world-class educational opportunities.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-semibold">
              💫 Our Values
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Principles That <span className="text-primary">Guide Us</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Core beliefs that shape our approach to education and student success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <value.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      // Team Section with Horizontal Scrolling - Reduced Card Size
<section className="py-20 bg-muted/30">
  <div className="container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-semibold">
        👥 Our Team
      </Badge>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        Meet Our <span className="text-primary">Expert Team</span>
      </h2>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Dedicated professionals committed to your exam success
      </p>
    </motion.div>

    {/* Horizontal Scrolling Team Cards - Reduced Size */}
    <div className="relative overflow-hidden">
      <style jsx>{`
        .team-marquee {
          display: flex;
          animation: scroll-team 35s linear infinite;
          width: max-content;
        }
        .team-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes scroll-team {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div className="team-marquee">
        <div className="flex gap-4 pr-4">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="snap-start shrink-0 w-[280px] md:w-[300px]"
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="h-36 bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:from-primary/90 group-hover:to-primary transition-all duration-300">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white text-lg font-bold border-2 border-white/30">
                    {member.initials}
                  </div>
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="text-lg font-bold text-foreground mb-2">{member.name}</h3>
                  <p className="text-primary font-semibold text-sm mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-xs mb-3 leading-relaxed">{member.expertise}</p>
                  <Button variant="outline" size="sm" className="w-full text-sm">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex gap-4 pr-4" aria-hidden="true">
          {team.map((member, index) => (
            <div
              key={`duplicate-${member.name}`}
              className="snap-start shrink-0 w-[280px] md:w-[300px]"
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="h-36 bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:from-primary/90 group-hover:to-primary transition-all duration-300">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white text-lg font-bold border-2 border-white/30">
                    {member.initials}
                  </div>
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="text-lg font-bold text-foreground mb-2">{member.name}</h3>
                  <p className="text-primary font-semibold text-sm mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-xs mb-3 leading-relaxed">{member.expertise}</p>
                  <Button variant="outline" size="sm" className="w-full text-sm">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  );
}