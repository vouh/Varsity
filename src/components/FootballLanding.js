import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import './FootballLanding.css';

// Team colors and initials for logo placeholders
const TEAM_DATA = {
  manchesterUnited: { color: '#DA291C', initial: 'MU' },
  manchesterCity: { color: '#6CABDD', initial: 'MC' },
  westHam: { color: '#7A263A', initial: 'WH' },
  leeds: { color: '#FFCD00', initial: 'LE' },
  crystalPalace: { color: '#1B458F', initial: 'CP' },
  fulham: { color: '#000000', initial: 'FU' },
  leicesterCity: { color: '#003090', initial: 'LC' },
  brentford: { color: '#E30613', initial: 'BR' }
};

// Team Logo Component
const TeamLogo = ({ team, size = 70 }) => {
  const teamData = TEAM_DATA[team];
  return (
    <div 
      className="team-logo-circle" 
      style={{ 
        backgroundColor: teamData.color,
        width: size,
        height: size,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: size * 0.4
      }}
    >
      {teamData.initial}
    </div>
  );
};

const FootballLanding = ({ onNavigate }) => {
  const headerRef = useRef(null);
  const mainMatchRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Animate elements on mount
    gsap.from(headerRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    gsap.from(mainMatchRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out"
    });

    gsap.from(statsRef.current, {
      x: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.4,
      ease: "power3.out"
    });
  }, []);

  return (
    <div className="football-landing">
      {/* Top Navigation */}
      <div className="top-nav">
        <div className="logo-area">
          <img src={require('../images/logo.jpg')} alt="Varsity" className="varsity-logo" />
        </div>
        
        <div className="nav-links">
          <button className="nav-link active">Home</button>
          <button className="nav-link">Live</button>
          <button className="nav-link">Fixtures</button>
          <button className="nav-link">Bet</button>
        </div>
        
        <div className="search-profile">
          <div className="search-box">
            <input type="text" placeholder="Search" />
            <button className="search-icon">🔍</button>
          </div>
          <button className="notification-icon">🔔</button>
          <div className="profile-pic"></div>
        </div>
      </div>
      
      {/* League Navigation */}
      <div className="league-nav">
        <button className="nav-arrow">❮</button>
        <div className="league-button">
          <div className="league-icon">⚽</div>
          <span>Premier League</span>
        </div>
        <button className="nav-arrow">❯</button>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        {/* Left Side - Main Feature */}
        <div className="main-feature">
          <motion.div 
            ref={headerRef}
            className="main-header"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Enjoy football in <span className="highlight">best leagues</span></h1>
          </motion.div>
          
          <motion.div 
            ref={mainMatchRef}
            className="match-display"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="live-tag">Live (84')</div>
            
            <div className="match-teams">
              <div className="team team-left">
                <TeamLogo team="manchesterUnited" />
                <div className="team-name">Manchester United</div>
                <div className="player-info">
                  <span className="player-icon">⚽</span>
                  <span>Garnacho 40'</span>
                </div>
              </div>
              
              <div className="match-score">
                <div className="score">1 : 1</div>
                <div className="time">90'</div>
              </div>
              
              <div className="team team-right">
                <TeamLogo team="manchesterCity" />
                <div className="team-name">Manchester City</div>
                <div className="player-info">
                  <span className="player-icon">⚽</span>
                  <span>Haaland 65'</span>
                </div>
              </div>
            </div>
            
            <div className="match-venue">
              <span className="venue-icon">🏟️</span>
              <span>Old Trafford</span>
            </div>
            
            <div className="video-preview">
              <div className="play-button">▶</div>
            </div>
          </motion.div>
        </div>
        
        {/* Right Side - Match Stats */}
        <motion.div 
          ref={statsRef}
          className="match-stats"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="stats-buttons">
            <button className="stats-button active">Match Detail</button>
            <button className="stats-button">Live up</button>
            <button className="stats-button">Statistics</button>
            <button className="stats-button">Positions table</button>
          </div>
          
          <div className="team-logos">
            <TeamLogo team="manchesterUnited" size={50} />
            <TeamLogo team="manchesterCity" size={50} />
          </div>
          
          <div className="stats-list">
            <div className="stat-item">
              <span className="stat-label">Attacks</span>
              <div className="stat-bar">
                <div className="stat-progress left" style={{ width: '40%' }}></div>
                <div className="stat-progress right" style={{ width: '60%' }}></div>
              </div>
              <div className="stat-numbers">
                <span>24</span>
                <span>36</span>
              </div>
            </div>
            
            <div className="stat-item">
              <span className="stat-label">Shoots</span>
              <div className="stat-bar">
                <div className="stat-progress left" style={{ width: '30%' }}></div>
                <div className="stat-progress right" style={{ width: '70%' }}></div>
              </div>
              <div className="stat-numbers">
                <span>8</span>
                <span>20</span>
              </div>
            </div>
            
            <div className="stat-item">
              <span className="stat-label">Possession</span>
              <div className="stat-bar">
                <div className="stat-progress left" style={{ width: '56%' }}></div>
                <div className="stat-progress right" style={{ width: '44%' }}></div>
              </div>
              <div className="stat-numbers">
                <span>56%</span>
                <span>44%</span>
              </div>
            </div>
            
            <div className="stat-item">
              <span className="stat-label">Pass accuracy</span>
              <div className="stat-bar">
                <div className="stat-progress left" style={{ width: '68%' }}></div>
                <div className="stat-progress right" style={{ width: '32%' }}></div>
              </div>
              <div className="stat-numbers">
                <span>68%</span>
                <span>32%</span>
              </div>
            </div>
            
            <div className="stat-item">
              <span className="stat-label">Fouls</span>
              <div className="stat-bar">
                <div className="stat-progress left" style={{ width: '45%' }}></div>
                <div className="stat-progress right" style={{ width: '55%' }}></div>
              </div>
              <div className="stat-numbers">
                <span>12</span>
                <span>16</span>
              </div>
            </div>
            
            <div className="stat-item">
              <span className="stat-label">Yellow cards</span>
              <div className="stat-bar">
                <div className="stat-progress left" style={{ width: '40%' }}></div>
                <div className="stat-progress right" style={{ width: '60%' }}></div>
              </div>
              <div className="stat-numbers">
                <span>4</span>
                <span>6</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Match Results Carousel */}
      <div className="match-results">
        <button className="carousel-arrow left">❮</button>
        
        <div className="match-cards">
          <div className="match-card live">
            <div className="match-status">Live hit</div>
            <div className="match-teams-mini">
              <div className="team-mini">
                <TeamLogo team="manchesterUnited" size={40} />
                <div>M. United</div>
              </div>
              <div className="score-mini">1 · 1</div>
              <div className="team-mini">
                <TeamLogo team="manchesterCity" size={40} />
                <div>M. City</div>
              </div>
            </div>
          </div>
          
          <div className="match-card">
            <div className="match-status">Final</div>
            <div className="match-teams-mini">
              <div className="team-mini">
                <TeamLogo team="westHam" size={40} />
                <div>West Ham</div>
              </div>
              <div className="score-mini">1 · 0</div>
              <div className="team-mini">
                <TeamLogo team="leeds" size={40} />
                <div>Leeds</div>
              </div>
            </div>
          </div>
          
          <div className="match-card">
            <div className="match-status">Final</div>
            <div className="match-teams-mini">
              <div className="team-mini">
                <TeamLogo team="crystalPalace" size={40} />
                <div>Crystal Palace</div>
              </div>
              <div className="score-mini">2 · 1</div>
              <div className="team-mini">
                <TeamLogo team="fulham" size={40} />
                <div>Fulham</div>
              </div>
            </div>
          </div>
          
          <div className="match-card">
            <div className="match-status">Final</div>
            <div className="match-teams-mini">
              <div className="team-mini">
                <TeamLogo team="leicesterCity" size={40} />
                <div>Leicester City</div>
              </div>
              <div className="score-mini">1 · 1</div>
              <div className="team-mini">
                <TeamLogo team="brentford" size={40} />
                <div>Brentford</div>
              </div>
            </div>
          </div>
        </div>
        
        <button className="carousel-arrow right">❯</button>
      </div>
      
      {/* CTA Buttons */}
      <div className="cta-buttons">
        <button 
          className="cta-button primary"
          onClick={() => onNavigate('home')}
        >
          Place Bets
        </button>
        <button 
          className="cta-button secondary"
          onClick={() => onNavigate('sports')}
        >
          View All Matches
        </button>
      </div>
    </div>
  );
};

export default FootballLanding;
