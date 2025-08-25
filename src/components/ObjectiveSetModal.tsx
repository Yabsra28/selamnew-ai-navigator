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
import InlineAISuggestions from "./InlineAISuggestions";

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

  const handleAddAISuggestion = (suggestion: any) => {
    const keyResult: KeyResult = {
      id: suggestion.id,
      title: suggestion.title,
      weight: suggestion.weight,
      deadline: suggestion.deadline,
      milestones: []
    };

    setKeyResults(prev => [...prev, keyResult]);
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
            <DialogTitle className="text-center text-xl font-semibold">OKR</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Objective Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Objective</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="objectiveName">Objective *</Label>
                  <Input
                    id="objectiveName"
                    value={objectiveName}
                    onChange={(e) => setObjectiveName(e.target.value)}
                    placeholder="retain 2,000,000 by the end of the month"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="alignment">Alignment *</Label>
                  <Select value={supervisorKeyResult} onValueChange={setSupervisorKeyResult}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select alignment" />
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
            </div>

            {/* Key Result Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Key Result</h3>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Key Result
                </Button>
              </div>

              {/* AI Suggestions - Show when supervisor key result is selected */}
              {supervisorKeyResult && (
                <InlineAISuggestions
                  supervisorKeyResult={supervisorKeyResult}
                  onAddSuggestion={handleAddAISuggestion}
                />
              )}


              {/* Existing Key Results */}
              {keyResults.length > 0 && (
                <div className="space-y-3">
                  {keyResults.map((keyResult) => (
                    <Card key={keyResult.id} className="bg-muted/30">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground mb-2">This is a Key Result from the AI</p>
                            <div className="flex items-center gap-4">
                              <Select defaultValue="milestone">
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="milestone">Milestone</SelectItem>
                                </SelectContent>
                              </Select>
                              <span className="text-sm font-medium">{keyResult.weight}%</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveKeyResult(keyResult.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            <Button size="sm">
                              Add Milestone
                            </Button>
                          </div>
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
                Add
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ObjectiveSetModal;
