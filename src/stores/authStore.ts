import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

export type AppRole = 'admin' | 'faculty' | 'student';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  college?: string;
  department?: string;
  student_id?: string;
  avatar_url?: string;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  roles: AppRole[];
  isLoading: boolean;
  isInitialized: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setProfile: (profile: Profile | null) => void;
  setRoles: (roles: AppRole[]) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  
  // Auth methods
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  fetchRoles: () => Promise<void>;
  initialize: () => Promise<void>;
  
  // Role checks
  hasRole: (role: AppRole) => boolean;
  isAdmin: () => boolean;
  isFaculty: () => boolean;
  isStudent: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      profile: null,
      roles: [],
      isLoading: true,
      isInitialized: false,

      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setProfile: (profile) => set({ profile }),
      setRoles: (roles) => set({ roles }),
      setLoading: (isLoading) => set({ isLoading }),
      setInitialized: (isInitialized) => set({ isInitialized }),

      signIn: async (email, password) => {
        set({ isLoading: true });
        try {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
          
          await get().fetchProfile();
          await get().fetchRoles();
          
          return { error: null };
        } catch (error) {
          return { error: error as Error };
        } finally {
          set({ isLoading: false });
        }
      },

      signUp: async (email, password, fullName) => {
        set({ isLoading: true });
        try {
          const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: window.location.origin,
              data: {
                full_name: fullName,
              },
            },
          });
          if (error) throw error;
          return { error: null };
        } catch (error) {
          return { error: error as Error };
        } finally {
          set({ isLoading: false });
        }
      },

      signOut: async () => {
        set({ isLoading: true });
        await supabase.auth.signOut();
        set({
          user: null,
          session: null,
          profile: null,
          roles: [],
          isLoading: false,
        });
      },

      fetchProfile: async () => {
        const { user } = get();
        if (!user) return;

        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) throw error;
          set({ profile: data as Profile });
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      },

      fetchRoles: async () => {
        const { user } = get();
        if (!user) return;

        try {
          const { data, error } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id);

          if (error) throw error;
          set({ roles: data?.map((r) => r.role as AppRole) || [] });
        } catch (error) {
          console.error('Error fetching roles:', error);
          // Default to student role if can't fetch
          set({ roles: ['student'] });
        }
      },

      initialize: async () => {
        if (get().isInitialized) return;
        
        set({ isLoading: true });

        // Set up auth state listener BEFORE checking session
        supabase.auth.onAuthStateChange(async (event, session) => {
          set({ session, user: session?.user ?? null });
          
          if (session?.user) {
            // Use setTimeout to avoid potential race conditions
            setTimeout(async () => {
              await get().fetchProfile();
              await get().fetchRoles();
            }, 0);
          } else {
            set({ profile: null, roles: [] });
          }
        });

        // Check existing session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          set({ session, user: session.user });
          await get().fetchProfile();
          await get().fetchRoles();
        }

        set({ isLoading: false, isInitialized: true });
      },

      hasRole: (role) => get().roles.includes(role),
      isAdmin: () => get().roles.includes('admin'),
      isFaculty: () => get().roles.includes('faculty'),
      isStudent: () => get().roles.includes('student'),
    }),
    {
      name: 'sims-auth-storage',
      partialize: (state) => ({
        // Only persist user session info, not the full state
        user: state.user,
        profile: state.profile,
        roles: state.roles,
      }),
    }
  )
);
