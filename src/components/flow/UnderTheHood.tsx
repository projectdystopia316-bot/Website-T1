import { motion, useAnimation } from 'framer-motion'
import { ArrowRight, ArrowDown, Shield, Cpu, Cloud, Zap, Eye, Lock, Smartphone } from 'lucide-react'
import { useState, useEffect } from 'react'

interface FlowNode {
  label: string
  description: string
  icon: React.ComponentType<any>
  color: string
  technicalDetail: string
  privacyLevel: 'local' | 'hybrid' | 'cloud-opt'
}

const row1: FlowNode[] = [
  { 
    label: 'Local Runtime', 
    description: 'Runs on your device',
    icon: Cpu,
    color: 'from-blue-500 to-cyan-500',
    technicalDetail: 'Native OS integration with sandboxed execution',
    privacyLevel: 'local'
  },
  { 
    label: 'Smart Connectors', 
    description: 'Read files & apps intelligently',
    icon: Eye,
    color: 'from-green-500 to-emerald-500',
    technicalDetail: 'Permission-based file system access with content indexing',
    privacyLevel: 'local'
  },
  { 
    label: 'Policy Gate', 
    description: 'You control every action',
    icon: Shield,
    color: 'from-purple-500 to-violet-500',
    technicalDetail: 'Granular permission controls with audit trails',
    privacyLevel: 'local'
  },
]

const row2: FlowNode[] = [
  { 
    label: 'On-device AI', 
    description: 'Models run locally',
    icon: Smartphone,
    color: 'from-orange-500 to-amber-500',
    technicalDetail: 'Quantized models optimized for edge computing',
    privacyLevel: 'local'
  },
  { 
    label: 'Optional Cloud', 
    description: 'Only when you choose',
    icon: Cloud,
    color: 'from-pink-500 to-rose-500',
    technicalDetail: 'End-to-end encrypted with zero-knowledge architecture',
    privacyLevel: 'cloud-opt'
  },
  { 
    label: 'Action Engine', 
    description: 'Execute with precision',
    icon: Zap,
    color: 'from-red-500 to-pink-500',
    technicalDetail: 'Atomic operations with rollback capabilities',
    privacyLevel: 'hybrid'
  },
]

const legendItems = [
  { label: 'Local by default', color: 'from-blue-500 to-cyan-500', icon: Lock },
  { label: 'Cloud is opt-in', color: 'from-purple-500 to-pink-500', icon: Cloud },
  { label: 'You approve every escalation', color: 'from-orange-500 to-red-500', icon: Shield },
]

function FlowNodeCard({ node, delay }: { node: FlowNode; delay: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = node.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="relative flex flex-col items-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        className="relative w-full max-w-[220px] rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:shadow-2xl overflow-hidden"
        style={{
          background: isHovered 
            ? `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)`
            : undefined
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${node.color} opacity-0 transition-opacity duration-300`}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
        />
        
        {/* Icon with animated glow */}
        <motion.div
          className="flex justify-center mb-4"
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? [0, -5, 5, 0] : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className={`p-3 rounded-xl bg-gradient-to-br ${node.color} shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </motion.div>

        <h3 className="text-center text-lg font-bold text-white mb-2">
          {node.label}
        </h3>
        <p className="text-center text-sm text-gray-300 mb-3">
          {node.description}
        </p>
        
        {/* Technical detail on hover */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            height: isHovered ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            {node.technicalDetail}
          </p>
        </motion.div>

        {/* Privacy indicator */}
        <motion.div
          className="absolute top-3 right-3"
          animate={{ scale: isHovered ? 1.2 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className={`w-3 h-3 rounded-full ${
            node.privacyLevel === 'local' ? 'bg-green-400' :
            node.privacyLevel === 'hybrid' ? 'bg-yellow-400' : 'bg-blue-400'
          }`} />
        </motion.div>

        {/* Floating particles effect */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full"
                initial={{ 
                  x: Math.random() * 200, 
                  y: Math.random() * 200,
                  opacity: 0 
                }}
                animate={{ 
                  x: Math.random() * 200,
                  y: Math.random() * 200,
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

function Arrow({ direction = 'right', delay }: { direction?: 'right' | 'down'; delay: number }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000 + 500)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="relative flex items-center justify-center"
    >
      {/* Animated data flow line */}
      <motion.div
        className={`absolute ${
          direction === 'right' 
            ? 'w-16 h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent' 
            : 'w-1 h-16 bg-gradient-to-b from-transparent via-blue-400/50 to-transparent'
        }`}
        initial={{ scaleX: 0, scaleY: 0 }}
        animate={{ 
          scaleX: direction === 'right' ? [0, 1, 1] : 1,
          scaleY: direction === 'down' ? [0, 1, 1] : 1,
        }}
        transition={{ 
          duration: 1.5, 
          delay: delay + 0.3,
          repeat: Infinity,
          repeatDelay: 3
        }}
      />

      {/* Moving data particles */}
      {isVisible && (
        <motion.div
          className={`absolute ${
            direction === 'right' 
              ? 'w-16 h-1' 
              : 'w-1 h-16'
          } overflow-hidden`}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 bg-blue-400 rounded-full ${
                direction === 'right' ? 'top-1/2 -translate-y-1/2' : 'left-1/2 -translate-x-1/2'
              }`}
              initial={{ 
                x: direction === 'right' ? -8 : 0,
                y: direction === 'down' ? -8 : 0,
                opacity: 0 
              }}
              animate={{ 
                x: direction === 'right' ? 64 : 0,
                y: direction === 'down' ? 64 : 0,
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.4,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Enhanced arrow with glow */}
      <motion.div
        className="relative p-2 rounded-full bg-blue-500/20 backdrop-blur-sm"
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.15, 1],
          boxShadow: [
            '0 0 0px rgba(59, 130, 246, 0.5)',
            '0 0 20px rgba(59, 130, 246, 0.8)',
            '0 0 0px rgba(59, 130, 246, 0.5)'
          ]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {direction === 'right' ? (
          <ArrowRight className="h-5 w-5 text-blue-400" />
        ) : (
          <ArrowDown className="h-5 w-5 text-blue-400" />
        )}
      </motion.div>
    </motion.div>
  )
}

export function UnderTheHood() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 px-4 py-32 sm:px-6 lg:px-8 lg:py-40">
      {/* Enhanced background with animated elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
        <motion.div
          className="absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating data particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl relative">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-6"
          >
            <Shield className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Privacy-First Architecture</span>
          </motion.div>

          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6">
            Under the{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Hood
            </span>
          </h2>
          
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300 sm:text-xl mb-8">
            Every component is designed with privacy at its core. Your data never leaves your device unless you explicitly choose to escalate to cloud processing.
          </p>

          {/* Key stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-gray-300">100% Local Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-gray-300">Zero-Knowledge Cloud</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-gray-300">End-to-End Encrypted</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Flow Diagram - Desktop (2 rows) */}
        <div className="mt-20 hidden md:block">
          {/* Row 1 */}
          <div className="flex items-center justify-center gap-4">
            {row1.map((node, idx) => (
              <div key={idx} className="flex items-center">
                <FlowNodeCard node={node} delay={idx * 0.1} />
                {idx < row1.length - 1 && <Arrow delay={idx * 0.1 + 0.2} />}
              </div>
            ))}
          </div>

          {/* Spacer */}
          <div className="my-12" />

          {/* Row 2 */}
          <div className="flex items-center justify-center gap-4">
            {row2.map((node, idx) => (
              <div key={idx} className="flex items-center">
                <FlowNodeCard node={node} delay={(idx + 3) * 0.1} />
                {idx < row2.length - 1 && <Arrow delay={(idx + 3) * 0.1 + 0.2} />}
              </div>
            ))}
          </div>
        </div>

        {/* Flow Diagram - Mobile (Vertical) */}
        <div className="mt-20 flex flex-col items-center gap-6 md:hidden">
          {[...row1, ...row2].map((node, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <FlowNodeCard node={node} delay={idx * 0.08} />
              {idx < row1.length + row2.length - 1 && (
                <Arrow direction="down" delay={idx * 0.08 + 0.1} />
              )}
            </div>
          ))}
        </div>

        {/* Enhanced Legend Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-white mb-2">Privacy Guarantees</h3>
            <p className="text-gray-400 text-sm">Built-in protections at every layer</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {legendItems.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 px-6 py-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/40 cursor-pointer"
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 transition-opacity duration-300`}
                    whileHover={{ opacity: 0.1 }}
                  />
                  
                  <div className="relative flex items-center gap-3">
                    <motion.div
                      className={`p-2 rounded-lg bg-gradient-to-r ${item.color} shadow-lg`}
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="h-4 w-4 text-white" />
                    </motion.div>
                    
                    <div>
                      <span className="text-sm font-medium text-white block">
                        {item.label}
                      </span>
                      <span className="text-xs text-gray-400">
                        {idx === 0 && 'All processing happens on your device'}
                        {idx === 1 && 'Cloud services are completely optional'}
                        {idx === 2 && 'You control every data transfer'}
                      </span>
                    </div>
                  </div>

                  {/* Subtle glow effect */}
                  <motion.div
                    className={`absolute -inset-1 bg-gradient-to-r ${item.color} opacity-0 blur transition-opacity duration-300`}
                    whileHover={{ opacity: 0.2 }}
                  />
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Additional technical details section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">Technical Architecture</h3>
            <p className="text-gray-300 leading-relaxed">
              Dystopia uses a hybrid architecture that prioritizes local processing while maintaining the flexibility to leverage cloud resources when needed. 
              All data remains encrypted end-to-end, and users maintain complete control over their information flow through granular permission systems.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-2">Local-First</h4>
                <p className="text-sm text-gray-400">All processing happens on your device by default</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Cloud className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-2">Cloud-Optional</h4>
                <p className="text-sm text-gray-400">Escalate to cloud only when you choose</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-2">Zero-Knowledge</h4>
                <p className="text-sm text-gray-400">Even cloud services can't see your data</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

