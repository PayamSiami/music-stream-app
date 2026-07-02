"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    ChevronRight,
    ArrowLeft,
    Settings,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ProfilePage() {
    const [showSettings, setShowSettings] = useState(false);
    const params = useParams();
    const playlistId = Array.isArray(params.id) ? params.id[0] : params.id || "1";

    const getImagePath = () => {
        // Clean the playlistId to only get the number
        const id = String(playlistId).replace(/\D/g, '');
        return `/s${id}.png`;
    };

    const playlists = [
        { name: "Chill Vibes", tracks: 24, duration: "1:45:00", color: "#FF6B6B", isLiked: true },
        { name: "Workout Mix", tracks: 18, duration: "1:20:00", color: "#4ECDC4", isLiked: false },
        { name: "Study Session", tracks: 32, duration: "2:10:00", color: "#45B7D1", isLiked: true },
        { name: "Party Hits", tracks: 27, duration: "1:55:00", color: "#F9CA24", isLiked: false },
    ];

    const rooms = [
        { name: "Childish", members: 45, active: true, color: "#FF6B6B", listeners: 12 },
        { name: "Violin", members: 32, active: false, color: "#4ECDC4", listeners: 8 },
        { name: "Classic", members: 28, active: true, color: "#45B7D1", listeners: 15 },
        { name: "Jazz", members: 19, active: false, color: "#F9CA24", listeners: 6 },
    ];

    return (
        <>
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
                        <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                            <Image
                                src={getImagePath()}
                                alt={'girl'}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                                priority={true}
                                loader={({ src }) => src}
                            />
                        </div>
                    </div>
                </div>

                {/* Name */}
                <h1 className="text-xl font-bold mb-0.5">Jan Walters</h1>
                <p className="text-gray-400 text-sm mb-2">@j.walters</p>

                {/* Bio */}
                <p className="text-gray-300 text-sm mb-4">
                    In a world of worries, be the warrior
                </p>
            </motion.div>
            {/* Playlist Section Header */}
            <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-between items-center mb-3"
            >
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">Playlist</h3>
                </div>
                <motion.span
                    whileHover={{ x: 3 }}
                    className="text-xs text-purple-400 cursor-pointer flex items-center gap-1"
                >
                    See all <ChevronRight size={14} />
                </motion.span>
            </motion.div>

            {/* Playlist Items */}
            <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="space-y-2 mb-6 flex gap-4 overflow-x-auto scrollbar-hide py-2"
            >
                {playlists.map((friend, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="flex flex-col items-center gap-1 shrink-0 group cursor-pointer"
                    >
                        <div
                            className={`w-16 h-24 rounded-md overflow-hidden ring-2 ring-white/10 group-hover:ring-[#7F6AFF]/50 transition-all duration-300}`}
                            style={{ boxShadow: 'none' }}
                        >
                            <Image
                                src={`../p${index}.png`}
                                alt={friend.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                                priority={index < 4}
                            />
                        </div>
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
                    <h3 className="text-sm font-semibold">Room</h3>
                </div>
                <motion.span
                    whileHover={{ x: 3 }}
                    className="text-xs text-purple-400 cursor-pointer flex items-center gap-1"
                >
                    See all <ChevronRight size={14} />
                </motion.span>
            </motion.div>

            {/* Room Items */}
            <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="flex gap-4 overflow-x-auto scrollbar-hide py-2"
            >
                {rooms.slice(0, 4).map((room, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + index * 0.05 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="flex flex-col items-center gap-1 shrink-0 group cursor-pointer"
                    >
                        <div
                            className={`w-16 h-24 rounded-md overflow-hidden ring-2 ring-white/10 group-hover:ring-[#7F6AFF]/50 transition-all duration-300}`}
                            style={{ boxShadow: 'none' }}
                        >
                            <Image
                                src={`../p${index + 4}.png`}
                                alt={room.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                                priority={index < 4}
                            />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </>
    );
}