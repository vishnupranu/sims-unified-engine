import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, ArrowLeft, Save, Eye } from 'lucide-react';
import { z } from 'zod';

const articleSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  excerpt: z.string().max(300).optional(),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  category: z.string().min(1, 'Please select a category'),
  image_url: z.string().url().optional().or(z.literal('')),
  is_featured: z.boolean(),
  is_published: z.boolean(),
});

type ArticleForm = z.infer<typeof articleSchema>;

const categories = [
  'general',
  'academics',
  'events',
  'achievements',
  'admissions',
  'placements',
  'sports',
  'cultural',
];

function NewsEditorContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuthStore();
  const isEditing = !!id && id !== 'new';

  const [form, setForm] = useState<ArticleForm>({
    title: '',
    excerpt: '',
    content: '',
    category: 'general',
    image_url: '',
    is_featured: false,
    is_published: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchArticle();
    }
  }, [id, isEditing]);

  const fetchArticle = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setForm({
        title: data.title,
        excerpt: data.excerpt || '',
        content: data.content,
        category: data.category,
        image_url: data.image_url || '',
        is_featured: data.is_featured,
        is_published: data.is_published,
      });
    } catch (error) {
      console.error('Error fetching article:', error);
      toast({
        title: 'Error',
        description: 'Failed to load article',
        variant: 'destructive',
      });
      navigate('/admin/news');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      articleSchema.parse(form);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }
    }

    setIsSaving(true);
    try {
      const slug = form.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      if (isEditing) {
        const { error } = await supabase
          .from('news_articles')
          .update({
            title: form.title,
            slug,
            excerpt: form.excerpt || null,
            content: form.content,
            category: form.category,
            image_url: form.image_url || null,
            is_featured: form.is_featured,
            is_published: form.is_published,
            published_at: form.is_published ? new Date().toISOString() : null,
            author_id: user?.id,
          })
          .eq('id', id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('news_articles')
          .insert([{
            title: form.title,
            slug,
            excerpt: form.excerpt || null,
            content: form.content,
            category: form.category,
            image_url: form.image_url || null,
            is_featured: form.is_featured,
            is_published: form.is_published,
            published_at: form.is_published ? new Date().toISOString() : null,
            author_id: user?.id,
          }]);

        if (error) throw error;
      }

      toast({
        title: isEditing ? 'Updated' : 'Created',
        description: `Article ${isEditing ? 'updated' : 'created'} successfully`,
      });

      navigate('/admin/news');
    } catch (error) {
      console.error('Error saving article:', error);
      toast({
        title: 'Error',
        description: 'Failed to save article',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isEditing ? 'Edit Article' : 'New Article'} | SIMS Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/news')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-display font-bold">
              {isEditing ? 'Edit Article' : 'New Article'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isEditing ? 'Update the article details' : 'Create a new news article'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Article Content</CardTitle>
                  <CardDescription>Write your article content here</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="Enter article title"
                    />
                    {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={form.excerpt}
                      onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                      placeholder="Brief summary of the article (optional)"
                      rows={2}
                    />
                    {errors.excerpt && <p className="text-sm text-destructive">{errors.excerpt}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                      id="content"
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                      placeholder="Write your article content here..."
                      rows={12}
                    />
                    {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={form.category}
                      onValueChange={(value) => setForm({ ...form, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input
                      id="image_url"
                      value={form.image_url}
                      onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                    {errors.image_url && <p className="text-sm text-destructive">{errors.image_url}</p>}
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="is_featured">Featured Article</Label>
                    <Switch
                      id="is_featured"
                      checked={form.is_featured}
                      onCheckedChange={(checked) => setForm({ ...form, is_featured: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="is_published">Published</Label>
                    <Switch
                      id="is_published"
                      checked={form.is_published}
                      onCheckedChange={(checked) => setForm({ ...form, is_published: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-3">
                  <Button type="submit" className="w-full" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {isEditing ? 'Update Article' : 'Create Article'}
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/admin/news')}
                  >
                    Cancel
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default function NewsEditor() {
  return (
    <AuthGuard requiredRoles={['admin']}>
      <DashboardLayout>
        <NewsEditorContent />
      </DashboardLayout>
    </AuthGuard>
  );
}
