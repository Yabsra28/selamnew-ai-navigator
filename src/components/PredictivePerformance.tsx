import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Target,
  Calendar,
  Users,
  BarChart3,
  Brain,
  Zap
} from "lucide-react";

const PredictivePerformance = () => {
  const performanceData = {
    overallScore: 78,
    trend: "up",
    predictions: [
      {
        metric: "Q2 OKR Completion",
        current: 65,
        predicted: 82,
        confidence: 89,
        status: "on-track"
      },
      {
        metric: "Team Performance",
        current: 72,
        predicted: 68,
        confidence: 76,
        status: "at-risk"
      },
      {
        metric: "Individual Goals",
        current: 85,
        predicted: 90,
        confidence: 94,
        status: "exceeding"
      }
    ],
    insights: [
      {
        type: "positive",
        title: "Strong momentum in individual goals",
        description: "Team members are consistently exceeding personal objectives",
        impact: "high"
      },
      {
        type: "warning", 
        title: "Team collaboration metrics declining",
        description: "Cross-functional project completion rates dropping",
        impact: "medium"
      },
      {
        type: "opportunity",
        title: "AI suggests focused sprint planning",
        description: "Implementing 2-week sprints could boost completion by 15%",
        impact: "high"
      }
    ],
    recommendations: [
      {
        title: "Schedule team alignment sessions",
        urgency: "high",
        effort: "low",
        impact: "high"
      },
      {
        title: "Implement peer review process",
        urgency: "medium", 
        effort: "medium",
        impact: "high"
      },
      {
        title: "Adjust Q2 timeline expectations",
        urgency: "low",
        effort: "low",
        impact: "medium"
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "exceeding": return "success";
      case "on-track": return "default";
      case "at-risk": return "warning";
      default: return "secondary";
    }
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case "positive": return TrendingUp;
      case "warning": return AlertTriangle;
      case "opportunity": return Zap;
      default: return BarChart3;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
          <Brain className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Predictive Performance Tracking</h1>
          <p className="text-muted-foreground">AI-powered insights into team and individual performance</p>
        </div>
      </div>

      {/* Overall Performance Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Overall Performance Score
            </span>
            <Badge variant={performanceData.trend === "up" ? "default" : "secondary"}>
              {performanceData.trend === "up" ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {performanceData.trend === "up" ? "Trending Up" : "Trending Down"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-primary">{performanceData.overallScore}%</div>
            <Progress value={performanceData.overallScore} className="h-3" />
            <p className="text-sm text-muted-foreground">
              Based on current trajectory and historical data
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Performance Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Performance Predictions
          </CardTitle>
          <CardDescription>
            AI-generated forecasts for key performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {performanceData.predictions.map((prediction, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{prediction.metric}</h3>
                  <Badge variant={getStatusColor(prediction.status)}>
                    {prediction.status.replace("-", " ")}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Current</p>
                    <p className="text-lg font-semibold">{prediction.current}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Predicted</p>
                    <p className="text-lg font-semibold">{prediction.predicted}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Confidence</p>
                    <p className="text-lg font-semibold">{prediction.confidence}%</p>
                  </div>
                </div>
                <Progress value={prediction.predicted} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceData.insights.map((insight, index) => {
              const IconComponent = getInsightIcon(insight.type);
              return (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      insight.type === 'positive' ? 'bg-success/10' :
                      insight.type === 'warning' ? 'bg-warning/10' : 'bg-primary/10'
                    }`}>
                      <IconComponent className={`h-4 w-4 ${
                        insight.type === 'positive' ? 'text-success' :
                        insight.type === 'warning' ? 'text-warning' : 'text-primary'
                      }`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{insight.title}</h3>
                        <Badge variant="outline" size="sm">
                          {insight.impact} impact
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Smart Recommendations
          </CardTitle>
          <CardDescription>
            Actionable steps to improve performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {performanceData.recommendations.map((rec, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{rec.title}</h3>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline" size="sm">
                      {rec.urgency} urgency
                    </Badge>
                    <Badge variant="outline" size="sm">
                      {rec.effort} effort
                    </Badge>
                    <Badge variant="outline" size="sm">
                      {rec.impact} impact
                    </Badge>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Implement
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictivePerformance;