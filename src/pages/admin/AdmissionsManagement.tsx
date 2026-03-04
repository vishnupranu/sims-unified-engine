import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Search, Eye, CheckCircle, XCircle, Clock, Download } from 'lucide-react';

interface Admission {
  id: string;
  applicant_name: string;
  email: string;
  phone: string;
  college_applied: string;
  course_applied: string;
  status: string;
  application_number: string | null;
  date_of_birth: string;
  gender: string;
  qualification: string;
  board_university: string;
  year_of_passing: number;
  percentage: number;
  address: string;
  city: string;
  state: string;
  pincode: string;
  counselor_notes: string | null;
  created_at: string;
}

function AdmissionsContent() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Admission | null>(null);
  const [notes, setNotes] = useState('');

  useEffect(() => { fetchAdmissions(); }, []);

  const fetchAdmissions = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('admissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setAdmissions(data as Admission[]);
    setIsLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('admissions')
      .update({ status, counselor_notes: notes || null })
      .eq('id', id);
    if (error) {
      toast.error('Failed to update status');
    } else {
      toast.success(`Application ${status}`);
      setSelected(null);
      setNotes('');
      fetchAdmissions();
    }
  };

  const filtered = admissions.filter((a) => {
    const matchSearch = a.applicant_name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      (a.application_number || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusColor = (s: string) => {
    switch (s) {
      case 'accepted': return 'default';
      case 'rejected': return 'destructive';
      case 'under_review': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <>
      <Helmet>
        <title>Admissions Management | SIMS Admin</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-display font-bold">Admissions</h1>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search applicants..." className="pl-10 w-64" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Applications ({filtered.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">{[1,2,3,4].map(i => <Skeleton key={i} className="h-16 w-full" />)}</div>
            ) : filtered.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">No applications found.</p>
            ) : (
              <div className="space-y-3">
                {filtered.map((a) => (
                  <div key={a.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{a.applicant_name}</h4>
                        <Badge variant={statusColor(a.status)}>{a.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {a.application_number} • {a.course_applied} • {a.college_applied}
                      </p>
                      <p className="text-xs text-muted-foreground">{a.email} • {a.phone}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => { setSelected(a); setNotes(a.counselor_notes || ''); }}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application: {selected?.applicant_name}</DialogTitle>
            <DialogDescription>{selected?.application_number}</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Email:</span> <p className="font-medium">{selected.email}</p></div>
                <div><span className="text-muted-foreground">Phone:</span> <p className="font-medium">{selected.phone}</p></div>
                <div><span className="text-muted-foreground">DOB:</span> <p className="font-medium">{selected.date_of_birth}</p></div>
                <div><span className="text-muted-foreground">Gender:</span> <p className="font-medium">{selected.gender}</p></div>
                <div><span className="text-muted-foreground">Qualification:</span> <p className="font-medium">{selected.qualification}</p></div>
                <div><span className="text-muted-foreground">Board:</span> <p className="font-medium">{selected.board_university}</p></div>
                <div><span className="text-muted-foreground">Year:</span> <p className="font-medium">{selected.year_of_passing}</p></div>
                <div><span className="text-muted-foreground">Percentage:</span> <p className="font-medium">{selected.percentage}%</p></div>
                <div><span className="text-muted-foreground">College:</span> <p className="font-medium">{selected.college_applied}</p></div>
                <div><span className="text-muted-foreground">Course:</span> <p className="font-medium">{selected.course_applied}</p></div>
                <div className="col-span-2"><span className="text-muted-foreground">Address:</span> <p className="font-medium">{selected.address}, {selected.city}, {selected.state} - {selected.pincode}</p></div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Counselor Notes</label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add notes..." rows={3} />
              </div>

              <div className="flex gap-3">
                <Button onClick={() => updateStatus(selected.id, 'accepted')} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="mr-2 h-4 w-4" /> Accept
                </Button>
                <Button onClick={() => updateStatus(selected.id, 'under_review')} variant="secondary">
                  <Clock className="mr-2 h-4 w-4" /> Under Review
                </Button>
                <Button onClick={() => updateStatus(selected.id, 'rejected')} variant="destructive">
                  <XCircle className="mr-2 h-4 w-4" /> Reject
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function AdmissionsManagement() {
  return (
    <AuthGuard requiredRoles={['admin']}>
      <DashboardLayout>
        <AdmissionsContent />
      </DashboardLayout>
    </AuthGuard>
  );
}
