import React, { useState, useEffect } from 'react';
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
  XCircle,
  Play,
  Download,
  Calendar,
  ChevronDown,
  Clock,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Check
} from 'lucide-react';
import { format, addDays, startOfToday, isSameDay, parseISO } from 'date-fns';

// --- Components ---

const Navbar = ({ activePage, setActivePage, scrollToSection }: { activePage: string, setActivePage: (page: string) => void, scrollToSection: (id: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Solution', id: 'solution' },
    { name: 'Outcomes', id: 'outcomes' },
    { name: 'Beta Access', id: 'beta' },
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
              onClick={() => scrollToSection(link.id)}
              className={`text-sm font-medium transition-colors hover:text-brand-purple-light ${activePage === link.id ? 'text-brand-purple-light' : 'text-white/70'}`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => setActivePage('signup')}
            className="bg-brand-purple text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand-purple-light transition-colors"
          >
            Apply for Beta
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
                    scrollToSection(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-lg font-medium text-left ${activePage === link.id ? 'text-brand-purple-light' : 'text-white/70'}`}
                >
                  {link.name}
                </button>
              ))}
              <button 
                onClick={() => {
                  setActivePage('signup');
                  setIsMobileMenuOpen(false);
                }}
                className="bg-brand-purple text-white px-6 py-3 rounded-xl text-center font-bold"
              >
                Apply for Beta
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setActivePage, scrollToSection }: { setActivePage: (page: string) => void, scrollToSection: (id: string) => void }) => (
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
          The AI-Powered LinkedIn Client Acquisition System. <br />
          We build predictable pipelines for founders, consultants, and SMEs in 14 days.
        </p>
      </div>
      <div>
        <h4 className="font-bold mb-6">System</h4>
        <ul className="space-y-4 text-white/50 text-sm">
          <li><button onClick={() => scrollToSection('solution')} className="hover:text-brand-purple-light transition-colors">Solution</button></li>
          <li><button onClick={() => scrollToSection('outcomes')} className="hover:text-brand-purple-light transition-colors">Outcomes</button></li>
          <li><button onClick={() => scrollToSection('beta')} className="hover:text-brand-purple-light transition-colors">Beta Access</button></li>
          <li><button onClick={() => scrollToSection('demo')} className="hover:text-brand-purple-light transition-colors">Watch Demo</button></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6">Company</h4>
        <ul className="space-y-4 text-white/50 text-sm">
          <li><a href="#" className="hover:text-ice-blue transition-colors">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-ice-blue transition-colors">Terms of Service</a></li>
          <li><a href="https://www.linkedin.com/in/namanrungta/" target="_blank" rel="noopener noreferrer" className="hover:text-ice-blue transition-colors">LinkedIn</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-white/30 text-xs">© 2026 Agent MNM. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="https://www.linkedin.com/in/namanrungta/" target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-5 h-5 text-white/30 hover:text-ice-blue cursor-pointer transition-colors" />
        </a>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = ({ onCtaClick }: { onCtaClick: () => void }) => {
  return (
    <div className="pt-32">
      {/* URGENCY LINE */}
      <div className="bg-brand-purple/20 border-y border-brand-purple/10 py-2 text-center">
        <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-brand-purple-light flex items-center justify-center gap-2">
          <Zap className="w-4 h-4" />
          👉 Already 12 companies applied for beta access
          <Zap className="w-4 h-4" />
        </p>
      </div>

      {/* SECTION 1: HERO */}
      <section id="home" className="max-w-7xl mx-auto px-6 text-center mb-32 md:mb-48 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-brand-purple/10 blur-[120px] -z-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight max-w-5xl mx-auto">
            Turn LinkedIn Into a <br className="hidden md:block" />
            <span className="text-brand-purple-light">Predictable Lead Engine</span> <br className="hidden md:block" />
            — Without Manual Outreach
          </h1>
          <p className="text-white/80 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed">
            An AI-powered system that identifies, engages, and converts high-intent prospects automatically.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <button 
              onClick={onCtaClick}
              className="w-full sm:w-auto bg-brand-purple text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-purple-light transition-all flex items-center justify-center gap-2 group shadow-lg shadow-brand-purple/20"
            >
              Apply for Private Beta Access
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('demo');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto glass px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 text-brand-purple-light" />
              Watch Demo
            </button>
          </div>
          <p className="text-white/40 text-sm font-medium mb-12">
            Limited to 30 companies this month
          </p>
        </motion.div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="py-32 px-6 bg-white/5 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-16">
              ⚠️ Why LinkedIn Lead Generation Fails for Most Businesses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {[
                { title: "Manual outreach doesn’t scale", desc: "Spending hours sending messages that get ignored is a race to the bottom." },
                { title: "Low response rates", desc: "Generic templates and poor targeting lead to a flooded inbox of 'No thanks'." },
                { title: "No targeting precision", desc: "Spray and pray tactics waste time on prospects who will never buy." },
                { title: "No system → inconsistent pipeline", desc: "Relying on luck or 'activity' means your revenue is unpredictable." }
              ].map((point, i) => (
                <div key={i} className="glass-card p-8 rounded-2xl border border-white/10">
                  <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center mb-6">
                    <XCircle className="text-red-400 w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{point.title}</h4>
                  <p className="text-white/50 text-sm">{point.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: THE SOLUTION */}
      <section id="solution" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              ⚡ Introducing the AI LinkedIn Lead Engine
            </h2>
            <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              A system designed to automate prospecting, outreach, and conversion into meetings.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Smart prospect identification", desc: "AI scans LinkedIn to find prospects matching your ideal customer profile.", icon: Target },
              { title: "Personalized outreach at scale", desc: "Generate unique, high-converting messages for every prospect automatically.", icon: Zap },
              { title: "Automated engagement tracking", desc: "Monitor replies and intent signals to focus on the hottest leads.", icon: MessageSquare },
              { title: "Conversion-focused workflows", desc: "Seamlessly move leads from LinkedIn to your calendar.", icon: TrendingUp }
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl border border-white/10 hover:border-brand-purple/30 transition-all group">
                <div className="w-14 h-14 bg-brand-purple/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-purple/20 transition-all">
                  <feature.icon className="text-brand-purple-light w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: OUTCOMES */}
      <section id="outcomes" className="py-32 px-6 bg-brand-purple/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                📊 What You Can Expect
              </h2>
              <div className="space-y-8">
                {[
                  { title: "2–5x increase in qualified replies", desc: "Our AI-driven personalization consistently outperforms manual efforts." },
                  { title: "60–70% reduction in manual effort", desc: "Reclaim your time to focus on closing deals, not finding them." },
                  { title: "Consistent pipeline generation", desc: "Wake up to a calendar full of qualified sales meetings every week." }
                ].map((outcome, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 bg-brand-purple/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="text-brand-purple-light w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{outcome.title}</h4>
                      <p className="text-white/60 leading-relaxed">{outcome.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-10 rounded-[3rem] border border-white/10 relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-purple/20 blur-[80px] -z-10"></div>
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-medium text-white/40 uppercase tracking-widest">Qualified Replies</span>
                  <span className="text-3xl font-bold text-brand-purple-light">+342%</span>
                </div>
                <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '85%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-brand-purple"
                  />
                </div>
                <div className="flex justify-between items-end pt-4">
                  <span className="text-sm font-medium text-white/40 uppercase tracking-widest">Time Saved</span>
                  <span className="text-3xl font-bold text-brand-purple-light">24h/wk</span>
                </div>
                <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '70%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="h-full bg-brand-purple"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: BETA ACCESS */}
      <section id="beta" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-12 md:p-20 rounded-[3rem] border border-brand-purple/30 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-purple/5 -z-10"></div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              🧪 Private Beta Access Now Open
            </h2>
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              We’re inviting a limited number of businesses to test and shape this system.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-left">
              {[
                { title: "Early adopter advantage", desc: "Get ahead of the competition with AI-powered outreach." },
                { title: "Direct founder support", desc: "Work directly with our team to optimize your system." },
                { title: "Priority access", desc: "Lock in early pricing before our public launch." }
              ].map((point, i) => (
                <div key={i} className="space-y-2">
                  <h4 className="font-bold text-brand-purple-light">{point.title}</h4>
                  <p className="text-white/50 text-sm">{point.desc}</p>
                </div>
              ))}
            </div>
            <button 
              onClick={onCtaClick}
              className="bg-brand-purple text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-brand-purple-light transition-all shadow-xl shadow-brand-purple/20"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 6: DEMO */}
      <section id="demo" className="py-32 px-6 bg-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">🎥 See How It Works</h2>
          <div className="aspect-video bg-black/40 rounded-[2rem] border border-white/10 flex items-center justify-center group cursor-pointer relative overflow-hidden">
            {/* 
              REPLACE THE IFRAME SRC BELOW WITH YOUR ACTUAL HEYGEN EMBED URL 
              Example: https://app.heygen.com/embed/YOUR_VIDEO_ID
            */}
            <iframe
              className="w-full h-full rounded-[2rem]"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder, replace with HeyGen
              title="HeyGen Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* SECTION 7: CASE SNAPSHOT */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">📄 Early Results</h2>
            <p className="text-white/50 text-xl">Real impact for real businesses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                problem: "B2B SaaS startup struggling to get past gatekeepers and book demos.",
                approach: "Deployed AI Lead Engine to target VPs of Sales with personalized intent-based outreach.",
                result: "14 demos booked in the first 21 days with a 12% reply rate."
              },
              {
                problem: "Consultancy firm relying on referrals with no predictable way to find new clients.",
                approach: "Automated high-intent prospect identification and personalized follow-up sequences.",
                result: "Generated $45k in new pipeline within the first month of beta testing."
              }
            ].map((item, i) => (
              <div key={i} className="glass-card p-10 rounded-3xl border border-white/10">
                <div className="space-y-8">
                  <div>
                    <span className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2 block">Problem</span>
                    <p className="text-white/80 leading-relaxed">{item.problem}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-brand-purple-light uppercase tracking-widest mb-2 block">Approach</span>
                    <p className="text-white/80 leading-relaxed">{item.approach}</p>
                  </div>
                  <div className="pt-6 border-t border-white/5">
                    <span className="text-xs font-bold text-green-400 uppercase tracking-widest mb-2 block">Result</span>
                    <p className="text-2xl font-bold text-white">{item.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: LEAD MAGNET */}
      <section className="py-32 px-6 bg-brand-purple/5">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-12 md:p-20 rounded-[3rem] border border-white/10 flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/3 aspect-[3/4] bg-brand-purple/20 rounded-2xl border border-brand-purple/30 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/40 to-transparent"></div>
              <Download className="w-16 h-16 text-white/20 group-hover:scale-110 transition-transform" />
              <div className="absolute bottom-4 left-4 right-4 bg-deep-navy/80 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-purple-light">Free Playbook</p>
              </div>
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h2 className="text-4xl font-bold mb-6">🧲 Free Playbook</h2>
              <p className="text-xl text-white/60 mb-10 leading-relaxed">
                Download “How to Build a LinkedIn Lead Engine” and learn the exact frameworks we use.
              </p>
              <button className="bg-white text-deep-navy px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-purple hover:text-white transition-all flex items-center justify-center md:justify-start gap-2 mx-auto md:mx-0">
                <Download className="w-5 h-5" />
                Get Free Playbook
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: FINAL CTA */}
      <section className="py-48 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-purple/10 blur-[150px] -z-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            🚨 Don’t Miss Early Access
          </h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-16 leading-relaxed">
            Join the elite group of businesses automating their LinkedIn growth.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4">
            <button 
              onClick={onCtaClick}
              className="w-full sm:w-auto bg-brand-purple text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-brand-purple-light transition-all shadow-2xl shadow-brand-purple/30"
            >
              Apply for Private Beta Access
            </button>
            <p className="text-white/40 font-bold uppercase tracking-widest text-sm">
              Limited slots remaining
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

const BetaSignupPage = ({ setActivePage }: { setActivePage: (page: string) => void }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    useCase: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/leads/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to submit');
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-48 pb-32 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* SUCCESS MESSAGE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center glass-card p-12 rounded-[3rem] border border-brand-purple/30"
          >
            <div className="w-20 h-20 bg-brand-purple/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="text-brand-purple-light w-10 h-10" />
            </div>
            <h2 className="text-4xl font-bold mb-4">You’re on the waitlist! 🚀</h2>
            <p className="text-xl text-white/60 mb-8 leading-relaxed">
              We’ve received your application. While we review it, check out these resources to see how we’re transforming LinkedIn lead gen.
            </p>
          </motion.div>

          {/* HIDDEN GOLD: DEMO + CASE STUDY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-3xl border border-white/10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Play className="w-5 h-5 text-brand-purple-light" />
                The System in Action
              </h3>
              <div className="aspect-video bg-black/40 rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden">
                <iframe
                  className="w-full h-full rounded-2xl"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Demo Video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-white/10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-brand-purple-light" />
                Case Study: 14 Demos in 21 Days
              </h3>
              <div className="space-y-4 text-sm text-white/60">
                <p>
                  A B2B SaaS startup used our AI engine to target VPs of Sales with intent-based outreach.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    12% Reply Rate
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    14 Demos Booked
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    $200k+ Pipeline Generated
                  </li>
                </ul>
                <div className="pt-4">
                  <button className="text-brand-purple-light font-bold flex items-center gap-1 hover:underline">
                    Read Full Breakdown <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* BOOK A CALL OPTION */}
          <div className="glass-card p-12 rounded-[3rem] border border-brand-purple/20 text-center">
            <h3 className="text-2xl font-bold mb-4">Want to skip the waitlist?</h3>
            <p className="text-white/50 mb-8">
              Book a 15-minute discovery call to see if your business is a fit for the private beta.
            </p>
            <button 
              onClick={() => window.open('https://calendly.com/divya-noorconnect', '_blank')}
              className="bg-brand-purple text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-purple-light transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <Calendar className="w-5 h-5" />
              Book a Discovery Call
            </button>
          </div>

          <div className="text-center">
            <button 
              onClick={() => setActivePage('home')}
              className="text-white/40 hover:text-white transition-colors text-sm font-medium"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-48 pb-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Apply for Private Beta</h1>
          <p className="text-white/50 text-lg">
            Join the elite group of businesses automating their LinkedIn growth.
          </p>
        </div>

        <div className="glass-card p-10 md:p-16 rounded-[3rem] border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-white/50 mb-3 uppercase tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-purple transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/50 mb-3 uppercase tracking-widest">Work Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-purple transition-all"
                  placeholder="john@company.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/50 mb-3 uppercase tracking-widest">Company Name</label>
              <input 
                type="text" 
                required
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-purple transition-all"
                placeholder="Acme Corp"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/50 mb-3 uppercase tracking-widest">How do you plan to use the AI Lead Engine?</label>
              <textarea 
                rows={4}
                required
                value={formData.useCase}
                onChange={(e) => setFormData({...formData, useCase: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-purple transition-all resize-none"
                placeholder="Tell us about your current LinkedIn strategy and what you hope to achieve..."
              ></textarea>
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-brand-purple text-white py-5 rounded-full font-bold text-xl hover:bg-brand-purple-light transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-purple/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <ArrowRight className="w-6 h-6" />
                </>
              )}
            </button>
          </form>
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

  const scrollToSection = (id: string) => {
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomePage onCtaClick={() => setActivePage('signup')} />;
      case 'signup': return <BetaSignupPage setActivePage={setActivePage} />;
      default: return <HomePage onCtaClick={() => setActivePage('signup')} />;
    }
  };

  return (
    <div className="min-h-screen selection:bg-ice-blue selection:text-deep-navy">
      <Navbar activePage={activePage} setActivePage={setActivePage} scrollToSection={scrollToSection} />
      
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

      <Footer setActivePage={setActivePage} scrollToSection={scrollToSection} />
    </div>
  );
}
