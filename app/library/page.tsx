// app/library/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Music,
    Users,
    Heart,
    Play,
    Pause,
    SkipForward,
    SkipBack,
    MoreHorizontal,
    ChevronRight,
    Clock,
    TrendingUp,
    Disc,
    Headphones,
    Mic,
    Guitar,
    ListMusic,
    Home,
    Compass,
    Search,
    User,
    Plus,
    Filter,
    Grid3x3,
    List,
    Calendar,
    ArrowLeft,
    Volume2,
    Repeat,
    Shuffle,
    Share2,
    Library as LibraryIcon,
    Check,
    X,
} from "lucide-react";

interface Playlist {
    id: string;
    name: string;
    cover: string;
    tracks: number;
    duration: string;
    color: string;
    type: "playlist" | "album" | "mix";
    creator?: string;
    isLiked?: boolean;
}

interface FriendStream {
    id: string;
    name: string;
    avatar: string;
    track: string;
    artist: string;
    color: string;
    listeners: number;
    isPlaying?: boolean;
}

interface Category {
    id: string;
    name: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    count: number;
    gradient: string;
}

export default function LibraryPage() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [activeFilter, setActiveFilter] = useState<string>("all");
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTrack, setCurrentTrack] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const friendStreams: FriendStream[] = [
        { id: "1", name: "Sarah", avatar: "S", track: "Midnight Dreams", artist: "Luna", color: "#FF6B6B", listeners: 45, isPlaying: true },
        { id: "2", name: "Mike", avatar: "M", track: "Electric Feel", artist: "MGMT", color: "#4ECDC4", listeners: 32, isPlaying: false },
        { id: "3", name: "Emma", avatar: "E", track: "Classical Medley", artist: "Various", color: "#45B7D1", listeners: 28, isPlaying: true },
        { id: "4", name: "Alex", avatar: "A", track: "Jazz Session", artist: "Blue Note", color: "#F9CA24", listeners: 19, isPlaying: false },
    ];

    const categories: Category[] = [
        { id: "trends", name: "Trends", icon: TrendingUp, count: 24, gradient: "from-pink-500 to-rose-500" },
        { id: "favorite", name: "Favorite", icon: Heart, count: 18, gradient: "from-red-500 to-pink-500" },
        { id: "mix", name: "Mix", icon: Shuffle, count: 32, gradient: "from-purple-500 to-indigo-500" },
        { id: "recent", name: "Recent", icon: Clock, count: 15, gradient: "from-blue-500 to-cyan-500" },
        { id: "artists", name: "Artists", icon: User, count: 42, gradient: "from-green-500 to-emerald-500" },
        { id: "playlists", name: "Playlists", icon: ListMusic, count: 28, gradient: "from-orange-500 to-yellow-500" },
    ];

    const [playlists, setPlaylists] = useState<Playlist[]>([
        { id: "1", name: "Chill Vibes", cover: "🎵", tracks: 24, duration: "1:45:00", color: "#FF6B6B", type: "playlist", creator: "Stella Hess", isLiked: true },
        { id: "2", name: "Workout Mix", cover: "💪", tracks: 18, duration: "1:20:00", color: "#4ECDC4", type: "mix", creator: "Fit Music", isLiked: false },
        { id: "3", name: "Study Session", cover: "📚", tracks: 32, duration: "2:10:00", color: "#45B7D1", type: "playlist", creator: "Focus Flow", isLiked: true },
        { id: "4", name: "Party Hits", cover: "🎉", tracks: 27, duration: "1:55:00", color: "#F9CA24", type: "mix", creator: "Party Central", isLiked: false },
        { id: "5", name: "Jazz Classics", cover: "🎷", tracks: 15, duration: "1:10:00", color: "#6C5CE7", type: "album", creator: "Jazz Masters", isLiked: false },
        { id: "6", name: "Acoustic Dreams", cover: "🎸", tracks: 21, duration: "1:30:00", color: "#FD79A8", type: "playlist", creator: "Acoustic Vibes", isLiked: true },
    ]);

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

    const getTypeLabel = (type: string) => {
        switch (type) {
            case "playlist": return "Playlist";
            case "album": return "Album";
            case "mix": return "Mix";
            default: return "Playlist";
        }
    };

    const getFilteredPlaylists = () => {
        let filtered = playlists;
        if (activeFilter !== "all") {
            filtered = filtered.filter(p => p.type === activeFilter);
        }
        if (searchQuery) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.creator?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return filtered;
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            setProgress(0);
        }
    };

    const toggleLike = (id: string) => {
        setPlaylists(playlists.map(p =>
            p.id === id ? { ...p, isLiked: !p.isLiked } : p
        ));
    };

    const formatTime = (progressValue: number) => {
        const totalSeconds = (progressValue / 100) * 3.45;
        const minutes = Math.floor(totalSeconds);
        const seconds = Math.floor((totalSeconds - minutes) * 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const stats = [
        { label: "Playlists", value: playlists.length, icon: ListMusic },
        { label: "Following", value: "42", icon: Users },
        { label: "Hours Listened", value: "128", icon: Clock },
    ];

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
                    className="flex items-center gap-3 mb-6"
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
                    <div className="flex-1">
                        <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                            Your Library
                        </h1>
                        <p className="text-gray-400 text-sm">{playlists.length} playlists • {categories.reduce((acc, cat) => acc + cat.count, 0)} items</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowCreateModal(true)}
                        className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:shadow-lg hover:shadow-purple-500/30 transition"
                    >
                        <Plus size={20} />
                    </motion.button>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.05 }}
                    className="grid grid-cols-3 gap-3 mb-6"
                >
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                className="bg-white/5 backdrop-blur-lg rounded-2xl p-3 text-center border border-white/10"
                            >
                                <Icon size={18} className="mx-auto mb-1 text-purple-400" />
                                <p className="text-lg font-bold">{stat.value}</p>
                                <p className="text-[10px] text-gray-400">{stat.label}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Search */}
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.08 }}
                    className="relative mb-6"
                >
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search your library..."
                        className="w-full bg-white/10 backdrop-blur-lg rounded-xl py-2.5 pl-10 pr-10 text-sm border border-white/10 focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-500"
                    />
                    {searchQuery && (
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition"
                        >
                            <X size={14} className="text-gray-400" />
                        </motion.button>
                    )}
                </motion.div>

                {/* Friend Streams */}
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                >
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-sm font-semibold text-gray-400">Your friends stream to</h2>
                        <motion.span
                            whileHover={{ x: 3 }}
                            className="text-xs text-purple-400 cursor-pointer flex items-center gap-1"
                        >
                            See more <ChevronRight size={14} />
                        </motion.span>
                    </div>
                    <div className="space-y-2">
                        {friendStreams.map((stream, index) => (
                            <motion.div
                                key={stream.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.02, x: 5 }}
                                className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 cursor-pointer hover:bg-white/10 transition"
                            >
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold relative"
                                    style={{ background: `${stream.color}33`, color: stream.color }}
                                >
                                    {stream.avatar}
                                    {stream.isPlaying && (
                                        <motion.div
                                            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-gray-900"
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium">{stream.name}</p>
                                    <p className="text-xs text-gray-400 truncate">
                                        {stream.track} • {stream.artist}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-xs text-gray-400">{stream.listeners}</span>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="p-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                                    >
                                        <Play size={12} className="text-white" />
                                    </motion.button>
                                </div>
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
                    <h2 className="text-sm font-semibold text-gray-400 mb-3">Category</h2>
                    <div className="grid grid-cols-3 gap-2">
                        {categories.map((category, index) => {
                            const Icon = category.icon;
                            const isActive = activeFilter === category.id;
                            return (
                                <motion.button
                                    key={category.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.03 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveFilter(isActive ? "all" : category.id)}
                                    className={`relative p-3 rounded-xl text-center transition overflow-hidden ${isActive
                                            ? `bg-gradient-to-r ${category.gradient}`
                                            : "bg-white/5 hover:bg-white/10 border border-white/10"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeCategory"
                                            className="absolute inset-0 bg-white/10"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <div className="relative z-10">
                                        <Icon size={18} className="mx-auto mb-1" />
                                        <p className="text-xs font-medium">{category.name}</p>
                                        <p className="text-[10px] text-gray-400">{category.count}</p>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Room Section */}
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="mb-6"
                >
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-sm font-semibold text-gray-400">Room</h2>
                        <motion.span
                            whileHover={{ x: 3 }}
                            className="text-xs text-purple-400 cursor-pointer flex items-center gap-1"
                        >
                            See more <ChevronRight size={14} />
                        </motion.span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { name: "Childish", color: "#FF6B6B", tracks: 12, active: true },
                            { name: "Violin", color: "#4ECDC4", tracks: 8, active: false },
                            { name: "Classic", color: "#45B7D1", tracks: 15, active: true },
                        ].map((room, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative overflow-hidden rounded-2xl p-4 cursor-pointer"
                                style={{
                                    background: `linear-gradient(135deg, ${room.color}33, ${room.color}11)`,
                                }}
                            >
                                <div
                                    className="absolute top-0 right-0 w-16 h-16 rounded-full blur-2xl"
                                    style={{ background: room.color }}
                                />
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-sm">{room.name}</h3>
                                        {room.active && (
                                            <motion.div
                                                className="w-1.5 h-1.5 rounded-full bg-green-400"
                                                animate={{ scale: [1, 1.3, 1] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            />
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-400">{room.tracks} tracks</p>
                                    <motion.div
                                        className="mt-2 text-xs text-purple-400 flex items-center gap-1"
                                        whileHover={{ x: 3 }}
                                    >
                                        {room.active ? "Live Now" : "Discover"} <ChevronRight size={12} />
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* My Playlists */}
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                >
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-sm font-semibold text-gray-400">My Playlists</h2>
                        <div className="flex gap-2">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setViewMode("grid")}
                                className={`p-1.5 rounded transition ${viewMode === "grid" ? "bg-white/20" : "text-gray-400"}`}
                            >
                                <Grid3x3 size={16} />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setViewMode("list")}
                                className={`p-1.5 rounded transition ${viewMode === "list" ? "bg-white/20" : "text-gray-400"}`}
                            >
                                <List size={16} />
                            </motion.button>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {getFilteredPlaylists().length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-8"
                            >
                                <Music size={48} className="mx-auto text-gray-600 mb-3" />
                                <p className="text-gray-400">No playlists found</p>
                                <p className="text-sm text-gray-500">Try adjusting your filters</p>
                            </motion.div>
                        ) : viewMode === "grid" ? (
                            <motion.div
                                key="grid"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="grid grid-cols-2 gap-3"
                            >
                                {getFilteredPlaylists().map((playlist, index) => (
                                    <motion.div
                                        key={playlist.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ scale: 1.03, y: -3 }}
                                        className="p-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 cursor-pointer hover:bg-white/10 transition relative group"
                                    >
                                        <div
                                            className="w-full aspect-square rounded-xl flex items-center justify-center text-4xl mb-3 relative"
                                            style={{ background: `${playlist.color}33` }}
                                        >
                                            {playlist.cover}
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => toggleLike(playlist.id)}
                                                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition"
                                            >
                                                <Heart
                                                    size={14}
                                                    className={playlist.isLiked ? "fill-red-500 text-red-500" : "text-white"}
                                                />
                                            </motion.button>
                                        </div>
                                        <h3 className="font-semibold text-sm truncate">{playlist.name}</h3>
                                        <p className="text-xs text-gray-400">{playlist.tracks} tracks</p>
                                        <div className="flex items-center justify-between mt-1">
                                            <p className="text-[10px] text-purple-400">{getTypeLabel(playlist.type)}</p>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="p-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition"
                                            >
                                                <Play size={12} className="text-white" />
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="list"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-2"
                            >
                                {getFilteredPlaylists().map((playlist, index) => (
                                    <motion.div
                                        key={playlist.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 cursor-pointer hover:bg-white/10 transition group"
                                    >
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 relative"
                                            style={{ background: `${playlist.color}33` }}
                                        >
                                            {playlist.cover}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-sm truncate">{playlist.name}</h4>
                                            <p className="text-xs text-gray-400">
                                                {playlist.tracks} tracks • {playlist.duration}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => toggleLike(playlist.id)}
                                                className="p-1.5 rounded-full hover:bg-white/10 transition"
                                            >
                                                <Heart
                                                    size={16}
                                                    className={playlist.isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}
                                                />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition"
                                            >
                                                <Play size={16} className="text-white" />
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Now Playing Mini Player */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-4 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10"
                >
                    <div className="flex items-center gap-4">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl relative"
                            style={{ background: `${playlists[currentTrack].color}33` }}
                        >
                            {playlists[currentTrack].cover}
                            {isPlaying && (
                                <motion.div
                                    className="absolute inset-0 rounded-xl border-2 border-purple-500/50"
                                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium truncate">{playlists[currentTrack].name}</h4>
                            <p className="text-xs text-gray-400">{playlists[currentTrack].creator}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1.5 rounded-full hover:bg-white/10 transition"
                            >
                                <Heart
                                    size={16}
                                    className={playlists[currentTrack].isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}
                                    onClick={() => toggleLike(playlists[currentTrack].id)}
                                />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={togglePlay}
                                className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30"
                            >
                                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                            </motion.button>
                        </div>
                    </div>
                    {isPlaying && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-3"
                        >
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
                        </motion.div>
                    )}
                </motion.div>

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
                        { icon: LibraryIcon, label: "Library", id: "library", path: "/library", active: true },
                        { icon: User, label: "Profile", id: "profile", path: "/profile" },
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

            {/* Create Playlist Modal */}
            <AnimatePresence>
                {showCreateModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowCreateModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-gray-800 rounded-3xl p-6 max-w-sm w-full border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold">Create Playlist</h3>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setShowCreateModal(false)}
                                    className="p-1 rounded-full hover:bg-white/10 transition"
                                >
                                    <X size={20} />
                                </motion.button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-400 block mb-1">Playlist Name</label>
                                    <input
                                        type="text"
                                        placeholder="My New Playlist"
                                        className="w-full bg-white/10 rounded-xl px-4 py-2.5 text-sm border border-white/10 focus:outline-none focus:border-purple-500 transition"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 block mb-1">Description</label>
                                    <textarea
                                        placeholder="Add a description..."
                                        rows={2}
                                        className="w-full bg-white/10 rounded-xl px-4 py-2.5 text-sm border border-white/10 focus:outline-none focus:border-purple-500 transition resize-none"
                                    />
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 font-medium"
                                    onClick={() => setShowCreateModal(false)}
                                >
                                    Create Playlist
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}