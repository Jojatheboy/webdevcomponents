import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
  target?: string;
}

export function AnimatedButton({
  href,
  children,
  icon,
  variant = "primary",
  className,
  target,
}: AnimatedButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={cn(
        "relative text-xs sm:text-sm font-semibold rounded-full h-10 sm:h-12 p-1 ps-5 pe-12 sm:ps-6 sm:pe-14 group transition-all duration-500 md:hover:ps-14 md:hover:pe-6 w-fit max-w-full overflow-hidden cursor-pointer inline-flex items-center tracking-wide",
        isPrimary
          ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-light)]"
          : "border border-white/20 text-white/70 hover:border-[var(--accent)]/50 hover:text-white",
        className
      )}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <span className="relative z-10 transition-all duration-500">
        {children}
      </span>
      <div
        className={cn(
          "absolute right-1 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-500 md:group-hover:right-[calc(100%-44px)] md:group-hover:rotate-45",
          isPrimary
            ? "bg-white/20 text-white"
            : "bg-white/10 text-white/70 group-hover:text-[var(--accent)]"
        )}
      >
        {icon || <ArrowUpRight size={16} />}
      </div>
    </a>
  );
}
