import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Section from '@/components/ui/Section'
import GlassCard from '@/components/ui/GlassCard'
import { cn } from '@/lib/utils'

/**
 * WorkGrid Section - Displays ranked experience and projects.
 * Powered by high-integrity Zod-validated data.
 */
export default function MainProjects() {
  const projects = [
    {
      section: "Virgo",
      text: "AI that speaks to you.\nA custom interface converting your AI into a sovereign vocal collaborator.",
      status: "Live",
      route: "/virgo",
      image: "/assets/virgo/virgo_icon.png",
      theme: "virgo"
    },
    {
      section: "Virgo DNA",
      text: "Distributed Network Architecture.\nCore project for AI-stream flow facilitation. Allows you to focus on the idea, while Virgo handles the details.",
      status: "STABLE-Dev",
      route: "/virgo-dna",
      image: "/assets/dna/hero-helix.png",
      theme: "dna"
    },
    {
      section: "Spirit Research Lab",
      text: "Mapping the intersection of biology, neuroscience, and Kabbalistic systems to decode human intuition.",
      status: "Live",
      route: "/spirit-research-lab",
      image: "/assets/flask-only-no-bg.png",
      theme: "srl"
    }
  ];

  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case "virgo": // Cyan
        return {
          border: "border-idan-david-aviv-cyan/20 hover:border-idan-david-aviv-cyan/50",
          shadow: "hover:shadow-[0_0_40px_-10px_rgba(44,179,241,0.3)]",
          text: "group-hover:text-idan-david-aviv-cyan",
          glow: "bg-idan-david-aviv-cyan/20",
          badge: "text-idan-david-aviv-cyan border-idan-david-aviv-cyan/20 bg-idan-david-aviv-cyan/5"
        };
      case "dna": // Gold
        return {
          border: "border-idan-david-aviv-gold/20 hover:border-idan-david-aviv-gold/50",
          shadow: "hover:shadow-[0_0_40px_-10px_rgba(251,191,36,0.3)]",
          text: "group-hover:text-idan-david-aviv-gold",
          glow: "bg-idan-david-aviv-gold/20",
          badge: "text-idan-david-aviv-gold border-idan-david-aviv-gold/20 bg-idan-david-aviv-gold/5"
        };
      case "srl": // Purple
        return {
          border: "border-idan-david-aviv-purple/20 hover:border-idan-david-aviv-purple/50",
          shadow: "hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)]",
          text: "group-hover:text-idan-david-aviv-purple",
          glow: "bg-idan-david-aviv-purple/20",
          badge: "text-idan-david-aviv-purple border-idan-david-aviv-purple/20 bg-idan-david-aviv-purple/5"
        };
      default:
        return {
          border: "border-white/10 hover:border-white/30",
          shadow: "hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]",
          text: "group-hover:text-white",
          glow: "bg-white/10",
          badge: "text-white border-white/20 bg-white/5"
        };
    }
  };

  return (
    <Section id="work" className="space-y-12">
      <h2 className="text-3xl font-bold text-gradient inline-block">Main Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((item, index) => {
          const theme = getThemeClasses(item.theme);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
            >
              <Link to={item.route} className="block h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-idan-david-aviv-blue rounded-[2rem] group">
                <GlassCard className={cn(
                  "relative h-full transition-all duration-500 overflow-hidden flex flex-col items-center text-center p-8 bg-[#050510]/60",
                  "hover:-translate-y-2",
                  theme.border,
                  theme.shadow
                )}>
                  {/* Background Ambient Glow on Hover */}
                  <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[80px] -z-10 pointer-events-none",
                    theme.glow
                  )} />

                  {/* Status Badge */}
                  <span className={cn(
                    "absolute top-6 right-6 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md border backdrop-blur-md",
                    theme.badge
                  )}>
                    {item.status}
                  </span>

                  {/* Image Asset */}
                  <div className="w-32 h-32 mb-8 mt-6 relative flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.section}
                      className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110 group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-700 ease-out"
                    />
                  </div>

                  {/* Title & Text */}
                  <h3 className={cn(
                    "text-2xl font-bold mb-4 transition-colors duration-500 text-white",
                    theme.text
                  )}>
                    {item.section}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed max-w-[280px] whitespace-pre-line">
                    {item.text}
                  </p>
                </GlassCard>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </Section>
  )
}
