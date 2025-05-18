import React, { useEffect } from 'react';

// This component is just used to create placeholder logos for the teams
// In a production environment, you would use actual team logos
const PlaceholderLogos = () => {
  useEffect(() => {
    const teams = [
      { id: 'man-utd', color: '#DA291C', letter: 'M' },
      { id: 'man-city', color: '#6CABDD', letter: 'C' },
      { id: 'west-ham', color: '#7A263A', letter: 'W' },
      { id: 'leeds', color: '#FFCD00', letter: 'L' },
      { id: 'crystal-palace', color: '#1B458F', letter: 'CP' },
      { id: 'fulham', color: '#000000', letter: 'F' },
      { id: 'leicester', color: '#003090', letter: 'LC' },
      { id: 'brentford', color: '#E30613', letter: 'B' }
    ];

    teams.forEach(team => {
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');
      
      // Draw circle background
      ctx.beginPath();
      ctx.arc(50, 50, 45, 0, Math.PI * 2);
      ctx.fillStyle = team.color;
      ctx.fill();
      
      // Draw text
      ctx.font = team.letter.length > 1 ? 'bold 30px Arial' : 'bold 40px Arial';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(team.letter, 50, 50);
      
      // Convert to data URL
      const dataUrl = canvas.toDataURL('image/png');
      
      // Create a link element to download the image
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${team.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }, []);

  return (
    <div style={{ display: 'none' }}>
      Generating placeholder logos...
    </div>
  );
};

export default PlaceholderLogos;
