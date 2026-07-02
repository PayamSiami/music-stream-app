// app/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Heart,
  Share2,
  Volume2,
  Repeat,
  Shuffle,
  Search,
  Home,
  Compass,
  Library,
  User,
  ChevronRight,
  Disc,
  TrendingUp,
  Clock,
  ListMusic,
  Headphones,
  Users,
  Mic,
  Radio,
  Sparkles,
  Calendar,
  Award,
  Zap,
  Music2,
  ArrowRight,
  Crown,
  Star,
} from "lucide-react";

// Type definitions
interface Track {
  title: string;
  artist: string;
  duration: string;
  color: string;
  isLiked?: boolean;
  plays?: number;
}

interface Category {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  gradient: string;
}

interface Room {
  name: string;
  color: string;
  tracks: number;
  active?: boolean;
  members?: number;
  listeners?: number;
}

interface NavItem {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  id: string;
  path?: string;
}

// Generate particles with static values
const generateParticles = (count: number) => {
  const particles = [];
  const seed = 12345; // Fixed seed for deterministic generation
  for (let i = 0; i < count; i++) {
    // Use a simple pseudo-random generator with the seed
    const pseudoRandom = (index: number) => {
      const x = Math.sin(index * 127.1 + seed) * 43758.5453;
      return x - Math.floor(x);
    };
    particles.push({
      id: i,
      width: pseudoRandom(i) * 4 + 2,
      height: pseudoRandom(i + 100) * 4 + 2,
      left: pseudoRandom(i + 200) * 100,
      top: pseudoRandom(i + 300) * 100,
      duration: pseudoRandom(i + 400) * 3 + 2,
      delay: pseudoRandom(i + 500) * 2,
    });
  }
  return particles;
};

const heroParticles = generateParticles(20);

export default function MusicApp() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [currentHeroIndex, setCurrentHeroIndex] = useState<number>(0);

  // Compute greeting directly - no state needed
  const greeting = useMemo(() => {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 12) return "Good Morning ☀️";
    if (hours < 17) return "Good Afternoon 🌤️";
    return "Good Evening 🌙";
  }, []);

  const heroItems = [
    {
      title: "Discover Your Sound",
      subtitle: "Explore millions of tracks curated just for you",
      color: "from-purple-500 to-pink-500",
      emoji: "🎵",
    },
    {
      title: "Live Rooms",
      subtitle: "Join live sessions with artists and friends",
      color: "from-blue-500 to-cyan-500",
      emoji: "🔴",
    },
    {
      title: "Mood Mode",
      subtitle: "Music that matches your vibe",
      color: "from-orange-500 to-yellow-500",
      emoji: "✨",
    },
  ];

  // Auto-rotate hero items
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroItems.length]);

  const tracks: Track[] = [
    { title: "Childish", artist: "Gambino", duration: "3:45", color: "#FF6B6B", isLiked: true, plays: 12500 },
    { title: "Violin", artist: "Classical", duration: "4:20", color: "#4ECDC4", isLiked: false, plays: 8400 },
    { title: "Classic", artist: "Beethoven", duration: "5:15", color: "#45B7D1", isLiked: true, plays: 15600 },
    { title: "Midnight", artist: "Dreams", duration: "3:30", color: "#96CEB4", isLiked: false, plays: 9200 },
    { title: "Echoes", artist: "Pulse", duration: "4:45", color: "#FFEAA7", isLiked: true, plays: 11300 },
  ];

  const categories: Category[] = [
    { name: "Trends", icon: TrendingUp, color: "#FF6B6B", gradient: "from-red-500 to-pink-500" },
    { name: "Favorite", icon: Heart, color: "#EC4899", gradient: "from-pink-500 to-rose-500" },
    { name: "Mix", icon: Shuffle, color: "#8B5CF6", gradient: "from-purple-500 to-indigo-500" },
    { name: "Recent", icon: Clock, color: "#3B82F6", gradient: "from-blue-500 to-cyan-500" },
    { name: "Artists", icon: User, color: "#10B981", gradient: "from-green-500 to-emerald-500" },
    { name: "Playlists", icon: ListMusic, color: "#F59E0B", gradient: "from-orange-500 to-yellow-500" },
  ];

  const rooms: Room[] = [
    { name: "Childish", color: "#FF6B6B", tracks: 12, active: true, members: 45, listeners: 12 },
    { name: "Violin", color: "#4ECDC4", tracks: 8, active: false, members: 32, listeners: 0 },
    { name: "Classic", color: "#45B7D1", tracks: 15, active: true, members: 28, listeners: 8 },
    { name: "Jazz", color: "#F9CA24", tracks: 10, active: false, members: 19, listeners: 0 },
    { name: "Rock", color: "#6C5CE7", tracks: 18, active: true, members: 56, listeners: 15 },
    { name: "Electronic", color: "#FD79A8", tracks: 14, active: false, members: 41, listeners: 0 },
  ];

  const featuredPlaylists = [
    { name: "Chill Vibes", color: "#4ECDC4", tracks: 24 },
    { name: "Workout Mix", color: "#FF6B6B", tracks: 18 },
    { name: "Study Session", color: "#6C5CE7", tracks: 32 },
  ];

  const navItems: NavItem[] = [
    { icon: Home, label: "Home", id: "home", path: "/" },
    { icon: Search, label: "Search", id: "search", path: "/search" },
    { icon: Library, label: "Library", id: "library", path: "/library" },
    { icon: User, label: "Profile", id: "profile", path: "/profile" },
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev: number) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const togglePlay = (): void => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setProgress(0);
    }
  };

  const nextTrack = (): void => {
    setCurrentTrack((prev: number) => (prev + 1) % tracks.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const prevTrack = (): void => {
    setCurrentTrack((prev: number) => (prev - 1 + tracks.length) % tracks.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const formatTime = (progressValue: number): string => {
    const totalSeconds = (progressValue / 100) * 3.45;
    const minutes = Math.floor(totalSeconds);
    const seconds = Math.floor((totalSeconds - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatPlays = (plays: number): string => {
    if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
    if (plays >= 1000) return `${(plays / 1000).toFixed(1)}K`;
    return plays.toString();
  };

  const currentHero = heroItems[currentHeroIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-y-auto">
      {/* Background animated gradient */}
      <motion.div
        className="fixed inset-0 opacity-30 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, #667eea 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, #764ba2 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, #f093fb 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, #667eea 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-md mx-auto px-4 py-6 min-h-screen flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center mb-4"
        >
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Music Stream
            </h1>
            <p className="text-gray-400 text-sm">{greeting}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/mood">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-xs font-medium shadow-lg shadow-purple-500/30"
              >
                Mood
              </motion.button>
            </Link>
            <Link href="/profile">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center cursor-pointer shadow-lg shadow-purple-500/30"
              >
                <User size={20} />
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Hero Banner */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="relative mb-6 overflow-hidden rounded-2xl"
        >
          <div
            className={`relative p-6 bg-gradient-to-r ${currentHero.color} bg-opacity-20 backdrop-blur-sm border border-white/10`}
          >
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
              {heroParticles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute rounded-full bg-white/10"
                  style={{
                    width: particle.width,
                    height: particle.height,
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    delay: particle.delay,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{currentHero.emoji}</span>
                    <motion.div
                      key={currentHeroIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm">
                        Featured
                      </span>
                      <span className="text-xs text-white/60">|</span>
                      <span className="text-xs text-white/60">New</span>
                    </motion.div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={currentHeroIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-2xl font-bold mb-1"
                    >
                      {currentHero.title}
                    </motion.h2>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentHeroIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-white/70 mb-4"
                    >
                      {currentHero.subtitle}
                    </motion.p>
                  </AnimatePresence>

                  <div className="flex items-center gap-3">
                    <Link href="/search">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium hover:bg-white/30 transition"
                      >
                        Get Started
                        <ArrowRight size={16} />
                      </motion.button>
                    </Link>
                    <Link href="/mood">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-sm font-medium shadow-lg shadow-purple-500/30"
                      >
                        <Sparkles size={16} />
                        Mood Mode
                      </motion.button>
                    </Link>
                  </div>
                </div>

                {/* Decorative icon */}
                <motion.div
                  className="hidden sm:flex w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  <Music2 size={32} className="text-white/60" />
                </motion.div>
              </div>

              {/* Progress dots */}
              <div className="flex gap-1.5 mt-4">
                {heroItems.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`h-1 rounded-full transition-all ${
                      index === currentHeroIndex
                        ? "w-6 bg-white"
                        : "w-3 bg-white/30 hover:bg-white/50"
                    }`}
                    onClick={() => setCurrentHeroIndex(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative mb-6"
        >
          <Link href="/search">
            <div className="relative">
              <Search
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  isSearchFocused ? "text-purple-400" : "text-gray-400"
                }`}
                size={18}
              />
              <div
                className="w-full bg-white/10 backdrop-blur-lg rounded-full py-3 pl-12 pr-4 text-sm border transition-colors text-gray-400 cursor-pointer"
                style={{
                  borderColor: isSearchFocused ? "rgba(168, 85, 247, 0.5)" : "rgba(255,255,255,0.1)",
                }}
                onMouseEnter={() => setIsSearchFocused(true)}
                onMouseLeave={() => setIsSearchFocused(false)}
              >
                Search music, artists...
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Featured Playlists */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold text-gray-400">Featured Playlists</h2>
            <motion.span
              whileHover={{ x: 3 }}
              className="text-xs text-purple-400 cursor-pointer flex items-center gap-1"
            >
              See all <ChevronRight size={12} />
            </motion.span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {featuredPlaylists.map((playlist, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex-shrink-0 w-32 p-3 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 cursor-pointer"
                style={{ background: `${playlist.color}22` }}
              >
                <div
                  className="w-full aspect-square rounded-xl flex items-center justify-center text-3xl mb-2"
                  style={{ background: `${playlist.color}44` }}
                >
                  <Music2 size={24} />
                </div>
                <h3 className="font-medium text-sm truncate">{playlist.name}</h3>
                <p className="text-xs text-gray-400">{playlist.tracks} tracks</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold text-gray-400">Categories</h2>
            <motion.span
              whileHover={{ x: 3 }}
              className="text-xs text-purple-400 cursor-pointer flex items-center gap-1"
            >
              See all <ChevronRight size={12} />
            </motion.span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-xl text-center bg-gradient-to-br ${category.gradient} bg-opacity-20 border border-white/10`}
                >
                  <div className="flex justify-center mb-1">
                    <Icon size={18} />
                  </div>
                  <p className="text-xs font-medium">{category.name}</p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Rooms */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mb-6"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold text-gray-400">Live Rooms</h2>
            <motion.span
              whileHover={{ x: 3 }}
              className="text-xs text-purple-400 cursor-pointer flex items-center gap-1"
            >
              See all <ChevronRight size={12} />
            </motion.span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {rooms.slice(0, 4).map((room, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden rounded-2xl p-4 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${room.color}33, ${room.color}11)`,
                }}
              >
                <div
                  className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl"
                  style={{ background: room.color }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm">{room.name}</h3>
                    {room.active && (
                      <div className="flex items-center gap-1">
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-green-400"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-[10px] text-green-400">{room.listeners}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">{room.tracks} tracks</p>
                  {room.members && (
                    <p className="text-xs text-gray-400">{room.members} members</p>
                  )}
                  <motion.div
                    className={`mt-2 text-xs flex items-center gap-1 ${
                      room.active ? "text-green-400" : "text-purple-400"
                    }`}
                    whileHover={{ x: 3 }}
                  >
                    {room.active ? "🔴 Live Now" : "Discover"} <ChevronRight size={12} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Now Playing */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6"
        >
          {/* Album Art */}
          <motion.div
            className="relative w-40 h-40 mx-auto rounded-2xl overflow-hidden mb-4 shadow-2xl"
            animate={{
              rotate: isPlaying ? 360 : 0,
            }}
            transition={{
              duration: 20,
              repeat: isPlaying ? Infinity : 0,
              ease: "linear",
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: `linear-gradient(135deg, ${tracks[currentTrack].color}, ${tracks[currentTrack].color}88)`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Disc size={56} className="text-white/30" />
              </div>
              {isPlaying && (
                <motion.div
                  className="absolute inset-0 border-2 border-white/10 rounded-2xl"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>
            {tracks[currentTrack].plays && (
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-[10px]">
                {formatPlays(tracks[currentTrack].plays)} plays
              </div>
            )}
          </motion.div>

          {/* Track Info */}
          <div className="text-center mb-4">
            <AnimatePresence mode="wait">
              <motion.h3
                key={currentTrack}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-lg font-bold"
              >
                {tracks[currentTrack].title}
              </motion.h3>
            </AnimatePresence>
            <p className="text-gray-400 text-sm">{tracks[currentTrack].artist}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="absolute h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                style={{ width: `${progress}%` }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
              {isPlaying && (
                <motion.div
                  className="absolute top-0 h-full flex items-center gap-0.5"
                  style={{ left: `${progress}%` }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-0.5 bg-white rounded-full"
                      animate={{
                        height: [3, 6, 3],
                        y: [-1, -3, -1],
                      }}
                      transition={{
                        duration: 0.3,
                        delay: i * 0.1,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatTime(progress)}</span>
              <span>{tracks[currentTrack].duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-white/10 transition"
              onClick={prevTrack}
            >
              <SkipBack size={22} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-white/10 transition"
              onClick={nextTrack}
            >
              <SkipForward size={22} />
            </motion.button>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-white/10 transition"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart
                size={18}
                fill={isLiked ? "#EC4899" : "none"}
                color={isLiked ? "#EC4899" : "white"}
              />
            </motion.button>
            <div className="flex gap-1">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-white/10 transition"
              >
                <Repeat size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-white/10 transition"
              >
                <Volume2 size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-white/10 transition"
              >
                <Share2 size={18} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Navigation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 p-2 flex justify-around sticky bottom-0"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Link href={item.path || "/"} key={item.id}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-full transition relative ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon size={20} />
                  <span className="text-[10px]">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}