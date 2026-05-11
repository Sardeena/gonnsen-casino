import { Game } from "@/src/components/GameCard";

export interface ExtendedGame extends Game {
    description: string;
    rtp: string;
    maxWin: string;
    volatility: string;
    provider: string;
    stats?: {
        totalPlays: number;
        biggestWin: string;
        hotRate: number;
    };
}

export const ALL_GAMES: ExtendedGame[] = [
    { 
        id: "g1", title: "Cyber Reels", category: "Slots", 
        image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=800", rating: 4.9, 
        previewVideo: "https://assets.mixkit.co/videos/preview/mixkit-abstract-cyber-connection-loop-23429-large.mp4",
        isPopular: true,
        description: "Dive into the holographic grid where matrix-code reels spin in a high-octane slot experience. Cyber Reels offers a futuristic blend of multiplier cascades and neural-link bonus rounds.",
        rtp: "98.2%", maxWin: "50,000x", volatility: "High", provider: "NeonGaming",
        stats: { totalPlays: 154230, biggestWin: "45,200 NEON", hotRate: 85 }
    },
    { 
        id: "g2", title: "Neon Roulette", category: "Table", 
        image: "https://images.unsplash.com/photo-1596838132731-dd9fd73ef441?auto=format&fit=crop&q=80&w=800", rating: 4.8, 
        previewVideo: "https://assets.mixkit.co/videos/preview/mixkit-bright-neon-lights-pulsing-in-pink-and-blue-40015-large.mp4",
        isNew: true,
        description: "A digital reimagining of the classic roulette wheel. High-velocity light-balls dance around a zero-gravity wheel, featuring lightning-boosted sectors that can multiply stakes by up to 500x.",
        rtp: "97.3%", maxWin: "36x", volatility: "Medium", provider: "StaticCore",
        stats: { totalPlays: 84120, biggestWin: "12,500 NEON", hotRate: 72 }
    },
    { 
        id: "g3", title: "Blackjack Zero", category: "Cards", 
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800", rating: 4.7,
        previewVideo: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-binary-code-screens-23439-large.mp4",
        description: "Face off against the ultimate dealer at the edge of the internet. Blackjack Zero provides a sleek, low-latency environment for strategic high-stakes card battles.",
        rtp: "99.5%", maxWin: "3:2", volatility: "Low", provider: "NeonGaming",
        stats: { totalPlays: 45000, biggestWin: "8,000 NEON", hotRate: 91 }
    },
    { 
        id: "g4", title: "Matrix Jackpot", category: "Progressive", 
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800", rating: 5.0, 
        previewVideo: "https://assets.mixkit.co/videos/preview/mixkit-digital-circuit-board-animation-loop-23420-large.mp4",
        isPopular: true,
        description: "The crown jewel of Gonnsen's Casino. Matrix Jackpot pools neural-sync data across the network to provide colossal, life-changing payouts in an immersive progressive environment.",
        rtp: "94.0%", maxWin: "1,000,000x", volatility: "Extreme", provider: "OmegaSlots",
        stats: { totalPlays: 250400, biggestWin: "1.2M NEON", hotRate: 65 }
    },
    { 
        id: "g5", title: "Dragon Spins", category: "Slots", 
        image: "https://images.unsplash.com/photo-1614741484745-4200424564ad?auto=format&fit=crop&q=80&w=800", rating: 4.6, 
        previewVideo: "https://assets.mixkit.co/videos/preview/mixkit-energetic-bright-neon-tunnel-movement-40011-large.mp4",
        isNew: true,
        description: "Oriental aesthetics meet synthwave technology. Summon digital dragons across the reels to unlock free-spin protocols and sticky high-tech wilds.",
        rtp: "96.5%", maxWin: "15,000x", volatility: "High", provider: "Z-Entertain",
        stats: { totalPlays: 12000, biggestWin: "3,400 NEON", hotRate: 94 }
    },
    { 
        id: "g6", title: "Virtual Poker", category: "Cards", 
        image: "https://images.unsplash.com/photo-1543282834-6019316cd465?auto=format&fit=crop&q=80&w=800", rating: 4.5,
        previewVideo: "https://assets.mixkit.co/videos/preview/mixkit-abstract-shimmering-geometric-structure-23428-large.mp4",
        description: "Compete in the premier digital poker circuit. Whether it's Hold'em or Omaha, the Virtual Poker lounge offers a professional interface for calculated risk-taking.",
        rtp: "98.8%", maxWin: "Variable", volatility: "High", provider: "OmegaSlots",
        stats: { totalPlays: 55000, biggestWin: "25,000 NEON", hotRate: 40 }
    },
    { 
        id: "g7", title: "Retro Keno", category: "Instant", 
        image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800", rating: 4.2,
        previewVideo: "https://assets.mixkit.co/videos/preview/mixkit-intro-for-a-sci-fi-high-tech-movie-23424-large.mp4",
        description: "A nostalgic nod to 8-bit gambling with a futuristic twist. Pick your numbers on the neon-lit board and watch the drawing protocol unfold in milliseconds.",
        rtp: "92.0%", maxWin: "10,000x", volatility: "Medium", provider: "StaticCore",
        stats: { totalPlays: 15000, biggestWin: "2,000 NEON", hotRate: 55 }
    },
    { 
        id: "g8", title: "Laser Dice", category: "Table", 
        image: "https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?auto=format&fit=crop&q=80&w=800", rating: 4.4,
        previewVideo: "https://assets.mixkit.co/videos/preview/mixkit-bright-neon-lights-pulsing-in-pink-and-blue-40015-large.mp4",
        description: "Physics-based dice rolling in a laser-grid arena. Bet on the outcome of high-speed digital dice rolls with dynamic multipliers and rapid-fire rounds.",
        rtp: "96.0%", maxWin: "100x", volatility: "Low", provider: "NeonGaming",
        stats: { totalPlays: 32000, biggestWin: "500 NEON", hotRate: 88 }
    },
    { 
        id: "g9", title: "Titan Slots", category: "Slots", 
        image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&q=80&w=800", rating: 4.8,
        previewVideo: "https://assets.mixkit.co/videos/preview/mixkit-abstract-cyber-connection-loop-23429-large.mp4",
        description: "Constructed for the high-rollers. Titan Slots features massive 10x10 reel grids, colossal symbols, and an industrial-tech atmosphere.",
        rtp: "97.5%", maxWin: "100,000x", volatility: "Extreme", provider: "Z-Entertain",
        stats: { totalPlays: 98000, biggestWin: "88,000 NEON", hotRate: 77 }
    },
];
