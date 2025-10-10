"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, User, Mail, Phone, FileText, Video, Plus, Edit, Trash2, Eye, BookOpen, Clock, DollarSign, LogOut, X, CheckCircle, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  examType: {
    name: string;
    fee: string;
    duration: string;
  };
  timeSlot: {
    time: string;
  };
  notes?: string;
  createdAt: string;
}

interface Blog {
  id: string;
  title: string;
  description: string;
  date: string;
  createdAt: string;
}

interface Video {
  id: string;
  title: string;
  youtubeUrl: string;
  description: string;
  createdAt: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [showBlogSuccess, setShowBlogSuccess] = useState(false);
  const [showVideoSuccess, setShowVideoSuccess] = useState(false);
  const [successContent, setSuccessContent] = useState({
    title: "",
    type: "",
    details: ""
  });
  const router = useRouter();

  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: "",
    description: "",
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  });

  // Video form state
  const [videoForm, setVideoForm] = useState({
    title: "",
    youtubeUrl: "",
    description: ""
  });

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      
      if (isLoggedIn === "true") {
        setIsAuthenticated(true);
        fetchData();
      } else {
        // Redirect to login if not authenticated
        router.push("/login");
      }
      setAuthChecked(true);
    };

    checkAuth();
  }, [router]);

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [bookingsRes, blogsRes, videosRes] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/blogs'),
        fetch('/api/videos')
      ]);

      const bookingsData = await bookingsRes.json();
      const blogsData = await blogsRes.json();
      const videosData = await videosRes.json();

      setBookings(bookingsData);
      setBlogs(blogsData);
      setVideos(videosData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loginTime");
    router.push("/");
  };

  // Blog handlers
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogForm),
      });

      if (response.ok) {
        const newBlog = await response.json();
        
        // Set success content
        setSuccessContent({
          title: blogForm.title,
          type: "blog",
          details: `Your blog post "${blogForm.title}" has been successfully published and is now live on the website.`
        });
        
        // Show success modal
        setShowBlogSuccess(true);
        
        // Reset form and fetch data
        setBlogForm({ title: "", description: "", date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) });
        fetchData();
      }
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  const deleteBlog = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchData();
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  // Video handlers
  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(videoForm),
      });

      if (response.ok) {
        const newVideo = await response.json();
        
        // Set success content
        setSuccessContent({
          title: videoForm.title,
          type: "video",
          details: `Your video "${videoForm.title}" has been successfully added and is now available on the website.`
        });
        
        // Show success modal
        setShowVideoSuccess(true);
        
        // Reset form and fetch data
        setVideoForm({ title: "", youtubeUrl: "", description: "" });
        fetchData();
      }
    } catch (error) {
      console.error('Error creating video:', error);
    }
  };

  const deleteVideo = async (id: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      try {
        const response = await fetch(`/api/videos/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchData();
        }
      } catch (error) {
        console.error('Error deleting video:', error);
      }
    }
  };

  // Show loading while checking authentication
  if (!authChecked) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">Checking authentication...</div>
        </div>
      </main>
    );
  }

  if (loading) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-muted rounded-full animate-pulse mb-4 w-32 h-6"></div>
          <div className="h-12 bg-muted rounded-lg animate-pulse max-w-2xl mx-auto mb-4"></div>
          <div className="h-6 bg-muted rounded animate-pulse max-w-xl mx-auto"></div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-card border border-border rounded-xl p-6 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="space-y-3 flex-1">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-8 bg-muted rounded w-1/3"></div>
                </div>
                <div className="w-12 h-12 bg-muted rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Skeleton */}
        <div className="bg-card border border-border rounded-xl p-6 animate-pulse">
          <div className="flex items-center space-x-4 mb-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-10 bg-muted rounded w-32"></div>
            ))}
          </div>
          
          <div className="space-y-4">
            <div className="h-64 bg-muted rounded-lg"></div>
            <div className="grid grid-cols-4 gap-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
            </div>
          </div>
        </div>

        {/* Loading Indicator */}
        <div className="flex items-center justify-center mt-8 space-x-3">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <span className="text-sm text-muted-foreground ml-2">Loading your content...</span>
        </div>

      </div>
    </main>
  );
}

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header Section with Logout */}
          <div className="text-center mb-12 relative">
            <div className="absolute top-0 right-0">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
            
            <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-semibold">
              🔧 Admin Dashboard
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Manage <span className="text-primary">Content</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Manage bookings, blog posts, and educational videos in one place
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Total Bookings</p>
                    <h3 className="text-2xl font-bold text-blue-900">{bookings.length}</h3>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Blog Posts</p>
                    <h3 className="text-2xl font-bold text-green-900">{blogs.length}</h3>
                  </div>
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Videos</p>
                    <h3 className="text-2xl font-bold text-purple-900">{videos.length}</h3>
                  </div>
                  <Video className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Bookings
              </TabsTrigger>
              <TabsTrigger value="blogs" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Blog Posts
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                Videos
              </TabsTrigger>
            </TabsList>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Client Bookings
                  </CardTitle>
                  <CardDescription>
                    View and manage all exam bookings from clients
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Client</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Exam</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Fee</TableHead>
                          <TableHead>Booked On</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings.map((booking) => (
                          <TableRow key={booking.id} className="hover:bg-muted/50">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                  <User className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium">{booking.name}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm">
                                  <Mail className="w-3 h-3" />
                                  {booking.email}
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="w-3 h-3" />
                                  {booking.phone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{booking.examType.name}</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {booking.examType.duration}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">
                                  {new Date(booking.date).toLocaleDateString()}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {booking.timeSlot.time}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-50 text-green-700">
                                <DollarSign className="w-3 h-3 mr-1" />
                                {booking.examType.fee}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <p className="text-sm text-muted-foreground">
                                {new Date(booking.createdAt).toLocaleDateString()}
                              </p>
                            </TableCell>
                          </TableRow>
                        ))}
                        {bookings.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                              No bookings found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Blogs Tab */}
            <TabsContent value="blogs" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Add Blog Form */}
                <Card className="shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      Add New Blog Post
                    </CardTitle>
                    <CardDescription>
                      Create a new blog post for the website
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handleBlogSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="blog-title">Title *</Label>
                        <Input
                          id="blog-title"
                          value={blogForm.title}
                          onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                          placeholder="Enter blog title"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="blog-description">Description *</Label>
                        <Textarea
                          id="blog-description"
                          value={blogForm.description}
                          onChange={(e) => setBlogForm({ ...blogForm, description: e.target.value })}
                          placeholder="Write your blog content..."
                          rows={6}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        <FileText className="w-4 h-4 mr-2" />
                        Publish Blog Post
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Blog List */}
                <Card className="shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Published Blogs
                    </CardTitle>
                    <CardDescription>
                      Manage existing blog posts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-[500px] overflow-y-auto">
                      {blogs.map((blog) => (
                        <div key={blog.id} className="p-4 border-b last:border-b-0 hover:bg-muted/50">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm mb-1">{blog.title}</h4>
                              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                                {blog.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>Published: {blog.date}</span>
                                <span>Created: {new Date(blog.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteBlog(blog.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {blogs.length === 0 && (
                        <div className="p-8 text-center text-muted-foreground">
                          No blog posts yet. Create your first blog post!
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Add Video Form */}
                <Card className="shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      Add New Video
                    </CardTitle>
                    <CardDescription>
                      Add a new educational video to the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handleVideoSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="video-title">Video Title *</Label>
                        <Input
                          id="video-title"
                          value={videoForm.title}
                          onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                          placeholder="Enter video title"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="youtube-url">YouTube URL or ID *</Label>
                        <Input
                          id="youtube-url"
                          value={videoForm.youtubeUrl}
                          onChange={(e) => setVideoForm({ ...videoForm, youtubeUrl: e.target.value })}
                          placeholder="YouTube URL or video ID"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="video-description">Description *</Label>
                        <Textarea
                          id="video-description"
                          value={videoForm.description}
                          onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                          placeholder="Describe the video content..."
                          rows={4}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        <Video className="w-4 h-4 mr-2" />
                        Add Video
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Video List */}
                <Card className="shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                    <CardTitle className="flex items-center gap-2">
                      <Video className="w-5 h-5" />
                      Existing Videos
                    </CardTitle>
                    <CardDescription>
                      Manage video content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-[500px] overflow-y-auto">
                      {videos.map((video) => (
                        <div key={video.id} className="p-4 border-b last:border-b-0 hover:bg-muted/50">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm mb-1">{video.title}</h4>
                              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                                {video.description}
                              </p>
                              <div className="text-xs text-muted-foreground">
                                Added: {new Date(video.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteVideo(video.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {videos.length === 0 && (
                        <div className="p-8 text-center text-muted-foreground">
                          No videos yet. Add your first video!
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Blog Success Modal */}
      {showBlogSuccess && (
        <SuccessModal 
          title="Blog Published Successfully!"
          content={successContent}
          onClose={() => setShowBlogSuccess(false)}
          type="blog"
        />
      )}

      {/* Video Success Modal */}
      {showVideoSuccess && (
        <SuccessModal 
          title="Video Added Successfully!"
          content={successContent}
          onClose={() => setShowVideoSuccess(false)}
          type="video"
        />
      )}
    </>
  );
}

// Success Modal Component
interface SuccessModalProps {
  title: string;
  content: {
    title: string;
    type: string;
    details: string;
  };
  onClose: () => void;
  type: 'blog' | 'video';
}

function SuccessModal({ title, content, onClose, type }: SuccessModalProps) {
  const getIcon = () => {
    return type === 'blog' ? <FileText className="w-12 h-12 text-green-600" /> : <Video className="w-12 h-12 text-green-600" />;
  };

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-background rounded-2xl shadow-2xl max-w-md w-full border border-border animate-in fade-in-90 zoom-in-90">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-muted/80 hover:bg-muted flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        >
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Success Content */}
        <div className="p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            {getIcon()}
          </div>

          {/* Success Title */}
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {title}
          </h2>
          
          <p className="text-muted-foreground mb-6">
            {content.details}
          </p>

          {/* Content Details */}
          <Card className="bg-muted/30 border-border/50 mb-6">
            <CardContent className="p-4">
              <div className="space-y-3 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Title:</span>
                  <span className="font-medium text-right">{content.title}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Type:</span>
                  <Badge variant="outline" className="capitalize">
                    {content.type}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Published
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}