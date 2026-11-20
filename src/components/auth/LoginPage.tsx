import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  User,
  HardHat,
  Building2,
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Check,
} from 'lucide-react';

type RoleKey = 'citizen' | 'field_worker' | 'ward' | 'super_admin';

interface RoleConfig {
  key: RoleKey;
  targetRole: UserRole;
  label: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultEmail: string;
}

const ROLES: RoleConfig[] = [
  {
    key: 'citizen',
    targetRole: 'citizen',
    label: 'Citizen',
    subtitle: 'Resident',
    icon: User,
    defaultEmail: 'aarav.citizen@urbanfix.org',
  },
  {
    key: 'field_worker',
    targetRole: 'field_worker',
    label: 'Field Worker',
    subtitle: 'Ground Operations',
    icon: HardHat,
    defaultEmail: 'asha.nair@urbanfix.org',
  },
  {
    key: 'ward',
    targetRole: 'ward',
    label: 'Ward Admin',
    subtitle: 'Ward Secretariat',
    icon: Building2,
    defaultEmail: 'ward12.admin@urbanfix.org',
  },
  {
    key: 'super_admin',
    targetRole: 'super_admin',
    label: 'Super Admin',
    subtitle: 'City Directorate',
    icon: Shield,
    defaultEmail: 'commissioner@urbanfix.org',
  },
];

export const LoginPage: React.FC = () => {
  const { login, navigateTo, showToast } = useApp();

  const [selectedRoleKey, setSelectedRoleKey] = useState<RoleKey>('citizen');
  const [email, setEmail] = useState<string>(ROLES[0].defaultEmail);
  const [password, setPassword] = useState<string>('••••••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>('');

  const activeConfig = ROLES.find((r) => r.key === selectedRoleKey) || ROLES[0];

  const handleRoleSelect = (roleKey: RoleKey) => {
    setSelectedRoleKey(roleKey);
    const target = ROLES.find((r) => r.key === roleKey);
    if (target) {
      setEmail(target.defaultEmail);
      if (!isRegisterMode) {
        setPassword('••••••••••••');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast('Please enter an email address.');
      return;
    }
    if (!password.trim()) {
      showToast('Please enter a password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      if (isRegisterMode) {
        login(activeConfig.targetRole, {
          name: fullName.trim() || activeConfig.label + ' User',
          email: email.trim(),
        });
      } else {
        login(activeConfig.targetRole, {
          email: email.trim(),
        });
      }
      setIsSubmitting(false);
    }, 200);
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    showToast(`Password reset link dispatched to ${email || 'your email'}.`);
  };

  return (
    <div className="min-h-screen bg-[#F3F6F4] text-[#172B25] flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#DDF1E9] selection:text-[#176B50]">
      {/* Top Navigation Bar */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between py-2">
        {/* Brand identity */}
        <button
          type="button"
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-[#176B50] flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
            UF
          </div>
          <div>
            <span className="text-base font-bold text-[#0E241D] block leading-none tracking-tight">
              UrbanFix
            </span>
            <span className="text-[10px] text-[#718078] block leading-none font-medium mt-1">
              Civic Operations Platform
            </span>
          </div>
        </button>

        {/* Back to Home CTA */}
        <button
          type="button"
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#176B50] hover:text-[#0E241D] px-3 py-2 rounded-xl hover:bg-white/80 border border-transparent hover:border-[#DCE5E0] transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>
      </header>

      {/* Main Centered Login Card */}
      <main className="w-full flex-1 flex items-center justify-center py-6 sm:py-10">
        <div className="w-full max-w-md sm:max-w-lg bg-white rounded-3xl border border-[#DCE5E0] shadow-sm p-6 sm:p-10 transition-all">
          {/* A. Login Heading & Subtitle */}
          <div className="mb-6 sm:mb-8 text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0E241D] tracking-tight">
              {isRegisterMode ? 'Register' : 'Login'}
            </h1>
            <p className="text-xs sm:text-sm text-[#718078] mt-2 leading-relaxed">
              {isRegisterMode
                ? 'Create your UrbanFix account to access civic services and track issues in your ward.'
                : 'Sign in to access your civic services, report and track complaints, and stay updated on resolutions.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* B. Role Selection — EXACTLY FOUR ROLES IN 2x2 GRID */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-semibold text-[#172B25] uppercase tracking-wider">
                  Select Role
                </label>
                <span className="text-[11px] font-medium text-[#176B50]">
                  {activeConfig.label} Access
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {ROLES.map((role) => {
                  const isSelected = selectedRoleKey === role.key;
                  const Icon = role.icon;

                  return (
                    <button
                      key={role.key}
                      type="button"
                      onClick={() => handleRoleSelect(role.key)}
                      className={`relative p-3 sm:p-3.5 rounded-2xl border text-left transition-all duration-150 flex items-center gap-3 focus:outline-none ${
                        isSelected
                          ? 'bg-[#DDF1E9] border-[#176B50] text-[#0E241D] ring-1 ring-[#176B50]/30 shadow-xs'
                          : 'bg-white border-[#DCE5E0] text-[#718078] hover:border-[#176B50]/40 hover:bg-[#F3F6F4]/60'
                      }`}
                    >
                      {/* Icon */}
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#176B50] text-white shadow-xs'
                            : 'bg-[#F3F6F4] text-[#718078]'
                        }`}
                      >
                        <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </div>

                      {/* Text */}
                      <div className="min-w-0 flex-1">
                        <div
                          className={`text-xs sm:text-sm font-bold truncate ${
                            isSelected ? 'text-[#0E241D]' : 'text-[#172B25]'
                          }`}
                        >
                          {role.label}
                        </div>
                        <div className="text-[10px] text-[#718078] truncate">
                          {role.subtitle}
                        </div>
                      </div>

                      {/* Check badge when selected */}
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-[#176B50] text-white flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Registration Name Field (when in register mode) */}
            {isRegisterMode && (
              <div>
                <label className="block text-xs font-semibold text-[#172B25] mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#718078]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full h-11 sm:h-12 pl-10 pr-4 text-xs sm:text-sm bg-white border border-[#DCE5E0] rounded-xl text-[#172B25] placeholder:text-[#718078]/70 focus:outline-none focus:border-[#176B50] focus:ring-2 focus:ring-[#176B50]/15 transition-all"
                  />
                </div>
              </div>
            )}

            {/* C. Email Input */}
            <div>
              <label className="block text-xs font-semibold text-[#172B25] mb-1.5">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#718078]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full h-11 sm:h-12 pl-10 pr-4 text-xs sm:text-sm bg-white border border-[#DCE5E0] rounded-xl text-[#172B25] placeholder:text-[#718078]/70 focus:outline-none focus:border-[#176B50] focus:ring-2 focus:ring-[#176B50]/15 transition-all"
                />
              </div>
            </div>

            {/* C. Password Input & Forgot Password Link */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#172B25]">
                  Password
                </label>
                {!isRegisterMode && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs font-medium text-[#176B50] hover:text-[#0E241D] hover:underline focus:outline-none transition-colors"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#718078]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full h-11 sm:h-12 pl-10 pr-11 text-xs sm:text-sm bg-white border border-[#DCE5E0] rounded-xl text-[#172B25] placeholder:text-[#718078]/70 focus:outline-none focus:border-[#176B50] focus:ring-2 focus:ring-[#176B50]/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#718078] hover:text-[#0E241D] focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* D. Full-Width Primary Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 sm:h-12 rounded-xl bg-[#176B50] hover:bg-[#16845F] active:bg-[#0E241D] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs hover:shadow transition-all disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Authenticating...' : isRegisterMode ? 'Register & Continue →' : 'Login →'}</span>
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>

            {/* E. Registration Option Link */}
            <div className="pt-4 border-t border-[#F3F6F4] text-center text-xs sm:text-sm text-[#718078]">
              {isRegisterMode ? (
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsRegisterMode(false)}
                    className="text-[#176B50] font-semibold hover:underline focus:outline-none ml-1"
                  >
                    Sign in
                  </button>
                </span>
              ) : (
                <span>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegisterMode(true);
                      setPassword('');
                    }}
                    className="text-[#176B50] font-semibold hover:underline focus:outline-none ml-1"
                  >
                    Register
                  </button>
                </span>
              )}
            </div>
          </form>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full max-w-5xl mx-auto py-3 text-center text-xs text-[#718078]">
        © 2026 UrbanFix. Civic Operations Platform. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginPage;
