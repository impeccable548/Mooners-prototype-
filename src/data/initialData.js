// src/data/initialData.js

const initialPosts = [
    {
      id: 1,
      platform: 'telegram',
      author: 'CryptoKing',
      content: '🚀 Just completed the Week 2 challenge! Learned how to set up a MetaMask wallet and claimed my first airdrop. This community is incredible! 🌕',
      timestamp: '2 hours ago',
      sentiment: 'positive',
      likes: 24,
      media: null
    },
    {
      id: 2,
      platform: 'twitter',
      author: '@MoonersX',
      content: '📢 REMINDER: Community Call tonight at 8PM EST! We\'ll be discussing the upcoming NFT project and Q3 roadmap. Don\'t miss it! 🌕✨',
      timestamp: '4 hours ago',
      sentiment: 'neutral',
      likes: 156,
      retweets: 43
    },
    {
      id: 3,
      platform: 'whatsapp',
      author: 'Sarah_Mooner',
      content: 'Found an amazing airdrop opportunity - $500 USDT potential! Sharing the guide in resources channel. LFG Mooners! 💰',
      timestamp: '5 hours ago',
      sentiment: 'positive',
      likes: 31
    },
    {
      id: 4,
      platform: 'telegram',
      author: 'Web3Guru',
      content: 'Trivia Night was epic! Congrats to the winners. Next event: NFT Workshop this Saturday 🎨',
      timestamp: '1 day ago',
      sentiment: 'positive',
      likes: 67
    }
];

const initialDigest = {
    summary: "Today's Mooners community showed strong bullish sentiment with 234 messages across all platforms. Key highlights: Week 2 challenge completions surged 40%, tonight's community call has 89 RSVPs, and a new airdrop opportunity was shared gaining massive engagement. The community vibe is energetic and collaborative! 🌕",
    topics: ['Challenge Completions', 'Community Call', 'Airdrop Alerts', 'NFT Workshop'],
    sentiment: 'Very Positive',
    sentimentScore: 87
};

const initialLeaderboard = [
    { rank: 1, username: 'CryptoKing', score: 1247, badge: '🥇', contributions: 89 },
    { rank: 2, username: 'Sarah_Mooner', score: 1103, badge: '🥈', contributions: 76 },
    { rank: 3, username: 'Web3Guru', score: 987, badge: '🥉', contributions: 71 },
    { rank: 4, username: 'MoonWalker', score: 845, badge: '🌟', contributions: 62 },
    { rank: 5, username: 'DeFi_Dave', score: 723, badge: '🌟', contributions: 54 }
];

const initialUpcomingEvents = [
    { id: 1, title: 'Community Call', date: 'Today, 8:00 PM EST', type: 'call', attendees: 89 },
    { id: 2, title: 'NFT Workshop', date: 'Saturday, 3:00 PM EST', type: 'workshop', attendees: 67 },
    { id: 3, title: 'Trivia Night', date: 'Next Wed, 7:00 PM EST', type: 'game', attendees: 45 }
];

const initialUserProfile = {
    username: 'MoonRider',
    joinedDate: 'Jan 2026',
    reputation: 567,
    achievements: ['Early Adopter', 'Challenge Master', 'Community Helper'],
    savedPosts: 12,
    streak: 14
};

export default {
    posts: initialPosts,
    digest: initialDigest,
    leaderboard: initialLeaderboard,
    upcomingEvents: initialUpcomingEvents,
    userProfile: initialUserProfile
};
