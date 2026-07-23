import React from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Cpu, 
  TrendingUp, 
  Layers, 
  Compass, 
  Camera, 
  Megaphone, 
  Activity 
} from 'lucide-react';

interface ServiceItem {
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
}

export const Services: React.FC = () => {
  const services: ServiceItem[] = [
    {
      title: 'Video Editing',
      icon: <Video className="w-8 h-8 text-white" />,
      description: 'Cinematic storytelling with tight pacing, premium soundscapes, and flawless grading.',
      details: ['DaVinci Resolve / Premiere workflows', 'Sound design & mixing', 'Color correction & grading']
    },
    {
      title: 'AI Content Creation',
      icon: <Cpu className="w-8 h-8 text-white" />,
      description: 'Harnessing cutting-edge generative tools to produce custom digital assets at scale.',
      details: ['Kling AI & Runway generation', 'Google Veo Prompt Engineering', 'Hybrid AI-human workflows']
    },
    {
      title: 'Social Media Marketing',
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      description: 'Creating high-retention short-form edits engineered specifically to capture attention.',
      details: ['Short-form pacing design', 'Audience engagement analysis', 'Hook & script structures']
    },
    {
      title: 'Graphic Design',
      icon: <Layers className="w-8 h-8 text-white" />,
      description: 'Crafting visually arresting identities, social assets, and layout structures.',
      details: ['Photoshop / Canva layouts', 'Poster & thumbnail designs', 'Visual brand guidelines']
    },
    {
      title: 'Creative Direction',
      icon: <Compass className="w-8 h-8 text-white" />,
      description: 'Shaping visual narratives from conceptual storyboarding to final execution.',
      details: ['Pre-production planning', 'Shot planning & scripting', 'Aesthetic design systems']
    },
    {
      title: 'Photography',
      icon: <Camera className="w-8 h-8 text-white" />,
      description: 'Capturing campus highlights, portraits, and product details with high clarity.',
      details: ['Lightroom grading workflows', 'Studio & ambient lighting', 'Event recaps & compositions']
    },
    {
      title: 'Brand Campaigns',
      icon: <Megaphone className="w-8 h-8 text-white" />,
      description: 'Developing video ads and social media packages that drive conversions.',
      details: ['Stop-motion transitions', 'Product benefit hooks', 'Ad testing and feedback loops']
    },
    {
      title: 'Motion Graphics',
      icon: <Activity className="w-8 h-8 text-white" />,
      description: 'Integrating dynamic animated titles, assets, and templates into video feeds.',
      details: ['After Effects overlays', 'Aesthetic text typography', 'Smooth keyframe transitions']
    }
  ];

  return (
    <section 
      id="services" 
      className="relative min-h-screen w-full bg-secondary py-24 lg:py-32 overflow-hidden px-6"
    >
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-glow-purple opacity-20 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-left mb-20">
          <span className="font-space text-xs lg:text-sm tracking-[0.3em] text-neutral-500 uppercase mb-4 block">
            CORE CAPABILITIES
          </span>
          <h2 className="font-cinzel text-4xl lg:text-5xl font-light tracking-tight text-white uppercase">
            My Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2, ease: 'easeOut' }
              }}
              className="glass-panel rounded-2xl p-6 lg:p-8 flex flex-col justify-between aspect-[4/5] hover:border-white/10 transition-colors duration-300 relative group overflow-hidden"
            >
              {/* Subtle background card pattern */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/[0.02] to-transparent rounded-bl-full pointer-events-none" />
              
              <div>
                {/* Icon Wrapper */}
                <div className="w-16 h-16 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-white/15 transition-all duration-300">
                  {service.icon}
                </div>

                <h3 className="font-cinzel text-lg font-medium text-white mb-3">
                  {service.title}
                </h3>

                <p className="font-satoshi text-sm text-neutral-400 font-light leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Expansion Details on Hover */}
              <div className="mt-auto border-t border-white/5 pt-4">
                <ul className="space-y-1">
                  {service.details.map((detail, dIdx) => (
                    <li 
                      key={dIdx} 
                      className="font-satoshi text-[10px] uppercase tracking-wider text-neutral-500 group-hover:text-neutral-300 transition-colors"
                    >
                      • {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hover bottom bar indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
