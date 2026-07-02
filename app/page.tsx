/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Shuffle,
  Search,
  Home,
  User,
  TrendingUp,
  Clock,
  ListMusic,
} from "lucide-react";
import IconArticle from "@/components/common/icon";

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
}

interface Room {
  name: string;
  color: string;
  tracks: number;
  active?: boolean;
  members?: number;
  listeners?: number;
  memberAvatars?: string[];
  backgroundImage?: string;
}

interface NavItem {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  id: string;
  path?: string;
}

interface Friend {
  id: number;
  name: string;
  avatar: string;
  color: string;
  emoji: string;
  isActive: boolean;
  listeningTo: string;
}

// Generate fake friends with real human faces using randomuser.me API
const generateFakeFriends = async (count: number): Promise<Friend[]> => {
  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#F9CA24", "#6C5CE7", "#FD79A8", "#00B894", "#0984E3"];
  const emojis = ["🎵", "🎸", "🎹", "🎤", "🎷", "🎧", "🎶", "🎼", "🎺", "🎻"];
  const songs = ["Midnight Dreams", "Ocean Waves", "Electric Feel", "Classical Medley", "Jazz Session", "Rock Anthem", "Acoustic Covers", "Electronic Mix"];

  try {
    const response = await fetch(`https://randomuser.me/api/?results=${count}&inc=name,picture,id`);
    const data = await response.json();

    return data.results.map((user: any, index: number) => {
      const fullName = `${user.name.first} ${user.name.last}`;
      return {
        id: index,
        name: fullName,
        avatar: user.picture.large,
        color: colors[index % colors.length],
        emoji: emojis[index % emojis.length],
        isActive: Math.random() > 0.3,
        listeningTo: songs[index % songs.length],
      };
    });
  } catch (error) {
    const firstNames = [
      "Sarah", "Mike", "Emma", "Alex", "Jade", "Tom", "Lisa", "Ryan", "Mia", "Jack",
      "Sophie", "Oliver", "Ava", "Ethan", "Isabella", "Liam", "Charlotte", "Noah", "Amelia", "Mason",
    ];
    const lastNames = [
      "Johnson", "Smith", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    ];

    return Array.from({ length: count }, (_, i) => {
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
      const fullName = `${firstName} ${lastName}`;
      return {
        id: i,
        name: fullName,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=${colors[i % colors.length].replace('#', '')}&color=fff&size=256&bold=true&font-size=0.5`,
        color: colors[i % colors.length],
        emoji: emojis[i % emojis.length],
        isActive: Math.random() > 0.3,
        listeningTo: songs[i % songs.length],
      };
    });
  }
};

// Generate room member avatars and background images
const generateRoomMembers = async (count: number): Promise<string[]> => {
  try {
    const response = await fetch(`https://randomuser.me/api/?results=${count}&inc=picture`);
    const data = await response.json();
    return data.results.map((user: any) => user.picture.thumbnail);
  } catch (error) {
    const names = ["JD", "SK", "ML", "RT", "AW", "PB", "CN", "DH", "ES", "MG"];
    return names.slice(0, count).map(name =>
      `https://ui-avatars.com/api/?name=${name}&background=7F6AFF&color=fff&size=32&bold=true`
    );
  }
};

// Generate random background images for rooms
const generateRoomBackground = (roomName: string): string => {
  const images = {
    Childish: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
    Violin: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop",
    Classic: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=300&fit=crop",
  };

  const fallbackImages = [
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop",
  ];

  return images[roomName as keyof typeof images] || fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
};

export default function MusicApp() {
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loadingFriends, setLoadingFriends] = useState<boolean>(true);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loadingRooms, setLoadingRooms] = useState<boolean>(true);

  // Load friends and room members on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoadingFriends(true);
      setLoadingRooms(true);

      const friendData = await generateFakeFriends(8);
      setFriends(friendData);
      setLoadingFriends(false);

      // Generate room data with backgrounds and member avatars
      const roomData: Room[] = [
        { name: "Childish", color: "#FF6B6B", tracks: 12, active: true, members: 45, listeners: 12 },
        { name: "Violin", color: "#4ECDC4", tracks: 8, active: false, members: 32, listeners: 0 },
        { name: "Classic", color: "#45B7D1", tracks: 15, active: true, members: 28, listeners: 8 },
      ];

      const roomsWithAvatars = await Promise.all(
        roomData.map(async (room) => {
          const avatars = await generateRoomMembers(3);
          const backgroundImage = generateRoomBackground(room.name);
          return { ...room, memberAvatars: avatars, backgroundImage };
        })
      );

      setRooms(roomsWithAvatars);
      setLoadingRooms(false);
    };
    loadData();
  }, []);

  const categories: Category[] = [
    { name: "Trends", icon: TrendingUp, color: "#FF6B6B" },
    { name: "Favorite", icon: Heart, color: "#EC4899" },
    { name: "Mix", icon: Shuffle, color: "#8B5CF6" },
    { name: "Recent", icon: Clock, color: "#3B82F6" },
    { name: "Artists", icon: User, color: "#10B981" },
    { name: "Playlists", icon: ListMusic, color: "#F59E0B" },
  ];

  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center mb-4 gap-4"
      >
        <div className="flex items-center gap-2">
          <Link href="/profile">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-[#2F3136] flex items-center justify-center cursor-pointer"
            >
              <User size={20} className="text-white" />
            </motion.div>
          </Link>
        </div>
        {/* Search Bar */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative flex-1"
        >
          <Link href="/search">
            <div className="relative w-full">
              <Search
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isSearchFocused ? "text-[#7F6AFF]" : "text-gray-400"
                  }`}
                size={18}
              />
              <div
                className="w-full bg-[#2F3136] rounded-full py-3 pl-12 pr-4 text-sm border transition-colors text-gray-400 cursor-pointer"
                style={{
                  borderColor: isSearchFocused ? "rgba(127, 106, 255, 0.5)" : "rgba(255,255,255,0.05)",
                }}
                onMouseEnter={() => setIsSearchFocused(true)}
                onMouseLeave={() => setIsSearchFocused(false)}
              >
                Search music, artists...
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Mood Mode Card */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="relative mb-6 overflow-hidden rounded-2xl"
      >
        <div className="relative p-6 bg-linear-to-r from-[#EFFFAF] to-[#B8FFC3] rounded-2xl">
          <div className="absolute bottom-0 left-0">
            <Image
              src={`./girl.png`}
              alt={'girl'}
              width={64}
              height={64}
              className="w-full h-full object-cover"
              priority={true}
            />
          </div>
          <Image
            src={`./Frame 5.png`}
            alt={'Frame'}
            width={34}
            height={34}
            className="w-full h-20 object-cover"
            priority={true}
          />
        </div>
      </motion.div>

      {/* Friends Stream Section */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mb-6"
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-white text-sm font-bold">Your friends stream to</h2>
          <motion.span
            whileHover={{ x: 3 }}
            className="text-gray-400 text-xs cursor-pointer"
          >
            See more
          </motion.span>
        </div>

        {loadingFriends ? (
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-1 shrink-0">
                <div className="w-16 h-16 rounded-full bg-[#2F3136] animate-pulse" />
                <div className="w-12 h-3 bg-[#2F3136] rounded animate-pulse" />
                <div className="w-8 h-2 bg-[#2F3136] rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {friends.map((friend, index) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center gap-1 shrink-0 group cursor-pointer"
              >
                <Link href={"/play"}>
                  <div className="relative">
                    <div
                      className={`w-16 h-24 rounded-md overflow-hidden ring-2 ring-white/10 group-hover:ring-[#7F6AFF]/50 transition-all duration-300 ${friend.isActive ? 'ring-[#7F6AFF]/30' : ''
                        }`}
                      style={{
                        boxShadow: friend.isActive
                          ? `0 0 30px ${friend.color}55, 0 0 60px ${friend.color}33`
                          : 'none'
                      }}
                    >
                      <Image
                        src={`./${index}.png`}
                        alt={friend.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                        priority={index < 4}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Categories - Grid */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-white text-sm font-bold">Category</h2>
          <motion.span
            whileHover={{ x: 3 }}
            className="text-gray-400 text-xs cursor-pointer"
          >
            Show all
          </motion.span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {categories.map((category, index) => {
            const Icon = category.icon;

            // Define colors with actual opacity values
            const colors = [
              'rgba(59, 130, 246, 0.2)',   // blue
              'rgba(139, 92, 246, 0.2)',   // purple
              'rgba(236, 72, 153, 0.2)',   // pink
              'rgba(34, 197, 94, 0.2)',    // green
              'rgba(234, 179, 8, 0.2)',    // yellow
              'rgba(239, 68, 68, 0.2)',    // red
              'rgba(99, 102, 241, 0.2)',   // indigo
              'rgba(20, 184, 166, 0.2)',   // teal
            ];

            const hoverColors = [
              'rgba(59, 130, 246, 0.3)',
              'rgba(139, 92, 246, 0.3)',
              'rgba(236, 72, 153, 0.3)',
              'rgba(34, 197, 94, 0.3)',
              'rgba(234, 179, 8, 0.3)',
              'rgba(239, 68, 68, 0.3)',
              'rgba(99, 102, 241, 0.3)',
              'rgba(20, 184, 166, 0.3)',
            ];

            const colorIndex = index % colors.length;

            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  backgroundColor: colors[colorIndex],
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = hoverColors[colorIndex];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors[colorIndex];
                }}
                className="p-3 rounded-xl text-center border border-white/10"
              >
                <div className="flex justify-center mb-1">
                  <Icon size={18} className="text-white" />
                </div>
                <p className="text-white text-xs font-medium">{category.name}</p>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Rooms Section - With Human Background Images */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mb-6"
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-white text-base font-bold">Room</h2>
          <motion.span
            whileHover={{ x: 3 }}
            className="text-gray-400 text-xs cursor-pointer"
          >
            See more
          </motion.span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {loadingRooms ? (
            [...Array(3)].map((_, index) => (
              <div key={index} className="rounded-xl p-4 bg-[#2F3136] animate-pulse h-[140px]" />
            ))
          ) : (
            rooms.map((room, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden rounded-xl p-4 cursor-pointer min-h-55"
              >
                {/* Human Background Image */}
                {room.backgroundImage && (
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={`./${index + 9}.png`}
                      alt={`${room.name} background`}
                      fill
                      className="object-cover"
                      priority={index < 3}
                    />
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </>
  );
}