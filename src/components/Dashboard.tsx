import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ObjectiveSetModal from "@/components/ObjectiveSetModal";
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  Users, 
  Calendar,
  Bot,
  Brain,
  Sparkles,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

const Dashboard = () => {
  const [isObjectiveModalOpen, setIsObjectiveModalOpen] = useState(false);
  const dashboardData = {
    summary: {
      totalOKRs: 24,
      completedOKRs: 18,
      atRiskOKRs: 3,
      averageProgress: 75
    },
    recentOKRs: [
      {
        title: "Improve customer satisfaction",
        owner: "Customer Success Team",
        progress: 85,
        status: "on-track",
        dueDate: "Q2 2024"
      },
      {
        title: "Increase monthly recurring revenue",
        owner: "Sales Team", 
        progress: 62,
        status: "at-risk",
        dueDate: "Q2 2024"
      },
      {
        title: "Launch new product feature",
        owner: "Product Team",
        progress: 90,
        status: "exceeding",
        dueDate: "Q1 2024"
      }
    ],
    aiInsights: [
      {
        type: "recommendation",
        title: "AI suggests reallocating resources to at-risk OKRs",
        description: "3 OKRs are behind schedule and could benefit from additional team support"
      },
      {
        type: "prediction",
        title: "Q2 completion rate predicted at 78%",
        description: "Based on current velocity, you're on track to meet quarterly goals"
      },
      {
        type: "optimization",
        title: "Team productivity could increase by 15%",
        description: "Implementing suggested workflow changes from AI analysis"
      }
    ]
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "exceeding": return "success";
      case "on-track": return "default";
      case "at-risk": return "warning";
      default: return "secondary";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">OKR Dashboard</h1>
          <p className="text-muted-foreground">Track objectives and key results across your organization</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            This Quarter
          </Button>
          <Button onClick={() => setIsObjectiveModalOpen(true)}>
            <Target className="mr-2 h-4 w-4" />
            Set OKR
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total OKRs</p>
                <p className="text-2xl font-bold">{dashboardData.summary.totalOKRs}</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-success">{dashboardData.summary.completedOKRs}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">At Risk</p>
                <p className="text-2xl font-bold text-warning">{dashboardData.summary.atRiskOKRs}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
                <p className="text-2xl font-bold">{dashboardData.summary.averageProgress}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent OKRs */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Recent OKRs
              </CardTitle>
              <CardDescription>Your most active objectives and key results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentOKRs.map((okr, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">{okr.title}</h3>
                        <p className="text-sm text-muted-foreground">{okr.owner}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusVariant(okr.status)}>
                          {okr.status.replace("-", " ")}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{okr.dueDate}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{okr.progress}%</span>
                      </div>
                      <Progress value={okr.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Insights
              </CardTitle>
              <CardDescription>Smart recommendations from your AI copilot</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.aiInsights.map((insight, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start gap-2">
                      <div className="p-1 rounded bg-primary/10">
                        {insight.type === 'recommendation' && <Bot className="h-3 w-3 text-primary" />}
                        {insight.type === 'prediction' && <TrendingUp className="h-3 w-3 text-primary" />}
                        {insight.type === 'optimization' && <Sparkles className="h-3 w-3 text-primary" />}
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="text-sm font-medium">{insight.title}</h4>
                        <p className="text-xs text-muted-foreground">{insight.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Bot className="mr-2 h-4 w-4" />
                Open AI Copilot
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <ObjectiveSetModal 
        isOpen={isObjectiveModalOpen}
        onClose={() => setIsObjectiveModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;