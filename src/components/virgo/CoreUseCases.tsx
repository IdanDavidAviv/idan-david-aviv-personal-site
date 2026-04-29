import { motion } from 'framer-motion'
import { TerminalSquare, BookOpen, Activity } from 'lucide-react'

const cases = [
    {
        title: "The Agent Narrator",
        description: "Listen to implementation plans and code reviews while keeping your eyes locked on the codebase.",
        icon: BookOpen
    },
    {
        title: "Task Handoffs",
        description: "Audible status reports. You don't have to watch a terminal finish a 10-minute task anymore.",
        icon: TerminalSquare
    },
    {
        title: "Presentations",
        description: "Narrate architecture documents or code walkthroughs directly inside VS Code.",
        icon: Activity
    }
]

export function CoreUseCases() {
    return (
        <section className="relative py-24 px-6 md:px-12 bg-black/20 border-y border-white/5 z-10">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
                
                {/* Motif Asset */}
                <div className="w-full lg:w-1/3 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#cc00ff]/20 to-[#00f0ff]/20 blur-[80px] rounded-full" />
                        <motion.img 
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            src="/assets/virgo/virgo_icon.png" 
                            alt="Virgo Core" 
                            className="w-48 h-48 md:w-64 md:h-64 object-contain relative z-10 drop-shadow-[0_0_40px_rgba(204,0,255,0.3)]"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cases.map((useCase, idx) => {
                        const Icon = useCase.icon
                        return (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className={`glass-card p-8 rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 ${idx === 2 ? 'md:col-span-2' : ''}`}
                            >
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00f0ff]/20 to-[#cc00ff]/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                                    <Icon className="w-6 h-6 text-[#00f0ff]" />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-3">{useCase.title}</h4>
                                <p className="text-white/50 font-light">{useCase.description}</p>
                            </motion.div>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}
