import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIInsightButtonProps {
  onClick: () => void;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}

const AIInsightButton = ({ 
  onClick, 
  variant = "outline", 
  size = "sm",
  className 
}: AIInsightButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden group transition-all duration-300",
        "border-primary/20 hover:border-primary/40",
        "bg-gradient-to-r from-primary/5 to-accent/5",
        "hover:from-primary/10 hover:to-accent/10",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {isHovered ? (
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
        ) : (
          <Brain className="h-4 w-4 text-primary" />
        )}
        <span className="font-medium">AI Insight</span>
      </div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent 
                      translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    </Button>
  );
};

export default AIInsightButton;