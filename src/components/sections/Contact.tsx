import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Mail, MessageCircle, ArrowRight, Check } from 'lucide-react'
import Section from '@/components/ui/Section'
import { cn } from '@/lib/utils'

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

/**
 * Contact Section - The Engagement Architecture.
 * Centers on the high-integrity 15-minute Discovery Call funnel.
 */
export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText('idandavidaviv@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const alternativeChannels = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-4 h-4" />,
      href: `https://wa.me/972542475705`,
      color: 'hover:text-green-400',
      isCopy: false,
    },
    {
      name: copied ? 'Copied!' : 'Email',
      icon: copied ? <Check className="w-4 h-4" /> : <Mail className="w-4 h-4" />,
      action: handleCopyEmail,
      color: 'hover:text-idan-david-aviv-blue',
      isCopy: true,
    },
    {
      name: 'LinkedIn',
      icon: <LinkedinIcon className="w-4 h-4" />,
      href: "https://www.linkedin.com/in/idandavidaviv/",
      color: 'hover:text-blue-400',
      isCopy: false,
    }
  ]

  return (
    <Section id="contact" className="py-0 px-6 relative">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Bridge the Gap <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-idan-david-aviv-cyan to-idan-david-aviv-blue">
              From Vision to Reality
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg max-w-xl mx-auto font-light leading-relaxed"
          >
            Looking to translate your vision into an AI-enabled reality? <br className="hidden md:block" />
            Reach out and let&apos;s connect first to see how we can bring your vision to life.
          </motion.p>
        </div>

        {/* Primary Channels: Connect First */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-4 md:gap-6 pt-4"
        >
          {alternativeChannels.map((method) => {
            const Element = method.isCopy ? 'button' : 'a'
            return (
              <Element
                key={method.isCopy ? 'email' : method.name}
                href={method.isCopy ? undefined : method.href}
                onClick={method.isCopy ? method.action : undefined}
                target={method.isCopy ? undefined : "_blank"}
                rel={method.isCopy ? undefined : "noopener noreferrer"}
                className={cn(
                  "flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white/80 transition-all duration-300 text-base md:text-lg",
                  method.color
                )}
              >
                <div className="scale-110">{method.icon}</div>
                <span className="font-light tracking-wide min-w-[70px] text-left">{method.name}</span>
              </Element>
            )
          })}
        </motion.div>

        {/* Divider / Match Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center space-y-6 pt-8 pb-4"
        >
          <div className="h-[1px] w-12 bg-white/10" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">
            Already matched?
          </span>
        </motion.div>

        {/* Secondary CTA: Discovery Call */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="relative group"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-idan-david-aviv-cyan/20 to-idan-david-aviv-blue/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 rounded-3xl" />

          <a
            href="https://calendly.com/idandavidaviv"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-3xl border border-white/10 bg-[#050510]/80 backdrop-blur-md hover:bg-white/[0.03] hover:border-white/20 transition-all duration-500 overflow-hidden"
          >
            <div className="flex items-center gap-6">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-idan-david-aviv-cyan/10 to-idan-david-aviv-blue/10 border border-white/5">
                <Calendar className="w-8 h-8 text-white/90" />
              </div>
              <div className="text-left space-y-1">
                <h3 className="text-2xl font-medium text-white/90 tracking-wide">
                  Introduction Call
                </h3>
                <p className="text-white/50 text-sm font-light">
                  A focused container to explore collaboration opportunities.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/80 font-medium text-sm group-hover:bg-white/10 transition-colors shrink-0">
              Schedule Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        </motion.div>

        {/* Footer Polish Line */}
        <div className="pt-16 flex justify-center">
          <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>
    </Section>
  )
}
