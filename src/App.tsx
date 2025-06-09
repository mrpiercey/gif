import React, { useState, useRef } from 'react';
import { Volume2, CheckCircle, Lightbulb } from 'lucide-react';

function App() {
  const [showCorrect, setShowCorrect] = useState(false);
  const [showReasons, setShowReasons] = useState(false);
  const [hardGPosition, setHardGPosition] = useState({ x: 0, y: 0 });
  const [hardGScale, setHardGScale] = useState(1);
  const [hasMovedOnce, setHasMovedOnce] = useState(false);
  const [isHardGAnimating, setIsHardGAnimating] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [currentFunFact, setCurrentFunFact] = useState('');
  const hardGRef = useRef<HTMLButtonElement>(null);

  const passiveAggressiveMessages = [
    "Ohh... so close! 🙄",
    "Nice try, but no cigar 😏",
    "Almost had it there, champ 🤭",
    "Swing and a miss! ⚾",
    "Better luck next time, sport 😌",
    "Oopsie! Missed again 🤷‍♀️",
    "So very close... not really though 😂",
    "Keep dreaming, buttercup 💭",
    "Nope! Try harder next time 💪",
    "Aww, that's adorable 🥺",
    "Getting warmer... just kidding! 🔥",
    "You're really trying, aren't you? 😅",
    "Bless your heart for trying 💝",
    "Maybe next century? ⏰",
    "Points for persistence, I guess 🏆"
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
    "The creator's intent matters - when someone invents something, they get to decide how it's pronounced. It's basic respect for intellectual property.",
    "Even the original GIF specification documentation from 1987 included pronunciation guidance suggesting the soft G.",
    "Linguistic experts note that English borrowed many soft G patterns from French, where 'gi' combinations typically use the soft sound.",
    "The acronym expansion 'Graphics Interchange Format' doesn't dictate pronunciation - we don't say 'jfeg' for JPEG despite 'photographic.'",
    "Steve Wilhite received the Webby Lifetime Achievement Award partly for creating GIF, and he used that platform to educate people on pronunciation.",
    "Early computer magazines and tech publications in the late 80s and early 90s consistently used the soft G pronunciation in their articles.",
    "The soft G pronunciation has been the standard in professional graphics and web development communities since the format's inception.",
    "Wilhite has stated in interviews that he's 'amazed' the debate even exists, since he's been clear about the pronunciation from the beginning.",
    "The GIF format revolutionized early internet culture, and respecting its creator's pronunciation wishes is part of honoring that legacy.",
    "Technical documentation from the original development team at CompuServe consistently referenced the 'jif' pronunciation in internal memos.",
    "Steve Wilhite retired from his career having created one of the most important image formats in internet history - the least we can do is say it right!"
  ];

  const moveHardGButton = () => {
    if (showCorrect || showReasons || isHardGAnimating) return;
    
    setIsHardGAnimating(true);
    
    if (!hasMovedOnce) {
      // First time: shrink and move to opposite side
      setHardGScale(0.5); // Shrink to half size
      setHasMovedOnce(true);
      
      // Move to opposite side of screen
      const newX = Math.random() * (window.innerWidth - 100);
      const newY = Math.random() * (window.innerHeight - 50);
      setHardGPosition({ x: newX, y: newY });
      
      setTimeout(() => setIsHardGAnimating(false), 300);
    } else {
      // After first time: just slide around quickly
      const newX = Math.random() * (window.innerWidth - 100);
      const newY = Math.random() * (window.innerHeight - 50);
      setHardGPosition({ x: newX, y: newY });
      
      setTimeout(() => setIsHardGAnimating(false), 150);
    }
  };

  const handleSoftGClick = () => {
    // Select a random fun fact
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    setCurrentFunFact(randomFact);
    setShowCorrect(true);
  };

  const handleHardGClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setClickCount(prev => prev + 1);
    
    // 7 out of 8 clicks (87.5% chance) make it vanish and reappear
    const shouldVanish = Math.random() < 0.875;
    
    if (shouldVanish) {
      // Show a random passive-aggressive message
      const randomMessage = passiveAggressiveMessages[Math.floor(Math.random() * passiveAggressiveMessages.length)];
      setCurrentMessage(randomMessage);
      setShowMessage(true);
      
      // Hide message after 2 seconds
      setTimeout(() => setShowMessage(false), 2000);
      
      // Make button vanish and reappear elsewhere
      setIsHardGAnimating(true);
      
      // Brief vanish effect
      const button = hardGRef.current;
      if (button) {
        button.style.opacity = '0';
        button.style.transform = `scale(${hardGScale * 0.1})`;
      }
      
      setTimeout(() => {
        // Reappear at new location
        const newX = Math.random() * (window.innerWidth - 100);
        const newY = Math.random() * (window.innerHeight - 50);
        setHardGPosition({ x: newX, y: newY });
        
        if (button) {
          button.style.opacity = '1';
          button.style.transform = `scale(${hardGScale})`;
        }
        
        setTimeout(() => setIsHardGAnimating(false), 100);
      }, 200);
    } else {
      // 1 out of 8 clicks actually work
      setShowReasons(true);
    }
  };

  const resetApp = () => {
    setShowCorrect(false);
    setShowReasons(false);
    setHardGPosition({ x: 0, y: 0 });
    setHardGScale(1);
    setHasMovedOnce(false);
    setIsHardGAnimating(false);
    setClickCount(0);
    setCurrentMessage('');
    setShowMessage(false);
    setCurrentFunFact('');
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
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 right-1/3 w-8 h-8 bg-blue-400 rounded-full animate-pulse"></div>
      </div>

      {/* Passive-Aggressive Message */}
      {showMessage && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-full shadow-2xl border-2 border-white">
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
                onClick={handleSoftGClick}
                className="group relative bg-white hover:bg-green-50 border-2 border-green-200 hover:border-green-400 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-full max-w-xs touch-manipulation"
              >
                <div className="flex items-center justify-center mb-3">
                  <Volume2 className="w-8 h-8 text-green-600 group-hover:animate-bounce" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">with a Soft G</h3>
                <p className="text-gray-600 text-base">(like "Jif")</p>
                <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-emerald-200 opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
              </button>

              {/* Hard G Button */}
              <button
                ref={hardGRef}
                onMouseEnter={moveHardGButton}
                onTouchStart={moveHardGButton}
                onClick={handleHardGClick}
                className="group relative bg-white hover:bg-red-50 border-2 border-red-200 hover:border-red-400 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-200 transform hover:scale-105 w-full max-w-xs touch-manipulation"
                style={{
                  position: hardGPosition.x !== 0 || hardGPosition.y !== 0 ? 'fixed' : 'relative',
                  left: hardGPosition.x !== 0 ? `${hardGPosition.x}px` : 'auto',
                  top: hardGPosition.y !== 0 ? `${hardGPosition.y}px` : 'auto',
                  zIndex: hardGPosition.x !== 0 || hardGPosition.y !== 0 ? 20 : 'auto',
                  transform: `scale(${hardGScale})`,
                  transition: isHardGAnimating ? 'all 0.2s ease-out' : 'all 0.2s ease'
                }}
              >
                <div className="flex items-center justify-center mb-3">
                  <Volume2 className="w-8 h-8 text-red-600 group-hover:animate-bounce" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">with a Hard G</h3>
                <p className="text-gray-600 text-base">(like "Gift")</p>
                <div className="absolute inset-0 bg-gradient-to-r from-red-200 to-pink-200 opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
              </button>
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
                GIF is pronounced with a <span className="font-bold text-green-600">soft G</span>, just like "Jif" peanut butter. 
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600"> "Jif"</span>
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