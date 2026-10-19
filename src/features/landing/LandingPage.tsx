import React, { useState } from 'react';
import { useSegreTrack } from '../../context/SegreTrackContext';
import { Logo } from '../../components/common/Logo';
import { DemoBanner } from '../../components/layout/DemoBanner';
import { ToastContainer } from '../../components/layout/ToastContainer';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Truck, 
  ShieldCheck, 
  User, 
  Calendar, 
  BookOpen, 
  Activity, 
  Flame, 
  Sparkles, 
  ChevronRight,
  Menu,
  X,
  Layers,
  Recycle,
  ShieldAlert
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentRole } = useSegreTrack();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF7] text-[#17251F] font-sans flex flex-col">
      {/* Demo Prototype Banner */}
      <DemoBanner />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2EAE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo size="md" showTagline={true} />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#17251F]">
            <button
              onClick={() => scrollToSection('problem')}
              className="hover:text-[#43A879] transition-colors"
            >
              The Problem
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-[#43A879] transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-[#43A879] transition-colors"
            >
              Core Features
            </button>
            <button
              onClick={() => scrollToSection('roles')}
              className="hover:text-[#43A879] transition-colors"
            >
              Role Dashboards
            </button>
          </nav>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => scrollToSection('roles')}
              className="px-5 py-2.5 rounded-xl bg-[#174C3C] hover:bg-[#10382D] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>Explore Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#17251F] hover:bg-stone-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#E2EAE4] px-4 py-4 space-y-3">
            <button
              onClick={() => scrollToSection('problem')}
              className="block w-full text-left py-2 text-xs font-semibold text-[#17251F]"
            >
              The Problem
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="block w-full text-left py-2 text-xs font-semibold text-[#17251F]"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="block w-full text-left py-2 text-xs font-semibold text-[#17251F]"
            >
              Core Features
            </button>
            <button
              onClick={() => scrollToSection('roles')}
              className="block w-full text-left py-2 text-xs font-semibold text-[#17251F]"
            >
              Role Dashboards
            </button>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('roles');
                }}
                className="w-full py-2.5 rounded-xl bg-[#174C3C] text-white text-xs font-bold text-center"
              >
                Launch Demo Portals
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline and Callouts */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E7F4EC] border border-[#43A879]/30 text-xs font-bold text-[#174C3C]">
                <Sparkles className="w-3.5 h-3.5 text-[#43A879]" />
                <span>Academic Design-Thinking Prototype</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#10382D] tracking-tight leading-[1.12]">
                Segregation Shouldn't Stop at the Bin.
              </h1>

              <p className="text-base sm:text-lg text-[#66756D] leading-relaxed max-w-2xl">
                SegreTrack connects residents, collection workers, and society administrators to make household waste collection more coordinated, transparent, and accountable.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  onClick={() => scrollToSection('roles')}
                  className="px-7 py-3.5 rounded-xl bg-[#174C3C] hover:bg-[#10382D] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2"
                >
                  <span>Explore the Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="px-7 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-[#17251F] border border-[#E2EAE4] text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <span>See How It Works</span>
                </button>
              </div>

              {/* Trust & transparency badges */}
              <div className="pt-6 border-t border-[#E2EAE4] grid grid-cols-3 gap-4 max-w-lg text-xs">
                <div>
                  <span className="font-bold text-[#17251F] block text-sm">3 Stakeholders</span>
                  <span className="text-[#66756D] text-[11px]">Residents, Staff, Admin</span>
                </div>
                <div>
                  <span className="font-bold text-[#17251F] block text-sm">Cross-Role Sync</span>
                  <span className="text-[#66756D] text-[11px]">Reactive state updates</span>
                </div>
                <div>
                  <span className="font-bold text-[#17251F] block text-sm">Zero Backend</span>
                  <span className="text-[#66756D] text-[11px]">100% Client-side privacy</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Hero Graphic illustrating 3 streams & accountability */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="bg-gradient-to-br from-white to-[#F8FAF7] rounded-3xl p-6 sm:p-7 border border-[#E2EAE4] shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2EAE4]">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#43A879]" />
                      <span className="font-bold text-xs text-[#17251F]">Live Waste Stream Separation</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#43A879] bg-[#E7F4EC] px-2 py-0.5 rounded-full">
                      Verified Stream
                    </span>
                  </div>

                  {/* 3 Streams Visualization */}
                  <div className="space-y-3">
                    {/* Wet stream */}
                    <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                          🟢
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-emerald-950">Wet / Biodegradable</h4>
                          <p className="text-[11px] text-emerald-800">Kitchen peelings, food leftovers</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-1 rounded-lg border border-emerald-200">
                        Vermicompost
                      </span>
                    </div>

                    {/* Dry stream */}
                    <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-xs">
                          🔵
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-sky-950">Dry / Recyclables</h4>
                          <p className="text-[11px] text-sky-800">Cardboard, paper, clean plastics</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-sky-800 bg-white px-2 py-1 rounded-lg border border-sky-200">
                        Baler Compactor
                      </span>
                    </div>

                    {/* Special stream */}
                    <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                          🔴
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-amber-950">Special Hazardous</h4>
                          <p className="text-[11px] text-amber-800">Batteries, electronics, CFL lights</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-amber-800 bg-white px-2 py-1 rounded-lg border border-amber-200">
                        Hazard Locker
                      </span>
                    </div>
                  </div>

                  {/* Handover verification callout */}
                  <div className="p-3 rounded-xl bg-[#174C3C] text-white text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#43A879]" />
                      <span>Coordinated Handover & Incident Audit</span>
                    </div>
                    <span className="text-[10px] text-[#43A879] font-bold">100% Tracked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problem" className="py-16 md:py-24 bg-white border-y border-[#E2EAE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
              The Real-World Challenge
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#10382D] mt-3">
              Why Does Properly Segregated Waste Get Mixed?
            </h2>
            <p className="text-sm text-[#66756D] mt-3 leading-relaxed">
              Household segregation efforts are frequently invalidated during the physical collection hand-off due to poor operational coordination, lack of accountability, and missing feedback loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Problem 1 */}
            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#E2EAE4] hover:border-red-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-[#17251F] font-display mb-2">
                Residents are in the Dark After Handover
              </h3>
              <p className="text-xs text-[#66756D] leading-relaxed">
                Households carefully separate kitchen waste and recyclables, but lose visibility once bins leave the flat. When workers pour both streams into a single compactor, residents have no transparent channel to report the issue.
              </p>
            </div>

            {/* Problem 2 */}
            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#E2EAE4] hover:border-amber-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-[#17251F] font-display mb-2">
                Collection Staff Lack Issue Reporting Tools
              </h3>
              <p className="text-xs text-[#66756D] leading-relaxed">
                Collection staff often encounter unsegregated plastic bags inside bins or blocked chute ramps. Without a lightweight reporting mechanism, workers are forced to mix streams to finish their rounds on time.
              </p>
            </div>

            {/* Problem 3 */}
            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#E2EAE4] hover:border-blue-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-[#17251F] font-display mb-2">
                Administrators Lack Unified Visibility
              </h3>
              <p className="text-xs text-[#66756D] leading-relaxed">
                Society facility managers have no live overview of route clearance, missed chutes, or repeated problem hotspots. Non-compliance is treated as isolated complaints instead of systemic operational bottlenecks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-[#F8FAF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-wider text-[#174C3C] bg-[#E7F4EC] px-3 py-1 rounded-full border border-[#43A879]/30">
              Coordinated 3-Step Lifecycle
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#10382D] mt-3">
              How SegreTrack Closes the Loop
            </h2>
            <p className="text-sm text-[#66756D] mt-3 leading-relaxed">
              From household segregation to verified municipal handover, every step is coordinated through synchronized client-side state.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 border border-[#E2EAE4] shadow-xs relative">
              <div className="w-10 h-10 rounded-xl bg-[#174C3C] text-white flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h3 className="text-lg font-bold text-[#17251F] font-display mb-2">
                Residents Segregate & Report
              </h3>
              <p className="text-xs text-[#66756D] leading-relaxed mb-4">
                Residents verify their scheduled collection timetable, follow the 3-stream segregation directory, and immediately log photographic incident reports if collection staff mix streams.
              </p>
              <div className="p-3 rounded-xl bg-[#F8FAF7] border border-[#E2EAE4] text-[11px] text-[#174C3C] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#43A879]" />
                <span>Instant Incident ID & Timeline Generation</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 border border-[#E2EAE4] shadow-xs relative">
              <div className="w-10 h-10 rounded-xl bg-[#43A879] text-white flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h3 className="text-lg font-bold text-[#17251F] font-display mb-2">
                Workers Record Progress & Issues
              </h3>
              <p className="text-xs text-[#66756D] leading-relaxed mb-4">
                Field collection staff follow their assigned building checkpoints, record start and completion timestamps, and report source contamination or obstructed ramps directly from their mobile portal.
              </p>
              <div className="p-3 rounded-xl bg-[#F8FAF7] border border-[#E2EAE4] text-[11px] text-[#174C3C] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#43A879]" />
                <span>One-Tap Clearance & Field Proof</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 border border-[#E2EAE4] shadow-xs relative">
              <div className="w-10 h-10 rounded-xl bg-[#10382D] text-white flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h3 className="text-lg font-bold text-[#17251F] font-display mb-2">
                Admins Monitor & Resolve Hotspots
              </h3>
              <p className="text-xs text-[#66756D] leading-relaxed mb-4">
                Society administrators monitor collection progress in real time, review incident reports, assign corrective actions, reassign pending checkpoints, and detect recurring hotspot patterns.
              </p>
              <div className="p-3 rounded-xl bg-[#F8FAF7] border border-[#E2EAE4] text-[11px] text-[#174C3C] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#43A879]" />
                <span>Deterministic Root-Cause Intelligence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 md:py-24 bg-white border-t border-[#E2EAE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-wider text-[#174C3C] bg-[#E7F4EC] px-3 py-1 rounded-full border border-[#43A879]/30">
              Platform Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#10382D] mt-3">
              Engineered for Real-World Civic Reliability
            </h2>
            <p className="text-sm text-[#66756D] mt-3 leading-relaxed">
              Every feature directly solves communication breakdowns between residents, workers, and housing society committees.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#E2EAE4] space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#E7F4EC] text-[#174C3C] flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#43A879]" />
              </div>
              <h3 className="text-base font-bold text-[#17251F] font-display">
                Collection Schedule Visibility
              </h3>
              <p className="text-xs text-[#66756D] leading-relaxed">
                Filterable door-to-door and chute timetable showing scheduled times, handling instructions, and waste streams.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#E2EAE4] space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#E7F4EC] text-[#174C3C] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#43A879]" />
              </div>
              <h3 className="text-base font-bold text-[#17251F] font-display">
                Household Segregation Guide
              </h3>
              <p className="text-xs text-[#66756D] leading-relaxed">
                Searchable directory covering vegetable peels, cardboard, plastics, and dangerous items like batteries and tube lights.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#E2EAE4] space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-base font-bold text-[#17251F] font-display">
                Waste Mixing Incident Reporting
              </h3>
              <p className="text-xs text-[#66756D] leading-relaxed">
                Validated reporting form with photo preview, unique incident IDs (e.g. INC-1004), and live cross-role synchronization.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#E2EAE4] space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#E7F4EC] text-[#174C3C] flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#43A879]" />
              </div>
              <h3 className="text-base font-bold text-[#17251F] font-display">
                Collection Completion Tracking
              </h3>
              <p className="text-xs text-[#66756D] leading-relaxed">
                One-tap start and mark completed actions with automated timestamping and reactive progress bar updates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#E2EAE4] space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-base font-bold text-[#17251F] font-display">
                Issue Resolution Workflow
              </h3>
              <p className="text-xs text-[#66756D] leading-relaxed">
                Administrative triage hub with status updates (Pending &rarr; Under Review &rarr; Action Planned &rarr; Resolved) and notes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8FAF7] border border-[#E2EAE4] space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                <Flame className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-base font-bold text-[#17251F] font-display">
                Recurring Hotspot Detection
              </h3>
              <p className="text-xs text-[#66756D] leading-relaxed">
                Rule-based pattern aggregation that pinpoints repeat problem locations (like Building B) with actionable follow-up advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection Section (Interactive Entry Points) */}
      <section id="roles" className="py-16 md:py-24 bg-gradient-to-b from-[#F8FAF7] to-[#E7F4EC]/50 border-t border-[#E2EAE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-wider text-[#174C3C] bg-white px-3 py-1 rounded-full border border-[#43A879]/30 shadow-xs">
              Interactive Prototype Entry
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#10382D] mt-3">
              Select a Role to Experience SegreTrack
            </h2>
            <p className="text-sm text-[#66756D] mt-3 leading-relaxed">
              No login required. Click any card to enter the role-specific dashboard with realistic demo data and live state synchronization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Resident Card */}
            <div className="bg-white rounded-3xl p-7 border border-[#E2EAE4] hover:border-[#43A879] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <User className="w-7 h-7 text-[#174C3C]" />
                </div>
                <div className="inline-block text-[11px] font-bold text-[#43A879] bg-[#E7F4EC] px-2.5 py-0.5 rounded-full mb-2">
                  Demo User: Aarav Sharma
                </div>
                <h3 className="text-xl font-bold text-[#17251F] font-display mb-2">
                  Resident Portal
                </h3>
                <p className="text-xs text-[#66756D] leading-relaxed mb-6">
                  View your collection schedule, learn how to segregate waste, and report collection issues.
                </p>
                <ul className="space-y-2 text-xs text-[#17251F] mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#43A879]" />
                    <span>Check Building A collection timetable</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#43A879]" />
                    <span>Search waste segregation directory</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#43A879]" />
                    <span>File photographic mixed-waste reports</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setCurrentRole('resident')}
                className="w-full py-3.5 rounded-xl bg-[#174C3C] hover:bg-[#10382D] text-white text-xs font-bold transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
              >
                <span>Enter Resident Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Worker Card */}
            <div className="bg-white rounded-3xl p-7 border border-[#E2EAE4] hover:border-[#43A879] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Truck className="w-7 h-7 text-blue-700" />
                </div>
                <div className="inline-block text-[11px] font-bold text-[#3977C3] bg-blue-50 px-2.5 py-0.5 rounded-full mb-2">
                  Demo Worker: Ramesh Patil
                </div>
                <h3 className="text-xl font-bold text-[#17251F] font-display mb-2">
                  Collection Worker
                </h3>
                <p className="text-xs text-[#66756D] leading-relaxed mb-6">
                  View assigned collection points, record completed collections, and report operational problems.
                </p>
                <ul className="space-y-2 text-xs text-[#17251F] mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#43A879]" />
                    <span>Fast start / complete collection buttons</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#43A879]" />
                    <span>Real-time completion percentage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#43A879]" />
                    <span>Report unsegregated bins & blocked ramps</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setCurrentRole('worker')}
                className="w-full py-3.5 rounded-xl bg-[#174C3C] hover:bg-[#10382D] text-white text-xs font-bold transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
              >
                <span>Enter Worker Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Administrator Card */}
            <div className="bg-white rounded-3xl p-7 border border-[#E2EAE4] hover:border-[#43A879] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-7 h-7 text-amber-700" />
                </div>
                <div className="inline-block text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full mb-2">
                  Demo Admin: Priya Deshmukh
                </div>
                <h3 className="text-xl font-bold text-[#17251F] font-display mb-2">
                  Society Administrator
                </h3>
                <p className="text-xs text-[#66756D] leading-relaxed mb-6">
                  Monitor collection activity, manage incident reports, and identify recurring issues.
                </p>
                <ul className="space-y-2 text-xs text-[#17251F] mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#43A879]" />
                    <span>Manage all incidents & update statuses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#43A879]" />
                    <span>Detect recurring problem hotspots (Building B)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#43A879]" />
                    <span>Reassign pending checkpoints between staff</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setCurrentRole('admin')}
                className="w-full py-3.5 rounded-xl bg-[#174C3C] hover:bg-[#10382D] text-white text-xs font-bold transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
              >
                <span>Enter Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#10382D] text-white pt-16 pb-12 border-t border-[#174C3C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
            {/* Column 1: Brand */}
            <div className="md:col-span-2 space-y-3">
              <Logo variant="light" size="lg" showTagline={true} />
              <p className="text-xs text-[#C4D3C9] leading-relaxed max-w-sm pt-2">
                SegreTrack improves coordination, transparency, and accountability between household segregation and waste collection teams.
              </p>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs text-[#C4D3C9]">
                <li>
                  <button onClick={() => scrollToSection('problem')} className="hover:text-white transition-colors">
                    The Problem
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors">
                    How It Works
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">
                    Core Platform Features
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('roles')} className="hover:text-white transition-colors">
                    Demo Role Portals
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Portals */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                Demo Dashboards
              </h4>
              <ul className="space-y-2 text-xs text-[#C4D3C9]">
                <li>
                  <button onClick={() => setCurrentRole('resident')} className="hover:text-white transition-colors">
                    Resident Portal (Aarav)
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentRole('worker')} className="hover:text-white transition-colors">
                    Worker Portal (Ramesh)
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentRole('admin')} className="hover:text-white transition-colors">
                    Society Admin (Priya)
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Academic Prototype Disclaimer & Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A3BAAB]">
            <p>
              Academic Design-Thinking Prototype for Demonstration Purposes. No external API, hardware, or backend required.
            </p>
            <p>
              &copy; {new Date().getFullYear()} SegreTrack. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <ToastContainer />
    </div>
  );
};
