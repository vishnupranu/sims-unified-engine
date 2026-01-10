import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
  GraduationCap,
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
  Bell,
  Home,
  Newspaper,
  ClipboardList,
  UserCog,
  ChevronDown,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const getNavItems = (roles: string[]) => {
  const isAdmin = roles.includes('admin');
  const isFaculty = roles.includes('faculty');
  const isStudent = roles.includes('student');

  const items = [];

  if (isStudent || isFaculty || isAdmin) {
    items.push({
      title: 'Dashboard',
      href: isAdmin ? '/admin' : isFaculty ? '/faculty' : '/student',
      icon: LayoutDashboard,
    });
  }

  if (isStudent) {
    items.push(
      { title: 'My Results', href: '/student', icon: FileText },
    );
  }

  if (isFaculty) {
    items.push(
      { title: 'Enter Results', href: '/faculty/results', icon: FileText },
      { title: 'Students', href: '/faculty/students', icon: Users },
    );
  }

  if (isAdmin) {
    items.push(
      { title: 'News Management', href: '/admin/news', icon: Newspaper },
      { title: 'Admissions', href: '/admin/admissions', icon: ClipboardList },
      { title: 'Users', href: '/admin/users', icon: UserCog },
      { title: 'Results', href: '/admin/results', icon: FileText },
    );
  }

  items.push({ title: 'Settings', href: '/settings', icon: Settings });

  return items;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, roles, signOut } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = getNavItems(roles);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const NavLink = ({ item }: { item: typeof navItems[0] }) => (
    <Link
      to={item.href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
        location.pathname === item.href
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      )}
      onClick={() => setMobileMenuOpen(false)}
    >
      <item.icon className="h-4 w-4" />
      {item.title}
    </Link>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 md:px-6">
          {/* Mobile menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex h-full flex-col">
                <div className="flex h-16 items-center border-b px-4">
                  <Link to="/" className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <span className="font-display font-bold">SIMS Portal</span>
                  </Link>
                </div>
                <nav className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <NavLink key={item.href} item={item} />
                    ))}
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-display font-bold hidden md:inline">SIMS Portal</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 ml-8">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors',
                  location.pathname === item.href
                    ? 'bg-muted font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
            {navItems.length > 4 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    More
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {navItems.slice(4).map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link to={item.href} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={profile?.avatar_url} alt={profile?.full_name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {profile?.full_name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{profile?.full_name}</p>
                    <p className="text-xs text-muted-foreground">{profile?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto py-6 px-4 md:px-6">
        {children}
      </main>
    </div>
  );
}
