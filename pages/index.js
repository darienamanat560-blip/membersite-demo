import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { CheckCircle, ArrowRight, ArrowLeft, Shield, Lock, Eye, EyeOff, Mail, FileText, Package, User, LogOut, ChevronRight, Users, Menu, X } from 'lucide-react';

export default function TruechemMembership() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [pageTransition, setPageTransition] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [showPassword, setShowPassword] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  // Navigate with smooth transition
  const navigateTo = (page) => {
    setPageTransition(true);
    setIsMenuOpen(false);
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => {
        setPageTransition(false);
      }, 50);
    }, 300);
  };

  // SVG Vial Icon matching the logo design
  const VialIcon = ({ size = 24, className = "" }) => (
    <svg width={size} height={size * 1.4} viewBox="0 0 24 34" fill="none" className={className}>
      {/* Cap */}
      <rect x="6" y="1" width="12" height="5" rx="1" fill="currentColor"/>
      {/* Neck connectors */}
      <path d="M7 6V9H17V6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      {/* Body outline */}
      <path d="M7 9V28C7 30.7614 9.23858 33 12 33C14.7614 33 17 30.7614 17 28V9" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      {/* Fill level */}
      <path d="M8.5 20V28C8.5 29.933 10.067 31.5 12 31.5C13.933 31.5 15.5 29.933 15.5 28V20H8.5Z" fill="currentColor"/>
    </svg>
  );

  // Logo component with text
  const Logo = ({ white = true, showTagline = false }) => (
    <div className="flex items-center gap-2.5">
      <VialIcon size={20} className={white ? "text-white" : "text-black"} />
      <div className="flex flex-col">
        <div className={`text-xl tracking-[0.12em] lowercase ${white ? 'text-white' : 'text-black'}`}>
          <span className="font-bold">true</span>
          <span className="font-normal">chem</span>
        </div>
        {showTagline && (
          <div className="text-[9px] tracking-[0.2em] uppercase text-zinc-500 -mt-0.5">99%+ Certified</div>
        )}
      </div>
    </div>
  );

  // Demo product data - actual truechem products
  const products = [
    { id: 1, name: 'Retatrutide', category: 'GLP-1', purity: '99.4%', price: 189, inStock: true },
    { id: 2, name: 'GHK-Cu', category: 'Recovery', purity: '99.1%', price: 89, inStock: true },
    { id: 3, name: 'CJC-1295/Ipamorelin', category: 'Growth', purity: '99.3%', price: 149, inStock: true },
    { id: 4, name: 'BPC-157/TB-500', category: 'Recovery', purity: '99.2%', price: 129, inStock: true },
    { id: 5, name: 'SLU-PP-332', category: 'Metabolic', purity: '99.5%', price: 219, inStock: true },
    { id: 6, name: 'Injectable L-Carnitine', category: 'Metabolic', purity: '99.2%', price: 79, inStock: true },
  ];

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  // Common head component
  const PageHead = ({ title }) => (
    <Head>
      <title>{title} | truechem</title>
      <meta name="description" content="truechem membership - verified compounds for recovery and performance" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
    </Head>
  );

  // Common styles
  const GlobalStyles = () => (
    <style jsx global>{`
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { 
        font-family: 'JetBrains Mono', monospace;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      .font-display { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
      .font-mono { font-family: 'JetBrains Mono', monospace; }
      
      /* Custom scrollbar */
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: #0a0a0a; }
      ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: #555; }
      
      /* Form styles */
      input:focus, textarea:focus, select:focus { outline: none; }
      input::placeholder, textarea::placeholder { color: #52525b; }
      
      /* Animations */
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
      .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
      .animate-scale-in { animation: scaleIn 0.4s ease-out forwards; }
    `}</style>
  );

  // ==========================================
  // LANDING PAGE
  // ==========================================
  if (currentPage === 'landing') {
    return (
      <>
        <PageHead title="Member Access" />
        <GlobalStyles />
        <div className={`min-h-screen bg-black text-white transition-opacity duration-300 ${pageTransition ? 'opacity-0' : 'opacity-100'}`}>
          {/* Header */}
          <header className="border-b border-zinc-800 sticky top-0 z-50 bg-black/95 backdrop-blur-sm">
            <div className="max-w-[1200px] mx-auto px-6 py-5">
              <div className="flex items-center justify-between">
                <Logo white={true} />
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => navigateTo('signup')}
                    className="hidden sm:block text-sm text-zinc-400 hover:text-white transition-colors font-mono"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => navigateTo('signup')}
                    className="px-5 py-2.5 bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors font-mono"
                  >
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Hero */}
          <section className="py-24 sm:py-32 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <span className="inline-block px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-mono">
                  Member Access
                </span>
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 leading-[1.05] tracking-[-0.02em] text-white">
                Recovery &<br />Performance.
              </h1>
              <p className="text-zinc-500 text-sm font-mono tracking-wider uppercase mb-6">Verified quality.</p>
              <p className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Verified quality. Third-party tested. US-manufactured compounds for serious researchers and athletes.
              </p>
              <button 
                onClick={() => navigateTo('signup')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-all group font-mono"
              >
                Become a Member
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>

          {/* Stats Bar */}
          <section className="border-y border-zinc-800 py-10 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.02em] mb-1">99%+ Purity</div>
                  <div className="text-xs text-zinc-500 font-mono">Third-party tested.</div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.02em] mb-1">Same-Day Processing</div>
                  <div className="text-xs text-zinc-500 font-mono">Mon–Wed. Expedited options available.</div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.02em] mb-1">COA Verified</div>
                  <div className="text-xs text-zinc-500 font-mono">Every batch documented.</div>
                </div>
              </div>
            </div>
          </section>

          {/* What You Get */}
          <section className="py-24 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-16">
                <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.02em] mb-4">What's included.</h2>
                <p className="text-zinc-500 text-lg">Everything you need. Nothing you don't.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: Shield, title: 'Verified Compounds', desc: 'Access to US-manufactured, third-party tested products. Every batch includes a Certificate of Analysis from an independent lab.' },
                  { icon: FileText, title: 'Monthly Insights', desc: 'Research updates, protocol guides, and educational content delivered to your inbox. Stay informed with the latest developments.' },
                  { icon: Mail, title: 'Priority Access', desc: 'First access to new products, restocks, and limited releases. Members get notified before the public.' },
                  { icon: Users, title: 'Direct Support', desc: 'Questions? Our team responds within 24 hours. Real support from people who understand what you\'re working on.' },
                ].map((item, i) => (
                  <div key={i} className="border border-zinc-800 p-8 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1 group">
                    <div className="w-12 h-12 border border-zinc-700 flex items-center justify-center mb-6 group-hover:border-zinc-500 transition-colors">
                      <item.icon size={22} className="text-white" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* The truechem Standard */}
          <section className="py-24 px-6 bg-zinc-950">
            <div className="max-w-3xl mx-auto">
              <div className="mb-12">
                <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.02em] mb-4">The truechem standard.</h2>
                <p className="text-zinc-500 text-lg">What separates us from everyone else.</p>
              </div>

              <div className="space-y-6">
                {[
                  { title: 'US Manufacturing', desc: 'Synthesized in ISO 9001:2015 certified facilities. Not imported. Not relabeled. Actually made here.' },
                  { title: 'Independent Testing', desc: 'Every batch is tested by a third-party lab with no stake in the results. We publish everything.' },
                  { title: '99%+ Purity', desc: "We don't ship anything below our standard. If it doesn't pass, it doesn't go out. Simple as that." },
                  { title: 'Full Transparency', desc: 'Every COA is available. Look up your exact batch and verify the results yourself before use.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-6 h-6 border border-zinc-700 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-white group-hover:bg-white transition-colors">
                      <CheckCircle size={14} className="text-white group-hover:text-black transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold mb-1">{item.title}</h4>
                      <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Membership Pricing */}
          <section className="py-24 px-6">
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.02em] mb-4">Join truechem.</h2>
                <p className="text-zinc-500 text-lg">Simple membership. Cancel anytime.</p>
              </div>

              {/* Plan Toggle */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex border border-zinc-800">
                  <button 
                    onClick={() => setSelectedPlan('monthly')}
                    className={`px-6 py-3 text-sm font-mono transition-all ${selectedPlan === 'monthly' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
                  >
                    Monthly
                  </button>
                  <button 
                    onClick={() => setSelectedPlan('yearly')}
                    className={`px-6 py-3 text-sm font-mono transition-all ${selectedPlan === 'yearly' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
                  >
                    Yearly <span className="text-green-500 text-xs ml-1">Save 20%</span>
                  </button>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="border border-zinc-700 p-8 text-center hover:border-zinc-500 transition-colors">
                <div className="mb-6">
                  <div className="text-5xl font-bold mb-2">
                    {selectedPlan === 'monthly' ? '$29' : '$279'}
                    <span className="text-lg text-zinc-500 font-normal">/{selectedPlan === 'monthly' ? 'mo' : 'yr'}</span>
                  </div>
                  {selectedPlan === 'yearly' && (
                    <div className="text-sm text-green-500">$23.25/mo billed annually</div>
                  )}
                </div>

                <ul className="space-y-3 text-left mb-8">
                  {['Access to full product catalog', 'Monthly research & protocol updates', 'Priority access to new releases', 'COA library & batch verification', 'Direct support within 24 hours'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => navigateTo('signup')}
                  className="w-full py-4 bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-all mb-4 font-mono"
                >
                  Start Membership
                </button>
                
                <p className="text-xs text-zinc-600 font-mono">
                  Cancel anytime. No questions asked.
                </p>
              </div>

              <p className="text-center text-xs text-zinc-600 mt-6 font-mono">
                Products purchased separately. Membership grants access to catalog and member benefits.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-24 px-6 bg-zinc-950">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-display text-3xl font-bold mb-10 text-center tracking-[-0.02em]">Questions.</h2>
              
              <div className="space-y-6">
                {[
                  { q: 'What do I get with membership?', a: 'Access to our full catalog of verified compounds, monthly educational content, priority notifications on restocks and new products, and direct support from our team.' },
                  { q: 'Are products included in the membership fee?', a: 'Membership grants access to purchase from our catalog. Products are purchased separately at member pricing.' },
                  { q: 'How do I verify product quality?', a: 'Every batch includes a Certificate of Analysis from an independent, third-party lab. You can look up your exact batch number in our COA library.' },
                  { q: 'Can I cancel anytime?', a: "Yes. Cancel through your account dashboard. No questions, no hassle. You'll retain access until the end of your billing period." },
                  { q: 'Who is this for?', a: 'Researchers, athletes, and individuals focused on recovery and performance who want verified, high-quality compounds from a transparent source.' },
                ].map((item, i) => (
                  <div key={i} className="border-b border-zinc-800 pb-6">
                    <h4 className="font-display font-semibold mb-2">{item.q}</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-24 px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-4xl font-bold mb-4 tracking-[-0.02em]">Ready to join?</h2>
              <p className="text-zinc-500 mb-8 text-lg">
                Verified quality. Full transparency. No compromises.
              </p>
              <button 
                onClick={() => navigateTo('signup')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-all group font-mono"
              >
                Become a Member
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 px-6 border-t border-zinc-800">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                <Logo white={true} />
                <div className="flex items-center gap-6 text-xs text-zinc-600 font-mono">
                  <button onClick={() => navigateTo('terms')} className="hover:text-zinc-400 transition-colors">Terms</button>
                  <button onClick={() => navigateTo('privacy')} className="hover:text-zinc-400 transition-colors">Privacy</button>
                  <button onClick={() => navigateTo('contact')} className="hover:text-zinc-400 transition-colors">Contact</button>
                </div>
                <div className="text-xs text-zinc-600 font-mono">
                  © 2025 truechem
                </div>
              </div>
            </div>
          </footer>
        </div>
      </>
    );
  }

  // ==========================================
  // SIGNUP PAGE
  // ==========================================
  if (currentPage === 'signup') {
    return (
      <>
        <PageHead title="Join" />
        <GlobalStyles />
        <div className={`min-h-screen bg-black text-white transition-opacity duration-300 ${pageTransition ? 'opacity-0' : 'opacity-100'}`}>
          {/* Header */}
          <header className="border-b border-zinc-800">
            <div className="max-w-[1200px] mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <button onClick={() => navigateTo('landing')}>
                  <Logo white={true} />
                </button>
                <button 
                  onClick={() => navigateTo('landing')}
                  className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group font-mono"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  Back
                </button>
              </div>
            </div>
          </header>

          <div className="max-w-[1000px] mx-auto px-6 py-12 sm:py-20">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left - Form */}
              <div>
                <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.02em] mb-2">Join truechem.</h1>
                <p className="text-zinc-500 mb-8">Create your account to get started.</p>

                <form onSubmit={(e) => { e.preventDefault(); navigateTo('welcome'); }}>
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[10px] text-zinc-500 uppercase tracking-[0.15em] mb-2 font-mono">First Name</label>
                      <input 
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full bg-transparent border border-zinc-700 px-4 py-3 text-white focus:border-white transition-colors font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-500 uppercase tracking-[0.15em] mb-2 font-mono">Last Name</label>
                      <input 
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full bg-transparent border border-zinc-700 px-4 py-3 text-white focus:border-white transition-colors font-mono"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label className="block text-[10px] text-zinc-500 uppercase tracking-[0.15em] mb-2 font-mono">Email</label>
                    <input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-transparent border border-zinc-700 px-4 py-3 text-white focus:border-white transition-colors font-mono"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-6">
                    <label className="block text-[10px] text-zinc-500 uppercase tracking-[0.15em] mb-2 font-mono">Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full bg-transparent border border-zinc-700 px-4 py-3 text-white focus:border-white transition-colors pr-12 font-mono"
                        required
                        minLength={8}
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <p className="text-[10px] text-zinc-600 mt-2 font-mono">Minimum 8 characters</p>
                  </div>

                  {/* Plan Selection */}
                  <div className="mb-6">
                    <label className="block text-[10px] text-zinc-500 uppercase tracking-[0.15em] mb-3 font-mono">Select Plan</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedPlan('monthly')}
                        className={`p-4 border text-left transition-all ${selectedPlan === 'monthly' ? 'border-white bg-white/5' : 'border-zinc-700 hover:border-zinc-500'}`}
                      >
                        <div className="font-display font-semibold mb-1">Monthly</div>
                        <div className="font-display text-2xl font-bold">$29<span className="text-sm text-zinc-500 font-normal">/mo</span></div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPlan('yearly')}
                        className={`p-4 border text-left transition-all relative ${selectedPlan === 'yearly' ? 'border-white bg-white/5' : 'border-zinc-700 hover:border-zinc-500'}`}
                      >
                        <div className="absolute -top-2 right-3 px-2 py-0.5 bg-green-500 text-black text-[9px] font-bold font-mono tracking-wider">SAVE 20%</div>
                        <div className="font-display font-semibold mb-1">Yearly</div>
                        <div className="font-display text-2xl font-bold">$279<span className="text-sm text-zinc-500 font-normal">/yr</span></div>
                      </button>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="mb-6">
                    <label className="block text-[10px] text-zinc-500 uppercase tracking-[0.15em] mb-2 font-mono">Card Number</label>
                    <input 
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full bg-transparent border border-zinc-700 px-4 py-3 text-white focus:border-white transition-colors placeholder-zinc-600 font-mono"
                    />
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-[10px] text-zinc-500 uppercase tracking-[0.15em] mb-2 font-mono">Expiry</label>
                        <input 
                          type="text"
                          placeholder="MM/YY"
                          className="w-full bg-transparent border border-zinc-700 px-4 py-3 text-white focus:border-white transition-colors placeholder-zinc-600 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-zinc-500 uppercase tracking-[0.15em] mb-2 font-mono">CVC</label>
                        <input 
                          type="text"
                          placeholder="123"
                          className="w-full bg-transparent border border-zinc-700 px-4 py-3 text-white focus:border-white transition-colors placeholder-zinc-600 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="mb-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" className="mt-1 w-4 h-4 accent-white" required />
                      <span className="text-xs text-zinc-500 leading-relaxed">
                        I agree to the <button type="button" onClick={() => navigateTo('terms')} className="text-white underline">Terms of Service</button> and <button type="button" onClick={() => navigateTo('privacy')} className="text-white underline">Privacy Policy</button>. 
                        I understand products are for research purposes only.
                      </span>
                    </label>
                  </div>

                  {/* Submit */}
                  <button 
                    type="submit"
                    className="w-full py-4 bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group font-mono"
                  >
                    Start Membership
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center justify-center gap-2 mt-4 text-xs text-zinc-600 font-mono">
                    <Lock size={12} />
                    Secure checkout
                  </div>
                </form>
              </div>

              {/* Right - Summary */}
              <div className="lg:pt-12">
                <div className="border border-zinc-800 p-6 sm:p-8 sticky top-8">
                  <h3 className="font-display font-bold text-lg mb-6">Membership includes:</h3>
                  
                  <ul className="space-y-4 mb-8">
                    {['Access to full product catalog', 'Monthly research & protocol updates', 'Priority access to new releases', 'COA library & batch verification', 'Direct support within 24 hours'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-zinc-300">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-zinc-800 pt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-zinc-500">Plan</span>
                      <span className="font-mono">{selectedPlan === 'monthly' ? 'Monthly' : 'Yearly'}</span>
                    </div>
                    <div className="flex justify-between items-center font-display text-xl font-bold">
                      <span>Total today</span>
                      <span>{selectedPlan === 'monthly' ? '$29' : '$279'}</span>
                    </div>
                    {selectedPlan === 'yearly' && (
                      <p className="text-xs text-green-500 text-right mt-1 font-mono">You're saving $69/year</p>
                    )}
                  </div>
                </div>

                <p className="text-xs text-zinc-600 mt-4 text-center font-mono">
                  Cancel anytime. No questions asked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ==========================================
  // WELCOME PAGE
  // ==========================================
  if (currentPage === 'welcome') {
    return (
      <>
        <PageHead title="Welcome" />
        <GlobalStyles />
        <div className={`min-h-screen bg-black text-white flex items-center justify-center transition-opacity duration-300 ${pageTransition ? 'opacity-0' : 'opacity-100'}`}>
          <div className="max-w-xl mx-auto px-6 py-20 text-center animate-scale-in">
            <div className="w-16 h-16 bg-white flex items-center justify-center mx-auto mb-8">
              <CheckCircle size={32} className="text-black" />
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.02em] mb-4">Welcome to truechem.</h1>
            <p className="text-zinc-400 text-lg mb-8">
              Your membership is active. You now have full access to our catalog and member benefits.
            </p>

            <div className="border border-zinc-800 p-6 text-left mb-8">
              <h3 className="font-display font-bold mb-4">What's next:</h3>
              <ul className="space-y-3 text-sm text-zinc-400">
                {[
                  'Browse our product catalog and place your first order',
                  'Check your email for your welcome guide and first newsletter',
                  'Explore our COA library to learn how we verify quality'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-white text-black flex items-center justify-center flex-shrink-0 text-xs font-bold font-mono">{i + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => navigateTo('dashboard')}
              className="px-8 py-4 bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-all inline-flex items-center gap-2 group font-mono"
            >
              Go to Dashboard
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-xs text-zinc-600 mt-8 font-mono">
              Questions? Email us at support@truechem.io
            </p>
          </div>
        </div>
      </>
    );
  }

  // ==========================================
  // DASHBOARD
  // ==========================================
  if (currentPage === 'dashboard') {
    return (
      <>
        <PageHead title="Dashboard" />
        <GlobalStyles />
        <div className={`min-h-screen bg-zinc-950 text-white transition-opacity duration-300 ${pageTransition ? 'opacity-0' : 'opacity-100'}`}>
          {/* Header */}
          <header className="bg-black border-b border-zinc-800 sticky top-0 z-50">
            <div className="max-w-[1400px] mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <VialIcon size={20} className="text-white" />
                  <div className="flex flex-col">
                    <div className="text-xl tracking-[0.12em] lowercase">
                      <span className="font-bold">true</span>
                      <span className="font-normal">chem</span>
                    </div>
                    <div className="text-[8px] tracking-[0.15em] uppercase text-green-500 -mt-0.5 font-mono">Member</div>
                  </div>
                </div>

                <nav className="hidden md:flex items-center space-x-8">
                  <button className="text-sm font-medium text-white">Products</button>
                  <button onClick={() => navigateTo('coa')} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">COA Library</button>
                  <button onClick={() => navigateTo('resources')} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Resources</button>
                  <button onClick={() => navigateTo('account')} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Account</button>
                </nav>

                <div className="flex items-center gap-4">
                  <button className="hidden sm:block text-sm text-zinc-400 hover:text-white transition-colors font-mono">
                    Cart ({cartCount})
                  </button>
                  <button onClick={() => navigateTo('account')} className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors">
                    <User size={16} />
                  </button>
                  <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden w-8 h-8 flex items-center justify-center">
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                  </button>
                </div>
              </div>

              {/* Mobile Menu */}
              {isMenuOpen && (
                <div className="md:hidden border-t border-zinc-800 mt-4 pt-4 pb-2">
                  <nav className="flex flex-col space-y-3">
                    <button className="text-sm font-medium text-white text-left py-2">Products</button>
                    <button onClick={() => navigateTo('coa')} className="text-sm font-medium text-zinc-400 text-left py-2">COA Library</button>
                    <button onClick={() => navigateTo('resources')} className="text-sm font-medium text-zinc-400 text-left py-2">Resources</button>
                    <button onClick={() => navigateTo('account')} className="text-sm font-medium text-zinc-400 text-left py-2">Account</button>
                    <button className="text-sm font-medium text-zinc-400 text-left py-2 font-mono">Cart ({cartCount})</button>
                  </nav>
                </div>
              )}
            </div>
          </header>

          {/* Content */}
          <main className="max-w-[1400px] mx-auto px-6 py-8">
            {/* Welcome Banner */}
            <div className="bg-black border border-zinc-800 p-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="font-display text-2xl font-bold mb-1">Welcome back{formData.firstName ? `, ${formData.firstName}` : ''}.</h1>
                  <p className="text-zinc-500 text-sm">Your membership is active. Browse our catalog below.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Member since</div>
                    <div className="text-sm font-mono">Jan 2025</div>
                  </div>
                  <div className="w-px h-8 bg-zinc-800"></div>
                  <div className="text-right">
                    <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Plan</div>
                    <div className="text-sm font-mono capitalize">{selectedPlan}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { icon: Package, label: 'My Orders', action: () => {} },
                { icon: FileText, label: 'COA Library', action: () => navigateTo('coa') },
                { icon: Mail, label: 'Newsletters', action: () => navigateTo('resources') },
                { icon: User, label: 'Account', action: () => navigateTo('account') },
              ].map((item, i) => (
                <button 
                  key={i}
                  onClick={item.action}
                  className="bg-black border border-zinc-800 p-4 hover:border-zinc-600 transition-all text-left group hover:-translate-y-0.5"
                >
                  <item.icon size={20} className="text-zinc-500 mb-2 group-hover:text-white transition-colors" />
                  <div className="text-sm font-medium">{item.label}</div>
                </button>
              ))}
            </div>

            {/* Product Catalog */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="font-display text-xl font-bold">Product Catalog</h2>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Filter:</span>
                  <select className="bg-transparent border border-zinc-800 px-3 py-1.5 text-sm focus:outline-none focus:border-zinc-600 font-mono">
                    <option value="all">All Categories</option>
                    <option value="metabolic">Metabolic</option>
                    <option value="glp1">GLP-1</option>
                    <option value="growth">Growth</option>
                    <option value="recovery">Recovery</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product, i) => (
                  <div 
                    key={product.id} 
                    className="bg-black border border-zinc-800 p-5 hover:border-zinc-600 transition-all hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-[0.15em] mb-1 font-mono">{product.category}</div>
                        <h3 className="font-display font-semibold">{product.name}</h3>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-lg font-bold">${product.price}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Purity:</span>
                        <span className="text-sm font-mono text-green-500">{product.purity}</span>
                      </div>
                      <span className={`text-xs font-mono ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={addToCart}
                        className="flex-1 py-2 bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono" 
                        disabled={!product.inStock}
                      >
                        Add to Cart
                      </button>
                      <button onClick={() => navigateTo('coa')} className="px-3 py-2 border border-zinc-700 text-xs hover:border-white transition-colors font-mono">
                        COA
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-black border border-zinc-800 p-6 hover:border-zinc-600 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-[0.15em] mb-2 font-mono">Latest Newsletter</div>
                  <h3 className="font-display font-bold text-lg mb-2">January 2025: New Compounds & Research Updates</h3>
                  <p className="text-zinc-500 text-sm">Protocol guides, dosing research, and what's coming next.</p>
                </div>
                <button onClick={() => navigateTo('resources')} className="px-4 py-2 border border-zinc-700 text-sm hover:border-white transition-colors flex items-center gap-2 flex-shrink-0 group font-mono">
                  Read
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  // ==========================================
  // ACCOUNT PAGE
  // ==========================================
  if (currentPage === 'account') {
    return (
      <>
        <PageHead title="Account" />
        <GlobalStyles />
        <div className={`min-h-screen bg-zinc-950 text-white transition-opacity duration-300 ${pageTransition ? 'opacity-0' : 'opacity-100'}`}>
          {/* Header */}
          <header className="bg-black border-b border-zinc-800 sticky top-0 z-50">
            <div className="max-w-[1400px] mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <button onClick={() => navigateTo('dashboard')} className="flex items-center gap-2.5">
                  <VialIcon size={20} className="text-white" />
                  <div className="flex flex-col">
                    <div className="text-xl tracking-[0.12em] lowercase">
                      <span className="font-bold">true</span>
                      <span className="font-normal">chem</span>
                    </div>
                    <div className="text-[8px] tracking-[0.15em] uppercase text-green-500 -mt-0.5 font-mono">Member</div>
                  </div>
                </button>
                <button onClick={() => navigateTo('dashboard')} className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group font-mono">
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  Back to Dashboard
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="max-w-[800px] mx-auto px-6 py-10">
            <h1 className="font-display text-2xl font-bold mb-8">Account Settings</h1>

            {/* Profile */}
            <div className="bg-black border border-zinc-800 p-6 mb-6">
              <h2 className="font-display font-bold mb-4">Profile</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-zinc-500 uppercase tracking-[0.15em] mb-2 font-mono">First Name</label>
                  <input type="text" defaultValue={formData.firstName || 'John'} className="w-full bg-transparent border border-zinc-700 px-4 py-3 text-white focus:border-white transition-colors font-mono" />
                </div>
                <div>
                  <label className="block text-[10px] text-zinc-500 uppercase tracking-[0.15em] mb-2 font-mono">Last Name</label>
                  <input type="text" defaultValue={formData.lastName || 'Doe'} className="w-full bg-transparent border border-zinc-700 px-4 py-3 text-white focus:border-white transition-colors font-mono" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] text-zinc-500 uppercase tracking-[0.15em] mb-2 font-mono">Email</label>
                  <input type="email" defaultValue={formData.email || 'john@example.com'} className="w-full bg-transparent border border-zinc-700 px-4 py-3 text-white focus:border-white transition-colors font-mono" />
                </div>
              </div>
              <button className="mt-4 px-6 py-2 bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-colors font-mono">
                Save Changes
              </button>
            </div>

            {/* Membership */}
            <div className="bg-black border border-zinc-800 p-6 mb-6">
              <h2 className="font-display font-bold mb-4">Membership</h2>
              {[
                { label: 'Status', value: <span className="text-green-500 font-medium">Active</span> },
                { label: 'Plan', value: <span className="capitalize font-mono">{selectedPlan}</span> },
                { label: 'Price', value: <span className="font-mono">{selectedPlan === 'monthly' ? '$29/month' : '$279/year'}</span> },
                { label: 'Next billing date', value: <span className="font-mono">Feb 5, 2025</span> },
                { label: 'Member since', value: <span className="font-mono">Jan 5, 2025</span> },
              ].map((item, i) => (
                <div key={i} className={`flex items-center justify-between py-3 ${i < 4 ? 'border-b border-zinc-800' : ''}`}>
                  <span className="text-zinc-500">{item.label}</span>
                  {item.value}
                </div>
              ))}
              <div className="flex flex-wrap gap-3 mt-4">
                <button className="px-4 py-2 border border-zinc-700 text-sm hover:border-white transition-colors font-mono">Change Plan</button>
                <button className="px-4 py-2 border border-red-900 text-red-500 text-sm hover:border-red-500 transition-colors font-mono">Cancel Membership</button>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-black border border-zinc-800 p-6 mb-6">
              <h2 className="font-display font-bold mb-4">Payment Method</h2>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-zinc-800 rounded flex items-center justify-center text-[10px] font-bold font-mono">VISA</div>
                  <span className="text-zinc-400 font-mono">•••• •••• •••• 4242</span>
                </div>
                <button className="text-sm text-zinc-500 hover:text-white transition-colors font-mono">Update</button>
              </div>
            </div>

            {/* Password */}
            <div className="bg-black border border-zinc-800 p-6 mb-6">
              <h2 className="font-display font-bold mb-4">Password</h2>
              <button className="px-4 py-2 border border-zinc-700 text-sm hover:border-white transition-colors font-mono">Change Password</button>
            </div>

            {/* Sign Out */}
            <button onClick={() => navigateTo('landing')} className="w-full py-3 border border-zinc-800 text-zinc-500 text-sm hover:border-zinc-600 hover:text-white transition-colors flex items-center justify-center gap-2 group font-mono">
              <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
              Sign Out
            </button>
          </main>
        </div>
      </>
    );
  }

  // ==========================================
  // COA LIBRARY
  // ==========================================
  if (currentPage === 'coa') {
    return (
      <>
        <PageHead title="COA Library" />
        <GlobalStyles />
        <div className={`min-h-screen bg-zinc-950 text-white transition-opacity duration-300 ${pageTransition ? 'opacity-0' : 'opacity-100'}`}>
          <header className="bg-black border-b border-zinc-800 sticky top-0 z-50">
            <div className="max-w-[1400px] mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <button onClick={() => navigateTo('dashboard')} className="flex items-center gap-2.5">
                  <VialIcon size={20} className="text-white" />
                  <div className="flex flex-col">
                    <div className="text-xl tracking-[0.12em] lowercase"><span className="font-bold">true</span><span className="font-normal">chem</span></div>
                    <div className="text-[8px] tracking-[0.15em] uppercase text-green-500 -mt-0.5 font-mono">Member</div>
                  </div>
                </button>
                <button onClick={() => navigateTo('dashboard')} className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group font-mono">
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  Back to Dashboard
                </button>
              </div>
            </div>
          </header>

          <main className="max-w-[1000px] mx-auto px-6 py-10">
            <h1 className="font-display text-2xl font-bold mb-2">COA Library</h1>
            <p className="text-zinc-500 mb-8">Certificates of Analysis for all products. Look up your batch number.</p>

            <div className="mb-8">
              <input type="text" placeholder="Search by batch number or product name..." className="w-full bg-transparent border border-zinc-700 px-4 py-3 text-white focus:border-white transition-colors placeholder-zinc-600 font-mono" />
            </div>

            <div className="space-y-4">
              {products.map((product, i) => (
                <div key={product.id} className="bg-black border border-zinc-800 p-5 hover:border-zinc-600 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="font-display font-semibold mb-1">{product.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-zinc-500 font-mono">
                        <span>Batch: TC-2025-{String(product.id).padStart(4, '0')}</span>
                        <span>Purity: <span className="text-green-500">{product.purity}</span></span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 border border-zinc-700 text-sm hover:border-white transition-colors font-mono">View COA</button>
                      <button className="px-4 py-2 bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-colors font-mono">Download PDF</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </>
    );
  }

  // ==========================================
  // RESOURCES
  // ==========================================
  if (currentPage === 'resources') {
    return (
      <>
        <PageHead title="Resources" />
        <GlobalStyles />
        <div className={`min-h-screen bg-zinc-950 text-white transition-opacity duration-300 ${pageTransition ? 'opacity-0' : 'opacity-100'}`}>
          <header className="bg-black border-b border-zinc-800 sticky top-0 z-50">
            <div className="max-w-[1400px] mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <button onClick={() => navigateTo('dashboard')} className="flex items-center gap-2.5">
                  <VialIcon size={20} className="text-white" />
                  <div className="flex flex-col">
                    <div className="text-xl tracking-[0.12em] lowercase"><span className="font-bold">true</span><span className="font-normal">chem</span></div>
                    <div className="text-[8px] tracking-[0.15em] uppercase text-green-500 -mt-0.5 font-mono">Member</div>
                  </div>
                </button>
                <button onClick={() => navigateTo('dashboard')} className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group font-mono">
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  Back to Dashboard
                </button>
              </div>
            </div>
          </header>

          <main className="max-w-[1000px] mx-auto px-6 py-10">
            <h1 className="font-display text-2xl font-bold mb-2">Resources</h1>
            <p className="text-zinc-500 mb-8">Member newsletters, guides, and educational content.</p>

            <div className="mb-10">
              <h2 className="font-display text-lg font-bold mb-4">Newsletters</h2>
              <div className="space-y-4">
                {[
                  { date: 'January 2025', title: 'New Compounds & Research Updates' },
                  { date: 'December 2024', title: 'Protocol Guides: Getting Started' },
                ].map((item, i) => (
                  <div key={i} className="bg-black border border-zinc-800 p-5 hover:border-zinc-600 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <div className="text-[10px] text-zinc-500 mb-1 font-mono uppercase tracking-wider">{item.date}</div>
                        <h3 className="font-display font-semibold">{item.title}</h3>
                      </div>
                      <button className="px-4 py-2 border border-zinc-700 text-sm hover:border-white transition-colors flex items-center gap-2 group font-mono">
                        Read <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-lg font-bold mb-4">Guides</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: FileText, title: 'How to Read a COA', desc: 'Understanding purity, mass spec, and sterility results.' },
                  { icon: Shield, title: 'Storage & Handling', desc: 'Best practices for maintaining compound integrity.' },
                ].map((item, i) => (
                  <div key={i} className="bg-black border border-zinc-800 p-5 hover:border-zinc-600 transition-all hover:-translate-y-0.5">
                    <item.icon size={24} className="text-zinc-500 mb-3" />
                    <h3 className="font-display font-semibold mb-2">{item.title}</h3>
                    <p className="text-zinc-500 text-sm mb-4">{item.desc}</p>
                    <button className="text-sm text-white underline">Read Guide →</button>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  // ==========================================
  // TERMS
  // ==========================================
  if (currentPage === 'terms') {
    return (
      <>
        <PageHead title="Terms of Service" />
        <GlobalStyles />
        <div className={`min-h-screen bg-black text-white transition-opacity duration-300 ${pageTransition ? 'opacity-0' : 'opacity-100'}`}>
          <header className="border-b border-zinc-800">
            <div className="max-w-[1200px] mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <button onClick={() => navigateTo('landing')}><Logo white={true} /></button>
                <button onClick={() => navigateTo('landing')} className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group font-mono">
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />Back
                </button>
              </div>
            </div>
          </header>

          <main className="max-w-[800px] mx-auto px-6 py-12">
            <h1 className="font-display text-4xl font-bold tracking-[-0.02em] mb-2">Terms of Service</h1>
            <p className="text-zinc-500 text-sm mb-8 font-mono">Last updated: January 2025</p>

            <div className="space-y-6 text-zinc-400 text-sm leading-relaxed">
              <p>These Terms of Service govern your access to and use of truechem membership services. By becoming a member, you agree to be bound by these Terms.</p>
              
              {[
                { title: '1. Membership', content: 'Membership grants access to our product catalog, educational content, and member benefits. Products are purchased separately from the membership fee.' },
                { title: '2. Research Use Only', content: 'All products are sold strictly for laboratory research purposes only. Products are not intended for human consumption, clinical use, or therapeutic application.' },
                { title: '3. Age Requirement', content: 'You must be at least 21 years of age to become a member and purchase products.' },
                { title: '4. Billing & Cancellation', content: 'Membership fees are billed monthly or annually based on your selected plan. You may cancel your membership at any time through your account settings. Upon cancellation, you will retain access until the end of your current billing period.' },
                { title: '5. Contact', content: 'For questions regarding these Terms, please contact support@truechem.io' },
              ].map((item, i) => (
                <div key={i}>
                  <h2 className="text-white font-display font-bold text-lg mb-2">{item.title}</h2>
                  <p>{item.content}</p>
                </div>
              ))}
            </div>
          </main>
        </div>
      </>
    );
  }

  // ==========================================
  // PRIVACY
  // ==========================================
  if (currentPage === 'privacy') {
    return (
      <>
        <PageHead title="Privacy Policy" />
        <GlobalStyles />
        <div className={`min-h-screen bg-black text-white transition-opacity duration-300 ${pageTransition ? 'opacity-0' : 'opacity-100'}`}>
          <header className="border-b border-zinc-800">
            <div className="max-w-[1200px] mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <button onClick={() => navigateTo('landing')}><Logo white={true} /></button>
                <button onClick={() => navigateTo('landing')} className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group font-mono">
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />Back
                </button>
              </div>
            </div>
          </header>

          <main className="max-w-[800px] mx-auto px-6 py-12">
            <h1 className="font-display text-4xl font-bold tracking-[-0.02em] mb-2">Privacy Policy</h1>
            <p className="text-zinc-500 text-sm mb-8 font-mono">Last updated: January 2025</p>

            <div className="space-y-6 text-zinc-400 text-sm leading-relaxed">
              <p>This Privacy Policy describes how truechem collects, uses, and protects your personal information.</p>
              
              {[
                { title: '1. Information We Collect', content: 'We collect information you provide directly, including name, email, shipping address, and payment information when you create an account or make a purchase.' },
                { title: '2. How We Use Your Information', content: 'We use your information to process orders, send membership communications, and improve our services. We do not sell your personal information to third parties.' },
                { title: '3. Data Security', content: 'We implement appropriate security measures to protect your personal information. Payment processing is handled by secure third-party providers.' },
                { title: '4. Contact', content: 'For privacy-related questions, please contact support@truechem.io' },
              ].map((item, i) => (
                <div key={i}>
                  <h2 className="text-white font-display font-bold text-lg mb-2">{item.title}</h2>
                  <p>{item.content}</p>
                </div>
              ))}
            </div>
          </main>
        </div>
      </>
    );
  }

  // ==========================================
  // CONTACT
  // ==========================================
  if (currentPage === 'contact') {
    return (
      <>
        <PageHead title="Contact" />
        <GlobalStyles />
        <div className={`min-h-screen bg-black text-white transition-opacity duration-300 ${pageTransition ? 'opacity-0' : 'opacity-100'}`}>
          <header className="border-b border-zinc-800">
            <div className="max-w-[1200px] mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <button onClick={() => navigateTo('landing')}><Logo white={true} /></button>
                <button onClick={() => navigateTo('landing')} className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group font-mono">
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />Back
                </button>
              </div>
            </div>
          </header>

          <main className="max-w-[600px] mx-auto px-6 py-12">
            <h1 className="font-display text-4xl font-bold tracking-[-0.02em] mb-2">Contact</h1>
            <p className="text-zinc-500 mb-8">Questions? We're here to help.</p>

            <div className="bg-zinc-950 border border-zinc-800 p-6 mb-8">
              <h2 className="font-display font-bold mb-4">Get in touch</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-zinc-500" />
                  <span className="font-mono">support@truechem.io</span>
                </div>
                <p className="text-zinc-500">We typically respond within 24 hours.</p>
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-[10px] text-zinc-500 uppercase tracking-[0.15em] mb-2 font-mono">Email</label>
                <input type="email" className="w-full bg-transparent border border-zinc-700 px-4 py-3 text-white focus:border-white transition-colors font-mono" />
              </div>
              <div>
                <label className="block text-[10px] text-zinc-500 uppercase tracking-[0.15em] mb-2 font-mono">Message</label>
                <textarea rows={5} className="w-full bg-transparent border border-zinc-700 px-4 py-3 text-white focus:border-white transition-colors resize-none font-mono" />
              </div>
              <button type="submit" className="w-full py-3 bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-colors font-mono">
                Send Message
              </button>
            </form>
          </main>
        </div>
      </>
    );
  }

  return null;
}
