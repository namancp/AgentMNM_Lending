import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';
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
  Check,
  Mail,
  Building2
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
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-ice-blue rounded flex items-center justify-center">
            <Zap className="text-deep-navy w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">AGENT MNM</span>
        </div>
        <p className="text-white/50 max-w-md leading-relaxed font-light">
          The AI-Powered LinkedIn Client Acquisition System. <br />
          We build predictable pipelines for founders, consultants, and SMEs in 14 days.
        </p>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">System</h4>
        <ul className="space-y-4 text-white/50 text-sm font-light">
          <li><button onClick={() => scrollToSection('solution')} className="hover:text-brand-purple-light transition-colors">Solution</button></li>
          <li><button onClick={() => scrollToSection('outcomes')} className="hover:text-brand-purple-light transition-colors">Outcomes</button></li>
          <li><button onClick={() => scrollToSection('beta')} className="hover:text-brand-purple-light transition-colors">Beta Access</button></li>
          <li><button onClick={() => scrollToSection('demo')} className="hover:text-brand-purple-light transition-colors">Watch Demo</button></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Company</h4>
        <ul className="space-y-4 text-white/50 text-sm font-light">
          <li><a href="#" className="hover:text-ice-blue transition-colors">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-ice-blue transition-colors">Terms of Service</a></li>
          <li><a href="https://www.linkedin.com/in/namanrungta/" target="_blank" rel="noopener noreferrer" className="hover:text-ice-blue transition-colors">LinkedIn</a></li>
        </ul>
      </div>
    </div>

    <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex flex-col items-center md:items-start gap-2">
        <p className="text-white/30 text-xs">© 2026 Agent MNM. All rights reserved.</p>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/20">
          <span>Powered by <a href="https://noorconnect.ai" target="_blank" rel="noopener noreferrer" className="hover:text-brand-purple-light transition-colors">noorconnect.ai</a></span>
          <span className="w-1 h-1 bg-white/10 rounded-full"></span>
          <span>Built by <a href="https://www.linkedin.com/in/namanrungta/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-purple-light transition-colors font-bold">Sankshit Group</a></span>
        </div>
      </div>
      <div className="flex gap-6">
        <a href="https://www.linkedin.com/in/namanrungta/" target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-5 h-5 text-white/30 hover:text-ice-blue cursor-pointer transition-colors" />
        </a>
      </div>
    </div>
  </footer>
);

// --- 3D Background Components ---

const AnimatedSphere = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 100, 100]} scale={2.4}>
        <MeshDistortMaterial
          color="#8B5CF6"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const FloatingParticles = () => {
  const count = 50;
  const mesh = useRef<THREE.Points>(null);
  
  const particles = React.useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 10;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 10;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
};

const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        <AnimatedSphere />
        <FloatingParticles />
      </Canvas>
    </div>
  );
};

// --- Playbook Modal ---

const PlaybookModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', email: '', organization: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({ name: '', email: '', organization: '' });
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg glass-card p-10 rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-brand-purple"></div>
            <button onClick={onClose} className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>

            {success ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="text-green-400 w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Check your inbox!</h3>
                <p className="text-white/60">The playbook is on its way to your email.</p>
              </div>
            ) : (
              <>
                <div className="mb-10">
                  <h3 className="text-3xl font-bold mb-4">Get the Playbook</h3>
                  <p className="text-white/50">Enter your details to receive the "How to Build a LinkedIn Lead Engine" PDF.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                    <div className="relative">
                      <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:border-brand-purple transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Work Email</label>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:border-brand-purple transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Organization</label>
                    <div className="relative">
                      <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                      <input
                        required
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:border-brand-purple transition-all"
                        placeholder="Company Name"
                      />
                    </div>
                  </div>

                  <button
                    disabled={loading}
                    className="w-full bg-brand-purple text-white py-5 rounded-2xl font-bold text-lg hover:bg-brand-purple-light transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
                    Download Now
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Pages ---

const FlipNumber = ({ value }: { value: number }) => {
  const digits = value.toString().padStart(2, '0').split('');
  
  return (
    <div className="inline-flex items-center gap-1 mx-2">
      {digits.map((digit, i) => (
        <div key={i} className="relative w-7 h-10 bg-deep-navy border border-white/10 rounded-lg flex items-center justify-center overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={digit}
              initial={{ y: 30, opacity: 0, rotateX: -90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -30, opacity: 0, rotateX: 90 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className="absolute text-brand-purple-light font-black text-xl md:text-2xl"
            >
              {digit}
            </motion.span>
          </AnimatePresence>
          {/* Mechanical flip line */}
          <div className="absolute inset-0 flex items-center pointer-events-none">
            <div className="w-full h-[1px] bg-white/10 shadow-sm"></div>
          </div>
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none"></div>
        </div>
      ))}
    </div>
  );
};

const HomePage = ({ onCtaClick, appliedCount, onDownloadClick }: { onCtaClick: () => void, appliedCount: number, onDownloadClick: () => void }) => {
  return (
    <div className="pt-32">
      {/* URGENCY LINE */}
      <div className="bg-brand-purple/20 border-y border-brand-purple/10 py-3 text-center">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-2">
          <Zap className="w-4 h-4 text-brand-purple-light animate-pulse" />
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/60">
            Already
          </span>
          <FlipNumber value={appliedCount} />
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/60">
            companies applied for private beta
          </span>
          <Zap className="w-4 h-4 text-brand-purple-light animate-pulse" />
        </div>
      </div>

      {/* SECTION 1: HERO */}
      <section id="home" className="max-w-7xl mx-auto px-6 text-center pt-20 pb-32 md:pb-48 relative">
        {/* Subtle radial gradient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-radial from-brand-purple/10 via-transparent to-transparent blur-[120px] -z-10"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 bg-brand-purple-light rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Backed by real GTM execution across industries</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-10 leading-[1.05] tracking-tight max-w-5xl mx-auto">
            Turn LinkedIn Into a <br className="hidden md:block" />
            <span className="text-brand-purple-light">Predictable Lead Engine</span> <br className="hidden md:block" />
            — Without Manual Outreach
          </h1>
          
          <p className="text-white/60 text-lg md:text-2xl max-w-2xl mx-auto mb-16 leading-relaxed font-light">
            An AI-powered system that identifies, engages, and converts high-intent prospects automatically.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <button 
              onClick={onCtaClick}
              className="w-full sm:w-auto bg-brand-purple text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-brand-purple-light transition-all flex items-center justify-center gap-3 group glow-purple glow-purple-hover"
            >
              Apply for Private Beta
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('demo');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto glass px-12 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            >
              <Play className="w-5 h-5 text-brand-purple-light" />
              Watch Demo
            </button>
          </div>
          <p className="text-white/30 text-xs font-bold uppercase tracking-[0.3em]">
            Limited to 30 companies this month
          </p>
        </motion.div>
      </section>

      <div className="section-divider"></div>

      {/* SECTION 2: THE PROBLEM */}
      <section className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-20 tracking-tight">
              ⚠️ Why LinkedIn Lead Generation Fails for Most Businesses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {[
                { title: "Manual outreach doesn’t scale", desc: "Spending hours sending messages that get ignored is a race to the bottom.", icon: XCircle },
                { title: "Low response rates", desc: "Generic templates and poor targeting lead to a flooded inbox of 'No thanks'.", icon: MessageSquare },
                { title: "No targeting precision", desc: "Spray and pray tactics waste time on prospects who will never buy.", icon: Target },
                { title: "No system → inconsistent pipeline", desc: "Relying on luck or 'activity' means your revenue is unpredictable.", icon: TrendingUp }
              ].map((point, i) => (
                <div key={i} className="glass-card p-10 rounded-3xl border border-white/10 hover:border-white/20 transition-all">
                  <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-8">
                    <point.icon className="text-red-400 w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-bold mb-4 tracking-tight">{point.title}</h4>
                  <p className="text-white/50 text-base leading-relaxed font-light">{point.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* SECTION 3: THE SOLUTION */}
      <section id="solution" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-bold mb-10 tracking-tight">
              ⚡ Introducing the AI LinkedIn Lead Engine
            </h2>
            <p className="text-xl md:text-2xl text-white/60 max-w-4xl mx-auto leading-relaxed font-light">
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
              <div key={i} className="glass-card p-10 rounded-[2.5rem] border border-white/10 hover:border-brand-purple/30 transition-all group">
                <div className="w-16 h-16 bg-brand-purple/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-purple/20 transition-all">
                  <feature.icon className="text-brand-purple-light w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold mb-4 tracking-tight">{feature.title}</h4>
                <p className="text-white/50 text-base leading-relaxed font-light">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* SECTION 4: OUTCOMES */}
      <section id="outcomes" className="py-32 px-6 bg-brand-purple/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-12 tracking-tight">
                📊 What You Can Expect
              </h2>
              <div className="space-y-12">
                {[
                  { title: "2–5x increase in qualified replies", desc: "Our AI-driven personalization consistently outperforms manual efforts." },
                  { title: "60–70% reduction in manual effort", desc: "Reclaim your time to focus on closing deals, not finding them." },
                  { title: "Consistent pipeline generation", desc: "Wake up to a calendar full of qualified sales meetings every week." }
                ].map((outcome, i) => (
                  <div key={i} className="flex gap-8">
                    <div className="w-14 h-14 bg-brand-purple/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="text-brand-purple-light w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold mb-3 tracking-tight">{outcome.title}</h4>
                      <p className="text-white/50 text-lg leading-relaxed font-light">{outcome.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-12 rounded-[4rem] border border-white/10 relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-purple/20 blur-[80px] -z-10"></div>
              <div className="space-y-10">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-white/30 uppercase tracking-[0.2em]">Qualified Replies</span>
                  <span className="text-4xl font-bold text-brand-purple-light tracking-tighter">+342%</span>
                </div>
                <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '85%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-brand-purple shadow-[0_0_15px_rgba(147,51,234,0.5)]"
                  />
                </div>
                <div className="flex justify-between items-end pt-4">
                  <span className="text-xs font-bold text-white/30 uppercase tracking-[0.2em]">Time Saved</span>
                  <span className="text-4xl font-bold text-brand-purple-light tracking-tighter">24h/wk</span>
                </div>
                <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '70%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="h-full bg-brand-purple shadow-[0_0_15px_rgba(147,51,234,0.5)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* SECTION 5: BETA ACCESS */}
      <section id="beta" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-12 md:p-24 rounded-[4rem] border border-brand-purple/30 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-purple/5 -z-10"></div>
            <h2 className="text-5xl md:text-7xl font-bold mb-10 tracking-tight">
              🧪 Private Beta Access Now Open
            </h2>
            <p className="text-xl md:text-2xl text-white/60 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
              We’re inviting a limited number of businesses to test and shape this system.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-left">
              {[
                { title: "Early adopter advantage", desc: "Get ahead of the competition with AI-powered outreach." },
                { title: "Direct founder support", desc: "Work directly with our team to optimize your system." },
                { title: "Priority access", desc: "Lock in early pricing before our public launch." }
              ].map((point, i) => (
                <div key={i} className="space-y-4">
                  <h4 className="text-xl font-bold text-brand-purple-light tracking-tight">{point.title}</h4>
                  <p className="text-white/50 text-base leading-relaxed font-light">{point.desc}</p>
                </div>
              ))}
            </div>
            <button 
              onClick={onCtaClick}
              className="bg-brand-purple text-white px-16 py-6 rounded-full font-bold text-xl hover:bg-brand-purple-light transition-all glow-purple glow-purple-hover"
            >
              Apply for Private Beta
            </button>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* SECTION 6: DEMO */}
      <section id="demo" className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tight">🎥 See How It Works</h2>
          <div className="aspect-video bg-black/40 rounded-[3rem] border border-white/10 flex items-center justify-center group cursor-pointer relative overflow-hidden shadow-2xl">
            <iframe
              className="w-full h-full rounded-[3rem]"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder, replace with HeyGen
              title="HeyGen Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* SECTION 7: CASE SNAPSHOT */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">📄 Early Results</h2>
            <p className="text-white/50 text-2xl font-light">Real impact for real businesses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
              <div key={i} className="glass-card p-12 rounded-[3rem] border border-white/10 hover:border-white/20 transition-all">
                <div className="space-y-10">
                  <div>
                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-[0.3em] mb-4 block">Problem</span>
                    <p className="text-white/80 text-lg leading-relaxed font-light">{item.problem}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-brand-purple-light uppercase tracking-[0.3em] mb-4 block">Approach</span>
                    <p className="text-white/80 text-lg leading-relaxed font-light">{item.approach}</p>
                  </div>
                  <div className="pt-8 border-t border-white/5">
                    <span className="text-[10px] font-bold text-green-400 uppercase tracking-[0.3em] mb-4 block">Result</span>
                    <p className="text-3xl font-bold text-white tracking-tight">{item.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* SECTION 8: LEAD MAGNET */}
      <section className="py-32 px-6 bg-brand-purple/[0.02]">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-12 md:p-20 rounded-[4rem] border border-white/10 flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/3 aspect-[3/4] bg-brand-purple/20 rounded-[2.5rem] border border-brand-purple/30 flex items-center justify-center relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/40 to-transparent"></div>
              <Download className="w-20 h-20 text-white/20 group-hover:scale-110 transition-transform" />
              <div className="absolute bottom-6 left-6 right-6 bg-deep-navy/80 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-purple-light">Free Playbook</p>
              </div>
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h2 className="text-5xl font-bold mb-8 tracking-tight">🧲 Free Playbook</h2>
              <p className="text-2xl text-white/50 mb-12 leading-relaxed font-light">
                Download “How to Build a LinkedIn Lead Engine” and learn the exact frameworks we use.
              </p>
              <button 
                onClick={onDownloadClick}
                className="bg-white text-deep-navy px-12 py-5 rounded-full font-bold text-lg hover:bg-brand-purple hover:text-white transition-all flex items-center justify-center md:justify-start gap-3 mx-auto md:mx-0 shadow-xl"
              >
                <Download className="w-6 h-6" />
                Get Free Playbook
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* SECTION 9: FINAL CTA */}
      <section className="py-48 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-purple/10 blur-[150px] -z-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl md:text-8xl font-bold mb-10 tracking-tight leading-[1.1]">
            🚨 Don’t Miss <br /> Early Access
          </h2>
          <p className="text-2xl md:text-3xl text-white/50 max-w-3xl mx-auto mb-20 leading-relaxed font-light">
            Join the elite group of businesses automating their LinkedIn growth.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-6">
            <button 
              onClick={onCtaClick}
              className="w-full sm:w-auto bg-brand-purple text-white px-16 py-6 rounded-full font-bold text-2xl hover:bg-brand-purple-light transition-all glow-purple glow-purple-hover"
            >
              Apply for Private Beta
            </button>
            <p className="text-white/30 font-bold uppercase tracking-[0.3em] text-xs">
              Limited slots remaining
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

const BetaSignupPage = ({ setActivePage, onSignupSuccess }: { setActivePage: (page: string) => void, onSignupSuccess: () => void }) => {
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
      onSignupSuccess(); // Increment counter
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
  const [appliedCount, setAppliedCount] = useState(12);
  const [isPlaybookModalOpen, setIsPlaybookModalOpen] = useState(false);

  // Poll for global stats and send heartbeat
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats/applied-count');
        const data = await response.json();
        setAppliedCount(data.count);
      } catch (error) {
        console.error('Error fetching global stats:', error);
      }
    };

    const sendPing = async () => {
      try {
        await fetch('/api/stats/ping', { method: 'POST' });
      } catch (error) {
        console.error('Error sending heartbeat:', error);
      }
    };

    fetchStats(); // Initial fetch
    sendPing(); // Initial ping
    
    const statsInterval = setInterval(fetchStats, 10000); // Poll every 10s
    const pingInterval = setInterval(sendPing, 20000); // Ping every 20s
    
    return () => {
      clearInterval(statsInterval);
      clearInterval(pingInterval);
    };
  }, []);

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
      case 'home': return <HomePage onCtaClick={() => setActivePage('signup')} appliedCount={appliedCount} onDownloadClick={() => setIsPlaybookModalOpen(true)} />;
      case 'signup': return <BetaSignupPage setActivePage={setActivePage} onSignupSuccess={() => setAppliedCount(prev => prev + 1)} />;
      default: return <HomePage onCtaClick={() => setActivePage('signup')} appliedCount={appliedCount} onDownloadClick={() => setIsPlaybookModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen selection:bg-ice-blue selection:text-deep-navy relative">
      <ThreeBackground />
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

      <PlaybookModal isOpen={isPlaybookModalOpen} onClose={() => setIsPlaybookModalOpen(false)} />

      <Footer setActivePage={setActivePage} scrollToSection={scrollToSection} />
    </div>
  );
}
