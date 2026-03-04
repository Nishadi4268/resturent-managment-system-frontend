import { ReactNode, useEffect, useRef } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

const FeatureCard = ({
  icon,
  title,
  description,
  image,
  imageAlt = title
}: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Trigger animation
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    const timer = setTimeout(() => {
      card.style.transition = "all 0.6s ease-out";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl overflow-hidden backdrop-blur-sm border border-orange-200/30 hover:border-primary/50 shadow-lg hover:shadow-2xl transition-all duration-500 group bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-orange-100/20 dark:from-orange-950/30 dark:via-amber-900/20 dark:to-orange-950/40 hover:-translate-y-2"
    >
      {image && (
        <div className="overflow-hidden h-48 w-full relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10"></div>
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      )}

      <div className="p-6 relative">
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-orange-500/5 rounded-full blur-xl"></div>

        <div className="relative z-10">
          <div className="rounded-lg bg-gradient-to-br from-primary/20 to-orange-500/10 hover:from-primary/30 hover:to-orange-500/20 w-14 h-14 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
            <div className="text-primary">{icon}</div>
          </div>

          <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-orange-700 to-orange-600 dark:from-orange-300 dark:to-orange-200 bg-clip-text text-transparent group-hover:from-primary group-hover:to-orange-500 transition-all duration-300">
            {title}
          </h3>

          <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
            {description}
          </p>

          <div className="mt-4 h-1 w-0 bg-gradient-to-r from-primary to-orange-500 group-hover:w-12 transition-all duration-500"></div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
