import React, { useState, useRef, useEffect } from 'react';
import { Volume2, CheckCircle, Lightbulb, Eye, Zap, Heart, Star, Crown, Gift, Music } from 'lucide-react';

function App() {
  const [showCorrect, setShowCorrect] = useState(false);
  const [showReasons, setShowReasons] = useState(false);
  const [currentTrick, setCurrentTrick] = useState<number | null>(null);
  const [trickActive, setTrickActive] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [currentFunFact, setCurrentFunFact] = useState('');
  const [clickCount, setClickCount] = useState(0);
  
  // Trick-specific states
  const [hardGPosition, setHardGPosition] = useState({ x: 0, y: 0 });
  const [hardGScale, setHardGScale] = useState(1);
  const [softGScale, setSoftGScale] = useState(1);
  const [hardGHidden, setHardGHidden] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [softGPosition, setSoftGPosition] = useState({ x: 0, y: 0 });
  const [isSoftGChasing, setIsSoftGChasing] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isRainbow, setIsRainbow] = useState(false);
  const [showEyes, setShowEyes] = useState(false);
  const [isInvisible, setIsInvisible] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const [showCrown, setShowCrown] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  
  const hardGRef = useRef<HTMLButtonElement>(null);
  const softGRef = useRef<HTMLButtonElement>(null);
  const chaseIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const messageIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Audio refs for sound effects
  const bellSoundRef = useRef<HTMLAudioElement>(null);
  const buzzerSoundRef = useRef<HTMLAudioElement>(null);

  const trickMessages = [
    "🎪 Welcome to the GIF Pronunciation Circus! 🎪",
    "🎭 Time for some pronunciation theater! 🎭",
    "🎨 Let's paint the town with correct pronunciation! 🎨",
    "🎵 It's time for the pronunciation dance! 🎵",
    "🎯 Target acquired: Correct pronunciation! 🎯",
    "🎪 Step right up to the pronunciation show! 🎪",
    "🎨 Art attack: Pronunciation edition! 🎨",
    "🎭 Drama time: The GIF pronunciation saga! 🎭",
    "🎵 Musical chairs, but with pronunciation! 🎵",
    "🎪 The greatest pronunciation show on earth! 🎪"
  ];

  const chaseMessages = [
    "You can run, but you can't hide from the truth! 🏃‍♂️",
    "The correct answer will find you eventually! 🎯",
    "Running away won't change the facts! 💨",
    "Steve Wilhite is watching... and judging 👀",
    "The truth is literally chasing you right now! 🏃‍♀️",
    "Your cursor can't escape destiny! ✨",
    "Resistance is futile - just click it! 🤖",
    "The soft G will never give up on you! 💚",
    "This is what happens when you ignore facts! 📚",
    "The pronunciation police are on patrol! 🚔",
    "You're being hunted by linguistic accuracy! 🎭"
  ];

  const funFacts = [
    "Steve Wilhite, the creator of GIF, specifically stated it's pronounced with a soft G like 'jif' - and he should know, he invented it!",
    "At the 2013 Webby Awards, Steve Wilhite used his acceptance speech to clarify once and for all: 'It's pronounced JIF, not GIF.'",
    "The phrase 'Choosy developers choose GIF' was intentionally created as a play on the Jif peanut butter slogan 'Choosy moms choose Jif.'",
    "Many English words starting with 'gi' use the soft G sound: giant, giraffe, gin, ginger, gymnasium, and gist.",
    "Steve Wilhite has been consistent about the pronunciation since the format's creation in 1987 - that's over 35 years of saying 'jif'!",
    "CompuServe, the company where GIF was developed, always used the soft G pronunciation in their internal communications.",
    "The soft G pronunciation was intentional from day one - Wilhite wanted it to sound like the popular peanut butter brand.",
    "Major dictionaries like Merriam-Webster and Oxford list the soft G pronunciation as the primary option.",
    "Steve Wilhite has given countless interviews over the decades, always correcting people who say it with a hard G.",
    "The creator's intent matters - when someone invents something, they get to decide how it's pronounced. It's basic respect for intellectual property."
  ];

  // Track mouse position for chasing trick
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (isSoftGChasing) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isSoftGChasing]);

  // Soft G button chasing logic
  useEffect(() => {
    if (isSoftGChasing && !showCorrect && !showReasons) {
      chaseIntervalRef.current = setInterval(() => {
        setSoftGPosition(prevPos => {
          const dx = mousePosition.x - (prevPos.x + 150);
          const dy = mousePosition.y - (prevPos.y + 50);
          
          const speed = 0.1;
          const newX = prevPos.x + (dx * speed);
          const newY = prevPos.y + (dy * speed);
          
          const maxX = window.innerWidth - 300;
          const maxY = window.innerHeight - 100;
          
          return {
            x: Math.max(0, Math.min(maxX, newX)),
            y: Math.max(0, Math.min(maxY, newY))
          };
        });
      }, 50);
    }

    return () => {
      if (chaseIntervalRef.current) {
        clearInterval(chaseIntervalRef.current);
      }
    };
  }, [isSoftGChasing, mousePosition, showCorrect, showReasons]);

  // Periodic chase messages
  useEffect(() => {
    if (isSoftGChasing && !showCorrect && !showReasons) {
      messageIntervalRef.current = setInterval(() => {
        const randomMessage = chaseMessages[Math.floor(Math.random() * chaseMessages.length)];
        setCurrentMessage(randomMessage);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 4000);
      }, 10000);
    }

    return () => {
      if (messageIntervalRef.current) {
        clearInterval(messageIntervalRef.current);
      }
    };
  }, [isSoftGChasing, showCorrect, showReasons]);

  // Sound effect functions
  const playBellSound = () => {
    if (bellSoundRef.current) {
      bellSoundRef.current.currentTime = 0;
      bellSoundRef.current.play().catch(e => console.log('Bell sound failed to play:', e));
    }
  };

  const playBuzzerSound = () => {
    if (buzzerSoundRef.current) {
      buzzerSoundRef.current.currentTime = 0;
      buzzerSoundRef.current.play().catch(e => console.log('Buzzer sound failed to play:', e));
    }
  };

  // Execute random trick
  const executeRandomTrick = () => {
    if (trickActive) return;
    
    const trickNumber = Math.floor(Math.random() * 10) + 1;
    setCurrentTrick(trickNumber);
    setTrickActive(true);
    
    // Show trick message
    const randomMessage = trickMessages[Math.floor(Math.random() * trickMessages.length)];
    setCurrentMessage(randomMessage);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
    
    playBuzzerSound();
    
    switch (trickNumber) {
      case 1: // Button slides around screen
        slideButtonAround();
        break;
      case 2: // Soft G button chases cursor
        startCursorChase();
        break;
      case 3: // Hard G button spins uncontrollably
        spinHardGButton();
        break;
      case 4: // Hard G button shakes violently
        shakeHardGButton();
        break;
      case 5: // Soft G button becomes rainbow colored
        makeRainbowSoftG();
        break;
      case 6: // Eyes appear watching the user
        showWatchingEyes();
        break;
      case 7: // Hard G button becomes nearly invisible
        makeHardGInvisible();
        break;
      case 8: // Hearts float around soft G button
        showFloatingHearts();
        break;
      case 9: // Soft G button glows and pulses
        makeGlowingSoftG();
        break;
      case 10: // Crown appears on soft G button
        crownTheSoftG();
        break;
    }
  };

  // Trick implementations
  const slideButtonAround = () => {
    let moveCount = 0;
    const moveInterval = setInterval(() => {
      const newX = Math.random() * (window.innerWidth - 200);
      const newY = Math.random() * (window.innerHeight - 100);
      setHardGPosition({ x: newX, y: newY });
      setHardGScale(0.5 + Math.random() * 0.5);
      
      moveCount++;
      if (moveCount >= 15) {
        clearInterval(moveInterval);
        setTimeout(() => setTrickActive(false), 1000);
      }
    }, 500);
  };

  const startCursorChase = () => {
    setIsSoftGChasing(true);
    const softGButton = softGRef.current;
    if (softGButton) {
      const rect = softGButton.getBoundingClientRect();
      setSoftGPosition({ x: rect.left, y: rect.top });
    }
    setTimeout(() => {
      setIsSoftGChasing(false);
      setSoftGPosition({ x: 0, y: 0 });
      setTrickActive(false);
    }, 15000);
  };

  const spinHardGButton = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
      setTrickActive(false);
    }, 8000);
  };

  const shakeHardGButton = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      setTrickActive(false);
    }, 6000);
  };

  const makeRainbowSoftG = () => {
    setIsRainbow(true);
    setSoftGScale(1.5);
    setTimeout(() => {
      setIsRainbow(false);
      setSoftGScale(1);
      setTrickActive(false);
    }, 10000);
  };

  const showWatchingEyes = () => {
    setShowEyes(true);
    setTimeout(() => {
      setShowEyes(false);
      setTrickActive(false);
    }, 12000);
  };

  const makeHardGInvisible = () => {
    setIsInvisible(true);
    setTimeout(() => {
      setIsInvisible(false);
      setTrickActive(false);
    }, 8000);
  };

  const showFloatingHearts = () => {
    setShowHearts(true);
    setSoftGScale(1.3);
    setTimeout(() => {
      setShowHearts(false);
      setSoftGScale(1);
      setTrickActive(false);
    }, 10000);
  };

  const makeGlowingSoftG = () => {
    setIsGlowing(true);
    setSoftGScale(1.4);
    setTimeout(() => {
      setIsGlowing(false);
      setSoftGScale(1);
      setTrickActive(false);
    }, 8000);
  };

  const crownTheSoftG = () => {
    setShowCrown(true);
    setSoftGScale(1.2);
    setIsFloating(true);
    setTimeout(() => {
      setShowCrown(false);
      setSoftGScale(1);
      setIsFloating(false);
      setTrickActive(false);
    }, 12000);
  };

  const handleSoftGClick = () => {
    playBellSound();
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    setCurrentFunFact(randomFact);
    setShowCorrect(true);
  };

  const handleHardGClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    
    // Execute random trick after 3 clicks
    if (newClickCount >= 3 && !trickActive) {
      executeRandomTrick();
    }
  };

  const resetApp = () => {
    setShowCorrect(false);
    setShowReasons(false);
    setCurrentTrick(null);
    setTrickActive(false);
    setCurrentMessage('');
    setShowMessage(false);
    setCurrentFunFact('');
    setClickCount(0);
    
    // Reset all trick states
    setHardGPosition({ x: 0, y: 0 });
    setHardGScale(1);
    setSoftGScale(1);
    setHardGHidden(false);
    setMousePosition({ x: 0, y: 0 });
    setSoftGPosition({ x: 0, y: 0 });
    setIsSoftGChasing(false);
    setIsSpinning(false);
    setIsShaking(false);
    setIsRainbow(false);
    setShowEyes(false);
    setIsInvisible(false);
    setShowHearts(false);
    setIsGlowing(false);
    setShowCrown(false);
    setIsFloating(false);
    
    // Clear intervals
    if (chaseIntervalRef.current) {
      clearInterval(chaseIntervalRef.current);
    }
    if (messageIntervalRef.current) {
      clearInterval(messageIntervalRef.current);
    }
  };

  const reasons = [
    "The creator of the GIF format, Steve Wilhite, specifically stated it's pronounced with a soft G (like 'jif')",
    "Steve Wilhite won a Webby Award in 2013 and used his acceptance speech to clarify: 'It's pronounced JIF, not GIF'",
    "The phrase 'Choosy developers choose GIF' was a play on the Jif peanut butter slogan 'Choosy moms choose Jif'",
    "Many English words with 'gi' are pronounced with a soft G: giant, giraffe, gin, ginger, gymnasium",
    "The pronunciation has been consistent since the format's creation in 1987",
    "CompuServe, the company where GIF was developed, always used the soft G pronunciation",
    "Steve Wilhite has repeatedly corrected people on the pronunciation throughout his career",
    "The soft G pronunciation was intentional - it was meant to sound like the peanut butter brand",
    "Dictionaries like Merriam-Webster list the soft G pronunciation first",
    "The creator's intent should be respected - it's his creation, his rules"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Hidden Audio Elements */}
      <audio ref={bellSoundRef} preload="auto">
        <source src="/sounds/bell.mp3" type="audio/mpeg" />
        <source src="/sounds/bell.wav" type="audio/wav" />
      </audio>
      
      <audio ref={buzzerSoundRef} preload="auto">
        <source src="/sounds/buzzer.mp3" type="audio/mpeg" />
        <source src="/sounds/buzzer.wav" type="audio/wav" />
      </audio>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 right-1/3 w-8 h-8 bg-blue-400 rounded-full animate-pulse"></div>
      </div>

      {/* Watching Eyes */}
      {showEyes && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <Eye className="absolute top-20 left-20 w-16 h-16 text-red-500 animate-pulse" />
          <Eye className="absolute top-32 right-32 w-12 h-12 text-blue-500 animate-bounce" />
          <Eye className="absolute bottom-40 left-40 w-14 h-14 text-green-500 animate-ping" />
          <Eye className="absolute bottom-20 right-20 w-10 h-10 text-purple-500 animate-pulse" />
          <Eye className="absolute top-1/2 left-10 w-8 h-8 text-yellow-500 animate-bounce" />
          <Eye className="absolute top-1/3 right-10 w-12 h-12 text-pink-500 animate-ping" />
        </div>
      )}

      {/* Floating Hearts */}
      {showHearts && (
        <div className="fixed inset-0 pointer-events-none z-30">
          <Heart className="absolute top-20 left-1/4 w-8 h-8 text-red-400 animate-bounce" style={{ animationDelay: '0s' }} />
          <Heart className="absolute top-40 right-1/4 w-6 h-6 text-pink-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
          <Heart className="absolute bottom-40 left-1/3 w-10 h-10 text-red-500 animate-bounce" style={{ animationDelay: '1s' }} />
          <Heart className="absolute bottom-60 right-1/3 w-7 h-7 text-pink-500 animate-bounce" style={{ animationDelay: '1.5s' }} />
          <Heart className="absolute top-1/2 left-20 w-5 h-5 text-red-300 animate-bounce" style={{ animationDelay: '2s' }} />
          <Heart className="absolute top-1/3 right-20 w-9 h-9 text-pink-300 animate-bounce" style={{ animationDelay: '2.5s' }} />
        </div>
      )}

      {/* Messages */}
      {showMessage && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-6 py-3 rounded-full shadow-2xl border-2 border-white">
            <p className="text-lg font-bold text-center">{currentMessage}</p>
          </div>
        </div>
      )}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        {!showCorrect && !showReasons && (
          <>
            {/* Main Question */}
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 tracking-tight">
                How do you pronounce
              </h1>
              <div className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-gradient">
                .GIF?
              </div>
              <p className="text-lg md:text-xl text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed">
                The age-old debate that has divided the internet. Choose wisely...
              </p>
            </div>

            {/* Choice Buttons */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center w-full max-w-3xl">
              {/* Soft G Button */}
              <button
                ref={softGRef}
                onClick={handleSoftGClick}
                className={`group relative bg-white hover:bg-green-50 border-2 border-green-200 hover:border-green-400 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-full max-w-xs touch-manipulation ${
                  isRainbow ? 'animate-pulse bg-gradient-to-r from-red-200 via-yellow-200 via-green-200 via-blue-200 to-purple-200' : ''
                } ${isGlowing ? 'shadow-2xl shadow-green-400/50 bg-green-50' : ''} ${isFloating ? 'animate-bounce' : ''}`}
                style={{
                  transform: `scale(${softGScale}) ${softGScale > 1 ? 'translateY(-20px)' : ''}`,
                  zIndex: softGScale > 1 || isSoftGChasing ? 30 : 'auto',
                  transition: isSoftGChasing ? 'none' : 'all 0.5s ease-out',
                  position: isSoftGChasing ? 'fixed' : 'relative',
                  left: isSoftGChasing ? `${softGPosition.x}px` : 'auto',
                  top: isSoftGChasing ? `${softGPosition.y}px` : 'auto',
                  boxShadow: isGlowing ? '0 0 30px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.4)' : undefined
                }}
              >
                {showCrown && (
                  <Crown className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 text-yellow-500 animate-bounce" />
                )}
                <div className="flex items-center justify-center mb-3">
                  <Volume2 className={`w-8 h-8 text-green-600 group-hover:animate-bounce ${isGlowing ? 'animate-pulse' : ''}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">with a Soft G</h3>
                <p className="text-gray-600 text-base">
                  (like "JIF")
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-emerald-200 opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
              </button>

              {/* Hard G Button */}
              {!hardGHidden && (
                <button
                  ref={hardGRef}
                  onClick={handleHardGClick}
                  className={`group relative bg-white hover:bg-red-50 border-2 border-red-200 hover:border-red-400 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-200 transform hover:scale-105 w-full max-w-xs touch-manipulation ${
                    isSpinning ? 'animate-spin' : ''
                  } ${isShaking ? 'animate-pulse' : ''}`}
                  style={{
                    position: hardGPosition.x !== 0 || hardGPosition.y !== 0 ? 'fixed' : 'relative',
                    left: hardGPosition.x !== 0 ? `${hardGPosition.x}px` : 'auto',
                    top: hardGPosition.y !== 0 ? `${hardGPosition.y}px` : 'auto',
                    zIndex: hardGPosition.x !== 0 || hardGPosition.y !== 0 ? 20 : 'auto',
                    transform: `scale(${hardGScale}) ${isShaking ? 'translateX(-2px)' : ''}`,
                    transition: isSpinning ? 'transform 0.1s linear' : 'all 0.2s ease',
                    opacity: isInvisible ? 0.1 : 1,
                    animation: isShaking ? 'shake 0.1s infinite' : undefined
                  }}
                >
                  <div className="flex items-center justify-center mb-3">
                    <Volume2 className="w-8 h-8 text-red-600 group-hover:animate-bounce" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">with a Hard G</h3>
                  <p className="text-gray-600 text-base">(like "GIG")</p>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-200 to-pink-200 opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
                </button>
              )}
            </div>
          </>
        )}

        {/* Correct Answer Display */}
        {showCorrect && (
          <div className="text-center animate-fade-in">
            <div className="mb-8">
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto animate-bounce mb-6" />
              <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 mb-6 animate-pulse">
                That's Correct!
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
                GIF is pronounced with a <span className="font-bold text-green-600">soft G</span>, just like "JIF" peanut butter. 
                The creator himself, Steve Wilhite, confirmed this pronunciation!
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-3xl mx-auto mb-8">
              <div className="flex items-center justify-center mb-4">
                <Lightbulb className="w-8 h-8 text-yellow-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Fun Fact</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {currentFunFact}
              </p>
            </div>

            <button
              onClick={resetApp}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 touch-manipulation"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Reasons List */}
        {showReasons && (
          <div className="text-center animate-fade-in max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
                Actually, here's why it's pronounced 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600"> "JIF"</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Since you managed to click that elusive button, here are the facts:
              </p>
            </div>

            <div className="grid gap-4 md:gap-6 mb-8">
              {reasons.map((reason, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-left animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">{reason}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 shadow-2xl mb-8">
              <h3 className="text-2xl font-bold mb-4">The Verdict</h3>
              <p className="text-xl leading-relaxed">
                The creator said it's "JIF" - case closed! 🎯
              </p>
            </div>

            <button
              onClick={resetApp}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 touch-manipulation"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default App;