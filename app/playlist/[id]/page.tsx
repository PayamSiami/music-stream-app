// app/playlist/[id]/page.tsx
import MusicPlayerClient from './client';

// ✅ This is the server component - can use generateStaticParams
export function generateStaticParams() {
    return [
        { id: "1" },
        { id: "2" },
        { id: "3" },
        { id: "4" },
        { id: "5" },
        { id: "6" },
    ];
}

export default function MusicPlayerPage() {
    // This is a Server Component that just renders the client component
    return <MusicPlayerClient />;
}