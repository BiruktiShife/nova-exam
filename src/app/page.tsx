'use client';
import Image from "next/image";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Star, Users, Award, Clock, BookOpen, CheckCircle2, ArrowRight, Play } from "lucide-react";
import HeroSection from "@/components/ui/Hero";

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Materials",
      description: "Access to latest exam patterns and practice tests"
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from certified exam specialists"
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Study at your own pace with 24/7 access"
    },
    {
      icon: Award,
      title: "Guaranteed Improvement",
      description: "Score improvement or money-back guarantee"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />

      

      {/* Features Section */}
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
              🚀 Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Path to <span className="text-primary">Exam Success</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive preparation resources and expert guidance to help you achieve your target score
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Success Carousel */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-semibold">
              🏆 Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Transforming <span className="text-primary">Dreams into Reality</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of students who achieved their target scores with our guidance
            </p>
          </motion.div>

          <div className="relative overflow-hidden">
            <MarqueeRow>
              {[
                { 
                  img: "/student-1.svg", 
                  name: "Amina", 
                  score: "IELTS Band 8", 
                  text: "Achieved after 4 weeks of focused preparation",
                  improvement: "+2.0 Bands"
                },
                { 
                  img: "/student-2.svg", 
                  name: "Chidi", 
                  score: "TOEFL 108", 
                  text: "Weekend intensive plan success",
                  improvement: "+15 Points"
                },
                { 
                  img: "/student-3.svg", 
                  name: "Zara", 
                  score: "PTE 85", 
                  text: "Confident and calm throughout the test",
                  improvement: "+12 Points"
                },
                { 
                  img: "/student-1.svg", 
                  name: "Omar", 
                  score: "Writing +2 Bands", 
                  text: "Massive improvement in writing skills",
                  improvement: "+2.0 Bands"
                },
                { 
                  img: "/student-2.svg", 
                  name: "Lola", 
                  score: "Speaking 8.5", 
                  text: "Mastered speaking strategies that work",
                  improvement: "+1.5 Bands"
                },
                { 
                  img: "/student-3.svg", 
                  name: "Kofi", 
                  score: "IELTS Band 7.5", 
                  text: "From Band 6 to 7.5 in 6 weeks",
                  improvement: "+1.5 Bands"
                },
              ].map((s, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 16 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.4, delay: i * 0.05 }} 
                  className="snap-start shrink-0 w-[320px] md:w-[380px] mx-4"
                >
                  <Card className="h-full hover:-translate-y-2 transition-all duration-300 shadow-xl hover:shadow-2xl border-0 bg-card/95 backdrop-blur-sm group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0">
                          <Image 
                            src={s.img} 
                            alt={s.name} 
                            width={64} 
                            height={64} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-bold text-lg text-foreground">{s.name}</h3>
                            <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
                              {s.improvement}
                            </Badge>
                          </div>
                          <p className="font-semibold text-primary text-sm">{s.score}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{s.text}</p>
                      <div className="flex items-center gap-1 mt-4 text-primary">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </MarqueeRow>
          </div>
        </div>
      </section>

      {/* Mock Tests Section */}
      <section id="mock-tests" className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-semibold">
              📝 Practice Resources
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Master Your <span className="text-primary">Exam Skills</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access official mock tests and comprehensive practice materials
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                title: "IELTS Academic", 
                href: "https://www.ielts.org/for-test-takers/sample-test-questions",
                description: "Official IELTS practice tests with detailed feedback and scoring",
                color: "from-red-500 to-orange-500",
                icon: "🇬🇧",
                tests: "10+ Practice Tests"
              },
              { 
                title: "TOEFL iBT", 
                href: "https://www.ets.org/toefl/test-takers/ibt/prepare.html",
                description: "Comprehensive TOEFL iBT preparation with speaking evaluation",
                color: "from-blue-500 to-purple-500",
                icon: "🇺🇸",
                tests: "8+ Full Simulations"
              },
              { 
                title: "PTE Academic", 
                href: "https://www.pearsonpte.com/prepare",
                description: "Pearson PTE academic practice with AI-powered feedback",
                color: "from-green-500 to-teal-500",
                icon: "🇦🇺",
                tests: "12+ Mock Exams"
              },
            ].map((exam, index) => (
              <motion.div 
                key={exam.title} 
                initial={{ opacity: 0, y: 24 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:-translate-y-2 transition-all duration-300 shadow-xl hover:shadow-2xl border-0 group">
                  <div className={`h-2 bg-gradient-to-r ${exam.color} rounded-t-lg`} />
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <span className="text-2xl">{exam.icon}</span>
                        {exam.title}
                      </CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {exam.tests}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      {exam.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <div className="space-y-3 mb-6">
                      {[
                        "Full-length practice tests",
                        "Detailed answer explanations",
                        "Performance analytics",
                        "Timed exam simulations"
                      ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button asChild className="w-full bg-primary hover:bg-primary/90 shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <a href={exam.href} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2">
                        <Play className="w-4 h-4" />
                        Start Practicing
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-semibold">
              💫 Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted by <span className="text-primary">Thousands</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from students who transformed their exam preparation journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "The personalized study plan and expert feedback helped me jump from Band 6 to 8 in just 8 weeks. The speaking practice sessions were particularly transformative!",
                name: "Sarah Johnson",
                role: "IELTS Band 8",
                achievement: "Admitted to University of Toronto",
                rating: 5
              },
              {
                quote: "As a working professional, the flexible schedule and comprehensive materials made it possible to prepare effectively. Scored 115/120 in TOEFL!",
                name: "Michael Chen",
                role: "TOEFL 115",
                achievement: "MBA Candidate at Harvard",
                rating: 5
              },
              
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="text-4xl text-primary/60 mb-4">&quot;</div>
                    <p className="text-foreground leading-relaxed mb-6 italic">
                      {testimonial.quote}
                    </p>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-foreground">{testimonial.name}</div>
                        <div className="text-primary font-medium text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">{testimonial.achievement}</div>
                      <div className="flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      

      {/* Floating WhatsApp button */}
      <motion.a
        href="https://wa.me/2348000000000"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-2xl hover:scale-110 transition-all duration-300"
        aria-label="Chat on WhatsApp"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
        </span>
      </motion.a>
    </div>
  );
}

// CSS marquee version: duplicates content to create an infinite loop and pauses on hover
function MarqueeRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <style jsx>{`
        .marquee {
          display: flex;
          animation: scroll 40s linear infinite;
          width: max-content;
        }
        .marquee:hover {
          animation-play-state: paused;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div className="marquee">
        <div className="flex gap-6 pr-6">{children}</div>
        <div className="flex gap-6 pr-6" aria-hidden>{children}</div>
      </div>
    </div>
  );
}