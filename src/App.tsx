import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Linkedin, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Target, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Menu, 
  X,
  Play,
  Download,
  Calendar,
  ChevronDown
} from 'lucide-react';

// --- Components ---

const Navbar = ({ activePage, setActivePage }: { activePage: string, setActivePage: (page: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'Playbook', id: 'playbook' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setActivePage('home')}
        >
          <div className="w-10 h-10 bg-ice-blue rounded-lg flex items-center justify-center">
            <Zap className="text-deep-navy w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">AGENT MNM</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`text-sm font-medium transition-colors hover:text-ice-blue ${activePage === link.id ? 'text-ice-blue' : 'text-white/70'}`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => setActivePage('audit')}
            className="bg-ice-blue text-deep-navy px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white transition-colors"
          >
            Book Free Audit
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass border-t border-white/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActivePage(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-lg font-medium text-left ${activePage === link.id ? 'text-ice-blue' : 'text-white/70'}`}
                >
                  {link.name}
                </button>
              ))}
              <button 
                onClick={() => {
                  setActivePage('audit');
                  setIsMobileMenuOpen(false);
                }}
                className="bg-ice-blue text-deep-navy px-6 py-3 rounded-xl text-center font-bold"
              >
                Book Free Audit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-deep-navy border-t border-white/10 py-20 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-ice-blue rounded flex items-center justify-center">
            <Zap className="text-deep-navy w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">AGENT MNM</span>
        </div>
        <p className="text-white/50 max-w-md leading-relaxed">
          The predictable revenue engine for LinkedIn. We turn your content into a conversation engine that generates high-quality leads on autopilot.
        </p>
      </div>
      <div>
        <h4 className="font-bold mb-6">Product</h4>
        <ul className="space-y-4 text-white/50 text-sm">
          <li><a href="#" className="hover:text-ice-blue transition-colors">Features</a></li>
          <li><a href="#" className="hover:text-ice-blue transition-colors">Pricing</a></li>
          <li><a href="#" className="hover:text-ice-blue transition-colors">Case Studies</a></li>
          <li><a href="#" className="hover:text-ice-blue transition-colors">Playbook</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6">Company</h4>
        <ul className="space-y-4 text-white/50 text-sm">
          <li><a href="#" className="hover:text-ice-blue transition-colors">About Us</a></li>
          <li><a href="#" className="hover:text-ice-blue transition-colors">Contact</a></li>
          <li><a href="#" className="hover:text-ice-blue transition-colors">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-ice-blue transition-colors">Terms of Service</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-white/30 text-xs">© 2026 Agent MNM. All rights reserved.</p>
      <div className="flex gap-6">
        <Linkedin className="w-5 h-5 text-white/30 hover:text-ice-blue cursor-pointer transition-colors" />
      </div>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = ({ onCtaClick }: { onCtaClick: () => void }) => {
  return (
    <div className="pt-32">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-6 text-center mb-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-ice-blue/10 text-ice-blue text-xs font-bold tracking-widest uppercase mb-8 border border-ice-blue/20">
            LinkedIn Lead Generation System
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
            Turn Your LinkedIn into a <br />
            <span className="text-gradient">Predictable Lead Engine</span> <br />
            in 7 Days
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            If your content gets views but no leads — <br className="hidden md:block" />
            <span className="font-bold text-white">you don’t have a content problem. You have a distribution problem.</span>
          </p>
          
          <div className="glass-card inline-block px-6 py-3 rounded-2xl border border-ice-blue/20 mb-12">
            <p className="text-sm text-white/60">
              <span className="text-ice-blue font-bold">Proof:</span> We analyzed a post with 21% CTR but only 128 impressions — <br className="hidden md:block" />
              after fixing the system, <span className="text-white font-bold">engagement increased 5x.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onCtaClick}
              className="w-full sm:w-auto bg-ice-blue text-deep-navy px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-all flex items-center justify-center gap-2 group shadow-lg shadow-ice-blue/20"
            >
              Book Your Free Growth Audit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto glass px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              See How It Works
            </button>
          </div>
        </motion.div>
      </section>

      {/* 2. Problem Section */}
      <section className="py-40 px-6 bg-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Why your LinkedIn isn’t working <br />
              <span className="text-white/40">(even if you post consistently)</span>
            </h2>
            <p className="text-white/60 text-lg mb-8">You’re doing everything right:</p>
            <ul className="space-y-4 mb-10">
              {["Posting regularly", "Sharing valuable insights", "Targeting the right audience"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="text-white/20 w-5 h-5" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-white/60 text-lg mb-6">But still getting:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {["Low reach", "No comments", "No inbound leads"].map((item, i) => (
                <div key={i} className="glass-card p-4 rounded-xl border border-red-500/10 text-center">
                  <X className="text-red-400 w-5 h-5 mx-auto mb-2" />
                  <span className="text-sm font-bold">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-2xl font-bold">
              Your content isn’t failing. <br />
              <span className="text-ice-blue">It’s invisible.</span>
            </p>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-ice-blue/10 blur-[100px] rounded-full"></div>
             <div className="glass-card p-8 rounded-3xl border border-white/10 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <span className="text-xs font-mono text-white/30">ANALYTICS_VIEW</span>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-white/5 rounded-full w-3/4"></div>
                  <div className="h-4 bg-white/5 rounded-full w-1/2"></div>
                  <div className="h-24 bg-white/5 rounded-xl w-full flex items-center justify-center">
                    <TrendingUp className="w-12 h-12 text-white/10" />
                  </div>
                  <div className="flex justify-between items-end h-20 gap-2">
                    {[30, 45, 25, 60, 35, 80, 40].map((h, i) => (
                      <div key={i} className="bg-white/10 w-full rounded-t-lg" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. Insight Section */}
      <section className="py-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-10">The real reason most content fails</h2>
          <p className="text-white/60 text-xl mb-12 leading-relaxed">
            LinkedIn doesn’t reward content. It rewards: <br />
            <span className="text-white font-bold">Comments • Conversations • Engagement loops</span>
          </p>
          <div className="glass-card p-10 rounded-3xl border border-ice-blue/20 mb-12">
            <p className="text-lg text-white/80 leading-relaxed">
              If your post doesn’t trigger interaction early, <br className="hidden md:block" />
              <span className="text-ice-blue font-bold">LinkedIn stops pushing it.</span>
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-2xl font-bold">
            <div className="flex items-center gap-3">
              <span className="text-white/40">No comments</span>
              <ArrowRight className="text-ice-blue w-6 h-6" />
              <span className="text-white/40">No reach</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/10"></div>
            <div className="flex items-center gap-3">
              <span className="text-white/40">No reach</span>
              <ArrowRight className="text-ice-blue w-6 h-6" />
              <span className="text-ice-blue">No leads</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Solution Section */}
      <section className="py-40 px-6 bg-ice-blue/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1">
            <div className="glass-card p-10 rounded-3xl border border-ice-blue/30 relative">
               <div className="absolute -top-6 -left-6 w-12 h-12 bg-ice-blue rounded-xl flex items-center justify-center shadow-lg shadow-ice-blue/20">
                  <Zap className="text-deep-navy w-6 h-6" />
               </div>
               <h3 className="text-3xl font-bold mb-6">Introducing Agent MNM</h3>
               <p className="text-white/70 text-lg mb-8 leading-relaxed">
                 A system designed to turn your LinkedIn content into a conversation engine that generates leads.
               </p>
               <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-8">
                  <p className="text-xl font-bold text-ice-blue">
                    “We help you generate 5–15 inbound conversations per week from LinkedIn.”
                  </p>
               </div>
               <ul className="space-y-4 mb-10">
                 {[
                   "Activates engagement within minutes",
                   "Drives meaningful comments",
                   "Creates conversation loops",
                   "Converts attention into leads"
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-white/80">
                     <CheckCircle2 className="text-ice-blue w-5 h-5" />
                     {item}
                   </li>
                 ))}
               </ul>

               {/* Comment Thread Mock Visual */}
               <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Live Engagement Loop</p>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0"></div>
                      <div className="glass-card p-3 rounded-2xl rounded-tl-none border border-white/5 flex-grow">
                        <div className="h-2 w-20 bg-white/20 rounded mb-2"></div>
                        <div className="h-3 w-full bg-white/10 rounded"></div>
                      </div>
                    </div>
                    <div className="flex gap-3 ml-8">
                      <div className="w-6 h-6 rounded-full bg-ice-blue/20 flex-shrink-0"></div>
                      <div className="glass-card p-3 rounded-2xl rounded-tl-none border border-ice-blue/20 flex-grow bg-ice-blue/5">
                        <div className="h-2 w-16 bg-ice-blue/30 rounded mb-2"></div>
                        <div className="h-3 w-full bg-ice-blue/20 rounded"></div>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Stop building "content". <br />
              <span className="text-gradient">Start building a pipeline.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              We don't just post for you. We activate your network and force the algorithm to take notice. 
              Our system ensures your best ideas reach the people who actually buy.
            </p>
            <div className="flex items-center gap-4">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-deep-navy bg-white/10"></div>
                  ))}
               </div>
               <p className="text-sm text-white/40 font-medium">Joined by 50+ B2B Founders</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">From post to pipeline</h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">A simple, visual flow of how we generate your leads.</p>
        </div>
        
        {/* Flow Diagram */}
        <div className="max-w-5xl mx-auto mb-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {[
              { label: "Post", icon: MessageSquare },
              { label: "Engagement Trigger", icon: Zap },
              { label: "Comments", icon: Users },
              { label: "Conversations", icon: MessageSquare },
              { label: "Leads", icon: Target }
            ].map((item, i, arr) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center gap-4 group">
                  <div className="w-16 h-16 rounded-2xl glass border border-white/10 flex items-center justify-center group-hover:border-ice-blue/50 transition-all">
                    <item.icon className="text-ice-blue w-8 h-8" />
                  </div>
                  <span className="text-sm font-bold text-white/60">{item.label}</span>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden md:block">
                    <ArrowRight className="text-white/10 w-6 h-6" />
                  </div>
                )}
                {i < arr.length - 1 && (
                  <div className="md:hidden py-4">
                    <ChevronDown className="text-white/10 w-6 h-6" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
          {[
            { title: "You post content", desc: "Share your expertise." },
            { title: "We activate early engagement", desc: "The critical first 60 mins." },
            { title: "Comments boost visibility", desc: "Algorithm pushes you higher." },
            { title: "Conversations begin", desc: "Prospects start reaching out." },
            { title: "Leads are generated", desc: "Predictable pipeline growth." }
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-ice-blue font-bold mb-2">Step {i + 1}</div>
              <h4 className="font-bold mb-2">{item.title}</h4>
              <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Proof Section */}
      <section className="py-40 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What happens when the system is fixed</h2>
            <p className="text-white/50 text-lg">Real data from a recent client campaign.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="glass-card p-10 rounded-3xl border border-white/10">
              <h4 className="text-xl font-bold mb-6 text-white/40 italic">Before the system:</h4>
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span>CTR</span>
                  <span className="font-bold text-ice-blue">21%</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span>Impressions</span>
                  <span className="font-bold">128</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Reach</span>
                  <span className="text-red-400 font-bold">Stagnant</span>
                </div>
              </div>
              <p className="mt-8 text-sm text-white/40">High quality content, but zero distribution.</p>
            </div>
            
            <div className="glass-card p-10 rounded-3xl border border-ice-blue/30 bg-ice-blue/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <TrendingUp className="text-ice-blue w-8 h-8 opacity-20" />
              </div>
              <h4 className="text-xl font-bold mb-6 text-ice-blue italic">After applying Agent MNM:</h4>
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span>Visibility</span>
                  <span className="font-bold text-ice-blue">5x Increase</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span>Comments</span>
                  <span className="font-bold text-ice-blue">20+ Meaningful</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Inbound Conversations</span>
                  <span className="font-bold text-ice-blue">Multiple / Post</span>
                </div>
              </div>
              <p className="mt-8 text-sm text-white/80 font-bold">
                We didn’t change the content. <br />
                <span className="text-ice-blue">We changed what happens after posting.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Results Section */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What you can expect</h2>
          <p className="text-white/50 text-lg">Tangible outcomes for your business.</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Visibility", value: "5–10x More", icon: TrendingUp },
            { label: "Engagement", value: "Consistent", icon: Zap },
            { label: "Conversations", value: "5–15 / Week", icon: MessageSquare },
            { label: "Lead Flow", value: "Predictable", icon: Target }
          ].map((item, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl border border-white/10 text-center">
              <div className="w-12 h-12 bg-ice-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <item.icon className="text-ice-blue w-6 h-6" />
              </div>
              <div className="text-3xl font-bold mb-2">{item.value}</div>
              <div className="text-white/40 text-sm uppercase tracking-widest">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Who This Is For */}
      <section className="py-40 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for founders who want real growth</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["Founders", "Consultants", "Agencies", "B2B businesses"].map((item, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl border border-white/10 flex items-center justify-center gap-3">
                <CheckCircle2 className="text-ice-blue w-5 h-5" />
                <span className="font-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Trust Section */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Why this works</h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              We don’t treat LinkedIn as content. <br />
              <span className="text-white font-bold">We treat it as a distribution + conversation system.</span>
            </p>
            <p className="text-white/50 text-lg mb-10">
              Built by operators who understand:
            </p>
            <ul className="space-y-6">
              {[
                { title: "Growth Psychology", desc: "How people actually consume and interact." },
                { title: "Platform Behavior", desc: "Working with the algorithm, not against it." },
                { title: "Conversion Systems", desc: "Turning attention into actual revenue." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-ice-blue/20 flex items-center justify-center mt-1">
                    <CheckCircle2 className="text-ice-blue w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-white/40 text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-soft-lavender/10 blur-[120px] rounded-full"></div>
             <div className="glass-card p-10 rounded-3xl border border-white/10 relative z-10 text-center">
                <Users className="w-16 h-16 text-soft-lavender mx-auto mb-8 opacity-50" />
                <p className="text-2xl font-bold mb-4 italic">"The first system that actually delivers what it promises."</p>
                <p className="text-white/40">— B2B SaaS Founder</p>
             </div>
          </div>
        </div>
      </section>

      {/* 10. Final CTA */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-ice-blue/5 -z-10"></div>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            If your content performs <br />
            but doesn’t scale…
          </h2>
          <p className="text-white/60 text-xl mb-12 leading-relaxed">
            You don’t need better content. <br />
            <span className="text-white font-bold text-2xl tracking-tight">You need a system.</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onCtaClick}
              className="w-full sm:w-auto bg-ice-blue text-deep-navy px-12 py-5 rounded-full font-bold text-xl hover:bg-white transition-all flex items-center justify-center gap-2 group shadow-2xl shadow-ice-blue/30"
            >
              Book Your Free Growth Audit
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onCtaClick}
              className="w-full sm:w-auto glass px-12 py-5 rounded-full font-bold text-xl hover:bg-white/10 transition-all"
            >
              Let’s identify your growth gaps
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      price: isAnnual ? "499" : "599",
      desc: "Perfect for solo founders looking to build authority.",
      features: ["3 High-Authority Posts/Week", "Basic Profile Optimization", "100 Automated Outreach/Month", "Email Support"],
      cta: "Start Growing",
      popular: false
    },
    {
      name: "Growth",
      price: isAnnual ? "999" : "1199",
      desc: "For established businesses ready to scale their pipeline.",
      features: ["5 High-Authority Posts/Week", "Full Profile Transformation", "500 Automated Outreach/Month", "Dedicated Account Manager", "CRM Integration"],
      cta: "Scale Now",
      popular: true
    },
    {
      name: "Scale",
      price: "Custom",
      desc: "Bespoke solutions for sales teams and agencies.",
      features: ["Unlimited Content Creation", "Multi-Account Management", "Custom Outreach Workflows", "Priority 24/7 Support", "Advanced Analytics"],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="pt-32 pb-32 px-6">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h1 className="text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
        <p className="text-white/50 text-lg mb-10">Choose the plan that fits your growth stage.</p>
        
        {/* Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-white/40'}`}>Monthly</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-8 bg-white/10 rounded-full p-1 relative transition-all"
          >
            <div className={`w-6 h-6 bg-ice-blue rounded-full transition-all ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </button>
          <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-white/40'}`}>
            Annual <span className="text-ice-blue ml-1">(-20%)</span>
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div 
            key={i} 
            className={`glass-card p-10 rounded-3xl border relative flex flex-col ${plan.popular ? 'border-ice-blue shadow-2xl shadow-ice-blue/10' : 'border-white/10'}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-ice-blue text-deep-navy px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Most Popular
              </div>
            )}
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-white/50 text-sm mb-8">{plan.desc}</p>
            <div className="mb-8">
              <span className="text-5xl font-bold">${plan.price}</span>
              {plan.price !== "Custom" && <span className="text-white/40 ml-2">/mo</span>}
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-3 text-sm text-white/70">
                  <CheckCircle2 className="text-ice-blue w-5 h-5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? 'bg-ice-blue text-deep-navy hover:bg-white' : 'glass hover:bg-white/10'}`}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Placeholder */}
      <div className="max-w-3xl mx-auto mt-32">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            "How long does it take to see results?",
            "Do I need to provide the content?",
            "Is this compliant with LinkedIn's terms?",
            "Can I cancel my subscription at any time?"
          ].map((q, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl border border-white/10 flex justify-between items-center cursor-pointer hover:border-white/20 transition-all">
              <span className="font-medium">{q}</span>
              <ChevronDown className="text-white/40 w-5 h-5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PlaybookPage = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-32 pb-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-soft-lavender/10 text-soft-lavender text-xs font-bold tracking-widest uppercase mb-8 border border-soft-lavender/20">
            Free Lead Magnet
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Unlock the Secrets to <br />
            <span className="text-gradient">10x Your LinkedIn Growth</span>
          </h1>
          <p className="text-white/60 text-lg mb-12 leading-relaxed">
            Download our 45-page Playbook that reveals the exact frameworks we use to generate $100k+ in pipeline for our clients every single month.
          </p>
          <ul className="space-y-6 mb-12">
            {[
              "The 'Authority Hook' Content Framework",
              "How to bypass the LinkedIn algorithm in 2026",
              "3 outreach scripts with 40%+ reply rates",
              "Profile optimization checklist for founders"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-white/80">
                <div className="w-6 h-6 rounded-full bg-ice-blue/20 flex items-center justify-center">
                  <CheckCircle2 className="text-ice-blue w-4 h-4" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card p-10 rounded-3xl border border-white/10 relative">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-soft-lavender/20 blur-[80px] -z-10"></div>
          
          {!submitted ? (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
              <h3 className="text-2xl font-bold mb-8">Get the Playbook Instantly</h3>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-ice-blue transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-2">Work Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-ice-blue transition-all"
                  placeholder="john@company.com"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-ice-blue text-deep-navy py-4 rounded-xl font-bold text-lg hover:bg-white transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Free Playbook
              </button>
              <p className="text-center text-white/30 text-xs">
                We respect your privacy. No spam, ever.
              </p>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="w-20 h-20 bg-ice-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-ice-blue w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Check Your Inbox!</h3>
              <p className="text-white/60 mb-8">
                We've sent the Playbook to your email. Happy growing!
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-ice-blue font-bold hover:underline"
              >
                Didn't get it? Try again
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Slot Picker ---

type Slot = { start: string; end: string };

interface SlotPickerProps {
  formData: { name: string; email: string; company: string; linkedin: string; goals: string };
  onConfirmed: (result: { meetLink: string | null; slotStart: string }) => void;
  onBack: () => void;
}

const SlotPicker = ({ formData, onConfirmed, onBack }: SlotPickerProps) => {
  const workingDays = useMemo(() => {
    const days: Date[] = [];
    const cursor = new Date();
    cursor.setDate(cursor.getDate() + 1);
    while (days.length < 7) {
      const dow = cursor.getUTCDay();
      if (dow !== 0 && dow !== 6) days.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    return days;
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date>(workingDays[0]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    setLoadingSlots(true);
    setSelectedSlot(null);
    setError(null);
    fetch(`/api/available-slots?date=${dateStr}`)
      .then((r) => r.json())
      .then((data) => setSlots(data.slots ?? []))
      .catch(() => setError('Could not load available times. Please try again.'))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate]);

  const handleBook = async () => {
    if (!selectedSlot) return;
    setBooking(true);
    setError(null);
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, slotStart: selectedSlot.start, slotEnd: selectedSlot.end }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Booking failed');
      onConfirmed({ meetLink: data.meetLink, slotStart: selectedSlot.start });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setBooking(false);
    }
  };

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  const formatDay = (d: Date) =>
    d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">Choose a time</h3>
        <p className="text-white/50">Select a 30-minute slot that works for you.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
        {workingDays.map((day, i) => (
          <button
            key={i}
            onClick={() => setSelectedDate(day)}
            className={`flex-shrink-0 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              day.toDateString() === selectedDate.toDateString()
                ? 'bg-ice-blue text-deep-navy'
                : 'bg-white/5 text-white/70 border border-white/10 hover:border-white/30'
            }`}
          >
            {formatDay(day)}
          </button>
        ))}
      </div>

      {loadingSlots ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-12 rounded-xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : slots.length === 0 ? (
        <div className="text-center py-8 text-white/40 mb-8">
          No availability on this day. Please choose another.
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
          {slots.map((slot, i) => (
            <button
              key={i}
              onClick={() => setSelectedSlot(slot)}
              className={`py-3 rounded-xl text-sm font-bold transition-all ${
                selectedSlot?.start === slot.start
                  ? 'bg-ice-blue text-deep-navy ring-2 ring-ice-blue ring-offset-2 ring-offset-deep-navy'
                  : 'bg-white/5 border border-white/10 text-white/80 hover:border-ice-blue/50 hover:bg-white/10'
              }`}
            >
              {formatTime(slot.start)}
            </button>
          ))}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl text-sm font-bold bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-all"
        >
          Back
        </button>
        <button
          onClick={handleBook}
          disabled={!selectedSlot || booking}
          className="flex-1 bg-ice-blue text-deep-navy py-3 rounded-xl font-bold text-sm hover:bg-white transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {booking ? (
            <>
              <div className="w-4 h-4 border-2 border-deep-navy/30 border-t-deep-navy rounded-full animate-spin" />
              Booking...
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4" />
              Confirm Booking
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

// --- Booking Confirmation ---

interface BookingConfirmationProps {
  result: { meetLink: string | null; slotStart: string };
  onBackHome: () => void;
}

const BookingConfirmation = ({ result, onBackHome }: BookingConfirmationProps) => {
  const formattedTime = new Date(result.slotStart).toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-10"
    >
      <div className="w-20 h-20 bg-ice-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="text-ice-blue w-10 h-10" />
      </div>
      <h3 className="text-3xl font-bold mb-3">You're booked!</h3>
      <p className="text-white/60 mb-2">Your Growth Audit is confirmed for:</p>
      <p className="text-ice-blue font-bold text-lg mb-8">{formattedTime}</p>
      <p className="text-white/50 text-sm mb-8">
        A calendar invite with all the details has been sent to your email.
      </p>
      {result.meetLink && (
        <a
          href={result.meetLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-ice-blue text-deep-navy px-8 py-3 rounded-full font-bold hover:bg-white transition-all mb-8"
        >
          <Play className="w-4 h-4" />
          Join Google Meet
        </a>
      )}
      <div>
        <button
          onClick={onBackHome}
          className="text-white/40 text-sm hover:text-white/70 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </motion.div>
  );
};

// --- Audit Page ---

const AuditPage = ({ setActivePage }: { setActivePage: (page: string) => void }) => {
  type AuditStep = 'form' | 'picking' | 'confirmed';
  const [step, setStep] = useState<AuditStep>('form');
  const [formData, setFormData] = useState({ name: '', email: '', company: '', linkedin: '', goals: '' });
  const [bookingResult, setBookingResult] = useState<{ meetLink: string | null; slotStart: string } | null>(null);

  return (
    <div className="pt-32 pb-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Book Your Free Growth Audit</h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Let's look under the hood of your LinkedIn strategy. We'll spend 30 minutes identifying your biggest growth levers.
          </p>
        </div>

        <div className="glass-card p-10 rounded-3xl border border-white/10">
          {step === 'form' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                setFormData({
                  name:     fd.get('name')     as string,
                  email:    fd.get('email')    as string,
                  company:  fd.get('company')  as string,
                  linkedin: fd.get('linkedin') as string,
                  goals:    fd.get('goals')    as string,
                });
                setStep('picking');
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="col-span-1">
                <label className="block text-sm font-medium text-white/50 mb-2">Full Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-ice-blue transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-white/50 mb-2">Work Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-ice-blue transition-all"
                  placeholder="john@company.com"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-white/50 mb-2">Company Name</label>
                <input
                  name="company"
                  type="text"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-ice-blue transition-all"
                  placeholder="Acme Corp"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-white/50 mb-2">LinkedIn Profile URL</label>
                <input
                  name="linkedin"
                  type="url"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-ice-blue transition-all"
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-white/50 mb-2">What are your growth goals for the next 90 days?</label>
                <textarea
                  name="goals"
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-ice-blue transition-all resize-none"
                  placeholder="I want to generate 10 high-quality leads per month..."
                ></textarea>
              </div>
              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full bg-ice-blue text-deep-navy py-4 rounded-xl font-bold text-lg hover:bg-white transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule My Free Audit
                </button>
              </div>
            </form>
          )}

          {step === 'picking' && (
            <SlotPicker
              formData={formData}
              onConfirmed={(result) => {
                setBookingResult(result);
                setStep('confirmed');
              }}
              onBack={() => setStep('form')}
            />
          )}

          {step === 'confirmed' && bookingResult && (
            <BookingConfirmation
              result={bookingResult}
              onBackHome={() => setActivePage('home')}
            />
          )}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "30 Minutes", desc: "Focused strategy session", icon: Calendar },
             { title: "Custom Plan", desc: "Tailored to your industry", icon: Target },
             { title: "Zero Pressure", desc: "No pitch, just value", icon: Zap }
           ].map((item, i) => (
             <div key={i} className="text-center">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-ice-blue w-6 h-6" />
                </div>
                <h4 className="font-bold mb-1">{item.title}</h4>
                <p className="text-white/40 text-sm">{item.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomePage onCtaClick={() => setActivePage('audit')} />;
      case 'pricing': return <PricingPage />;
      case 'playbook': return <PlaybookPage />;
      case 'audit': return <AuditPage setActivePage={setActivePage} />;
      default: return <HomePage onCtaClick={() => setActivePage('audit')} />;
    }
  };

  return (
    <div className="min-h-screen selection:bg-ice-blue selection:text-deep-navy">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
