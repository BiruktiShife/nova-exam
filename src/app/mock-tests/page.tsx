'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedContainer, AnimatedCard, AnimatedHero } from '@/components/AnimatedSections';
import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  youtubeUrl: string;
  description: string;
}

const practiceLinks = [
  { 
    title: "IELTS Practice", 
    href: "https://www.ielts.org/for-test-takers/sample-test-questions",
    description: "Official IELTS practice materials and sample tests"
  },
  { 
    title: "TOEFL Practice", 
    href: "https://www.ets.org/toefl/test-takers/ibt/prepare.html",
    description: "Official TOEFL iBT preparation resources"
  },
  { 
    title: "PTE Practice", 
    href: "https://www.pearsonpte.com/prepare",
    description: "Pearson PTE Academic preparation materials"
  },
];

export default function MockTestsPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch videos from API
  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch('/api/videos');
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (youtubeUrl: string) => {
    // If it's already just the video ID
    if (!youtubeUrl.includes('youtube.com') && !youtubeUrl.includes('youtu.be')) {
      return `https://www.youtube.com/embed/${youtubeUrl}`;
    }
    
    // If it's a full YouTube URL, extract the ID
    const match = youtubeUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : youtubeUrl;
  };

  if (loading) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8">
          
          {/* Mock Tests Animation */}
          <div className="relative">
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center border-2 border-blue-200">
              <FileText className="w-10 h-10 text-blue-400 animate-pulse" />
            </div>
            <div className="absolute -inset-2 border-2 border-blue-100 rounded-2xl animate-ping"></div>
          </div>

          {/* Mock Tests Content */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-blue-600 bg-clip-text text-transparent">
              Loading Practice Materials
            </h2>
            <p className="text-muted-foreground text-lg">
              Preparing mock tests and video resources...
            </p>
          </div>

          {/* Resource Loading Progress */}
          <div className="w-full max-w-2xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">TOEFL Practice Tests</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">IELTS Preparation Materials</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Video Lessons</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>

          {/* Video Grid Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-card border border-border rounded-xl p-4 animate-pulse">
                <div className="aspect-video bg-muted rounded-lg mb-4"></div>
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedHero>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Mock Tests & Resources
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Access practice tests, video lessons, and expert resources to ace your English exams
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg">
                  <a href="#practice-tests">View Practice Tests</a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#video-lessons">Watch Video Lessons</a>
                </Button>
              </div>
            </AnimatedHero>
          </div>
        </div>
      </section>

      {/* Practice Tests Section */}
      <section id="practice-tests" className="container mx-auto px-4 py-12 md:py-16">
        <AnimatedContainer>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Official Practice Tests</h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Quick links to trusted practice websites and official exam resources
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceLinks.map((link, index) => (
              <AnimatedCard key={link.title} delay={index * 0.1}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
                  <CardHeader>
                    <CardTitle className="text-lg">{link.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
                    <Button asChild className="w-full">
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        Visit Website
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </AnimatedContainer>
      </section>

      {/* Video Lessons Section */}
      <section id="video-lessons" className="bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <AnimatedContainer>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">TOEFL Preparation Videos</h2>
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Expert video lessons covering all sections of the TOEFL exam
            </p>

            {/* Video Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <AnimatedCard key={video.id} delay={index * 0.1}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base leading-tight">{video.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* YouTube Video Embed */}
                      <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-4">
                        <iframe
                          src={getYouTubeEmbedUrl(video.youtubeUrl)}
                          title={video.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      
                      {/* Your Custom Description */}
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {video.description}
                      </p>
                      
                      <Button asChild variant="outline" className="w-full">
                        <a 
                          href={`https://www.youtube.com/watch?v=${video.youtubeUrl}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Watch on YouTube
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              ))}
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <AnimatedContainer>
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Test Your Skills?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Take your preparation to the next level with our personalized mock tests and expert feedback
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg">
                <a href="/booking">Book a Mock Test</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/contact">Get Study Plan</a>
              </Button>
            </div>
          </div>
        </AnimatedContainer>
      </section>
    </div>
  );
}