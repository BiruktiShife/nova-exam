import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedContainer, AnimatedCard, AnimatedHero } from '@/components/AnimatedSections';

// YouTube video data for TOEFL preparation
const youtubeVideos = [
  {
    id: '1',
    title: 'TOEFL Speaking Test - Full Practice with Answers',
    youtubeId: 'rA5g7pHLtIs',
    channel: 'Notefull TOEFL Mastery',
    duration: '18:32',
    category: 'Speaking'
  },
  {
    id: '2',
    title: 'TOEFL Writing Task 1 - Integrated Essay',
    youtubeId: 'VKMjU8Arx6E',
    channel: 'TST Prep TOEFL',
    duration: '15:47',
    category: 'Writing'
  },
  {
    id: '3',
    title: 'TOEFL Reading Section Strategies',
    youtubeId: '6m4jGgItfMY',
    channel: 'TOEFL with Andrea',
    duration: '22:15',
    category: 'Reading'
  },
  {
    id: '4',
    title: 'TOEFL Listening Practice Test',
    youtubeId: 'sBiG6gTlG2E',
    channel: 'Test Resources',
    duration: '25:10',
    category: 'Listening'
  },
  {
    id: '5',
    title: 'TOEFL Test Day Tips and Strategies',
    youtubeId: 'W_XoD7JOu2M',
    channel: 'GregMat TOEFL',
    duration: '12:35',
    category: 'Strategies'
  },
  {
    id: '6',
    title: 'TOEFL Vocabulary for High Scores',
    youtubeId: 'qZ4kZ1hLk7M',
    channel: 'English with Emma',
    duration: '14:28',
    category: 'Vocabulary'
  }
];

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
              {youtubeVideos.map((video, index) => (
                <AnimatedCard key={video.id} delay={index * 0.1}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {video.category}
                        </span>
                        <span className="text-xs text-muted-foreground">{video.duration}</span>
                      </div>
                      <CardTitle className="text-base leading-tight">{video.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{video.channel}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-3">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.youtubeId}`}
                          title={video.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <Button asChild variant="outline" className="w-full">
                        <a 
                          href={`https://www.youtube.com/watch?v=${video.youtubeId}`} 
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