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
    Mic,
    ChevronRight,
    Home,
    Library,
    Filter,
    SlidersHorizontal,
    ListMusic,
} from "lucide-react";
import Image from "next/image";

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
    const [activeFilter, setActiveFilter] = useState<string>("relevance");
    const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(getInitialRecentSearches);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const billieResults: SearchResult[] = [
        { id: "1", name: "Billie Eilish", type: "artist", color: "#6C5CE7", followers: "45.2M", isTrending: true },
        { id: "2", name: "Billy Joel", type: "artist", color: "#4ECDC4", followers: "12.8M", isTrending: false },
        { id: "3", name: "Billie Marten", type: "artist", color: "#FF6B6B", followers: "1.2M", isTrending: false },
    ];

    const filterOptions: FilterOption[] = [
        { id: "relevance", label: "Release", icon: SlidersHorizontal, color: "#8B5CF6" },
        { id: "room", label: "Room", icon: Users, color: "#10B981" },
        { id: "playlist", label: "Playlist", icon: ListMusic, color: "#EC4899" },
        { id: "artists", label: "Artists", icon: User, color: "#F59E0B" },
    ];

    const trendingSearches: SearchResult[] = [
        { id: "t1", name: "Midnight Dreams", type: "song", color: "#45B7D1", subtitle: "3.4M plays", isTrending: true },
        { id: "t2", name: "Chill Vibes", type: "playlist", color: "#FF6B6B", subtitle: "120 tracks", isTrending: true },
        { id: "t3", name: "Classic Room", type: "room", color: "#4ECDC4", subtitle: "45 members", isTrending: true },
        { id: "t4", name: "Lofi Beats", type: "playlist", color: "#F9CA24", subtitle: "85 tracks", isTrending: true },
    ];

    const streamSearches: SearchResult[] = [
        { id: "8", name: "Live Session #42", type: "room", color: "#6C5CE7", subtitle: "128 listening" },
        { id: "9", name: "Electronic Mix", type: "playlist", color: "#FD79A8", subtitle: "56 tracks" },
        { id: "10", name: "Acoustic Covers", type: "playlist", color: "#96CEB4", subtitle: "34 tracks" },
        { id: "11", name: "Hip Hop Room", type: "room", color: "#FF6B6B", subtitle: "89 members" },
    ];

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

    return (
        <>
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
                    <h1 className="text-xl font-bold text-white">Search</h1>
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
                <div className={`relative transition-all duration-300 ${isFocused ? "scale-[1.02]" : ""}`}>
                    <Search
                        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isFocused ? "text-[#7F6AFF]" : "text-gray-400"}`}
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
                        className="w-full bg-[#2F3136] rounded-2xl py-3.5 pl-12 pr-12 text-sm border transition-colors placeholder:text-gray-500 focus:outline-none"
                        style={{
                            borderColor: isFocused ? "rgba(127, 106, 255, 0.5)" : "rgba(255,255,255,0.05)",
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
                            <div className="w-1.5 h-1.5 rounded-full bg-[#7F6AFF] animate-pulse" />
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
                            className="absolute top-full left-0 right-0 mt-2 bg-[#2F3136]/95 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl z-50"
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

            {/* Filter Options - Updated to match Figma */}
            <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
            >
                <div className="flex items-center gap-2 mb-3 justify-between">
                    <h2 className="text-sm font-semibold text-white">Filter</h2>
                    <Filter size={16} className="text-gray-400" />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {filterOptions.map((filter) => {
                        const isActive = activeFilter === filter.id;
                        return (
                            <motion.button
                                key={filter.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveFilter(isActive ? "relevance" : filter.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition ${isActive
                                    ? "bg-[#542DD5] text-white"
                                    : "bg-[#2F3136] hover:bg-white/10 text-gray-400"
                                    }`}
                            >
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
                    <h2 className="text-sm font-semibold text-white">Recent search</h2>
                    <div className="flex gap-2">
                        <motion.span
                            whileHover={{ x: 3 }}
                            className="text-xs text-[#7F6AFF] cursor-pointer flex items-center gap-1"
                        >
                            see more <ChevronRight size={12} />
                        </motion.span>
                    </div>
                </div>
                <div className="space-y-2 flex flex-wrap gap-4">
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
                        recentSearches.map((item, index) => {
                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    whileHover={{ scale: 1.01 }}
                                >
                                    <Image
                                        src={`./s${index}.png`}
                                        alt={'girl'}
                                        width={64}
                                        height={64}
                                        className="w-16 h-16 object-cover rounded-lg"
                                        priority={true}
                                    />
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </motion.div>

            {/* Most Search - Figma style */}
            <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
            >
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-sm font-semibold">Most search</h2>
                    <motion.span
                        whileHover={{ x: 3 }}
                        className="text-xs text-[#7F6AFF] cursor-pointer flex items-center gap-1"
                    >
                        see more <ChevronRight size={12} />
                    </motion.span>
                </div>
                <div className="flex gap-4">
                    {trendingSearches.slice(0, 4).map((item, index) => {
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                whileHover={{ scale: 1.01 }}
                            >
                                <Image
                                    src={`./s${index + 3}.png`}
                                    alt={'girl'}
                                    width={64}
                                    height={64}
                                    className="w-16 h-16 object-cover rounded-lg"
                                    priority={true}
                                />
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
                    <h2 className="text-sm font-semibold">Stream search</h2>
                    <motion.span
                        whileHover={{ x: 3 }}
                        className="text-xs text-[#7F6AFF] cursor-pointer flex items-center gap-1"
                    >
                        see more <ChevronRight size={12} />
                    </motion.span>
                </div>
                <div className="flex gap-4">
                    {streamSearches.map((item, index) => {
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.02, x: 5 }}
                            >
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    whileHover={{ scale: 1.01 }}
                                >
                                    <Image
                                        src={`./s${index + 9}.png`}
                                        alt={'girl'}
                                        width={64}
                                        height={64}
                                        className="w-16 h-16 object-cover rounded-lg"
                                        priority={true}
                                    />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </>
    );
}