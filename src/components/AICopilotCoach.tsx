import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Bot, 
  Target, 
  Lightbulb, 
  TrendingUp, 
  Calendar,
  CheckCircle2,
  Sparkles,
  BarChart3
} from "lucide-react";
import { toast } from "sonner";

const AICopilotCoach = () => {
  const [objective, setObjective] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  const generateRecommendations = async () => {
    if (!objective.trim()) {
      toast.error("Please enter an objective first");
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockRecommendations = {
        keyResults: [
          {
            title: "Increase customer satisfaction score from 7.5 to 9.0",
            confidence: 95,
            timeframe: "Q2 2024",
            metrics: ["CSAT Score", "NPS", "Customer Feedback"]
          },
          {
            title: "Reduce average response time from 24hrs to 4hrs",
            confidence: 88,
            timeframe: "Q2 2024", 
            metrics: ["Response Time", "Ticket Volume", "Resolution Rate"]
          },
          {
            title: "Achieve 95% first-call resolution rate",
            confidence: 82,
            timeframe: "Q2 2024",
            metrics: ["FCR Rate", "Escalation Rate", "Training Hours"]
          }
        ],
        milestones: [
          { title: "Implement new support ticketing system", week: 2 },
          { title: "Train support team on new processes", week: 4 },
          { title: "Launch customer feedback program", week: 6 },
          { title: "Mid-quarter performance review", week: 8 },
          { title: "Optimize based on feedback", week: 10 }
        ],
        riskFactors: [
          "Team capacity constraints during implementation",
          "Customer adoption of new support channels",
          "Integration challenges with existing systems"
        ],
        suggestions: [
          "Consider phased rollout to minimize disruption",
          "Establish clear communication channels with customers",
          "Set up weekly check-ins with technical team"
        ]
      };
      
      setRecommendations(mockRecommendations);
      setIsGenerating(false);
      toast.success("AI recommendations generated successfully!");
    }, 2000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
          <Bot className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">AI Copilot Coach</h1>
          <p className="text-muted-foreground">Get smart recommendations for your OKRs</p>
        </div>
      </div>

      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Define Your Objective
          </CardTitle>
          <CardDescription>
            Describe what you want to achieve, and AI will suggest key results and milestones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="objective">Objective</Label>
            <Textarea
              id="objective"
              placeholder="e.g., Improve customer support experience and satisfaction..."
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <Button 
            onClick={generateRecommendations} 
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Bot className="mr-2 h-4 w-4 animate-spin" />
                Generating AI Recommendations...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Smart Recommendations
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Recommendations Section */}
      {recommendations && (
        <div className="space-y-6">
          {/* Key Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Recommended Key Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.keyResults.map((kr, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium">{kr.title}</h3>
                    <Badge variant="secondary">
                      {kr.confidence}% confidence
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {kr.timeframe}
                    </span>
                    <span>Metrics: {kr.metrics.join(", ")}</span>
                  </div>
                  <Progress value={kr.confidence} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                Suggested Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendations.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                      {milestone.week}
                    </div>
                    <span className="font-medium">{milestone.title}</span>
                    <Badge variant="outline" className="ml-auto">
                      Week {milestone.week}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <TrendingUp className="h-5 w-5" />
                  Risk Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendations.riskFactors.map((risk, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-warning mt-2 flex-shrink-0" />
                      {risk}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-success">
                  <Lightbulb className="h-5 w-5" />
                  AI Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendations.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-success mt-2 flex-shrink-0" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default AICopilotCoach;