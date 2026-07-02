"use client";

import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Home, Search } from 'lucide-react';
import IconArticle from '../common/icon';
import Link from 'next/link';

interface NavItem {
    icon: React.ComponentType<{ size?: number }>;
    label: string;
    id: string;
    path?: string;
}

export default function Footer() {

    const [activeTab, setActiveTab] = useState<string>("home");


    const navItems: NavItem[] = [
        { icon: Home, label: "", id: "home", path: "/" },
        { icon: Search, label: "", id: "search", path: "/search" },
        { icon: IconArticle, label: "", id: "profile", path: "/articles" },
    ];
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 bg-[#2F3136] rounded-full p-2 flex justify-around sticky bottom-0 z-10"
        >
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                    <Link href={item.path || "/"} key={item.id}>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-full transition relative ${isActive ? "text-white" : "text-gray-400"
                                }`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            <Icon size={20} />
                            <span className="text-[10px]">{item.label}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#7F6AFF]"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    </Link>
                );
            })}
        </motion.div>
    )
}
