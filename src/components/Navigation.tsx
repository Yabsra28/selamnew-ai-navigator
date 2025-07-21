import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Target, 
  BookOpen, 
  CreditCard, 
  Clock, 
  Bot,
  BarChart3,
  Users,
  Calendar
} from "lucide-react";

const Navigation = () => {
  const navItems = [
    { icon: Building2, label: "Organization Structure" },
    { icon: Target, label: "OKR", active: true },
    { icon: BookOpen, label: "Learning & Growth" },
    { icon: CreditCard, label: "Payroll" },
    { icon: Clock, label: "Time & Attendance" },
  ];

  const okrSubItems = [
    { icon: BarChart3, label: "Dashboards" },
    { icon: Target, label: "My OKRs" },
    { icon: Users, label: "Team OKRs" },
    { icon: Calendar, label: "Planning & Reporting" },
    { icon: Bot, label: "AI Copilot Coach", isNew: true },
  ];

  return (
    <nav className="w-64 bg-card border-r border-border h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Selamnew</h1>
        <p className="text-sm text-muted-foreground">HR Management Platform</p>
      </div>

      <div className="space-y-2">
        {navItems.map((item, index) => (
          <div key={index}>
            <Button
              variant={item.active ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
            
            {item.active && (
              <div className="ml-6 mt-2 space-y-1">
                {okrSubItems.map((subItem, subIndex) => (
                  <Button
                    key={subIndex}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <subItem.icon className="mr-2 h-3 w-3" />
                    {subItem.label}
                    {subItem.isNew && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        AI
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;