import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuthStore } from '@/stores/authStore';
import { supabase } from '@/integrations/supabase/client';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  GraduationCap, 
  FileText, 
  Bell, 
  User, 
  TrendingUp,
  Calendar,
  Award,
  BookOpen,
  Download
} from 'lucide-react';

interface ExamResult {
  id: string;
  exam_name: string;
  subject: string;
  semester: number;
  academic_year: string;
  max_marks: number;
  obtained_marks: number;
  grade: string;
  status: 'pass' | 'fail' | 'reappear';
  exam_date: string;
}

function StudentDashboardContent() {
  const { profile, user } = useAuthStore();
  const [results, setResults] = useState<ExamResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');

  useEffect(() => {
    fetchResults();
  }, [user]);

  const fetchResults = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('exam_results')
        .select('*')
        .eq('student_id', user.id)
        .order('exam_date', { ascending: false });

      if (error) throw error;
      setResults(data as ExamResult[] || []);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredResults = selectedSemester === 'all' 
    ? results 
    : results.filter(r => r.semester === selectedSemester);

  const calculateGPA = () => {
    if (results.length === 0) return 0;
    const totalPercentage = results.reduce((sum, r) => sum + (r.obtained_marks / r.max_marks) * 100, 0);
    return (totalPercentage / results.length).toFixed(2);
  };

  const passRate = () => {
    if (results.length === 0) return 0;
    const passed = results.filter(r => r.status === 'pass').length;
    return Math.round((passed / results.length) * 100);
  };

  const semesters = [...new Set(results.map(r => r.semester))].sort();

  return (
    <>
      <Helmet>
        <title>Student Dashboard | SIMS Group</title>
        <meta name="description" content="View your exam results, grades, and academic progress." />
      </Helmet>

      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">
              Welcome, {profile?.full_name || 'Student'}!
            </h1>
            <p className="text-muted-foreground mt-1">
              {profile?.student_id && `Student ID: ${profile.student_id} • `}
              {profile?.college || 'SIMS Group of Institutions'}
            </p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Hall Ticket
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculateGPA()}%</div>
              <p className="text-xs text-muted-foreground">Cumulative average</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Exams Taken</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{results.length}</div>
              <p className="text-xs text-muted-foreground">Total examinations</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{passRate()}%</div>
              <p className="text-xs text-muted-foreground">Success rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Semester</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.max(...semesters, 1)}</div>
              <p className="text-xs text-muted-foreground">Academic progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="results" className="space-y-4">
          <TabsList>
            <TabsTrigger value="results">
              <FileText className="mr-2 h-4 w-4" />
              Exam Results
            </TabsTrigger>
            <TabsTrigger value="announcements">
              <Bell className="mr-2 h-4 w-4" />
              Announcements
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="space-y-4">
            {/* Semester Filter */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedSemester === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSemester('all')}
              >
                All Semesters
              </Button>
              {semesters.map(sem => (
                <Button
                  key={sem}
                  variant={selectedSemester === sem ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSemester(sem)}
                >
                  Semester {sem}
                </Button>
              ))}
            </div>

            {/* Results Table */}
            <Card>
              <CardHeader>
                <CardTitle>Examination Results</CardTitle>
                <CardDescription>
                  View your academic performance across all examinations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : filteredResults.length === 0 ? (
                  <div className="text-center py-12">
                    <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <h3 className="mt-4 text-lg font-medium">No Results Found</h3>
                    <p className="text-muted-foreground mt-2">
                      Your exam results will appear here once they are published.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{result.subject}</h4>
                            <Badge variant="outline">Sem {result.semester}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {result.exam_name} • {result.academic_year}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {new Date(result.exam_date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {result.obtained_marks}/{result.max_marks}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">{result.grade}</Badge>
                            <Badge 
                              variant={result.status === 'pass' ? 'default' : 'destructive'}
                              className={result.status === 'pass' ? 'bg-green-600' : ''}
                            >
                              {result.status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="announcements">
            <Card>
              <CardHeader>
                <CardTitle>Latest Announcements</CardTitle>
                <CardDescription>
                  Stay updated with important notices from your institution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Bell className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">No Announcements</h3>
                  <p className="text-muted-foreground mt-2">
                    Check back later for updates and announcements.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>
                  View and manage your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <p className="font-medium">{profile?.full_name || '-'}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="font-medium">{profile?.email || '-'}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Student ID</label>
                    <p className="font-medium">{profile?.student_id || '-'}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <p className="font-medium">{profile?.phone || '-'}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">College</label>
                    <p className="font-medium">{profile?.college || '-'}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Department</label>
                    <p className="font-medium">{profile?.department || '-'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default function StudentDashboard() {
  return (
    <AuthGuard requiredRoles={['student', 'admin', 'faculty']}>
      <DashboardLayout>
        <StudentDashboardContent />
      </DashboardLayout>
    </AuthGuard>
  );
}
