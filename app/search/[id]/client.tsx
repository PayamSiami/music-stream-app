"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    ArrowLeft,
    Settings,
    User,
    Music,
    Users,
    Heart,
    LogOut,
    UserPlus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ProfilePage() {
    const [showSettings, setShowSettings] = useState(false);
    const [showCloseFriends, setShowCloseFriends] = useState(false);
    const params = useParams();
    const profileId = Array.isArray(params.id) ? params.id[0] : params.id || "1";

    const closeFriends = [
        { name: "Emma", status: "online" },
        { name: "James", status: "offline" },
        { name: "Sophie", status: "online" },
        { name: "Liam", status: "away" },
    ];

    const playlists = [
        { name: "Chill Vibes", tracks: 24 },
        { name: "Workout Mix", tracks: 18 },
        { name: "Study Session", tracks: 32 },
        { name: "Party Hits", tracks: 27 },
    ];

    const rooms = [
        { name: "Childish", members: 45, active: true, listeners: 12 },
        { name: "Violin", members: 32, active: false, listeners: 8 },
        { name: "Classic", members: 28, active: true, listeners: 15 },
        { name: "Jazz", members: 19, active: false, listeners: 6 },
    ];

    const getImagePath = (id: string) => {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
        return `${basePath}/s${id}.png`;
    };

    const getPlaylistImagePath = (index: number) => {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
        return `${basePath}/p${index}.png`;
    };

    const getRoomImagePath = (index: number) => {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
        return `${basePath}/p${index + 4}.png`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
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

                {/* Profile Info */}
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-center mb-6"
                >
                    {/* Avatar */}
                    <div className="relative w-24 h-24 mx-auto mb-3">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-[2px]">
                            <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                                <Image
                                    src={getImagePath(profileId)}
                                    alt="Profile"
                                    width={96}
                                    height={96}
                                    className="w-full h-full object-cover"
                                    priority
                                    unoptimized
                                />
                            </div>
                        </div>
                        {/* Online indicator */}
                        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-green-500 border-2 border-black flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        </div>
                    </div>

                    {/* Name */}
                    <h1 className="text-xl font-bold mb-0.5">Billie Eilish</h1>
                    <p className="text-gray-400 text-sm mb-2">@billieeilish</p>

                </motion.div>

                {/* Playlist Section Header */}
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-between items-center mb-3"
                >
                    <div className="flex items-center gap-2">
                        <Music size={18} className="text-purple-400" />
                        <h3 className="text-sm font-semibold">Playlist</h3>
                    </div>
                    <motion.span
                        whileHover={{ x: 3 }}
                        className="text-xs text-purple-400 cursor-pointer flex items-center gap-1"
                    >
                        See all <ChevronRight size={14} />
                    </motion.span>
                </motion.div>

                {/* Playlist Items - Horizontal Scroll */}
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="flex gap-4 overflow-x-auto scrollbar-hide py-2 mb-6"
                >
                    {playlists.map((playlist, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.25 + index * 0.05 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="flex flex-col items-center gap-1 shrink-0 group cursor-pointer"
                        >
                            <div className="w-20 h-28 rounded-lg overflow-hidden ring-2 ring-white/10 group-hover:ring-[#7F6AFF]/50 transition-all duration-300">
                                <Image
                                    src={getPlaylistImagePath(index)}
                                    alt={playlist.name}
                                    width={80}
                                    height={112}
                                    className="w-full h-full object-cover"
                                    priority={index < 4}
                                    unoptimized
                                />
                            </div>
                            <p className="text-[10px] text-gray-400 truncate w-20 text-center">
                                {playlist.name}
                            </p>
                            <p className="text-[8px] text-gray-500">{playlist.tracks} tracks</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Room Section Header */}
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-between items-center mb-3"
                >
                    <div className="flex items-center gap-2">
                        <Users size={18} className="text-purple-400" />
                        <h3 className="text-sm font-semibold">Room</h3>
                    </div>
                    <motion.span
                        whileHover={{ x: 3 }}
                        className="text-xs text-purple-400 cursor-pointer flex items-center gap-1"
                    >
                        See all <ChevronRight size={14} />
                    </motion.span>
                </motion.div>

                {/* Room Items - Horizontal Scroll */}
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="flex gap-4 overflow-x-auto scrollbar-hide py-2"
                >
                    {rooms.map((room, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.35 + index * 0.05 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="flex flex-col items-center gap-1 shrink-0 group cursor-pointer relative"
                        >
                            <div className="w-20 h-28 rounded-lg overflow-hidden ring-2 ring-white/10 group-hover:ring-[#7F6AFF]/50 transition-all duration-300 relative">
                                <Image
                                    src={getRoomImagePath(index)}
                                    alt={room.name}
                                    width={80}
                                    height={112}
                                    className="w-full h-full object-cover"
                                    priority={index < 4}
                                    unoptimized
                                />
                                {room.active && (
                                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                )}
                            </div>
                            <p className="text-[10px] text-gray-400 truncate w-20 text-center">
                                {room.name}
                            </p>
                            <p className="text-[8px] text-gray-500">{room.members} members</p>
                            {room.active && (
                                <span className="text-[8px] text-green-400">● Live</span>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}