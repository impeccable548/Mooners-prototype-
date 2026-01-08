import React, { useState, useEffect } from 'react';
import { 
  Moon, TrendingUp, Users, Calendar, Award, Bell, 
  Search, Menu, X, Home, BarChart3, Trophy, User, 
  Settings, MessageSquare, Twitter, Send 
} from 'lucide-react';
import initialData from './data/initialData';
import { fetchNewPost } from './api/mockApi';

// Custom hook to simulate real-time data updates (keeping the post data fresh)
const useMockRealtime = (initialPosts, fetchFunction, interval = 15000) => {
    const [posts, setPosts] = useState(initialPosts);

    useEffect(() => {
      const intervalId = setInterval(() => {
        const newPost = fetchFunction(); 
        // Add the new post to the beginning of the list
        setPosts(prevPosts => [newPost, ...prevPosts]);
      }, interval); 
  
      return () => clearInterval(intervalId);
    }, [fetchFunction, interval]);

    return posts;
};

// --- Main Component ---
const MoonersDashboard = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Use the custom hook for "real-time" post updates
  const posts = useMockRealtime(initialData.posts, fetchNewPost, 15000); // 15s interval

  // Destructure static data
  const { digest, leaderboard, upcomingEvents, userProfile } = initialData;

  // --- UI Components and Helpers (Kept inside the main file as requested) ---

  const PlatformIcon = ({ platform }) => {
    switch(platform) {
      case 'telegram': return <Send className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'whatsapp': return <MessageSquare className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const PostCard = ({ post }) => (
    <div className="bg-zinc-900 border border-yellow-500/20 rounded-lg p-4 hover:border-yellow-500/40 transition-all">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${
          post.platform === 'telegram' ? 'bg-blue-500/10 text-blue-400' :
          post.platform === 'twitter' ? 'bg-sky-500/10 text-sky-400' :
          'bg-green-500/10 text-green-400'
        }`}>
          <PlatformIcon platform={post.platform} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-400 font-semibold">{post.author}</span>
            <span className="text-zinc-500 text-sm">• {post.timestamp}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              post.sentiment === 'positive' ? 'bg-green-500/20 text-green-400' :
              post.sentiment === 'negative' ? 'bg-red-500/20 text-red-400' :
              'bg-zinc-700 text-zinc-300'
            }`}>
              {post.sentiment}
            </span>
          </div>
          <p className="text-zinc-200 mb-3">{post.content}</p>
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <button className="hover:text-yellow-400 transition-colors">
              👍 {post.likes}
            </button>
            {post.retweets && (
              <span>🔄 {post.retweets}</span>
            )}
            {isLoggedIn && (
              <button className="hover:text-yellow-400 transition-colors">
                🔖 Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const NavItem = ({ icon: Icon, label, view, active, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        active 
          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
          : 'text-zinc-400 hover:text-yellow-400 hover:bg-zinc-900'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  const Sidebar = () => (
    <div className={`${showMobileMenu ? 'fixed' : 'hidden'} lg:block lg:relative inset-0 z-40 lg:z-0`}>
      <div className="lg:hidden fixed inset-0 bg-black/60" onClick={() => setShowMobileMenu(false)} />
      <div className="fixed lg:relative h-full w-64 bg-black border-r border-yellow-500/20 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-8 lg:justify-start">
          <div className="flex items-center gap-3">
            <Moon className="w-8 h-8 text-yellow-400" />
            <span className="text-xl font-bold text-yellow-400">MOONERS</span>
          </div>
          <button onClick={() => setShowMobileMenu(false)} className="lg:hidden text-zinc-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-2">
          <NavItem icon={Home} label="Home" view="home" active={currentView === 'home'} onClick={() => { setCurrentView('home'); setShowMobileMenu(false); }} />
          <NavItem icon={BarChart3} label="Analytics" view="analytics" active={currentView === 'analytics'} onClick={() => { setCurrentView('analytics'); setShowMobileMenu(false); }} />
          <NavItem icon={Trophy} label="Leaderboard" view="leaderboard" active={currentView === 'leaderboard'} onClick={() => { setCurrentView('leaderboard'); setShowMobileMenu(false); }} />
          <NavItem icon={Calendar} label="Events" view="events" active={currentView === 'events'} onClick={() => { setCurrentView('events'); setShowMobileMenu(false); }} />
          {isLoggedIn && (
            <NavItem icon={User} label="Profile" view="profile" active={currentView === 'profile'} onClick={() => { setCurrentView('profile'); setShowMobileMenu(false); }} />
          )}
        </nav>

        {!isLoggedIn ? (
          <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-sm text-zinc-300 mb-3">Join Mooners to unlock member features!</p>
            <button 
              onClick={() => setIsLoggedIn(true)}
              className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-300 transition-colors"
            >
              Sign Up / Login
            </button>
          </div>
        ) : (
          <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
                M
              </div>
              <div>
                <p className="text-yellow-400 font-semibold">{userProfile.username}</p>
                <p className="text-xs text-zinc-400">Rep: {userProfile.reputation}</p>
              </div>
            </div>
            <div className="text-xs text-zinc-400 mt-3">
              🔥 {userProfile.streak} day streak
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // --- View Components (Kept inside the main file as requested) ---

  const HomeView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Moon className="w-8 h-8 text-yellow-400" />
          <h2 className="text-2xl font-bold text-yellow-400">Mooners Watcher AI</h2>
        </div>
        <p className="text-zinc-200 mb-4">{digest.summary}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {digest.topics.map((topic, i) => (
            <span key={i} className="px-3 py-1 bg-black/40 border border-yellow-500/30 rounded-full text-sm text-yellow-400">
              {topic}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-semibold">{digest.sentiment}</span>
          </div>
          <div className="flex-1 bg-black/40 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-green-400 h-2 rounded-full transition-all"
              style={{ width: `${digest.sentimentScore}%` }}
            />
          </div>
          <span className="text-yellow-400 font-bold">{digest.sentimentScore}%</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-zinc-200">Live Activity Feed</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-sm text-yellow-400 hover:bg-yellow-500/30 transition-colors">
              All Platforms
            </button>
            <button className="px-3 py-1 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-zinc-400 hover:border-zinc-600 transition-colors">
              Filter
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {/* Note: 'posts' is now constantly being updated by the useMockRealtime hook */}
          {posts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      </div>
    </div>
  );

  const LeaderboardView = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Trophy className="w-8 h-8 text-yellow-400" />
        <h2 className="text-2xl font-bold text-zinc-200">Top Contributors</h2>
      </div>
      <div className="bg-zinc-900 border border-yellow-500/20 rounded-lg overflow-hidden">
        {leaderboard.map((member, i) => (
          <div 
            key={i}
            className={`flex items-center gap-4 p-4 border-b border-yellow-500/10 hover:bg-yellow-500/5 transition-colors ${
              i < 3 ? 'bg-yellow-500/10' : ''
            }`}
          >
            <span className="text-3xl">{member.badge}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-yellow-400 font-bold">#{member.rank}</span>
                <span className="text-zinc-200 font-semibold">{member.username}</span>
              </div>
              <span className="text-sm text-zinc-400">{member.contributions} contributions this month</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-400">{member.score}</div>
              <div className="text-xs text-zinc-500">reputation</div>
            </div>
          </div>
        ))}
      </div>
      {isLoggedIn && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <p className="text-zinc-300 mb-2">Your Rank: <span className="text-yellow-400 font-bold">#23</span></p>
          <p className="text-sm text-zinc-400">Keep contributing to climb the leaderboard! 🚀</p>
        </div>
      )}
    </div>
  );

  const EventsView = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Calendar className="w-8 h-8 text-yellow-400" />
        <h2 className="text-2xl font-bold text-zinc-200">Upcoming Events</h2>
      </div>
      <div className="grid gap-4">
        {upcomingEvents.map(event => (
          <div key={event.id} className="bg-zinc-900 border border-yellow-500/20 rounded-lg p-6 hover:border-yellow-500/40 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">{event.title}</h3>
                <p className="text-zinc-300">{event.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                event.type === 'call' ? 'bg-blue-500/20 text-blue-400' :
                event.type === 'workshop' ? 'bg-purple-500/20 text-purple-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {event.type}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-400">
                <Users className="w-4 h-4" />
                <span className="text-sm">{event.attendees} attending</span>
              </div>
              {isLoggedIn && (
                <button className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-colors">
                  Join Event
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProfileView = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <User className="w-8 h-8 text-yellow-400" />
        <h2 className="text-2xl font-bold text-zinc-200">My Profile</h2>
      </div>
      <div className="bg-zinc-900 border border-yellow-500/20 rounded-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-black text-3xl font-bold">
            M
          </div>
          <div>
            <h3 className="text-2xl font-bold text-yellow-400">{userProfile.username}</h3>
            <p className="text-zinc-400">Member since {userProfile.joinedDate}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-black/40 border border-yellow-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{userProfile.reputation}</div>
            <div className="text-sm text-zinc-400">Reputation</div>
          </div>
          <div className="bg-black/40 border border-yellow-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{userProfile.streak}</div>
            <div className="text-sm text-zinc-400">Day Streak</div>
          </div>
          <div className="bg-black/40 border border-yellow-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{userProfile.savedPosts}</div>
            <div className="text-sm text-zinc-400">Saved Posts</div>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-zinc-200 mb-3">Achievements</h4>
          <div className="flex flex-wrap gap-2">
            {userProfile.achievements.map((achievement, i) => (
              <span key={i} className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 font-semibold">
                🏆 {achievement}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const AnalyticsView = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BarChart3 className="w-8 h-8 text-yellow-400" />
        <h2 className="text-2xl font-bold text-zinc-200">Community Analytics</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-yellow-500/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="w-6 h-6 text-yellow-400" />
            <span className="text-zinc-400">Messages Today</span>
          </div>
          <div className="text-3xl font-bold text-yellow-400">234</div>
          <div className="text-sm text-green-400 mt-1">↑ 23% from yesterday</div>
        </div>
        <div className="bg-zinc-900 border border-yellow-500/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-6 h-6 text-yellow-400" />
            <span className="text-zinc-400">Active Members</span>
          </div>
          <div className="text-3xl font-bold text-yellow-400">127</div>
          <div className="text-sm text-green-400 mt-1">↑ 12% from last week</div>
        </div>
        <div className="bg-zinc-900 border border-yellow-500/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-yellow-400" />
            <span className="text-zinc-400">Sentiment Score</span>
          </div>
          <div className="text-3xl font-bold text-yellow-400">87%</div>
          <div className="text-sm text-green-400 mt-1">Very Positive</div>
        </div>
      </div>
      <div className="bg-zinc-900 border border-yellow-500/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-zinc-200 mb-4">Platform Distribution</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-zinc-400">Telegram</span>
              <span className="text-yellow-400">45%</span>
            </div>
            <div className="bg-black/40 rounded-full h-2">
              <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '45%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-zinc-400">Twitter</span>
              <span className="text-yellow-400">35%</span>
            </div>
            <div className="bg-black/40 rounded-full h-2">
              <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '35%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-zinc-400">WhatsApp</span>
              <span className="text-yellow-400">20%</span>
            </div>
            <div className="bg-black/40 rounded-full h-2">
              <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '20%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'leaderboard':
        return <LeaderboardView />;
      case 'events':
        return <EventsView />;
      case 'profile':
        return isLoggedIn ? <ProfileView /> : <div className="text-zinc-500 p-6">Please log in to view your profile.</div>;
      case 'analytics':
        return <AnalyticsView />;
      default:
        return <HomeView />;
    }
  };

  // --- Main Render ---

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-black border-b border-yellow-500/20 px-6 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setShowMobileMenu(true)}
                className="lg:hidden text-yellow-400"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-4 flex-1 lg:flex-none lg:ml-0 ml-4">
                <div className="relative flex-1 lg:w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input 
                    type="text"
                    placeholder="Search posts, members, topics..."
                    className="w-full bg-zinc-900 border border-yellow-500/20 rounded-lg pl-10 pr-4 py-2 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-yellow-500/40"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                {isLoggedIn && (
                  <button className="relative p-2 text-zinc-400 hover:text-yellow-400 transition-colors">
                   <Bell className="w-6 h-6" />
<span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full" />
</button>
)}
</div>
</div>
</header>

<main className="flex-1 overflow-y-auto p-6">
  {renderView()}
</main>

</div>
</div>
</div>
);
};

export default MoonersDashboard;