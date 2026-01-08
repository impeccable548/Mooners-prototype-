// src/api/mockApi.js

// Function to simulate an API call for a new post
export const fetchNewPost = () => {
  const newPost = {
    id: Date.now(),
    platform: Math.random() < 0.5 ? 'twitter' : 'telegram',
    author: Math.random() < 0.5 ? '@AlphaMooner' : 'BlockchainBob',
    content: `A new message just came in! We're seeing huge engagement right now. LFG! 🚀`,
    timestamp: 'Just now',
    sentiment: 'positive',
    likes: Math.floor(Math.random() * 50) + 1,
    retweets: Math.floor(Math.random() * 10) + 1,
  };
  return newPost;
};
