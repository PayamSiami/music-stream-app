// app/playlist/[id]/client.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Repeat,
    Shuffle,
    Heart,
    MoreHorizontal,
    Share2,
    Download,
    Volume2,
    ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MusicPlayerClient() {
    const params = useParams();
    const playlistId = Array.isArray(params.id) ? params.id[0] : params.id || "1";

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isShuffled, setIsShuffled] = useState(false);
    const [isRepeated, setIsRepeated] = useState(false);
    const [volume, setVolume] = useState(70);
    const [imageError, setImageError] = useState(false);

    const tracks = {
        "1": { title: "Bellyache", artist: "Billie Eilish", album: "Don't Smile at Me", duration: 179, year: 2017 },
        "2": { title: "my future", artist: "Billie Eilish", album: "Happier Than Ever", duration: 210, year: 2020 },
        "3": { title: "Your Power", artist: "Billie Eilish", album: "Happier Than Ever", duration: 245, year: 2021 },
        "4": { title: "everything i wanted", artist: "Billie Eilish", album: "When We All Fall Asleep", duration: 245, year: 2019 },
        "5": { title: "lovely (with Khalid)", artist: "Billie Eilish, Khalid", album: "Single", duration: 200, year: 2018 },
        "6": { title: "No Time To Die", artist: "Billie Eilish", album: "Single", duration: 242, year: 2020 },
    };

    const track = tracks[playlistId as keyof typeof tracks] || tracks["1"];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setIsPlaying(false);
                        return 0;
                    }
                    return prev + 0.2;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            setProgress(0);
        }
    };

    const toggleLike = () => {
        setIsLiked(!isLiked);
    };

    const formatTime = (progressValue: number) => {
        const totalSeconds = (progressValue / 100) * track.duration;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setProgress(value);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(parseInt(e.target.value));
    };

    const getImagePath = () => {
        const id = String(playlistId).replace(/\D/g, '');
        return `/pl${id}.png`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
            <motion.div
                className="fixed inset-0 opacity-30 pointer-events-none"
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

            <div className="relative z-10 max-w-md mx-auto px-4 py-6 min-h-screen flex flex-col">
                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex justify-between items-center mb-8"
                >
                    <Link href="/playlist">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-full hover:bg-white/10 transition"
                        >
                            <ArrowLeft size={24} />
                        </motion.button>
                    </Link>
                    <h2 className="text-lg font-semibold">Now Playing</h2>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full hover:bg-white/10 transition"
                    >
                        <MoreHorizontal size={22} />
                    </motion.button>
                </motion.div>

                {/* Album Art */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex justify-center mb-8"
                >
                    <motion.div
                        className="relative w-72 h-72 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        {!imageError ? (
                            <Image
                                src={getImagePath()}
                                alt={track.title}
                                fill
                                className="object-cover"
                                priority
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                <span className="text-6xl font-bold text-white/50">
                                    {track.title.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                        <motion.div
                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                            whileHover={{ opacity: 1 }}
                        >
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={togglePlay}
                                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center border border-white/30"
                            >
                                {isPlaying ? (
                                    <Pause size={32} className="text-white" />
                                ) : (
                                    <Play size={32} className="text-white ml-1" />
                                )}
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Track Info */}
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-6"
                >
                    <h1 className="text-2xl font-bold mb-1">{track.title}</h1>
                    <p className="text-gray-400 text-sm">{track.artist}</p>
                    <p className="text-gray-500 text-xs">{track.album} • {track.year}</p>
                </motion.div>

                {/* Progress Bar */}
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="mb-4"
                >
                    <div className="relative">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={handleProgressChange}
                            className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r 
                [&::-webkit-slider-thumb]:from-pink-500 [&::-webkit-slider-thumb]:to-purple-500
                [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-purple-500/50"
                            style={{
                                background: `linear-gradient(to right, #a855f7 0%, #ec4899 ${progress}%, rgba(255,255,255,0.1) ${progress}%, rgba(255,255,255,0.1) 100%)`,
                            }}
                        />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>{formatTime(progress)}</span>
                        <span>{formatTime(100)}</span>
                    </div>
                </motion.div>

                {/* Controls */}
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-center gap-4 mb-6"
                >
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsShuffled(!isShuffled)}
                        className={`p-2 rounded-full transition ${isShuffled ? "text-purple-400" : "text-gray-400 hover:text-white"}`}
                    >
                        <Shuffle size={20} />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full text-gray-400 hover:text-white transition"
                    >
                        <SkipBack size={24} />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={togglePlay}
                        className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30"
                    >
                        {isPlaying ? (
                            <Pause size={28} className="text-white" />
                        ) : (
                            <Play size={28} className="text-white ml-1" />
                        )}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full text-gray-400 hover:text-white transition"
                    >
                        <SkipForward size={24} />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsRepeated(!isRepeated)}
                        className={`p-2 rounded-full transition ${isRepeated ? "text-purple-400" : "text-gray-400 hover:text-white"}`}
                    >
                        <Repeat size={20} />
                    </motion.button>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="flex justify-center gap-6 mb-6"
                >
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleLike}
                        className={`p-2 rounded-full transition ${isLiked ? "text-pink-500" : "text-gray-400 hover:text-white"}`}
                    >
                        <Heart size={22} className={isLiked ? "fill-pink-500" : ""} />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full text-gray-400 hover:text-white transition"
                    >
                        <Share2 size={22} />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full text-gray-400 hover:text-white transition"
                    >
                        <Download size={22} />
                    </motion.button>
                </motion.div>

                {/* Volume Control */}
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-3 bg-white/5 rounded-full px-4 py-2 border border-white/10"
                >
                    <Volume2 size={18} className="text-gray-400" />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
                        style={{
                            background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${volume}%, rgba(255,255,255,0.1) ${volume}%, rgba(255,255,255,0.1) 100%)`,
                        }}
                    />
                    <span className="text-xs text-gray-400 w-8">{volume}%</span>
                </motion.div>
            </div>
        </div>
    );
}