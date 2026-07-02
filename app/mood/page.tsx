// app/mood/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Music,
    Heart,
    Coffee,
    Moon,
    Sun,
    Cloud,
    Flame,
    Droplets,
    Wind,
    Sparkles,
    ArrowRight,
    Play,
    Pause,
    SkipForward,
    SkipBack,
    Volume2,
    Repeat,
    Shuffle,
    ChevronRight,
    User,
    Home,
    Compass,
    Library,
    Search,
    Clock,
    TrendingUp,
    Disc,
    Mic,
} from "lucide-react";

interface Mood {
    id: string;
    name: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    color: string;
    bgGradient: string;
    description: string;
    tracks: number;
    emoji: string;
    gradient: string;
}

interface Track {
    id: string;
    title: string;
    artist: string;
    mood: string;
    color: string;
    duration: string;
    isLiked?: boolean;
    plays?: number;
}

// Fisher-Yates shuffle algorithm - pure function
const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export default function MoodPage() {
    const [selectedMood, setSelectedMood] = useState<string>("chill");
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTrack, setCurrentTrack] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const [showSkip, setShowSkip] = useState<boolean>(true);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isShuffled, setIsShuffled] = useState<boolean>(false);
    const [isRepeated, setIsRepeated] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(80);
    const [showVolume, setShowVolume] = useState<boolean>(false);
    const [shuffleSeed, setShuffleSeed] = useState<number>(0);

    const moods: Mood[] = [
        {
            id: "chill",
            name: "Chill",
            icon: Coffee,
            color: "#4ECDC4",
            bgGradient: "from-teal-500/30 to-cyan-500/20",
            description: "Relax and unwind with smooth vibes",
            tracks: 24,
            emoji: "🌊",
            gradient: "from-teal-400 to-cyan-400",
        },
        {
            id: "energetic",
            name: "Energetic",
            icon: Flame,
            color: "#FF6B6B",
            bgGradient: "from-red-500/30 to-orange-500/20",
            description: "Pump up the energy and get moving",
            tracks: 18,
            emoji: "⚡",
            gradient: "from-red-400 to-orange-400",
        },
        {
            id: "focus",
            name: "Focus",
            icon: Sparkles,
            color: "#6C5CE7",
            bgGradient: "from-purple-500/30 to-indigo-500/20",
            description: "Concentrate better with focus sounds",
            tracks: 32,
            emoji: "🧠",
            gradient: "from-purple-400 to-indigo-400",
        },
        {
            id: "rainy",
            name: "Rainy",
            icon: Droplets,
            color: "#45B7D1",
            bgGradient: "from-blue-500/30 to-cyan-500/20",
            description: "Rainy day vibes for cozy moments",
            tracks: 15,
            emoji: "☔",
            gradient: "from-blue-400 to-cyan-400",
        },
        {
            id: "sunny",
            name: "Sunny",
            icon: Sun,
            color: "#F9CA24",
            bgGradient: "from-yellow-500/30 to-orange-500/20",
            description: "Bright and cheerful summer tunes",
            tracks: 21,
            emoji: "☀️",
            gradient: "from-yellow-400 to-orange-400",
        },
        {
            id: "night",
            name: "Night",
            icon: Moon,
            color: "#6C5CE7",
            bgGradient: "from-indigo-500/30 to-purple-500/20",
            description: "Late night sessions under the stars",
            tracks: 27,
            emoji: "🌙",
            gradient: "from-indigo-400 to-purple-400",
        },
    ];

    const [moodTracks, setMoodTracks] = useState<Record<string, Track[]>>({
        chill: [
            { id: "1", title: "Midnight Dreams", artist: "Luna", mood: "chill", color: "#4ECDC4", duration: "3:45", isLiked: true, plays: 12500 },
            { id: "2", title: "Ocean Waves", artist: "Coastal", mood: "chill", color: "#45B7D1", duration: "4:20", isLiked: false, plays: 8400 },
            { id: "3", title: "Coffee Shop", artist: "Acoustic", mood: "chill", color: "#96CEB4", duration: "3:15", isLiked: true, plays: 9200 },
        ],
        energetic: [
            { id: "4", title: "Electric Feel", artist: "MGMT", mood: "energetic", color: "#FF6B6B", duration: "3:45", isLiked: false, plays: 15600 },
            { id: "5", title: "Pump It Up", artist: "Dance", mood: "energetic", color: "#F9CA24", duration: "4:10", isLiked: true, plays: 11200 },
            { id: "6", title: "Energy Flow", artist: "Electro", mood: "energetic", color: "#FF6B6B", duration: "3:30", isLiked: false, plays: 9800 },
        ],
        focus: [
            { id: "7", title: "Deep Focus", artist: "Study", mood: "focus", color: "#6C5CE7", duration: "4:15", isLiked: true, plays: 14300 },
            { id: "8", title: "Mindful", artist: "Meditation", mood: "focus", color: "#6C5CE7", duration: "5:20", isLiked: false, plays: 7600 },
            { id: "9", title: "Concentrate", artist: "Classical", mood: "focus", color: "#45B7D1", duration: "3:55", isLiked: true, plays: 10100 },
        ],
        rainy: [
            { id: "10", title: "Rainy Day", artist: "Clouds", mood: "rainy", color: "#45B7D1", duration: "4:30", isLiked: false, plays: 6700 },
            { id: "11", title: "Thunderstorm", artist: "Nature", mood: "rainy", color: "#4ECDC4", duration: "5:15", isLiked: true, plays: 8900 },
            { id: "12", title: "Puddles", artist: "Rain", mood: "rainy", color: "#96CEB4", duration: "3:45", isLiked: false, plays: 5400 },
        ],
        sunny: [
            { id: "13", title: "Sunshine", artist: "Joy", mood: "sunny", color: "#F9CA24", duration: "3:20", isLiked: true, plays: 13400 },
            { id: "14", title: "Beach Day", artist: "Summer", mood: "sunny", color: "#FF6B6B", duration: "4:10", isLiked: false, plays: 11200 },
            { id: "15", title: "Happy Hour", artist: "Funk", mood: "sunny", color: "#F9CA24", duration: "3:45", isLiked: true, plays: 9800 },
        ],
        night: [
            { id: "16", title: "Stargazing", artist: "Nova", mood: "night", color: "#6C5CE7", duration: "4:45", isLiked: false, plays: 7800 },
            { id: "17", title: "Midnight Jazz", artist: "Blue Note", mood: "night", color: "#6C5CE7", duration: "5:20", isLiked: true, plays: 9200 },
            { id: "18", title: "Lunar", artist: "Moonlight", mood: "night", color: "#4ECDC4", duration: "3:55", isLiked: false, plays: 6600 },
        ],
    });

    const currentMoodTracks = moodTracks[selectedMood as keyof typeof moodTracks] || moodTracks.chill;
    const currentTrackData = currentMoodTracks[currentTrack] || currentMoodTracks[0];

    // Use useMemo for shuffle - this is pure and only recomputes when dependencies change
    const displayTracks = useMemo(() => {
        if (isShuffled) {
            // Use shuffleSeed to trigger reshuffle when needed
            return shuffleArray(currentMoodTracks);
        }
        return currentMoodTracks;
    }, [isShuffled, currentMoodTracks, shuffleSeed]);

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

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            setProgress(0);
        }
    };

    const nextTrack = () => {
        setCurrentTrack((prev) => (prev + 1) % displayTracks.length);
        setProgress(0);
        setIsPlaying(true);
    };

    const prevTrack = () => {
        setCurrentTrack((prev) => (prev - 1 + displayTracks.length) % displayTracks.length);
        setProgress(0);
        setIsPlaying(true);
    };

    const toggleLike = (trackId: string) => {
        setMoodTracks((prev) => {
            const updated = { ...prev };
            const moodKey = selectedMood as keyof typeof updated;
            updated[moodKey] = updated[moodKey].map((track) =>
                track.id === trackId ? { ...track, isLiked: !track.isLiked } : track
            );
            return updated;
        });
    };

    const handleShuffleToggle = () => {
        setIsShuffled(!isShuffled);
        // Increment seed to trigger reshuffle when turning on
        if (!isShuffled) {
            setShuffleSeed((prev) => prev + 1);
        }
        setCurrentTrack(0);
        setProgress(0);
        setIsPlaying(false);
    };

    const formatTime = (progressValue: number) => {
        const totalSeconds = (progressValue / 100) * 3.45;
        const minutes = Math.floor(totalSeconds);
        const seconds = Math.floor((totalSeconds - minutes) * 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const formatPlays = (plays: number) => {
        if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
        if (plays >= 1000) return `${(plays / 1000).toFixed(1)}K`;
        return plays.toString();
    };

    const selectedMoodData = moods.find(m => m.id === selectedMood);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-y-auto">
            {/* Background animated gradient with mood color */}
            <motion.div
                className="fixed inset-0 opacity-20 pointer-events-none"
                animate={{
                    background: [
                        `radial-gradient(circle at 30% 40%, ${selectedMoodData?.color}44 0%, transparent 50%)`,
                        `radial-gradient(circle at 70% 60%, ${selectedMoodData?.color}33 0%, transparent 50%)`,
                        `radial-gradient(circle at 50% 80%, ${selectedMoodData?.color}44 0%, transparent 50%)`,
                        `radial-gradient(circle at 30% 40%, ${selectedMoodData?.color}44 0%, transparent 50%)`,
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
                    <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                            Mood Mode
                        </h1>
                        <p className="text-gray-400 text-sm">Stream music as you like</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {showSkip && (
                            <Link href="/">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                                >
                                    <span className="text-sm">Skip</span>
                                    <ArrowRight size={16} />
                                </motion.button>
                            </Link>
                        )}
                    </div>
                </motion.div>

                {/* Mood Selection with animation */}
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                >
                    <div className="grid grid-cols-3 gap-3">
                        {moods.map((mood, index) => {
                            const Icon = mood.icon;
                            const isSelected = selectedMood === mood.id;
                            return (
                                <motion.button
                                    key={mood.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setSelectedMood(mood.id);
                                        setCurrentTrack(0);
                                        setProgress(0);
                                        setIsPlaying(false);
                                    }}
                                    className={`relative p-4 rounded-2xl transition-all ${isSelected
                                            ? `bg-gradient-to-br ${mood.gradient} border-2 border-white/30`
                                            : "bg-white/5 border border-white/10 hover:bg-white/10"
                                        }`}
                                >
                                    <div
                                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${mood.bgGradient} opacity-50`}
                                    />
                                    <div className="relative z-10 text-center">
                                        <div className="text-2xl mb-1">{mood.emoji}</div>
                                        <div
                                            className="flex justify-center mb-1"
                                            style={{ color: mood.color }}
                                        >
                                            <Icon size={24} />
                                        </div>
                                        <p className="text-sm font-medium">{mood.name}</p>
                                        <p className="text-xs text-gray-400">{mood.tracks} tracks</p>
                                        {isSelected && (
                                            <motion.div
                                                layoutId="selectedMood"
                                                className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white"
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            />
                                        )}
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Mood Description with animated gradient */}
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="mb-6"
                >
                    <div
                        className="p-4 rounded-2xl bg-gradient-to-r relative overflow-hidden"
                        style={{
                            background: `linear-gradient(135deg, ${selectedMoodData?.color}33, ${selectedMoodData?.color}11)`,
                            borderColor: `${selectedMoodData?.color}44`,
                        }}
                    >
                        <motion.div
                            className="absolute inset-0"
                            animate={{
                                background: [
                                    `radial-gradient(circle at 0% 0%, ${selectedMoodData?.color}22 0%, transparent 50%)`,
                                    `radial-gradient(circle at 100% 100%, ${selectedMoodData?.color}22 0%, transparent 50%)`,
                                    `radial-gradient(circle at 0% 0%, ${selectedMoodData?.color}22 0%, transparent 50%)`,
                                ],
                            }}
                            transition={{ duration: 5, repeat: Infinity }}
                        />
                        <div className="relative z-10 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">{selectedMoodData?.name} Mode</h2>
                                <p className="text-sm text-gray-400">{selectedMoodData?.description}</p>
                            </div>
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                                style={{ background: `${selectedMoodData?.color}33` }}
                            >
                                {selectedMoodData?.emoji}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Track List with improved UI */}
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                >
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-semibold text-gray-400">Now Playing</h3>
                        <div className="flex items-center gap-2">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleShuffleToggle}
                                className={`p-1.5 rounded transition ${isShuffled ? "text-purple-400" : "text-gray-400"
                                    }`}
                            >
                                <Shuffle size={14} />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsRepeated(!isRepeated)}
                                className={`p-1.5 rounded transition ${isRepeated ? "text-purple-400" : "text-gray-400"
                                    }`}
                            >
                                <Repeat size={14} />
                            </motion.button>
                            <span className="text-xs text-gray-400">{displayTracks.length} tracks</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {displayTracks.map((track, index) => (
                            <motion.div
                                key={track.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => {
                                    setCurrentTrack(index);
                                    setProgress(0);
                                    setIsPlaying(true);
                                }}
                                className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition ${currentTrack === index && currentTrackData?.id === track.id
                                        ? "bg-white/10 border border-purple-500/50"
                                        : "bg-white/5 hover:bg-white/10 border border-white/10"
                                    }`}
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 relative"
                                    style={{ background: `${track.color}33` }}
                                >
                                    <Music size={18} style={{ color: track.color }} />
                                    {currentTrack === index && currentTrackData?.id === track.id && isPlaying && (
                                        <motion.div
                                            className="absolute inset-0 rounded-xl border-2 border-purple-500/50"
                                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate">{track.title}</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs text-gray-400">{track.artist}</p>
                                        <span className="text-[10px] text-gray-500">•</span>
                                        <p className="text-[10px] text-gray-500">{formatPlays(track.plays || 0)} plays</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleLike(track.id);
                                        }}
                                        className="p-1 rounded-full hover:bg-white/10 transition"
                                    >
                                        <Heart
                                            size={14}
                                            className={track.isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}
                                        />
                                    </motion.button>
                                    <span className="text-xs text-gray-400">{track.duration}</span>
                                    {currentTrack === index && currentTrackData?.id === track.id && isPlaying && (
                                        <motion.div
                                            className="w-1.5 h-1.5 rounded-full bg-green-400"
                                            animate={{ scale: [1, 1.3, 1] }}
                                            transition={{ duration: 0.8, repeat: Infinity }}
                                        />
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Enhanced Mini Player */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10"
                >
                    <div className="flex items-center gap-4">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 relative"
                            style={{ background: `${currentTrackData?.color}33` }}
                        >
                            <Music size={20} style={{ color: currentTrackData?.color }} />
                            {isPlaying && (
                                <motion.div
                                    className="absolute inset-0 rounded-xl"
                                    animate={{
                                        boxShadow: [
                                            `0 0 20px ${currentTrackData?.color}33`,
                                            `0 0 40px ${currentTrackData?.color}22`,
                                            `0 0 20px ${currentTrackData?.color}33`,
                                        ],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium truncate">{currentTrackData?.title || "Select a track"}</h4>
                            <p className="text-xs text-gray-400">{currentTrackData?.artist || "Mood Music"}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsLiked(!isLiked)}
                                className="p-1.5 rounded-full hover:bg-white/10 transition"
                            >
                                <Heart
                                    size={16}
                                    className={isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}
                                />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={prevTrack}
                                className="p-1.5 rounded-full hover:bg-white/10 transition"
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
                                className="p-1.5 rounded-full hover:bg-white/10 transition"
                            >
                                <SkipForward size={16} />
                            </motion.button>
                            <div className="relative">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setShowVolume(!showVolume)}
                                    className="p-1.5 rounded-full hover:bg-white/10 transition"
                                >
                                    <Volume2 size={16} className="text-gray-400" />
                                </motion.button>
                                <AnimatePresence>
                                    {showVolume && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute bottom-full right-0 mb-2 p-3 bg-gray-800/90 backdrop-blur-xl rounded-xl border border-white/10"
                                        >
                                            <div className="h-20 flex items-center">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={volume}
                                                    onChange={(e) => setVolume(parseInt(e.target.value))}
                                                    className="w-1 h-20 bg-white/10 rounded-full appearance-none cursor-pointer"
                                                    style={{
                                                        writingMode: "vertical-lr",
                                                        direction: "rtl",
                                                    }}
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar with waveform effect */}
                    <div className="mt-3">
                        <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
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
                                    {[...Array(4)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-0.5 bg-white rounded-full"
                                            animate={{
                                                height: [4, 8, 4],
                                                y: [-2, -4, -2],
                                            }}
                                            transition={{
                                                duration: 0.4,
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
                            <span>{currentTrackData?.duration || "0:00"}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom Navigation */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 p-2 flex justify-around sticky bottom-0"
                >
                    {[
                        { icon: Home, label: "Home", id: "home", path: "/" },
                        { icon: Search, label: "Search", id: "search", path: "/search" },
                        { icon: Music, label: "Mood", id: "mood", path: "/mood", active: true },
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