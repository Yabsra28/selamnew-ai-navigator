import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Brain, Target, TrendingUp, Clock, CheckCircle, X, Users, Edit3, Save } from "lucide-react";

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

interface SupervisorKeyResult {
  id: string;
  title: string;
  department: string;
  supervisor: string;
  deadline: string;
  progress: number;
}

interface ObjectiveSuggestion {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  timeframe: string;
  alignment: string;
  confidence: number;
}

interface ObjectiveAIRecommendationProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: (objective: ObjectiveSuggestion, keyResults: KeyResultSuggestion[], selectedSupervisorKR: SupervisorKeyResult) => void;
}

const ObjectiveAIRecommendation = ({
  isOpen,
  onClose,
  onApprove
}: ObjectiveAIRecommendationProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedKeyResults, setSelectedKeyResults] = useState<string[]>([]);
  const [selectedSupervisorKR, setSelectedSupervisorKR] = useState<string>("");
  const [editingKeyResults, setEditingKeyResults] = useState<{[key: string]: KeyResultSuggestion}>({});
  const [editingKeyResult, setEditingKeyResult] = useState<string | null>(null);
  const [editingObjective, setEditingObjective] = useState<ObjectiveSuggestion | null>(null);
  const [isEditingObjective, setIsEditingObjective] = useState(false);
  const { toast } = useToast();

  // Mock supervisor key results
  const supervisorKeyResults: SupervisorKeyResult[] = [
    {
      id: "skr1",
      title: "Improve team productivity by 25%",
      department: "Engineering",
      supervisor: "John Smith (Engineering Manager)",
      deadline: "2024-06-30",
      progress: 45
    },
    {
      id: "skr2", 
      title: "Increase customer satisfaction score to 4.8/5",
      department: "Customer Success",
      supervisor: "Sarah Johnson (CS Director)",
      deadline: "2024-05-31",
      progress: 70
    },
    {
      id: "skr3",
      title: "Reduce operational costs by 15%",
      department: "Operations",
      supervisor: "Mike Wilson (Operations Lead)",
      deadline: "2024-04-30",
      progress: 30
    },
    {
      id: "skr4",
      title: "Launch 3 new product features",
      department: "Product",
      supervisor: "Lisa Chen (Product Manager)",
      deadline: "2024-07-31",
      progress: 60
    }
  ];

  const selectedSupervisorKRData = supervisorKeyResults.find(kr => kr.id === selectedSupervisorKR);

  // Mock AI-generated objective suggestion
  const mockObjective: ObjectiveSuggestion = {
    id: "obj1",
    title: "Enhance Team Productivity Through Process Optimization",
    description: "Drive significant improvements in team efficiency by implementing automated workflows, enhancing collaboration tools, and optimizing key processes to support the supervisor's productivity targets.",
    priority: "High",
    timeframe: "Q1 2024",
    alignment: "Directly aligns with supervisor's goal to improve team productivity by 25%",
    confidence: 92
  };

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
    if (!selectedSupervisorKR) {
      toast({
        title: "Please select a supervisor's key result",
        description: "Choose which supervisor's objective you want to align with",
        variant: "destructive"
      });
      return;
    }

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
    if (!selectedSupervisorKRData) return;
    
    // Use edited versions if available, otherwise use original
    const approved = selectedKeyResults.map(id => {
      const edited = editingKeyResults[id];
      const original = mockKeyResults.find(kr => kr.id === id);
      return edited || original!;
    });

    const finalObjective = editingObjective || mockObjective;
    
    onApprove(finalObjective, approved, selectedSupervisorKRData);
    onClose();
    
    toast({
      title: "Objective and Key Results Added",
      description: `AI-recommended objective with ${approved.length} key results aligned with ${selectedSupervisorKRData.supervisor}'s objective`,
    });
  };

  const startEditingObjective = () => {
    setIsEditingObjective(true);
    setEditingObjective({ ...mockObjective });
  };

  const saveObjectiveEdit = () => {
    setIsEditingObjective(false);
    toast({
      title: "Objective Updated",
      description: "Objective has been updated with your changes",
    });
  };

  const cancelObjectiveEdit = () => {
    setIsEditingObjective(false);
    setEditingObjective(null);
  };

  const updateEditingObjective = (field: keyof ObjectiveSuggestion, value: any) => {
    setEditingObjective(prev => prev ? {
      ...prev,
      [field]: value
    } : null);
  };

  const startEditing = (keyResult: KeyResultSuggestion) => {
    setEditingKeyResult(keyResult.id);
    setEditingKeyResults(prev => ({
      ...prev,
      [keyResult.id]: { ...keyResult }
    }));
  };

  const saveEdit = (id: string) => {
    setEditingKeyResult(null);
    toast({
      title: "Changes Saved",
      description: "Key result has been updated with your changes",
    });
  };

  const cancelEdit = (id: string) => {
    setEditingKeyResult(null);
    setEditingKeyResults(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const updateEditingKeyResult = (id: string, field: keyof KeyResultSuggestion, value: any) => {
    setEditingKeyResults(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
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
          {/* Supervisor Key Result Selection */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Select Supervisor's Key Result to Align With
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedSupervisorKR} onValueChange={setSelectedSupervisorKR}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your supervisor's key result..." />
                </SelectTrigger>
                <SelectContent>
                  {supervisorKeyResults.map((kr) => (
                    <SelectItem key={kr.id} value={kr.id}>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{kr.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {kr.supervisor} • {kr.department} • {kr.progress}% complete
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedSupervisorKRData && (
                <div className="mt-3 p-3 bg-background rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="font-medium">{selectedSupervisorKRData.title}</span>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Supervisor: {selectedSupervisorKRData.supervisor}</p>
                    <p>Department: {selectedSupervisorKRData.department}</p>
                    <p>Due: {new Date(selectedSupervisorKRData.deadline).toLocaleDateString()}</p>
                    <div className="flex items-center gap-2">
                      <span>Progress: {selectedSupervisorKRData.progress}%</span>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${selectedSupervisorKRData.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Generate Button */}
          {!isGenerating && (!selectedSupervisorKR || mockKeyResults.length === 0) && (
            <div className="text-center py-8">
              <Button 
                onClick={handleGenerateRecommendations} 
                size="lg"
                disabled={!selectedSupervisorKR}
              >
                <Brain className="h-4 w-4 mr-2" />
                Generate AI Recommendations
              </Button>
              {!selectedSupervisorKR && (
                <p className="text-sm text-muted-foreground mt-2">
                  Please select a supervisor's key result first
                </p>
              )}
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
          {!isGenerating && selectedSupervisorKR && mockKeyResults.length > 0 && (
            <>
              {/* Objective Suggestion */}
              <Card className="border-green-200 bg-green-50/50">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <Target className="h-5 w-5 text-green-600" />
                      {isEditingObjective ? (
                        <Input
                          value={editingObjective?.title || ''}
                          onChange={(e) => updateEditingObjective('title', e.target.value)}
                          className="flex-1 font-medium"
                          placeholder="Objective title..."
                        />
                      ) : (
                        <CardTitle className="text-base flex-1">
                          {editingObjective?.title || mockObjective.title}
                        </CardTitle>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {isEditingObjective ? (
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={saveObjectiveEdit}
                          >
                            <Save className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={cancelObjectiveEdit}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={startEditingObjective}
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                      )}
                      
                      <Badge variant="outline" className="text-green-600">
                        {editingObjective?.confidence || mockObjective.confidence}% confidence
                      </Badge>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {editingObjective?.priority || mockObjective.priority} Priority
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  {isEditingObjective ? (
                    <Textarea
                      value={editingObjective?.description || ''}
                      onChange={(e) => updateEditingObjective('description', e.target.value)}
                      className="text-sm"
                      placeholder="Objective description..."
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {editingObjective?.description || mockObjective.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {isEditingObjective ? (
                        <Input
                          value={editingObjective?.timeframe || ''}
                          onChange={(e) => updateEditingObjective('timeframe', e.target.value)}
                          className="text-xs h-6 w-20"
                          placeholder="Q1 2024"
                        />
                      ) : (
                        <span>Timeframe: {editingObjective?.timeframe || mockObjective.timeframe}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>Alignment: {editingObjective?.alignment || mockObjective.alignment}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Recommended Key Results
                </h3>
                <Badge variant="secondary">
                  {selectedKeyResults.length} selected
                </Badge>
              </div>

              <div className="grid gap-4">
                {mockKeyResults.map((keyResult) => {
                  const editedVersion = editingKeyResults[keyResult.id];
                  const currentKeyResult = editedVersion || keyResult;
                  const isEditing = editingKeyResult === keyResult.id;
                  
                  return (
                    <Card 
                      key={keyResult.id}
                      className={`transition-all duration-200 ${
                        selectedKeyResults.includes(keyResult.id)
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2 flex-1">
                            <div 
                              className="cursor-pointer"
                              onClick={() => !isEditing && toggleKeyResult(keyResult.id)}
                            >
                              {selectedKeyResults.includes(keyResult.id) ? (
                                <CheckCircle className="h-5 w-5 text-primary" />
                              ) : (
                                <div className="h-5 w-5 border-2 border-muted-foreground/30 rounded-full" />
                              )}
                            </div>
                            
                            {isEditing ? (
                              <Input
                                value={currentKeyResult.title}
                                onChange={(e) => updateEditingKeyResult(keyResult.id, 'title', e.target.value)}
                                className="flex-1 font-medium"
                                placeholder="Key result title..."
                              />
                            ) : (
                              <CardTitle className="text-base flex-1">{currentKeyResult.title}</CardTitle>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {isEditing ? (
                              <div className="flex gap-1">
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => saveEdit(keyResult.id)}
                                >
                                  <Save className="h-3 w-3" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => cancelEdit(keyResult.id)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => startEditing(keyResult)}
                              >
                                <Edit3 className="h-3 w-3" />
                              </Button>
                            )}
                            
                            <Badge variant="outline" className={getConfidenceColor(currentKeyResult.confidence)}>
                              {currentKeyResult.confidence}% confidence
                            </Badge>
                            <Badge variant="secondary">
                              {currentKeyResult.weight}% weight
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-3">
                        {isEditing ? (
                          <Textarea
                            value={currentKeyResult.description}
                            onChange={(e) => updateEditingKeyResult(keyResult.id, 'description', e.target.value)}
                            className="text-sm"
                            placeholder="Key result description..."
                            rows={2}
                          />
                        ) : (
                          <p className="text-sm text-muted-foreground">{currentKeyResult.description}</p>
                        )}
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {isEditing ? (
                              <Input
                                type="date"
                                value={currentKeyResult.deadline}
                                onChange={(e) => updateEditingKeyResult(keyResult.id, 'deadline', e.target.value)}
                                className="text-xs h-6 w-32"
                              />
                            ) : (
                              <span>Due: {new Date(currentKeyResult.deadline).toLocaleDateString()}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            <span>{currentKeyResult.alignment}</span>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="text-sm font-medium mb-2">Suggested Milestones</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {currentKeyResult.milestones.map((milestone, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 bg-primary/30 rounded-full" />
                                <span className="text-muted-foreground">{milestone}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
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
                    disabled={selectedKeyResults.length === 0 || !selectedSupervisorKRData}
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