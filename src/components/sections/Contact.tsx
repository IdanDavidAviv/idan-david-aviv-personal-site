import { motion } from 'framer-motion'
import { Mail, MessageCircle, Linkedin, ChevronRight } from 'lucide-react'
import { personalInfo } from '@/data/content'
import Section from '@/components/ui/Section'
import { cn } from '@/lib/utils'

/**
 * Contact Section - Multi-channel engagement hub.
 * Designed with a premium "Equilibrium" feel.
 */
export default function Contact() {
  const contactMethods = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-5 h-5 text-green-400" />,
      value: "Let's chat directly",
      href: `https://wa.me/${personalInfo.contact.whatsapp.replace(/\+/g, '')}`,
      color: 'hover:border-green-500/40 hover:bg-green-500/5',
      glow: 'group-hover:drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]'
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5 text-idan-david-aviv-blue" />,
      value: personalInfo.contact.email,
      href: `mailto:${personalInfo.contact.email}`,
      color: 'hover:border-idan-david-aviv-blue/40 hover:bg-idan-david-aviv-blue/5',
      glow: 'group-hover:drop-shadow-[0_0_15px_rgba(30,65,193,0.3)]'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5 text-blue-400" />,
      value: 'Professional Network',
      href: personalInfo.contact.linkedin,
      color: 'hover:border-blue-500/40 hover:bg-blue-500/5',
      glow: 'group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]'
    }
  ]

  return (
    <Section id="contact" className="py-32 px-6">
      <div className="max-w-6xl mx-auto space-y-20">
        <div className="text-center space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight"
          >
            Bridge the Gap <br />
            <span className="text-idan-david-aviv-blue">From Vision to Reality</span>
          </motion.h2>
          <p className="text-mystic-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Whether you&apos;re looking for an AI Architect or a Senior-Level collaboration, 
            let&apos;s start a conversation that matters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactMethods.map((method, i) => (
            <motion.a
              key={method.name}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={cn(
                "group relative p-8 glass-card border border-white/5 transition-all duration-300 flex flex-col items-center gap-6",
                method.color
              )}
            >
              <div className={cn("p-4 rounded-2xl bg-white/[0.03] border border-white/5 transition-all duration-500", method.glow)}>
                {method.icon}
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-mystic-500 group-hover:text-white transition-colors">{method.name}</h3>
                <p className="text-white/80 font-medium">{method.value}</p>
              </div>
              <div className="mt-4 flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-idan-david-aviv-blue opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                Connect Now <ChevronRight className="w-3 h-3" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer Polish Line */}
        <div className="pt-12 flex justify-center">
           <div className="h-[1px] w-64 bg-gradient-to-r from-transparent via-idan-david-aviv-blue/20 to-transparent" />
        </div>
      </div>
    </Section>
  )
}
