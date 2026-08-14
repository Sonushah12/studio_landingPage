import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, KeyRound } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface AdminLoginProps {
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToSite }) => {
  const { login, adminEmail } = useAdminAuth();
  const [emailInput, setEmailInput] = useState(adminEmail || 'sonu.shah99098@gmail.com');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login(passwordInput, emailInput);
      setIsLoading(false);
      if (!res.success) {
        setErrorMsg(res.message);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#1E1D1B] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden text-[#F7F5F0]">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3D6338]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#7A9E74]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar Back to Site */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between z-10">
        <button
          onClick={onBackToSite}
          className="flex items-center gap-2 text-xs font-semibold text-[#B5CAB0] hover:text-white transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Live Website</span>
        </button>

        <div className="flex items-center gap-1.5 text-[11px] text-[#9E9B92] bg-white/5 px-3 py-1 rounded-full border border-white/10">
          <ShieldCheck className="w-3.5 h-3.5 text-[#7A9E74]" />
          <span>Admin Portal</span>
        </div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#2C2B29] border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#3D6338] text-white flex items-center justify-center mx-auto shadow-lg border border-[#7A9E74]/40">
            <KeyRound className="w-7 h-7" />
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Merrick Studio CMS
          </h1>
          <p className="text-xs text-[#9E9B92]">
            Content Management &amp; Website Administration Suite
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-xs text-rose-300 animate-in fade-in flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#B5CAB0] block mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#9E9B92] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="admin@merrickdance.com"
                className="w-full pl-10 pr-4 py-3 bg-[#1E1D1B] border border-white/10 focus:border-[#7A9E74] rounded-2xl text-xs text-white outline-none transition"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#B5CAB0]">
                Admin Passcode
              </label>
              <span className="text-[10px] text-[#9E9B92]">Protected</span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#9E9B92] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter passcode..."
                className="w-full pl-10 pr-10 py-3 bg-[#1E1D1B] border border-white/10 focus:border-[#7A9E74] rounded-2xl text-xs text-white outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9E9B92] hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 bg-[#3D6338] hover:bg-[#4E7D47] text-white rounded-2xl font-bold text-xs uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? (
              <span>Verifying credentials...</span>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>Unlock Admin Dashboard</span>
              </>
            )}
          </button>
        </form>
      </div>

      <div className="mt-6 text-center text-[11px] text-[#9E9B92]">
        Hanshoura Road • Ahmedabad, Gujarat • Merrick Dance &amp; Entertainment
      </div>
    </div>
  );
};
