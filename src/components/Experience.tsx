import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Video, Users, Film, Briefcase } from 'lucide-react';

interface TimelineCardProps {
  role: string;
  company: string;
  duration: string;
  description: string[];
  skills: string[];
  icon: React.ReactNode;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ role, company, duration, description, skills, icon }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });

  return (
    <div ref={cardRef} className="relative grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-8 mb-16 lg:mb-24">
      {/* Date Column (Desktop) */}
      <div className="md:col-span-3 text-left md:text-right flex flex-col justify-start pt-2">
        <motion.span
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-space text-xs tracking-widest text-neutral-500 uppercase font-semibold block"
        >
          {duration}
        </motion.span>
      </div>

      {/* Bullet / Icon Column */}
      <div className="md:col-span-1 flex flex-col items-center relative py-2 md:py-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
          className="w-10 h-10 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center text-white z-10 shadow-lg group hover:border-white/30 transition-colors"
        >
          {icon}
        </motion.div>
      </div>

      {/* Content Card Column */}
      <div className="md:col-span-8 text-left">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="glass-panel rounded-2xl p-6 lg:p-8 hover:border-white/10 transition-colors duration-500 shadow-xl"
        >
          <span className="font-space text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1">
            {company}
          </span>
          <h3 className="font-space text-xl lg:text-2xl font-bold text-white mb-4">
            {role}
          </h3>

          <ul className="font-satoshi text-sm lg:text-base text-neutral-400 font-light space-y-3 mb-6 list-disc list-inside">
            {description.map((bullet, idx) => (
              <li key={idx} className="leading-relaxed">
                <span className="pl-1 text-neutral-300">{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Pill tags */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-white/5 border border-white/5 px-3 py-1 rounded-full font-satoshi text-[10px] uppercase tracking-wider text-neutral-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll inside the timeline container to animate vertical line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const experienceData = [
    {
      role: 'Video Editor & Video Editing Trainer',
      company: 'Millets The Best Food, Hyderabad',
      duration: 'Nov 2024 – Feb 2025',
      description: [
        'Edited high-conversion promotional and product videos for social media campaigns.',
        'Structured post-production workflows and trained interns in video editing tools and guidelines.',
        'Produced short-form content optimized specifically for Instagram Reels & YouTube Shorts.'
      ],
      skills: ['Premiere Pro', 'CapCut', 'Workflows', 'Social Media Strategy', 'Mentoring'],
      icon: <Briefcase className="w-4 h-4" />
    },
    {
      role: 'Freelance Videographer & Editor',
      company: 'Startups, Local Clients & Influencers',
      duration: '2024 – Present',
      description: [
        'Executed end-to-end video production, managing scripting, filming, and post-production delivery.',
        'Collaborated directly with local brands to double engagement through optimized Reels pacing.',
        'Evaluated AI video creation platforms (Kling AI, Google Veo, Runway, Pika) to generate commercial assets.'
      ],
      skills: ['DaVinci Resolve', 'Runway', 'Kling AI', 'Google Veo', 'Pika', 'Sound Design'],
      icon: <Video className="w-4 h-4" />
    },
    {
      role: 'Director & Lead Editor',
      company: 'Team Kanyarasi, Chennai',
      duration: '2022 – Present',
      description: [
        'Directed, shot, and edited short films and musical recap Reels.',
        'Crafted aesthetic narratives using professional color grading, pacing, and multi-layered sound design.',
        'Supervised post-production workflows and led a small crew through production schedules.'
      ],
      skills: ['CapCut', 'Creative Direction', 'Color Grading', 'Cinematography', 'Audio Pacing'],
      icon: <Film className="w-4 h-4" />
    },
    {
      role: 'Editor',
      company: 'Photography Club, IIITDM Kancheepuram',
      duration: '2023 – Present',
      description: [
        'Created visual recap packages and social assets highlighting campus events.',
        'Produced high-energy Reels and summary clips that boosted club channel views and reach.'
      ],
      skills: ['Lightroom', 'PicsArt', 'Canva', 'Social Media Design', 'Event Highlights'],
      icon: <Users className="w-4 h-4" />
    }
  ];

  return (
    <section 
      id="experience" 
      className="relative min-h-screen w-full bg-background py-24 lg:py-32 overflow-hidden px-6"
    >
      {/* Faded Background Text */}
      <div className="absolute top-10 right-10 text-stroke opacity-[0.02] select-none pointer-events-none font-space font-black tracking-tighter leading-none w-full text-right fluid-bg-text">
        HISTORY
      </div>

      <div className="max-w-6xl w-full mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-left mb-20 lg:mb-28">
          <span className="font-space text-xs lg:text-sm tracking-[0.3em] text-neutral-500 uppercase mb-4 block">
            PROFESSIONAL TIMELINE
          </span>
          <h2 className="font-space text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Work Experience
          </h2>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          
          {/* Vertical Progress Line (Desktop) */}
          <div className="absolute left-5 md:left-1/2 -translate-x-1/2 top-2 bottom-2 w-[1px] bg-neutral-800">
            <motion.div 
              style={{ scaleY, originY: 0 }}
              className="w-full h-full bg-gradient-to-b from-white via-purple-500 to-orange-500" 
            />
          </div>

          {/* Cards Mapping */}
          <div className="flex flex-col">
            {experienceData.map((exp, idx) => (
              <TimelineCard
                key={idx}
                role={exp.role}
                company={exp.company}
                duration={exp.duration}
                description={exp.description}
                skills={exp.skills}
                icon={exp.icon}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Experience;
