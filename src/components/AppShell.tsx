"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Bell, ChartNoAxesColumn, Home, PieChart, PlaySquare, Star, UserRound } from "lucide-react";

const navItems = [
  { href: "/", label: "홈", icon: Home },
  { href: "/candidates", label: "후보종목", icon: Star },
  { href: "/alerts/eco-alert", label: "알림", icon: Bell },
  { href: "/replay", label: "리플레이", icon: PlaySquare },
  { href: "/investment", label: "내투자", icon: PieChart }
];

export function AppShell({
  children,
  dark = false,
  hideNav = false
}: {
  children: ReactNode;
  dark?: boolean;
  hideNav?: boolean;
}) {
  return (
    <main className={dark ? "app-outer dark-outer" : "app-outer"}>
      <section className={dark ? "phone dark-phone" : "phone"}>
        <StatusBar dark={dark} />
        <div className={hideNav ? "screen no-nav" : "screen"}>{children}</div>
        {!hideNav && <BottomNav dark={dark} />}
      </section>
    </main>
  );
}

export function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div className={dark ? "status-bar dark-status" : "status-bar"}>
      <span>9:41</span>
      <span className="status-icons">▮▮▮  WiFi  ▰</span>
    </div>
  );
}

export function BottomNav({ dark = false }: { dark?: boolean }) {
  const pathname = usePathname();
  return (
    <nav className={dark ? "bottom-nav dark-nav" : "bottom-nav"} aria-label="주요 탭">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.split("/")[1] ? `/${item.href.split("/")[1]}` : item.href);
        return (
          <Link key={item.href} href={item.href} className={active ? "nav-item active" : "nav-item"}>
            <Icon size={26} strokeWidth={active ? 2.8 : 2.2} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function TopBar({
  title,
  right,
  dark = false
}: {
  title: string;
  right?: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <header className={dark ? "top-bar dark-top" : "top-bar"}>
      <Link href="/" className="icon-link" aria-label="뒤로">
        ‹
      </Link>
      <h1>{title}</h1>
      <div className="top-right">{right ?? <UserRound size={24} />}</div>
    </header>
  );
}

export function SectionCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`card ${className}`}>{children}</section>;
}

export function Pill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "blue" | "red" | "green" | "purple" | "orange" }) {
  return <span className={`pill ${tone}`}>{children}</span>;
}

export function Logo() {
  return (
    <div className="logo">
      <span className="logo-bubble">
        <ChartNoAxesColumn size={30} />
      </span>
      <span>식톡</span>
    </div>
  );
}
