// app/search/[id]/page.tsx
import SearchClient from './client';

export function generateStaticParams() {
  return [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
  ];
}

export default function SearchPage() {
  return <SearchClient />;
}