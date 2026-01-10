import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAuthStore } from '@/stores/authStore';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Users,
  Newspaper,
  ClipboardList,
  FileText,
  TrendingUp,
  ArrowRight,
  Plus,
  Eye,
} from 'lucide-react';

interface DashboardStats {
  totalStudents: number;
  totalNews: number;
  totalAdmissions: number;
  pendingAdmissions: number;
}

function AdminDashboardContent() {
  const { profile } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalNews: 0,
    totalAdmissions: 0,
    pendingAdmissions: 0,
  });
  const [recentAdmissions, setRecentAdmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch stats in parallel
      const [studentsRes, newsRes, admissionsRes, pendingRes, recentRes] = await Promise.all([
        supabase.from('user_roles').select('*', { count: 'exact', head: true }).eq('role', 'student'),
        supabase.from('news_articles').select('*', { count: 'exact', head: true }),
        supabase.from('admissions').select('*', { count: 'exact', head: true }),
        supabase.from('admissions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('admissions').select('*').order('created_at', { ascending: false }).limit(5),
      ]);

      setStats({
        totalStudents: studentsRes.count || 0,
        totalNews: newsRes.count || 0,
        totalAdmissions: admissionsRes.count || 0,
        pendingAdmissions: pendingRes.count || 0,
      });

      setRecentAdmissions(recentRes.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: Users,
      description: 'Registered students',
      href: '/admin/users',
    },
    {
      title: 'News Articles',
      value: stats.totalNews,
      icon: Newspaper,
      description: 'Published articles',
      href: '/admin/news',
    },
    {
      title: 'Total Applications',
      value: stats.totalAdmissions,
      icon: ClipboardList,
      description: 'All applications',
      href: '/admin/admissions',
    },
    {
      title: 'Pending Review',
      value: stats.pendingAdmissions,
      icon: FileText,
      description: 'Awaiting decision',
      href: '/admin/admissions?status=pending',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | SIMS Group</title>
        <meta name="description" content="Admin dashboard for SIMS Group of Institutions management." />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {profile?.full_name}
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link to="/admin/news/new">
                <Plus className="mr-2 h-4 w-4" />
                Add News
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statsCards.map((stat) => (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <div className="text-2xl font-bold">{stat.value}</div>
                )}
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <Button variant="link" size="sm" className="px-0 mt-2" asChild>
                  <Link to={stat.href}>
                    View all
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Admissions */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Latest admission applications</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin/admissions">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : recentAdmissions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No applications yet
                </div>
              ) : (
                <div className="space-y-3">
                  {recentAdmissions.map((admission) => (
                    <div
                      key={admission.id}
                      className="flex items-center justify-between p-3 rounded-lg border bg-card"
                    >
                      <div>
                        <p className="font-medium">{admission.applicant_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {admission.course_applied} • {admission.application_number}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            admission.status === 'accepted'
                              ? 'default'
                              : admission.status === 'rejected'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {admission.status}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/admin/news/new">
                  <Newspaper className="mr-2 h-4 w-4" />
                  Create News Article
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/admin/results/upload">
                  <FileText className="mr-2 h-4 w-4" />
                  Upload Exam Results
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/admin/users">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/admin/admissions?status=pending">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Review Pending Applications
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default function AdminDashboard() {
  return (
    <AuthGuard requiredRoles={['admin']}>
      <DashboardLayout>
        <AdminDashboardContent />
      </DashboardLayout>
    </AuthGuard>
  );
}
