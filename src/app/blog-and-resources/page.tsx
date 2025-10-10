'use client';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, X, Calendar, FileText, Brain, PenTool, Download, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Blog {
  id: string;
  title: string;
  description: string;
  date: string;
}
const resources = [
    {
      icon: FileText,
      title: "Study Guide PDF",
      description: "Comprehensive exam preparation guide with tips and practice questions.",
      link: "#",
      action: "Download"
    },
    {
      icon: Brain,
      title: "Mock Test Portal",
      description: "Practice with real exam simulations to improve speed and accuracy.",
      link: "#",
      action: "Try Now"
    },
    {
      icon: PenTool,
      title: "Essay Writing Toolkit",
      description: "Boost your writing score with templates, examples, and grammar checklists.",
      link: "#",
      action: "Access"
    }
  ];

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch blogs from API
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  // Limit description to first 10 words
  const truncateToWords = (description: string, wordCount: number = 10) => {
    const words = description.split(' ');
    if (words.length <= wordCount) return description;
    return words.slice(0, wordCount).join(' ') + '...';
  };

  const openModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  if (loading) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8">
          
          {/* Blogs & Resources Animation */}
          <div className="relative">
            <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center border-2 border-green-200">
              <BookOpen className="w-10 h-10 text-green-400 animate-pulse" />
            </div>
            <div className="absolute -inset-2 border-2 border-green-100 rounded-2xl animate-ping"></div>
          </div>

          {/* Blogs & Resources Content */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-green-600 bg-clip-text text-transparent">
              Loading Knowledge Hub
            </h2>
            <p className="text-muted-foreground text-lg">
              Gathering insightful articles and learning resources...
            </p>
          </div>

          {/* Content Loading Progress */}
          <div className="w-full max-w-md bg-card border border-border rounded-xl p-6 animate-pulse">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
              <div className="h-3 bg-muted rounded w-full"></div>
              <div className="h-3 bg-muted rounded w-5/6"></div>
              <div className="h-3 bg-muted rounded w-4/6"></div>
            </div>
          </div>

          {/* Blog Grid Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-card border border-border rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-muted rounded w-20 mb-4"></div>
                <div className="h-6 bg-muted rounded w-full mb-3"></div>
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-muted rounded w-full"></div>
                  <div className="h-3 bg-muted rounded w-5/6"></div>
                  <div className="h-3 bg-muted rounded w-4/6"></div>
                </div>
                <div className="h-8 bg-muted rounded"></div>
              </div>
            ))}
          </div>

          {/* Resource Cards Skeleton */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-card border border-border rounded-xl p-6 animate-pulse">
                <div className="w-12 h-12 bg-muted rounded-full mx-auto mb-4"></div>
                <div className="h-5 bg-muted rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-muted rounded w-full mb-3"></div>
                <div className="h-3 bg-muted rounded w-5/6 mx-auto"></div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}
  return (
    <>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge
              variant="secondary"
              className="mb-4 px-4 py-1 text-sm font-semibold tracking-wide"
            >
              📰 Our Blog
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Latest Insights & <span className="text-primary">Expert Tips</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fresh ideas and strategies to help you grow, learn smarter, and stay
              inspired.
            </p>
          </motion.div>

          {/* Blog Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border border-border bg-gradient-to-b from-background to-muted/20 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    {/* Date */}
                    <div>
                      <p className="text-xs text-primary font-semibold uppercase tracking-wide mb-3">
                        {blog.date}
                      </p>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-foreground mb-3 relative group-hover:text-primary transition-colors duration-300">
                        {blog.title}
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                      </h3>

                      {/* Truncated Description (10 words) */}
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {truncateToWords(blog.description, 10)}
                      </p>
                    </div>

                    {/* Read More Button */}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group/btn"
                      onClick={() => openModal(blog)}
                    >
                      <span className="flex items-center justify-center group-hover/btn:text-primary transition-colors duration-300">
                        Read More
                        <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Detail Modal */}
      {isModalOpen && selectedBlog && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-background rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-muted/80 hover:bg-muted flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            >
              <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[80vh]">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1 bg-background/50 px-3 py-1 rounded-full">
                    <Calendar className="w-3 h-3" />
                    <span>{selectedBlog.date}</span>
                  </div>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                  {selectedBlog.title}
                </h2>
              </div>

              {/* Blog Content - Only from database */}
              <div className="p-6">
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line">
                    {selectedBlog.description}
                  </p>
                </div>

                {/* Close Button */}
                <div className="flex gap-3 mt-6 pt-6 border-t border-border">
                  <Button 
                    variant="default" 
                    className="flex-1"
                    onClick={closeModal}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {/* Resources Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-semibold">
              📚 Resources
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Boost Your Preparation with <span className="text-primary">Useful Tools</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access our free study materials, guides, and test prep utilities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                  <CardHeader className="flex flex-col items-center justify-center space-y-2 pt-8 pb-2">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <resource.icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-center text-xl font-bold mt-4">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground mb-6 leading-relaxed">{resource.description}</p>
                    <Button asChild variant="default" size="sm" className="w-full">
                      <a href={resource.link}>
                        {resource.action} <Download className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}


