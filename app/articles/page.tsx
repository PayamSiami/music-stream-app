// app/articles/page.tsx
"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Bell,
    Search,
    Heart,
    Bookmark,
    Share2,
    ArrowLeft,
    Clock,
    Eye,
    TrendingUp,
    Flame,
    Star,
    MessageCircle,
    User,
    ChevronRight,
    Menu,
    Settings,
    LogOut,
    Home,
    Library,
    Compass,

    ChevronDown,
} from "lucide-react";
import Link from "next/link";

// Move article generation outside the component
// This runs once when the module loads, not during render
const generateArticles = () => {
    const titles = [
        "The Future of Artificial Intelligence in 2024",
        "10 Habits of Highly Successful People",
        "Understanding Quantum Computing",
        "The Art of Minimalist Living",
        "Climate Change: What You Need to Know",
        "Mastering Digital Marketing Strategies",
        "The Psychology of Decision Making",
        "Exploring the Depths of Space",
        "Sustainable Fashion Trends",
        "The Power of Meditation and Mindfulness",
        "Blockchain Technology Explained",
        "Building Resilient Communities",
        "The Science of Happiness",
        "Innovations in Renewable Energy",
        "The Future of Remote Work",
        "Digital Transformation in Healthcare",
        "The Rise of Plant-Based Diets",
        "Understanding Cryptocurrency Markets",
        "The Art of Public Speaking",
        "Building a Personal Brand Online",
        "The Future of Education Technology",
        "Sustainable Architecture Design",
        "The Psychology of Color in Design",
        "Mastering Time Management",
        "The Impact of Social Media on Society",
    ];

    const authors = [
        "Dr. Sarah Johnson",
        "Prof. Michael Chen",
        "Emma Williams",
        "James Anderson",
        "Dr. Lisa Park",
        "Robert Taylor",
        "Maria Garcia",
        "David Kim",
        "Jennifer Lee",
        "Thomas Wright",
    ];

    const categories = [
        "Technology",
        "Self-Improvement",
        "Science",
        "Lifestyle",
        "Environment",
        "Business",
        "Psychology",
        "Space",
        "Fashion",
        "Health",
        "Innovation",
        "Community",
        "Education",
        "Design",
        "Finance",
    ];

    const loremSentences = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
        "Quis autem vel eum iure reprehenderit qui in ea voluptate velit.",
        "At vero eos et accusamus et iusto odio dignissimos ducimus.",
        "Nam libero tempore, cum soluta nobis est eligendi optio cumque.",
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.",
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    ];

    const articles = [];
    const usedTitles = new Set();

    // Use a seeded random or deterministic selection
    // Instead of Math.random(), we use a simple counter-based approach
    for (let i = 1; i <= 50; i++) {
        // Use the index to deterministically select items
        const titleIndex = (i * 7 + 3) % titles.length;
        let title = titles[titleIndex];

        // Ensure unique titles
        let attempts = 0;
        while (usedTitles.has(title) && attempts < titles.length) {
            const newIndex = (titleIndex + attempts + 1) % titles.length;
            title = titles[newIndex];
            attempts++;
        }
        usedTitles.add(title);

        const content = [];
        const sentencesCount = 4 + (i % 6); // 4-9 sentences deterministically
        for (let j = 0; j < sentencesCount; j++) {
            const sentenceIndex = (i * 3 + j * 5) % loremSentences.length;
            content.push(loremSentences[sentenceIndex]);
        }

        const readTime = 3 + (i % 10);
        const date = new Date();
        date.setDate(date.getDate() - (i % 30));

        const authorIndex = (i * 11 + 7) % authors.length;
        const categoryIndex = (i * 13 + 5) % categories.length;

        articles.push({
            id: i,
            title: title,
            author: authors[authorIndex],
            category: categories[categoryIndex],
            content: content.join(" "),
            readTime: `${readTime} min read`,
            date: date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
            }),
            views: 100 + (i * 197) % 9900,
            likes: 10 + (i * 37) % 490,
            comments: 1 + (i * 23) % 99,
            isSaved: false,
            isLiked: false,
            imageId: (i % 10) + 1,
            trending: i % 7 === 0, // Every 7th article is trending
            featured: i % 13 === 0, // Every 13th article is featured
        });
    }

    return articles;
};

// Generate articles once outside the component
const initialArticles = generateArticles();

export default function ArticlesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showNotifications, setShowNotifications] = useState(false);
    const [showQuickMenu, setShowQuickMenu] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [savedArticles, setSavedArticles] = useState<number[]>([]);
    const [likedArticles, setLikedArticles] = useState<number[]>([]);
    const [visibleCount, setVisibleCount] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const loadMoreRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Use useMemo to ensure articles are stable
    const [allArticles, setAllArticles] = useState(initialArticles);

    const categories = useMemo(() => {
        return ["All", ...new Set(allArticles.map(a => a.category))].slice(0, 10);
    }, [allArticles]);

    const filteredArticles = useMemo(() => {
        return allArticles.filter(article => {
            const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.content.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [allArticles, searchQuery, selectedCategory]);

    const visibleArticles = useMemo(() => {
        return filteredArticles.slice(0, visibleCount);
    }, [filteredArticles, visibleCount]);

    const hasMore = visibleCount < filteredArticles.length;

    const loadMore = () => {
        setIsLoading(true);
        setTimeout(() => {
            setVisibleCount(prev => Math.min(prev + 10, filteredArticles.length));
            setIsLoading(false);
        }, 500);
    };

    const toggleSave = (id: number) => {
        setSavedArticles(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
        setAllArticles(prev =>
            prev.map(article =>
                article.id === id
                    ? { ...article, isSaved: !article.isSaved }
                    : article
            )
        );
    };

    const toggleLike = (id: number) => {
        setLikedArticles(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
        setAllArticles(prev =>
            prev.map(article =>
                article.id === id
                    ? { ...article, isLiked: !article.isLiked }
                    : article
            )
        );
    };

    // Handle scroll events
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }

            if (loadMoreRef.current) {
                const rect = loadMoreRef.current.getBoundingClientRect();
                if (rect.top <= window.innerHeight && hasMore && !isLoading) {
                    loadMore();
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, isLoading]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };

    const notifications = [
        { id: 1, message: "New article: 'The Future of AI' by Dr. Sarah Johnson", time: "2 min ago", read: false },
        { id: 2, message: "Your article 'Quantum Computing' got 50 new views", time: "15 min ago", read: false },
        { id: 3, message: "Emma Williams liked your comment", time: "1 hour ago", read: true },
        { id: 4, message: "New follower: David Kim", time: "3 hours ago", read: true },
    ];

    const getGradient = (id: number) => {
        const gradients = [
            'from-pink-500/30 to-purple-500/30',
            'from-blue-500/30 to-cyan-500/30',
            'from-green-500/30 to-emerald-500/30',
            'from-yellow-500/30 to-orange-500/30',
            'from-red-500/30 to-pink-500/30',
            'from-indigo-500/30 to-purple-500/30',
            'from-teal-500/30 to-cyan-500/30',
            'from-rose-500/30 to-pink-500/30',
            'from-violet-500/30 to-purple-500/30',
            'from-fuchsia-500/30 to-pink-500/30',
        ];
        return gradients[(id - 1) % gradients.length];
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-gray-900 text-white pb-24">
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
            <div ref={containerRef} className="relative z-10 max-w-3xl mx-auto px-4 py-6 min-h-screen">
                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex items-center justify-between mb-6"
                >
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-full hover:bg-white/10 transition"
                            >
                                <ArrowLeft size={24} />
                            </motion.button>
                        </Link>
                        <h1 className="text-2xl font-bold bg-linear-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                            Articles
                        </h1>
                    </div>
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
                        placeholder="Search articles, authors..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition"
                    />
                </motion.div>

                {/* Categories */}
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide"
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${selectedCategory === category
                                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                                    : "bg-white/5 hover:bg-white/10 text-gray-400"
                                }`}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="flex items-center justify-between text-xs text-gray-400 mb-4 px-1"
                >
                    <span>{filteredArticles.length} articles</span>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <TrendingUp size={14} />
                            {filteredArticles.filter(a => a.trending).length} trending
                        </span>
                    </div>
                </motion.div>

                {/* Scroll Down Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center mb-6"
                >
                    <motion.button
                        onClick={scrollToBottom}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-gray-400 transition"
                    >
                        <span>Scroll to explore</span>
                        <motion.div
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <ChevronDown size={16} />
                        </motion.div>
                    </motion.button>
                </motion.div>

                {/* Article Grid - Vertical */}
                <div className="space-y-4">
                    {visibleArticles.map((article, index) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: Math.min(index * 0.03, 0.5) }}
                            whileHover={{ scale: 1.01, y: -2 }}
                            className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row">
                                {/* Image */}
                                <div className={`relative h-48 md:h-auto md:w-48 shrink-0 overflow-hidden ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'
                                    }`}>
                                    <div className={`w-full h-full bg-gradient-to-br ${getGradient(article.id)} flex items-center justify-center`}>
                                        <span className="text-7xl opacity-20 font-bold">
                                            {article.title.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    {article.trending && (
                                        <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-[10px] font-medium flex items-center gap-1">
                                            <Flame size={12} /> Trending
                                        </div>
                                    )}
                                    {article.featured && (
                                        <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-[10px] font-medium flex items-center gap-1">
                                            <Star size={12} /> Featured
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-4 flex flex-col">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-medium text-gray-400">
                                                    {article.category}
                                                </span>
                                                <span className="text-[10px] text-gray-500 flex items-center gap-1">
                                                    <Clock size={12} /> {article.readTime}
                                                </span>
                                            </div>
                                            <h3 className="font-semibold text-base mb-2 hover:text-purple-400 transition line-clamp-2">
                                                {article.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm line-clamp-3">
                                                {article.content}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Meta & Actions */}
                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                                <User size={14} className="text-white" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium">{article.author.split(' ').slice(0, 2).join(' ')}</p>
                                                <p className="text-[10px] text-gray-500">{article.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-[10px] text-gray-500 flex items-center gap-1 mr-2">
                                                <Eye size={12} /> {article.views >= 1000 ? `${(article.views / 1000).toFixed(1)}K` : article.views}
                                            </span>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => toggleLike(article.id)}
                                                className="p-1.5 rounded-full hover:bg-white/10 transition"
                                            >
                                                <Heart
                                                    size={16}
                                                    className={likedArticles.includes(article.id) ? "fill-pink-500 text-pink-500" : "text-gray-400"}
                                                />
                                            </motion.button>
                                            <span className="text-xs text-gray-500">{article.likes}</span>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="p-1.5 rounded-full hover:bg-white/10 transition ml-1"
                                            >
                                                <MessageCircle size={16} className="text-gray-400" />
                                            </motion.button>
                                            <span className="text-xs text-gray-500">{article.comments}</span>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => toggleSave(article.id)}
                                                className="p-1.5 rounded-full hover:bg-white/10 transition ml-1"
                                            >
                                                <Bookmark
                                                    size={16}
                                                    className={savedArticles.includes(article.id) ? "fill-purple-500 text-purple-500" : "text-gray-400"}
                                                />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="p-1.5 rounded-full hover:bg-white/10 transition"
                                            >
                                                <Share2 size={16} className="text-gray-400" />
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Load More / Infinite Scroll Trigger */}
                {hasMore && (
                    <div ref={loadMoreRef} className="py-8 text-center">
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full"
                                />
                                <span className="text-sm text-gray-400">Loading more articles...</span>
                            </div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={loadMore}
                                className="px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-gray-400 transition"
                            >
                                Load More
                            </motion.button>
                        )}
                    </div>
                )}

                {/* End of content */}
                {!hasMore && filteredArticles.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8"
                    >
                        <p className="text-sm text-gray-500">You ve reached the end! 🎉</p>
                    </motion.div>
                )}

                {/* Empty State */}
                {filteredArticles.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <Bookmark size={48} className="mx-auto text-gray-600 mb-3" />
                        <p className="text-gray-400">No articles found</p>
                        <p className="text-xs text-gray-500 mt-1">Try adjusting your search or filters</p>
                    </motion.div>
                )}

                {/* Scroll to Top Button */}
                <AnimatePresence>
                    {showScrollButton && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={scrollToTop}
                            className="fixed bottom-24 right-4 p-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg shadow-purple-500/30 z-50"
                        >
                            <ChevronDown size={20} className="rotate-180" />
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Bottom Navigation */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-xl border-t border-white/10 p-2 flex justify-around"
                >
                    {[
                        { icon: Home, label: "Home", id: "home", path: "/" },
                        { icon: Compass, label: "Explore", id: "explore", path: "/explore" },
                        { icon: Library, label: "Library", id: "library", path: "/library" },
                        { icon: User, label: "Profile", id: "profile", path: "/profile", active: true },
                    ].map((item) => {
                        const Icon = item.icon;
                        const isActive = item.active || false;
                        return (
                            <Link href={item.path} key={item.id}>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-full transition relative ${isActive ? "text-white" : "text-gray-400"}`}
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