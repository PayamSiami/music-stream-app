// app/search/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Search,
    X,
    ArrowLeft,
    User,
    Music,
    Users,
    Clock,
    TrendingUp,
    Radio,
    Mic,
    Guitar,
    Headphones,
    Disc,
    ChevronRight,
    Home,
    Compass,
    Library,
    Heart,
    Filter,
    SlidersHorizontal,
    ListMusic,
    Play,
    Pause,
    Sparkles,
    Flame,
    Coffee,
    Moon,
    Sun,
    Cloud,
} from "lucide-react";

interface SearchResult {
    id: string;
    name: string;
    type: "artist" | "song" | "playlist" | "room";
    image?: string;
    color?: string;
    subtitle?: string;
    followers?: string;
    isTrending?: boolean;
}

interface RecentSearch {
    id: string;
    query: string;
    type: "artist" | "song" | "playlist" | "room";
    timestamp: Date;
}

interface FilterOption {
    id: string;
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    color: string;
}

// Helper function to get initial recent searches
const getInitialRecentSearches = (): RecentSearch[] => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 3600000);
    const twoHoursAgo = new Date(now.getTime() - 7200000);

    return [
        { id: "1", query: "Billie Eilish", type: "artist", timestamp: now },
        { id: "2", query: "Classical Relax", type: "playlist", timestamp: oneHourAgo },
        { id: "3", query: "Jazz Room", type: "room", timestamp: twoHoursAgo },
    ];
};

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [activeFilter, setActiveFilter] = useState<string>("all");
    const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(getInitialRecentSearches);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [trendingIndex, setTrendingIndex] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const billieResults: SearchResult[] = [
        { id: "1", name: "Billie Eilish", type: "artist", color: "#6C5CE7", followers: "45.2M", isTrending: true },
        { id: "2", name: "Billy Joel", type: "artist", color: "#4ECDC4", followers: "12.8M", isTrending: false },
        { id: "3", name: "Billie Marten", type: "artist", color: "#FF6B6B", followers: "1.2M", isTrending: false },
    ];

    const filterOptions: FilterOption[] = [
        { id: "all", label: "All", icon: Filter, color: "#8B5CF6" },
        { id: "release", label: "Release", icon: Clock, color: "#3B82F6" },
        { id: "room", label: "Room", icon: Users, color: "#10B981" },
        { id: "playlist", label: "Playlist", icon: ListMusic, color: "#EC4899" },
        { id: "artists", label: "Artists", icon: User, color: "#F59E0B" },
    ];

    const trendingSearches: SearchResult[] = [
        { id: "t1", name: "Midnight Dreams", type: "song", color: "#45B7D1", subtitle: "3.4M plays", isTrending: true },
        { id: "t2", name: "Chill Vibes", type: "playlist", color: "#FF6B6B", subtitle: "120 tracks", isTrending: true },
        { id: "t3", name: "Classic Room", type: "room", color: "#4ECDC4", subtitle: "45 members", isTrending: true },
        { id: "t4", name: "Lofi Beats", type: "playlist", color: "#F9CA24", subtitle: "85 tracks", isTrending: true },
        { id: "t5", name: "Electric Feel", type: "song", color: "#6C5CE7", subtitle: "2.1M plays", isTrending: true },
        { id: "t6", name: "Jazz Session", type: "room", color: "#FD79A8", subtitle: "32 members", isTrending: true },
    ];

    const streamSearches: SearchResult[] = [
        { id: "8", name: "Live Session #42", type: "room", color: "#6C5CE7", subtitle: "128 listening" },
        { id: "9", name: "Electronic Mix", type: "playlist", color: "#FD79A8", subtitle: "56 tracks" },
        { id: "10", name: "Acoustic Covers", type: "playlist", color: "#96CEB4", subtitle: "34 tracks" },
        { id: "11", name: "Hip Hop Room", type: "room", color: "#FF6B6B", subtitle: "89 members" },
    ];

    // Auto-rotate trending items
    useEffect(() => {
        const interval = setInterval(() => {
            setTrendingIndex((prev) => (prev + 1) % trendingSearches.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "artist":
                return Mic;
            case "song":
                return Music;
            case "playlist":
                return ListMusic;
            case "room":
                return Users;
            default:
                return Music;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "artist":
                return "from-pink-500 to-rose-500";
            case "song":
                return "from-blue-500 to-cyan-500";
            case "playlist":
                return "from-purple-500 to-indigo-500";
            case "room":
                return "from-green-500 to-emerald-500";
            default:
                return "from-gray-500 to-gray-600";
        }
    };

    const handleSearch = (query: string) => {
        if (query.trim()) {
            const newSearch: RecentSearch = {
                id: Date.now().toString(),
                query: query.trim(),
                type: "artist",
                timestamp: new Date(),
            };
            setRecentSearches([newSearch, ...recentSearches.slice(0, 4)]);
            setSearchQuery("");
            setShowSuggestions(false);
            inputRef.current?.blur();
        }
    };

    const removeRecentSearch = (id: string) => {
        setRecentSearches(recentSearches.filter(item => item.id !== id));
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
    };

    const formatTime = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / 3600000);
        if (hours < 1) return "Just now";
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    };

    const getTrendingEmoji = (index: number) => {
        const emojis = ["🔥", "⭐", "🎵", "💫", "✨", "🌟"];
        return emojis[index % emojis.length];
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
                            Search
                        </h1>
                        <p className="text-gray-400 text-sm">Find music, artists, and rooms</p>
                    </div>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="relative mb-6"
                >
                    <div className={`relative transition-all duration-300 ${isFocused ? "scale-[1.02]" : ""
                        }`}>
                        <Search
                            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isFocused ? "text-purple-400" : "text-gray-400"
                                }`}
                            size={18}
                        />
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={() => {
                                setIsFocused(true);
                                setShowSuggestions(true);
                            }}
                            onBlur={() => {
                                setIsFocused(false);
                                setTimeout(() => setShowSuggestions(false), 200);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch(searchQuery);
                                }
                            }}
                            placeholder="Search music, artists, rooms..."
                            className="w-full bg-white/10 backdrop-blur-lg rounded-2xl py-3.5 pl-12 pr-12 text-sm border transition-colors placeholder:text-gray-500 focus:outline-none"
                            style={{
                                borderColor: isFocused ? "rgba(168, 85, 247, 0.5)" : "rgba(255,255,255,0.1)",
                            }}
                        />
                        {searchQuery && (
                            <motion.button
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition"
                            >
                                <X size={16} className="text-gray-400" />
                            </motion.button>
                        )}
                        {isFocused && !searchQuery && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute right-4 top-1/2 -translate-y-1/2"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                            </motion.div>
                        )}
                    </div>

                    {/* Suggestions Dropdown */}
                    <AnimatePresence>
                        {showSuggestions && searchQuery && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 right-0 mt-2 bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl z-50"
                            >
                                {billieResults.map((result) => {
                                    const Icon = getTypeIcon(result.type);
                                    return (
                                        <motion.button
                                            key={result.id}
                                            whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.05)" }}
                                            className="w-full flex items-center gap-3 p-3 transition"
                                            onClick={() => handleSearch(result.name)}
                                        >
                                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getTypeColor(result.type)} flex items-center justify-center`}>
                                                <Icon size={14} className="text-white" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <p className="text-sm font-medium">{result.name}</p>
                                                <p className="text-xs text-gray-400">{result.type}</p>
                                            </div>
                                            {result.followers && (
                                                <span className="text-xs text-gray-400">{result.followers}</span>
                                            )}
                                            {result.isTrending && (
                                                <span className="text-xs text-orange-400">🔥</span>
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Trending Banner */}
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.12 }}
                    className="mb-6"
                >
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 p-4 border border-white/10">
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
                            animate={{
                                x: ["0%", "100%", "0%"],
                            }}
                            transition={{ duration: 10, repeat: Infinity }}
                        />
                        <div className="relative z-10 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-400 mb-1">🔥 Trending Now</p>
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={trendingIndex}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="font-medium"
                                    >
                                        {trendingSearches[trendingIndex].name}
                                    </motion.p>
                                </AnimatePresence>
                            </div>
                            <div className="flex items-center gap-1">
                                {trendingSearches.slice(0, 3).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-1.5 h-1.5 rounded-full transition-all ${i === trendingIndex % 3 ? "bg-purple-400 w-3" : "bg-gray-500"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Billie Section */}
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="mb-6"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <h2 className="text-lg font-semibold">Billie</h2>
                        <span className="text-xs text-gray-400">3 results</span>
                    </div>
                    <div className="space-y-2">
                        {billieResults.map((result, index) => {
                            const Icon = getTypeIcon(result.type);
                            return (
                                <motion.div
                                    key={result.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 cursor-pointer hover:bg-white/10 transition group"
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 relative"
                                        style={{ background: result.color }}
                                    >
                                        <Icon size={20} className="text-white" />
                                        {result.isTrending && (
                                            <div className="absolute -top-1 -right-1 text-[10px]">🔥</div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">{result.name}</p>
                                        <p className="text-xs text-gray-400 capitalize">{result.type}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {result.followers && (
                                            <span className="text-xs text-gray-400">{result.followers}</span>
                                        )}
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-2 rounded-full hover:bg-white/10 transition opacity-0 group-hover:opacity-100"
                                        >
                                            <ChevronRight size={16} className="text-gray-400" />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Filter Options */}
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <Filter size={16} className="text-gray-400" />
                        <h2 className="text-sm font-semibold">Filter</h2>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {filterOptions.map((filter) => {
                            const Icon = filter.icon;
                            const isActive = activeFilter === filter.id;
                            return (
                                <motion.button
                                    key={filter.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveFilter(isActive ? "all" : filter.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition ${isActive
                                            ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                                            : "bg-white/10 hover:bg-white/20 text-gray-400"
                                        }`}
                                >
                                    <Icon size={16} />
                                    {filter.label}
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Recent Searches */}
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="mb-6"
                >
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-sm font-semibold text-gray-400">Recent search</h2>
                        <div className="flex gap-2">
                            {recentSearches.length > 0 && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={clearRecentSearches}
                                    className="text-xs text-purple-400 hover:text-purple-300 transition"
                                >
                                    Clear all
                                </motion.button>
                            )}
                            <motion.span
                                whileHover={{ x: 3 }}
                                className="text-xs text-purple-400 cursor-pointer flex items-center gap-1"
                            >
                                see more <ChevronRight size={12} />
                            </motion.span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {recentSearches.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-6"
                            >
                                <Search size={32} className="mx-auto text-gray-600 mb-2" />
                                <p className="text-sm text-gray-500">No recent searches</p>
                                <p className="text-xs text-gray-600">Start searching to see results here</p>
                            </motion.div>
                        ) : (
                            recentSearches.map((item) => {
                                const Icon = getTypeIcon(item.type);
                                return (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        whileHover={{ scale: 1.01 }}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition group"
                                    >
                                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getTypeColor(item.type)} flex items-center justify-center`}>
                                            <Icon size={14} className="text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{item.query}</p>
                                            <p className="text-xs text-gray-400">{formatTime(item.timestamp)}</p>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => removeRecentSearch(item.id)}
                                            className="p-1 rounded-full hover:bg-white/10 transition opacity-0 group-hover:opacity-100"
                                        >
                                            <X size={14} className="text-gray-400" />
                                        </motion.button>
                                    </motion.div>
                                );
                            })
                        )}
                    </div>
                </motion.div>

                {/* Most Search - Trending Grid */}
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                >
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-sm font-semibold text-gray-400">🔥 Most search</h2>
                        <motion.span
                            whileHover={{ x: 3 }}
                            className="text-xs text-purple-400 cursor-pointer flex items-center gap-1"
                        >
                            see more <ChevronRight size={12} />
                        </motion.span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {trendingSearches.slice(0, 4).map((item, index) => {
                            const Icon = getTypeIcon(item.type);
                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.03, y: -2 }}
                                    className="p-3 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 cursor-pointer hover:bg-white/10 transition relative overflow-hidden"
                                >
                                    <div className="absolute top-2 right-2 text-lg">{getTrendingEmoji(index)}</div>
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getTypeColor(item.type)} flex items-center justify-center mb-2`}>
                                        <Icon size={14} className="text-white" />
                                    </div>
                                    <p className="text-sm font-medium truncate">{item.name}</p>
                                    <p className="text-xs text-gray-400 truncate">{item.subtitle}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Stream Search */}
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="mb-6"
                >
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-sm font-semibold text-gray-400">📡 Stream search</h2>
                        <motion.span
                            whileHover={{ x: 3 }}
                            className="text-xs text-purple-400 cursor-pointer flex items-center gap-1"
                        >
                            see more <ChevronRight size={12} />
                        </motion.span>
                    </div>
                    <div className="space-y-2">
                        {streamSearches.map((item, index) => {
                            const Icon = getTypeIcon(item.type);
                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 cursor-pointer hover:bg-white/10 transition group"
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 relative"
                                        style={{ background: item.color }}
                                    >
                                        <Icon size={20} className="text-white" />
                                        <motion.div
                                            className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-400"
                                            animate={{ scale: [1, 1.3, 1] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">{item.name}</p>
                                        <p className="text-xs text-gray-400">{item.subtitle}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-green-400 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                            Live
                                        </span>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition"
                                        >
                                            <Play size={14} className="text-white" />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
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
                        { icon: Search, label: "Search", id: "search", path: "/search", active: true },
                        { icon: Library, label: "Library", id: "library", path: "/library" },
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
        </div>
    );
}