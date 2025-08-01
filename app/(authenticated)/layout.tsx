import { Home, Dumbbell, Calendar, User, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <nav className="relative z-20 bg-black/80 backdrop-blur-md border-t border-white/20">
        <div className="flex justify-around items-center px-4 py-3">
          <Link
            href="/"
            className="flex flex-col items-center space-y-1 text-white hover:text-blue-400 transition-colors"
          >
            <Home size={24} />
            <span className="text-xs font-medium">Home</span>
          </Link>

          <Link
            href="/workouts"
            className="flex flex-col items-center space-y-1 text-white hover:text-green-400 transition-colors"
          >
            <Dumbbell size={24} />
            <span className="text-xs font-medium">Workouts</span>
          </Link>

          <Link
            href="/schedule"
            className="flex flex-col items-center space-y-1 text-white hover:text-purple-400 transition-colors"
          >
            <Calendar size={24} />
            <span className="text-xs font-medium">Schedule</span>
          </Link>

          <Link
            href="/progress"
            className="flex flex-col items-center space-y-1 text-white hover:text-orange-400 transition-colors"
          >
            <BarChart3 size={24} />
            <span className="text-xs font-medium">Progress</span>
          </Link>

          <Link
            href="/profile"
            className="flex flex-col items-center space-y-1 text-white hover:text-pink-400 transition-colors"
          >
            <User size={24} />
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
