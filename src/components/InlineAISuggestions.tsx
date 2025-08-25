import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, RefreshCw, Plus, Calendar, Weight, Edit2, Save, X } from "lucide-react";

interface AISuggestion {
  id: string;
  title: string;
  weight: number;
  deadline: string;
  description: string;
}

interface InlineAISuggestionsProps {
  supervisorKeyResult: string;
  onAddSuggestion: (suggestion: AISuggestion) => void;
}

const InlineAISuggestions = ({ supervisorKeyResult, onAddSuggestion }: InlineAISuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingSuggestion, setEditingSuggestion] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, Partial<AISuggestion>>>({});
  const [showPrompt, setShowPrompt] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");
  
  const { toast } = useToast();

  const generateSuggestions = async (customPrompt?: string) => {
    setIsLoading(true);
    
    // Simulate API call with mock data
    setTimeout(() => {
      let mockSuggestions: AISuggestion[] = [
        {
          id: "ai_1",
          title: "Implement automated testing pipeline",
          weight: 35,
          deadline: "2024-06-30",
          description: "Set up comprehensive automated testing to support the productivity improvement goal"
        },
        {
          id: "ai_2", 
          title: "Optimize team workflows and processes",
          weight: 40,
          deadline: "2024-05-15",
          description: "Streamline existing processes to eliminate bottlenecks and improve efficiency"
        },
        {
          id: "ai_3",
          title: "Deploy new collaboration tools",
          weight: 25,
          deadline: "2024-04-30",
          description: "Introduce modern tools to enhance team communication and collaboration"
        }
      ];

      // If custom prompt provided, modify suggestions accordingly
      if (customPrompt) {
        mockSuggestions = mockSuggestions.map((suggestion, index) => ({
          ...suggestion,
          id: `ai_custom_${index + 1}`,
          title: `${suggestion.title} (optimized for: ${customPrompt.substring(0, 20)}...)`,
          description: `${suggestion.description} - Tailored based on your specific requirements.`
        }));
      }
      
      setSuggestions(mockSuggestions);
      setIsLoading(false);
      
      toast({
        title: "AI Suggestions Generated",
        description: customPrompt 
          ? `Generated ${mockSuggestions.length} optimized suggestions based on your prompt`
          : `Generated ${mockSuggestions.length} key result suggestions based on "${supervisorKeyResult}"`
      });
    }, 1500);
  };

  const handleRegenerate = () => {
    if (userPrompt.trim()) {
      generateSuggestions(userPrompt);
      setUserPrompt("");
      setShowPrompt(false);
    } else {
      generateSuggestions();
    }
  };

  useEffect(() => {
    if (supervisorKeyResult) {
      generateSuggestions();
    }
  }, [supervisorKeyResult]);

  const handleEdit = (suggestionId: string, suggestion: AISuggestion) => {
    setEditingSuggestion(suggestionId);
    setEditValues(prev => ({
      ...prev,
      [suggestionId]: { ...suggestion }
    }));
  };

  const handleSaveEdit = (suggestionId: string) => {
    const editedValues = editValues[suggestionId];
    if (editedValues) {
      setSuggestions(prev => 
        prev.map(s => 
          s.id === suggestionId 
            ? { ...s, ...editedValues }
            : s
        )
      );
    }
    setEditingSuggestion(null);
  };

  const handleCancelEdit = () => {
    setEditingSuggestion(null);
    setEditValues({});
  };

  const handleAddToKeyResults = (suggestion: AISuggestion) => {
    onAddSuggestion(suggestion);
    toast({
      title: "Added to Key Results",
      description: `"${suggestion.title}" has been added to your key results`
    });
  };

  if (!supervisorKeyResult) return null;

  return (
    <Card className="border-2 border-blue-200 bg-blue-50/50">
      <CardHeader className="pb-3">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <CardTitle className="text-base text-blue-700">AI Key Result Suggestion</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
              I have made you {suggestions.length} Suggestions
            </Badge>
            <Button 
              size="sm" 
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                setShowPrompt(!showPrompt);
              }}
              className="text-xs"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Regenerate
            </Button>
          </div>
        </div>
        <p className="text-sm font-medium text-blue-800 mt-2">
          {supervisorKeyResult}
        </p>
        
        {/* Regenerate Prompt Section */}
        {showPrompt && (
          <div className="mt-4 space-y-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-blue-800">
                Customize AI Response (Optional)
              </Label>
              <Input
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="e.g., Focus on cost reduction, emphasize team collaboration, include technical metrics..."
                className="text-sm"
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleRegenerate} disabled={isLoading}>
                {isLoading ? (
                  <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                ) : (
                  <RefreshCw className="h-3 w-3 mr-1" />
                )}
                Generate
              </Button>
              <Button size="sm" variant="outline" onClick={() => setShowPrompt(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-3">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            suggestions.map((suggestion) => (
              <Card key={suggestion.id} className="bg-background/60 border-muted">
                <CardContent className="pt-4">
                  {editingSuggestion === suggestion.id ? (
                    <div className="space-y-3">
                      <Input
                        value={editValues[suggestion.id]?.title || suggestion.title}
                        onChange={(e) => setEditValues(prev => ({
                          ...prev,
                          [suggestion.id]: { ...prev[suggestion.id], title: e.target.value }
                        }))}
                        placeholder="Key result title"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={editValues[suggestion.id]?.weight || suggestion.weight}
                          onChange={(e) => setEditValues(prev => ({
                            ...prev,
                            [suggestion.id]: { ...prev[suggestion.id], weight: parseInt(e.target.value) || 0 }
                          }))}
                          placeholder="Weight %"
                        />
                        <Input
                          type="date"
                          value={editValues[suggestion.id]?.deadline || suggestion.deadline}
                          onChange={(e) => setEditValues(prev => ({
                            ...prev,
                            [suggestion.id]: { ...prev[suggestion.id], deadline: e.target.value }
                          }))}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleSaveEdit(suggestion.id)}>
                          <Save className="h-3 w-3 mr-1" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                          <X className="h-3 w-3 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{suggestion.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{suggestion.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Weight className="h-3 w-3" />
                            <span>{suggestion.weight}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(suggestion.deadline).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1 ml-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(suggestion.id, suggestion)}
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleAddToKeyResults(suggestion)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default InlineAISuggestions;