// app/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Music,
  Users,
  Heart,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  MoreHorizontal,
  Share2,
  ChevronRight,
  Grid3x3,
  List,
  Clock,
  TrendingUp,
  Disc,
  Headphones,
  Mic,
  Guitar,
  Piano,
  Volume2,
  Repeat,
  Shuffle,
  ArrowLeft,
  Settings,
  Copy,
  Check,
  Compass,
  Library,
  Search,
  Home,
  Calendar,
  Award,
  Zap,
  MessageCircle,
  Globe,
  Bell,
  Lock,
  X,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("playlist");
  const [isFollowing, setIsFollowing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const stats = [
    { label: "Playlists", value: "86", icon: Music, change: "+12" },
    { label: "Rooms", value: "17", icon: Users, change: "+3" },
    { label: "Followers", value: "20K", icon: Heart, change: "+1.2K" },
  ];

  const achievements = [
    { label: "Top Listener", icon: Award, color: "#F9CA24" },
    { label: "Music Lover", icon: Heart, color: "#FF6B6B" },
    { label: "Curator", icon: List, color: "#6C5CE7" },
  ];

  const recentActivity = [
    { action: "Added to playlist", track: "Midnight Dreams", time: "2 min ago" },
    { action: "Liked", track: "Ocean Waves", time: "15 min ago" },
    { action: "Followed", track: "Jazz Classics", time: "1 hour ago" },
  ];

  const playlists = [
    { name: "Chill Vibes", tracks: 24, duration: "1:45:00", color: "#FF6B6B", isLiked: true },
    { name: "Workout Mix", tracks: 18, duration: "1:20:00", color: "#4ECDC4", isLiked: false },
    { name: "Study Session", tracks: 32, duration: "2:10:00", color: "#45B7D1", isLiked: true },
    { name: "Party Hits", tracks: 27, duration: "1:55:00", color: "#F9CA24", isLiked: false },
    { name: "Jazz Classics", tracks: 15, duration: "1:10:00", color: "#6C5CE7", isLiked: true },
    { name: "Acoustic Dreams", tracks: 21, duration: "1:30:00", color: "#FD79A8", isLiked: false },
  ];

  const rooms = [
    { name: "Childish", members: 45, active: true, color: "#FF6B6B", listeners: 12 },
    { name: "Violin", members: 32, active: false, color: "#4ECDC4", listeners: 8 },
    { name: "Classic", members: 28, active: true, color: "#45B7D1", listeners: 15 },
    { name: "Jazz", members: 19, active: false, color: "#F9CA24", listeners: 6 },
    { name: "Rock", members: 56, active: true, color: "#6C5CE7", listeners: 23 },
    { name: "Electronic", members: 41, active: false, color: "#FD79A8", listeners: 14 },
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
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

  const handleCopy = () => {
    navigator.clipboard.writeText("@stella.hess");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setProgress(0);
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlists.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlists.length) % playlists.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const formatTime = (progressValue: number) => {
    const totalSeconds = (progressValue / 100) * 3.45;
    const minutes = Math.floor(totalSeconds);
    const seconds = Math.floor((totalSeconds - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-y-auto">
      {/* Background animated gradient */}
      <motion.div
        className="fixed inset-0 opacity-20 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 30% 40%, #667eea 0%, transparent 50%)",
            "radial-gradient(circle at 70% 60%, #764ba2 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, #f093fb 0%, transparent 50%)",
            "radial-gradient(circle at 30% 40%, #667eea 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-md mx-auto px-4 py-6 min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center mb-6"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-white/10 transition"
            >
              <ArrowLeft size={24} />
            </motion.button>
          </Link>
          <h2 className="text-lg font-semibold">Profile</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <Settings size={22} />
          </motion.button>
        </motion.div>

        {/* Settings Dropdown */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 rounded-2xl bg-gray-800/90 backdrop-blur-xl border border-white/10"
            >
              {[
                { icon: User, label: "Edit Profile" },
                { icon: Music, label: "Music Preferences" },
                { icon: Bell, label: "Notifications" },
                { icon: Lock, label: "Privacy" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={index}
                    whileHover={{ x: 5 }}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition"
                  >
                    <Icon size={16} className="text-gray-400" />
                    <span className="text-sm">{item.label}</span>
                    <ChevronRight size={14} className="ml-auto text-gray-400" />
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Info */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-6"
        >
          {/* Avatar with ring */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-24 h-24 mx-auto mb-4"
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-0.5"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <User size={40} className="text-white/60" />
              </div>
            </motion.div>
            <motion.div
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-gray-900 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </motion.div>
          </motion.div>

          {/* Name with badge */}
          <div className="flex items-center justify-center gap-2 mb-1">
            <h1 className="text-2xl font-bold">Stella Hess</h1>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-[10px] font-medium"
            >
              PRO
            </motion.div>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-3">
            <span>@stella.hess</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              className="p-1 rounded hover:bg-white/10 transition"
            >
              {isCopied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            </motion.button>
          </div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-sm mb-4"
          >
            Simplicity is the key to happiness 🎵
          </motion.p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {[
              { icon: Share2, color: "#E4405F", label: "Instagram" },
              { icon: X, color: "#1DA1F2", label: "Twitter" },
              { icon: Globe, color: "#4ECDC4", label: "Website" },
              { icon: MessageCircle, color: "#25D366", label: "WhatsApp" },
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition"
                  style={{ color: social.color }}
                >
                  <Icon size={14} />
                </motion.button>
              );
            })}
          </div>

          {/* Follow Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-8 py-2.5 rounded-full text-sm font-medium transition ${isFollowing
              ? "bg-white/10 hover:bg-white/20 border border-white/20"
              : "bg-gradient-to-r from-pink-500 to-purple-500 hover:shadow-lg hover:shadow-purple-500/30"
              }`}
          >
            {isFollowing ? "Following ✓" : "Follow +"}
          </motion.button>

          {/* Followed by */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs text-gray-400 mt-2"
          >
            Followed by <span className="text-purple-400">Sarah</span>,{" "}
            <span className="text-purple-400">Mike</span> and{" "}
            <span className="text-purple-400">5 friends</span>
          </motion.p>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex justify-center gap-4 mb-6"
        >
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="flex flex-col items-center"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: `${achievement.color}33` }}
                >
                  <Icon size={18} style={{ color: achievement.color }} />
                </div>
                <span className="text-[10px] text-gray-400 mt-1">{achievement.label}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 text-center border border-white/10 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Icon size={16} className="text-purple-400" />
                    <span className="text-xl font-bold">{stat.value}</span>
                  </div>
                  <span className="text-xs text-gray-400 uppercase">{stat.label}</span>
                  <div className="text-[10px] text-green-400 mt-1">{stat.change}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mb-6"
        >
          <h3 className="text-xs font-semibold text-gray-400 mb-2">Recent Activity</h3>
          <div className="space-y-1.5">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + index * 0.05 }}
                className="flex items-center gap-2 text-sm"
              >
                <span className="text-gray-400">{activity.action}</span>
                <span className="text-white">{activity.track}</span>
                <span className="text-xs text-gray-500 ml-auto">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 mb-6 bg-white/5 backdrop-blur-lg rounded-full p-1 border border-white/10"
        >
          {[
            { id: "playlist", label: "Playlist", icon: Music },
            { id: "room", label: "Room", icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-sm font-medium transition relative ${isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon size={18} />
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "playlist" ? (
            <motion.div
              key="playlist"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold text-gray-400">Your Playlists</h3>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded transition ${viewMode === "grid" ? "bg-white/20" : "text-gray-400"
                      }`}
                  >
                    <Grid3x3 size={14} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded transition ${viewMode === "list" ? "bg-white/20" : "text-gray-400"
                      }`}
                  >
                    <List size={14} />
                  </motion.button>
                </div>
              </div>

              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 gap-3">
                  {playlists.map((playlist, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.03, y: -3 }}
                      className="p-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 cursor-pointer hover:bg-white/10 transition"
                    >
                      <div
                        className="w-full aspect-square rounded-xl flex items-center justify-center text-3xl mb-3"
                        style={{ background: `${playlist.color}33` }}
                      >
                        <Music size={28} style={{ color: playlist.color }} />
                      </div>
                      <h4 className="font-medium text-sm truncate">{playlist.name}</h4>
                      <p className="text-xs text-gray-400">{playlist.tracks} tracks</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                playlists.map((playlist, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 cursor-pointer hover:bg-white/10 transition"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 relative"
                      style={{ background: `${playlist.color}33` }}
                    >
                      <Music size={24} style={{ color: playlist.color }} />
                      {playlist.isLiked && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                          <Heart size={8} className="fill-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{playlist.name}</h4>
                      <p className="text-xs text-gray-400">
                        {playlist.tracks} tracks • {playlist.duration}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                    >
                      <Play size={16} className="text-white" />
                    </motion.button>
                  </motion.div>
                ))
              )}

              {/* Mini Player */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center"
                    style={{ background: `${playlists[currentTrack].color}33` }}
                  >
                    <Music size={20} style={{ color: playlists[currentTrack].color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{playlists[currentTrack].name}</h4>
                    <p className="text-xs text-gray-400">Now Playing</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={prevTrack}
                      className="p-1 rounded-full hover:bg-white/10 transition"
                    >
                      <SkipBack size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={togglePlay}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30"
                    >
                      {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextTrack}
                      className="p-1 rounded-full hover:bg-white/10 transition"
                    >
                      <SkipForward size={16} />
                    </motion.button>
                  </div>
                </div>
                {isPlaying && (
                  <div className="mt-3">
                    <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                        style={{ width: `${progress}%` }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>{formatTime(progress)}</span>
                      <span>{playlists[currentTrack].duration}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="room"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold text-gray-400">Active Rooms</h3>
                <motion.span
                  whileHover={{ x: 3 }}
                  className="text-xs text-purple-400 cursor-pointer flex items-center gap-1"
                >
                  See all <ChevronRight size={14} />
                </motion.span>
              </div>

              {rooms.map((room, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 cursor-pointer hover:bg-white/10 transition"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 relative"
                    style={{ background: `${room.color}33` }}
                  >
                    <Headphones size={24} style={{ color: room.color }} />
                    {room.active && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{room.name}</h4>
                    <p className="text-xs text-gray-400">{room.members} members</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {room.active && (
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs text-green-400">{room.listeners}</span>
                      </div>
                    )}
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`text-xs px-2 py-1 rounded-full ${room.active
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-500/20 text-gray-400"
                        }`}
                    >
                      {room.active ? "Live" : "Offline"}
                    </motion.span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full hover:bg-white/10 transition"
                    >
                      <ChevronRight size={18} className="text-gray-400" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Navigation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 p-2 flex justify-around sticky bottom-0"
        >
          {[
            { icon: Home, label: "Home", id: "home", path: "/" },
            { icon: Search, label: "Search", id: "search", path: "/search" },
            { icon: Library, label: "Library", id: "library", path: "/library" },
            { icon: User, label: "Profile", id: "profile", path: "/profile", active: true },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = item.active || false;
            return (
              <Link href={item.path} key={item.id}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-full transition relative ${isActive ? "text-white" : "text-gray-400"
                    }`}
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