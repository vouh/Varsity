import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, Environment, ContactShadows, Float } from '@react-three/drei';
import gsap from 'gsap';

// 3D Football Model Component using basic geometries
function FootballModel(props) {
  const group = useRef();
  
  // Rotate the ball
  useFrame((state) => {
    group.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Main sphere for the football */}
      <mesh scale={1.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      
      {/* Black pentagon patterns */}
      {[...Array(12)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            Math.cos(i * Math.PI / 6) * 1.51,
            Math.sin(i * Math.PI / 6) * 1.51,
            0
          ]}
          rotation={[0, 0, i * Math.PI / 6]}
          scale={0.3}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

// Trophy Model Component (placeholder)
function TrophyModel(props) {
  const group = useRef();
  
  useFrame((state) => {
    group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.2, 0.5, 1, 32]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.4, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Main Landing Page Component
const LandingPage = ({ onNavigate }) => {
  const headerRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Animate header on mount
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Animate CTA button
    gsap.from(ctaRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  }, []);

  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <motion.h1 
            ref={headerRef}
            className="hero-title"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="gold-text">VARSITY</span> SPORTS
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Experience the thrill of sports like never before
          </motion.p>
          
          <motion.div 
            className="hero-features"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="feature">
              <span className="feature-icon">🏆</span>
              <span className="feature-text">Live Updates</span>
            </div>
            <div className="feature">
              <span className="feature-icon">📊</span>
              <span className="feature-text">Stats & Analysis</span>
            </div>
            <div className="feature">
              <span className="feature-icon">💰</span>
              <span className="feature-text">Smart Betting</span>
            </div>
          </motion.div>
          
          <motion.button 
            ref={ctaRef}
            className="cta-button"
            onClick={() => onNavigate('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Betting Now
          </motion.button>
        </div>
        
        <div className="hero-3d-container">
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <PresentationControls
              global
              rotation={[0, 0, 0]}
              polar={[-Math.PI / 4, Math.PI / 4]}
              azimuth={[-Math.PI / 4, Math.PI / 4]}
              config={{ mass: 2, tension: 400 }}
              snap={{ mass: 4, tension: 400 }}
            >
              <Float rotationIntensity={0.4}>
                <FootballModel position={[0, 0, 0]} />
              </Float>
            </PresentationControls>
            <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.5} far={4} />
            <Environment preset="city" />
          </Canvas>
        </div>
      </div>
      
      <div className="info-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Top Leagues
        </motion.h2>
        
        <div className="leagues-grid">
          {['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'MLS'].map((league, index) => (
            <motion.div 
              key={league} 
              className="league-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(255, 215, 0, 0.3)' }}
            >
              <h3>{league}</h3>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="trophy-section">
        <div className="trophy-content">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Become a Champion
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Join thousands of winners who trust Varsity for their sports betting needs.
            Our advanced analytics and real-time updates give you the edge you need.
          </motion.p>
          
          <motion.button 
            className="cta-button secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            onClick={() => onNavigate('sports')}
          >
            Explore Sports
          </motion.button>
        </div>
        
        <div className="trophy-3d-container">
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <PresentationControls
              global
              rotation={[0, 0, 0]}
              polar={[-Math.PI / 4, Math.PI / 4]}
              azimuth={[-Math.PI / 4, Math.PI / 4]}
            >
              <TrophyModel position={[0, 0, 0]} />
            </PresentationControls>
            <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.5} far={4} />
            <Environment preset="sunset" />
          </Canvas>
        </div>
      </div>
      
      <div className="stats-highlight">
        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <span className="stat-number">50K+</span>
          <span className="stat-label">Active Users</span>
        </motion.div>
        
        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <span className="stat-number">100+</span>
          <span className="stat-label">Sports Events</span>
        </motion.div>
        
        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <span className="stat-number">$2M+</span>
          <span className="stat-label">Paid Out</span>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
