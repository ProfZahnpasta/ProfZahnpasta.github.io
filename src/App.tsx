import React, { useState, useEffect, useRef } from 'react';
import { Github, Mail, ExternalLink, Code, Terminal, Zap, Globe, Database, Cpu } from 'lucide-react';

function App() {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const spotlightRef = useRef<HTMLDivElement>(null);

  const fullText = `> Hello, I'm ProfZ
> Cybernetic Code Architect
> Transforming ideas into digital reality through the matrix of code
> Welcome to my digital domain...`;

  // Typing animation effect
  useEffect(() => {
    if (isTyping && currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else if (currentIndex >= fullText.length) {
      setIsTyping(false);
    }
  }, [currentIndex, isTyping, fullText]);

  // Cursor spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${e.clientX}px`;
        spotlightRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Cursor spotlight effect */}
      <div
        ref={spotlightRef}
        className="fixed w-96 h-96 pointer-events-none z-10 transform -translate-x-1/2 -translate-y-1/2 blur-xl opacity-80"
        style={{
          background: `radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.08) 30%, transparent 70%)`
        }}
      />

      {/* Matrix-style background effect */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 via-transparent to-green-900/20" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-20 bg-black/80 backdrop-blur-sm border-b border-green-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Terminal className="w-6 h-6 text-green-400" />
              <span className="text-xl font-bold text-green-400">ProfZ.dev</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#about" className="nav-link">About</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <pre className="text-lg md:text-xl lg:text-2xl leading-relaxed text-left inline-block">
              {displayText}
              <span className="animate-pulse text-green-300">|</span>
            </pre>
          </div>
          
          {!isTyping && (
            <div className="animate-fade-in-up space-y-6">
              <div className="flex items-center justify-center space-x-8">
                <a href="#" className="cyber-button">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </a>
                <a href="#" className="cyber-button">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact
                </a>
              </div>
              
              <div className="flex items-center justify-center space-x-6 text-green-300">
                <div className="flex items-center space-x-2">
                  <Code className="w-4 h-4" />
                  <span className="text-sm">Full Stack Developer</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm">AI Enthusiast</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-green-400 flex items-center">
            <span className="text-green-500 mr-4">01.</span>
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 text-green-300">
              <p className="leading-relaxed">
                I'm a passionate developer who thrives in the intersection of creativity and technology. 
                With expertise spanning multiple programming languages and frameworks, I specialize in 
                crafting digital experiences that push the boundaries of what's possible.
              </p>
              <p className="leading-relaxed">
                My journey through the digital landscape has led me to master the art of transforming 
                complex problems into elegant solutions, one line of code at a time.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-400 mb-4">Technologies I work with:</h3>
              <div className="grid grid-cols-2 gap-3">
                {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Go', 'PostgreSQL', 'MongoDB'].map((tech) => (
                  <div key={tech} className="flex items-center space-x-2">
                    <span className="text-green-500">▸</span>
                    <span className="text-green-300">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-green-400 flex items-center">
            <span className="text-green-500 mr-4">02.</span>
            Featured Projects
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* PROJECT 1 - EASILY REPLACEABLE */}
            {/* 
              To replace this project:
              1. Change the title "Neural Network Visualizer" below
              2. Update the description text
              3. Replace the technologies in the tech stack array
              4. Update the href links for GitHub and live demo
              5. Replace the background image URL in the style prop
              6. Change the icon (currently <Cpu />)
            */}
            <div className="project-card group">
              <div 
                className="project-image"
                style={{
                  backgroundImage: `url('https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`
                }}
              >
                <div className="project-overlay">
                  <Cpu className="w-12 h-12 text-green-400 mb-4" />
                  <h3 className="text-xl font-bold text-green-400 mb-2">Neural Network Visualizer</h3>
                  <p className="text-green-300 text-sm mb-4">
                    Interactive visualization of neural network architectures with real-time training data
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['React', 'D3.js', 'TensorFlow.js'].map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a href="#" className="project-link">
                      <Github className="w-4 h-4" />
                    </a>
                    <a href="#" className="project-link">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* PROJECT 2 - EASILY REPLACEABLE */}
            {/* 
              To replace this project:
              1. Change the title "Quantum Database Engine" below
              2. Update the description text
              3. Replace the technologies in the tech stack array
              4. Update the href links for GitHub and live demo
              5. Replace the background image URL in the style prop
              6. Change the icon (currently <Database />)
            */}
            <div className="project-card group">
              <div 
                className="project-image"
                style={{
                  backgroundImage: `url('https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`
                }}
              >
                <div className="project-overlay">
                  <Database className="w-12 h-12 text-green-400 mb-4" />
                  <h3 className="text-xl font-bold text-green-400 mb-2">Quantum Database Engine</h3>
                  <p className="text-green-300 text-sm mb-4">
                    High-performance distributed database system with quantum-inspired algorithms
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Go', 'PostgreSQL', 'Docker'].map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a href="#" className="project-link">
                      <Github className="w-4 h-4" />
                    </a>
                    <a href="#" className="project-link">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* PROJECT 3 - EASILY REPLACEABLE */}
            {/* 
              To replace this project:
              1. Change the title "Cybersecurity Dashboard" below
              2. Update the description text
              3. Replace the technologies in the tech stack array
              4. Update the href links for GitHub and live demo
              5. Replace the background image URL in the style prop
              6. Change the icon (currently <Globe />)
            */}
            <div className="project-card group">
              <div 
                className="project-image"
                style={{
                  backgroundImage: `url('https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`
                }}
              >
                <div className="project-overlay">
                  <Globe className="w-12 h-12 text-green-400 mb-4" />
                  <h3 className="text-xl font-bold text-green-400 mb-2">Cybersecurity Dashboard</h3>
                  <p className="text-green-300 text-sm mb-4">
                    Real-time threat monitoring and analysis platform with ML-powered detection
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Python', 'Flask', 'TensorFlow'].map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a href="#" className="project-link">
                      <Github className="w-4 h-4" />
                    </a>
                    <a href="#" className="project-link">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-green-400 flex items-center justify-center">
            <span className="text-green-500 mr-4">03.</span>
            Get In Touch
          </h2>
          <div className="space-y-6">
            <p className="text-green-300 text-lg leading-relaxed max-w-2xl mx-auto">
              Ready to collaborate on the next big thing? Whether you have a project in mind or just want to 
              connect, I'm always excited to discuss new opportunities and innovative ideas.
            </p>
            <div className="flex items-center justify-center space-x-8">
              <a href="mailto:profz@example.com" className="cyber-button">
                <Mail className="w-5 h-5 mr-2" />
                Email Me
              </a>
              <a href="#" className="cyber-button">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-green-500/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-green-300 text-sm">
            © 2024 ProfZ. Crafted with code and caffeine.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;