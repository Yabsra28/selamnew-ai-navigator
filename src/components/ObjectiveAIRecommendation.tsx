import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Brain, Target, TrendingUp, Clock, CheckCircle, X } from "lucide-react";

interface KeyResultSuggestion {
  id: string;
  title: string;
  description: string;
  weight: number;
  deadline: string;
  milestones: string[];
  confidence: number;
  alignment: string;
}

interface ObjectiveAIRecommendationProps {
  isOpen: boolean;
  onClose: () => void;
  supervisorKeyResult?: string;
  onApprove: (keyResults: KeyResultSuggestion[]) => void;
}

const ObjectiveAIRecommendation = ({
  isOpen,
  onClose,
  supervisorKeyResult = "Improve team productivity by 25%",
  onApprove
}: ObjectiveAIRecommendationProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedKeyResults, setSelectedKeyResults] = useState<string[]>([]);
  const { toast } = useToast();

  // Mock AI-generated key results
  const mockKeyResults: KeyResultSuggestion[] = [
    {
      id: "kr1",
      title: "Reduce task completion time by 20%",
      description: "Implement automation tools and streamline processes to accelerate task delivery",
      weight: 30,
      deadline: "2024-03-31",
      milestones: [
        "Identify top 5 time-consuming processes",
        "Research and select automation tools",
        "Implement pilot automation program",
        "Measure and analyze time savings"
      ],
      confidence: 85,
      alignment: "Directly supports supervisor's productivity goal"
    },
    {
      id: "kr2",
      title: "Increase team collaboration score by 15%",
      description: "Enhance team communication and knowledge sharing practices",
      weight: 25,
      deadline: "2024-03-31",
      milestones: [
        "Conduct collaboration assessment",
        "Implement weekly knowledge sharing sessions",
        "Deploy collaboration platform",
        "Measure collaboration metrics"
      ],
      confidence: 92,
      alignment: "Enables better team productivity through collaboration"
    },
    {
      id: "kr3",
      title: "Complete 3 process optimization initiatives",
      description: "Identify and optimize key workflow bottlenecks",
      weight: 20,
      deadline: "2024-03-31",
      milestones: [
        "Map current workflows",
        "Identify optimization opportunities",
        "Implement optimization solutions",
        "Validate improvements"
      ],
      confidence: 78,
      alignment: "Removes productivity barriers for the team"
    },
    {
      id: "kr4",
      title: "Achieve 95% on-time delivery rate",
      description: "Improve project planning and execution to meet deadlines consistently",
      weight: 25,
      deadline: "2024-03-31",
      milestones: [
        "Analyze current delivery metrics",
        "Implement project tracking system",
        "Establish quality gates",
        "Monitor and adjust processes"
      ],
      confidence: 88,
      alignment: "Demonstrates productivity through reliable delivery"
    }
  ];

  const handleGenerateRecommendations = async () => {
    setIsGenerating(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    
    toast({
      title: "AI Recommendations Generated",
      description: "Smart key results aligned with your supervisor's objectives",
    });
  };

  const toggleKeyResult = (id: string) => {
    setSelectedKeyResults(prev => 
      prev.includes(id) 
        ? prev.filter(krId => krId !== id)
        : [...prev, id]
    );
  };

  const handleApproveSelected = () => {
    const approved = mockKeyResults.filter(kr => selectedKeyResults.includes(kr.id));
    onApprove(approved);
    onClose();
    
    toast({
      title: "Key Results Added",
      description: `${approved.length} AI-recommended key results have been added to your objective`,
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600";
    if (confidence >= 80) return "text-blue-600";
    if (confidence >= 70) return "text-yellow-600";
    return "text-gray-600";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Key Result Recommendations
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Supervisor Context */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Supervisor's Key Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="font-medium">{supervisorKeyResult}</span>
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          {!isGenerating && mockKeyResults.length === 0 && (
            <div className="text-center py-8">
              <Button onClick={handleGenerateRecommendations} size="lg">
                <Brain className="h-4 w-4 mr-2" />
                Generate AI Recommendations
              </Button>
            </div>
          )}

          {/* Loading State */}
          {isGenerating && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">AI is analyzing and generating aligned key results...</p>
            </div>
          )}

          {/* Recommendations */}
          {!isGenerating && mockKeyResults.length > 0 && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recommended Key Results</h3>
                <Badge variant="secondary">
                  {selectedKeyResults.length} selected
                </Badge>
              </div>

              <div className="grid gap-4">
                {mockKeyResults.map((keyResult) => (
                  <Card 
                    key={keyResult.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedKeyResults.includes(keyResult.id)
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => toggleKeyResult(keyResult.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {selectedKeyResults.includes(keyResult.id) ? (
                            <CheckCircle className="h-5 w-5 text-primary" />
                          ) : (
                            <div className="h-5 w-5 border-2 border-muted-foreground/30 rounded-full" />
                          )}
                          <CardTitle className="text-base">{keyResult.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getConfidenceColor(keyResult.confidence)}>
                            {keyResult.confidence}% confidence
                          </Badge>
                          <Badge variant="secondary">
                            {keyResult.weight}% weight
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{keyResult.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Due: {new Date(keyResult.deadline).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          <span>{keyResult.alignment}</span>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="text-sm font-medium mb-2">Suggested Milestones</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {keyResult.milestones.map((milestone, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-primary/30 rounded-full" />
                              <span className="text-muted-foreground">{milestone}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t">
                <Button variant="outline" onClick={onClose}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={handleGenerateRecommendations}
                    disabled={isGenerating}
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                  
                  <Button
                    onClick={handleApproveSelected}
                    disabled={selectedKeyResults.length === 0}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Add Selected Key Results ({selectedKeyResults.length})
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ObjectiveAIRecommendation;