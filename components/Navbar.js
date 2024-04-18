import Link from "next/link";

export default function Navbar(params) {
  return (
    <div className="fixed top-0 left-0 flex items-center px-4 md:px-20 w-full h-16 bg-background border-b border-blue-500 shadow-blue-200/10 shadow-md">
      <Link href="/">
        <p className="text-white text-base font-sans">Home</p>
      </Link>
      <Link className="ml-4" href="/leaderboard">
        <p className="text-white text-base font-sans">Leader Board</p>
      </Link>
    </div>
  );
}
