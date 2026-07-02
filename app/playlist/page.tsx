// app/music/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play,
    Pause,
    Search,
    Filter,
    X,
    Heart,
    Clock,
    Music,
    ChevronDown,
    ArrowLeft,
    MoreHorizontal,
    SkipBack,
    SkipForward,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MusicPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(2);
    const [progress, setProgress] = useState(0);
    const [sortBy, setSortBy] = useState("title");
    const [showSortOptions, setShowSortOptions] = useState(false);
    const [filterGenre, setFilterGenre] = useState("All");
    const [isLiked, setIsLiked] = useState<number[]>([]);

    const tracks = [
        { id: 0, title: "my future", artist: "Billie Eilish", album: "Happier Than Ever", duration: "3:30", year: 2020, genre: "Pop", plays: "1.2M" },
        { id: 1, title: "Your Power", artist: "Billie Eilish", album: "Happier Than Ever", duration: "4:05", year: 2021, genre: "Pop", plays: "2.1M" },
        { id: 2, title: "bellyache", artist: "Billie Eilish", album: "Don't Smile at Me", duration: "2:59", year: 2017, genre: "Pop", plays: "3.4M" },
        { id: 3, title: "everything i wanted", artist: "Billie Eilish", album: "When We All Fall Asleep", duration: "4:05", year: 2019, genre: "Pop", plays: "4.2M" },
        { id: 4, title: "lovely (with Khalid)", artist: "Billie Eilish, Khalid", album: "Single", duration: "3:20", year: 2018, genre: "Pop", plays: "5.6M" },
        { id: 5, title: "No Time To Die", artist: "Billie Eilish", album: "Single", duration: "4:02", year: 2020, genre: "Soundtrack", plays: "2.8M" },
    ];

    const genres = ["All", "Pop", "Soundtrack", "Alternative", "Indie"];

    // Declare functions before they're used
    const handleNextTrack = useCallback(() => {
        setCurrentTrack((prev) => (prev + 1) % tracks.length);
        setProgress(0);
        setIsPlaying(true);
    }, [tracks.length]);

    const handlePrevTrack = useCallback(() => {
        setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
        setProgress(0);
        setIsPlaying(true);
    }, [tracks.length]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setIsPlaying(false);
                        handleNextTrack();
                        return 0;
                    }
                    return prev + 0.2;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying, handleNextTrack]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            setProgress(0);
        }
    };

    const handlePlayTrack = (index: number) => {
        setCurrentTrack(index);
        setIsPlaying(true);
        setProgress(0);
    };

    const toggleLike = (id: number) => {
        setIsLiked((prev) =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const formatTime = (progressValue: number) => {
        const totalSeconds = (progressValue / 100) * 179;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const filteredTracks = tracks
        .filter(track =>
            track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            track.artist.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter(track => filterGenre === "All" || track.genre === filterGenre)
        .sort((a, b) => {
            if (sortBy === "title") return a.title.localeCompare(b.title);
            if (sortBy === "artist") return a.artist.localeCompare(b.artist);
            if (sortBy === "year") return b.year - a.year;
            if (sortBy === "duration") return a.duration.localeCompare(b.duration);
            return 0;
        });

    return (
        <div className="bg-linear-to-b from-gray-900 via-purple-900 to-gray-900 text-white">
            {/* Background animated gradient */}
            <motion.div
                className="fixed inset-0 opacity-20 pointer-events-none"
                animate={{
                    background: [
                        "radial-gradient(circle at 20% 30%, #667eea 0%, transparent 50%)",
                        "radial-gradient(circle at 80% 70%, #764ba2 0%, transparent 50%)",
                        "radial-gradient(circle at 40% 90%, #f093fb 0%, transparent 50%)",
                        "radial-gradient(circle at 20% 30%, #667eea 0%, transparent 50%)",
                    ],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* Main Container */}
            <div className="relative z-10 max-w-3xl mx-auto px-2 py-6 min-h-screen">
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
                    <h1 className="text-xl font-bold">Playlist</h1>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full hover:bg-white/10 transition"
                    >
                        <MoreHorizontal size={22} />
                    </motion.button>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.05 }}
                    className="relative mb-4"
                >
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search songs, artists..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition"
                    />
                    {searchQuery && (
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition"
                        >
                            <X size={14} className="text-gray-400" />
                        </motion.button>
                    )}
                </motion.div>

                {/* Filter & Sort Bar */}
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide"
                >
                    <div className="flex gap-2 flex-nowrap">
                        {genres.map((genre) => (
                            <motion.button
                                key={genre}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setFilterGenre(genre)}
                                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${filterGenre === genre
                                    ? "bg-linear-to-r from-pink-500 to-purple-500 text-white"
                                    : "bg-white/5 hover:bg-white/10 text-gray-400"
                                    }`}
                            >
                                {genre}
                            </motion.button>
                        ))}
                    </div>

                    <div className="relative ml-auto shrink-0">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowSortOptions(!showSortOptions)}
                            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-gray-400 transition"
                        >
                            <Filter size={14} />
                            Sort by
                            <ChevronDown size={14} className={`transition-transform ${showSortOptions ? "rotate-180" : ""}`} />
                        </motion.button>

                        <AnimatePresence>
                            {showSortOptions && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute right-0 mt-2 w-40 bg-gray-800/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl overflow-hidden z-20"
                                >
                                    {["title", "artist", "year", "duration"].map((option) => (
                                        <motion.button
                                            key={option}
                                            whileHover={{ x: 5 }}
                                            onClick={() => {
                                                setSortBy(option);
                                                setShowSortOptions(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-xs transition capitalize ${sortBy === option
                                                ? "text-white bg-white/10"
                                                : "text-gray-400 hover:text-white"
                                                }`}
                                        >
                                            {option}
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="flex items-center justify-between text-xs text-gray-400 mb-4 px-1"
                >
                    <span>{filteredTracks.length} songs</span>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <Clock size={12} />
                            Total: {filteredTracks.reduce((acc, track) => {
                                const [min, sec] = track.duration.split(":").map(Number);
                                return acc + min * 60 + sec;
                            }, 0) > 60 ? `${Math.floor(filteredTracks.reduce((acc, track) => {
                                const [min, sec] = track.duration.split(":").map(Number);
                                return acc + min * 60 + sec;
                            }, 0) / 60)}h` : `${Math.floor(filteredTracks.reduce((acc, track) => {
                                const [min, sec] = track.duration.split(":").map(Number);
                                return acc + min * 60 + sec;
                            }, 0) / 60)}min`}
                        </span>
                    </div>
                </motion.div>

                {/* Track List */}
                <motion.div className="space-y-1">
                    {filteredTracks.map((track, index) => {

                        return (
                            <motion.div
                                key={track.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + index * 0.04 }}
                                whileHover={{ scale: 1.01, x: 5 }}
                                className={`group flex items-center gap-3 p-3 rounded-xl transition cursor-pointer hover:bg-white/5"
                                    }`}
                                onClick={() => handlePlayTrack(track.id)}
                            >
                                <div className="rounded-lg flex items-center justify-center shrink-0 bg-white/5 group-hover:bg-white/10 transition">
                                    <Link href={`/playlist/${index}`} className="w-full h-full">
                                        <Image
                                            src={`./pl${index}.png`}
                                            alt={'Frame'}
                                            width={34}
                                            height={34}
                                            className="w-full h-20 object-cover"
                                            priority={true}
                                        />
                                    </Link>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4 className={`font-medium text-sm truncate text-white"}`}>
                                            {track.title}
                                        </h4>
                                    </div>
                                    <p className="text-xs text-gray-400 truncate">{track.artist}</p>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                    <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleLike(track.id);
                                        }}
                                        className="p-1 rounded-full transition"
                                    >
                                        <Heart
                                            size={16}
                                            className={"text-gray-400 hover:text-white"}
                                        />
                                    </motion.button>

                                    <span className="text-xs text-gray-400">{track.duration}</span>

                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePlayTrack(track.id);
                                        }}
                                        className="w-8 h-8 rounded-full bg-linear-to-r from-pink-500 to-purple-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                    >
                                        <Play size={14} className="text-white ml-0.5" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Empty State */}
                {filteredTracks.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <Music size={48} className="mx-auto text-gray-600 mb-3" />
                        <p className="text-gray-400">No songs found</p>
                        <p className="text-xs text-gray-500 mt-1">Try adjusting your search or filters</p>
                    </motion.div>
                )}

                {/* Mini Player */}
                {tracks.length > 0 && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-xl border-t border-white/10"
                    >
                        <div className="max-w-3xl mx-auto">
                            <div className="flex items-center gap-4">
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium truncate">{tracks[currentTrack].title}</h4>
                                    <p className="text-xs text-gray-400 truncate">{tracks[currentTrack].artist}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={handlePrevTrack}
                                        className="p-1 rounded-full hover:bg-white/10 transition"
                                    >
                                        <SkipBack size={18} />
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
                                        onClick={handleNextTrack}
                                        className="p-1 rounded-full hover:bg-white/10 transition"
                                    >
                                        <SkipForward size={18} />
                                    </motion.button>
                                </div>

                                <div className="hidden sm:block w-32">
                                    <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className="absolute h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                                            style={{ width: `${progress}%` }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 0.1 }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                                        <span>{formatTime(progress)}</span>
                                        <span>{tracks[currentTrack].duration}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}