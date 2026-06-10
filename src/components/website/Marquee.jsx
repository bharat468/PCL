import { cn } from "@/lib/utils";

export default function Marquee({
  children,
  speed = 50,
  direction = "left",
  pauseOnHover = false,
  className = "",
  ...props
}) {
  return (
    <div
      className={cn("relative overflow-hidden whitespace-nowrap", className)}
      {...props}
    >
      <div
        className={cn(
          "inline-block animate-marquee",
          pauseOnHover && "hover:pause",
          direction === "right" && "animate-marquee-reverse"
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {children}
      </div>
      <div
        className={cn(
          "absolute top-0 inline-block animate-marquee",
          pauseOnHover && "hover:pause",
          direction === "right" && "animate-marquee-reverse"
        )}
        style={{
          animationDuration: `${speed}s`,
        }}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
