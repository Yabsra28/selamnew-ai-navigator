import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Plus, X, Calendar, Weight, Target } from "lucide-react";
import AIInsightButton from "./AIInsightButton";
import ObjectiveAIRecommendation from "./ObjectiveAIRecommendation";

interface KeyResult {
  id: string;
  title: string;
  weight: number;
  deadline: string;
  milestones: string[];
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

interface ObjectiveSetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ObjectiveSetModal = ({ isOpen, onClose }: ObjectiveSetModalProps) => {
  const [objectiveName, setObjectiveName] = useState("");
  const [supervisorKeyResult, setSupervisorKeyResult] = useState("");
  const [objectiveDeadline, setObjectiveDeadline] = useState("");
  const [keyResults, setKeyResults] = useState<KeyResult[]>([]);
  const [showAIRecommendation, setShowAIRecommendation] = useState(false);
  const [newKeyResult, setNewKeyResult] = useState({
    title: "",
    weight: "",
    deadline: ""
  });
  
  const { toast } = useToast();

  // Mock supervisor key results
  const supervisorKeyResults = [
    "Improve team productivity by 25%",
    "Increase customer satisfaction to 95%",
    "Reduce operational costs by 15%",
    "Launch 3 new product features",
    "Achieve 99.9% system uptime"
  ];

  const handleAddKeyResult = () => {
    if (!newKeyResult.title || !newKeyResult.weight || !newKeyResult.deadline) {
      toast({
        title: "Missing Information",
        description: "Please fill in all key result fields",
        variant: "destructive"
      });
      return;
    }

    const keyResult: KeyResult = {
      id: `kr_${Date.now()}`,
      title: newKeyResult.title,
      weight: parseInt(newKeyResult.weight),
      deadline: newKeyResult.deadline,
      milestones: []
    };

    setKeyResults(prev => [...prev, keyResult]);
    setNewKeyResult({ title: "", weight: "", deadline: "" });
    
    toast({
      title: "Key Result Added",
      description: "Key result has been added to your objective"
    });
  };

  const handleRemoveKeyResult = (id: string) => {
    setKeyResults(prev => prev.filter(kr => kr.id !== id));
  };

  const handleAIRecommendationApprove = (objective: ObjectiveSuggestion, aiKeyResults: any[], selectedSupervisorKR: any) => {
    // Apply the objective suggestion
    setObjectiveName(objective.title);
    
    const newKeyResults: KeyResult[] = aiKeyResults.map(kr => ({
      id: kr.id,
      title: kr.title,
      weight: kr.weight,
      deadline: kr.deadline,
      milestones: kr.milestones
    }));
    
    setKeyResults(prev => [...prev, ...newKeyResults]);
    setSupervisorKeyResult(selectedSupervisorKR.title);
    setObjectiveDeadline(selectedSupervisorKR.deadline);
    setShowAIRecommendation(false);
    
    toast({
      title: "AI Recommendations Applied",
      description: `Applied objective "${objective.title}" with ${newKeyResults.length} key results and supervisor alignment`,
    });
  };

  const handleSaveObjective = () => {
    if (!objectiveName || !supervisorKeyResult || !objectiveDeadline) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (keyResults.length === 0) {
      toast({
        title: "No Key Results",
        description: "Please add at least one key result to your objective",
        variant: "destructive"
      });
      return;
    }

    // Calculate total weight
    const totalWeight = keyResults.reduce((sum, kr) => sum + kr.weight, 0);
    if (totalWeight !== 100) {
      toast({
        title: "Weight Mismatch",
        description: `Total weight should be 100%. Current total: ${totalWeight}%`,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Objective Saved",
      description: "Your objective has been successfully created with key results"
    });
    
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Set Objective</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Objective Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="objectiveName">Objective Name *</Label>
                <Input
                  id="objectiveName"
                  value={objectiveName}
                  onChange={(e) => setObjectiveName(e.target.value)}
                  placeholder="Enter your objective name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="objectiveDeadline">Objective Deadline *</Label>
                <Input
                  id="objectiveDeadline"
                  type="date"
                  value={objectiveDeadline}
                  onChange={(e) => setObjectiveDeadline(e.target.value)}
                />
              </div>
            </div>

            {/* Supervisor Key Result */}
            <div className="space-y-2">
              <Label htmlFor="supervisorKeyResult">Supervisor Key Result *</Label>
              <Select value={supervisorKeyResult} onValueChange={setSupervisorKeyResult}>
                <SelectTrigger>
                  <SelectValue placeholder="Search and select a Key Result" />
                </SelectTrigger>
                <SelectContent>
                  {supervisorKeyResults.map((kr, index) => (
                    <SelectItem key={index} value={kr}>
                      {kr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Set Key Results Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Set Key Results</h3>
                <AIInsightButton 
                  onClick={() => setShowAIRecommendation(true)}
                  className="ml-auto"
                />
              </div>

              {/* Add New Key Result */}
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Key Result
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="keyResultName">Key Result Name</Label>
                      <Input
                        id="keyResultName"
                        value={newKeyResult.title}
                        onChange={(e) => setNewKeyResult(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter key result name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="weight">Weight (%)</Label>
                      <Input
                        id="weight"
                        type="number"
                        min="0"
                        max="100"
                        value={newKeyResult.weight}
                        onChange={(e) => setNewKeyResult(prev => ({ ...prev, weight: e.target.value }))}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="deadline">Deadline</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={newKeyResult.deadline}
                        onChange={(e) => setNewKeyResult(prev => ({ ...prev, deadline: e.target.value }))}
                      />
                    </div>
                    
                    <div className="flex items-end">
                      <Button onClick={handleAddKeyResult} className="w-full">
                        Add Key Result
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Existing Key Results */}
              {keyResults.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Key Results ({keyResults.length})</h4>
                    <Badge variant={keyResults.reduce((sum, kr) => sum + kr.weight, 0) === 100 ? "default" : "destructive"}>
                      Total Weight: {keyResults.reduce((sum, kr) => sum + kr.weight, 0)}%
                    </Badge>
                  </div>
                  
                  {keyResults.map((keyResult) => (
                    <Card key={keyResult.id} className="bg-muted/30">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-medium mb-2">{keyResult.title}</h5>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Weight className="h-3 w-3" />
                                <span>{keyResult.weight}%</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(keyResult.deadline).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveKeyResult(keyResult.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              
              <Button onClick={handleSaveObjective}>
                Save Objective
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Recommendation Modal */}
      <ObjectiveAIRecommendation
        isOpen={showAIRecommendation}
        onClose={() => setShowAIRecommendation(false)}
        onApprove={handleAIRecommendationApprove}
      />
    </>
  );
};

export default ObjectiveSetModal;
