import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthGuard } from "@/components/auth/AuthGuard";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admissions from "./pages/Admissions";
import Gallery from "./pages/Gallery";
import News from "./pages/News";
import Auth from "./pages/Auth";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NewsManagement from "./pages/admin/NewsManagement";
import NewsEditor from "./pages/admin/NewsEditor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/news" element={<News />} />
            <Route path="/auth" element={<Auth />} />

            {/* Student routes */}
            <Route path="/student" element={
              <AuthGuard requiredRoles={['student']}>
                <StudentDashboard />
              </AuthGuard>
            } />

            {/* Admin routes */}
            <Route path="/admin" element={
              <AuthGuard requiredRoles={['admin']}>
                <AdminDashboard />
              </AuthGuard>
            } />
            <Route path="/admin/news" element={
              <AuthGuard requiredRoles={['admin']}>
                <NewsManagement />
              </AuthGuard>
            } />
            <Route path="/admin/news/new" element={
              <AuthGuard requiredRoles={['admin']}>
                <NewsEditor />
              </AuthGuard>
            } />
            <Route path="/admin/news/:id" element={
              <AuthGuard requiredRoles={['admin']}>
                <NewsEditor />
              </AuthGuard>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
