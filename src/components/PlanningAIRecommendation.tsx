import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Brain, Calendar, Clock, Target, CheckCircle, X, AlertTriangle } from "lucide-react";

interface TaskSuggestion {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  estimatedTime: string;
  linkedObjective?: string;
  type: "daily" | "weekly";
}

interface PlanningAIRecommendationProps {
  isOpen: boolean;
  onClose: () => void;
  planType: "daily" | "weekly";
  onApprove: (tasks: TaskSuggestion[]) => void;
}

const PlanningAIRecommendation = ({
  isOpen,
  onClose,
  planType,
  onApprove
}: PlanningAIRecommendationProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const { toast } = useToast();

  // Mock AI-generated planning suggestions
  const mockDailyTasks: TaskSuggestion[] = [
    {
      id: "dt1",
      title: "Review automation tool documentation",
      description: "Research 3 potential automation tools for process optimization",
      priority: "high",
      estimatedTime: "2 hours",
      linkedObjective: "Reduce task completion time by 20%",
      type: "daily"
    },
    {
      id: "dt2",
      title: "Schedule team collaboration assessment",
      description: "Set up meeting with team leads to assess current collaboration practices",
      priority: "medium",
      estimatedTime: "30 minutes",
      linkedObjective: "Increase team collaboration score by 15%",
      type: "daily"
    },
    {
      id: "dt3",
      title: "Map current workflow processes",
      description: "Document existing workflow steps for optimization analysis",
      priority: "high",
      estimatedTime: "3 hours",
      linkedObjective: "Complete 3 process optimization initiatives",
      type: "daily"
    },
    {
      id: "dt4",
      title: "Update project tracking dashboard",
      description: "Review and update delivery metrics for ongoing projects",
      priority: "medium",
      estimatedTime: "1 hour",
      linkedObjective: "Achieve 95% on-time delivery rate",
      type: "daily"
    }
  ];

  const mockWeeklyTasks: TaskSuggestion[] = [
    {
      id: "wt1",
      title: "Implement pilot automation program",
      description: "Deploy selected automation tool for one key process",
      priority: "high",
      estimatedTime: "8 hours",
      linkedObjective: "Reduce task completion time by 20%",
      type: "weekly"
    },
    {
      id: "wt2",
      title: "Conduct team collaboration workshop",
      description: "Facilitate workshop to improve team communication practices",
      priority: "high",
      estimatedTime: "4 hours",
      linkedObjective: "Increase team collaboration score by 15%",
      type: "weekly"
    },
    {
      id: "wt3",
      title: "Complete workflow optimization analysis",
      description: "Analyze mapped workflows and identify improvement opportunities",
      priority: "medium",
      estimatedTime: "6 hours",
      linkedObjective: "Complete 3 process optimization initiatives",
      type: "weekly"
    },
    {
      id: "wt4",
      title: "Establish project quality gates",
      description: "Define and implement quality checkpoints for project delivery",
      priority: "medium",
      estimatedTime: "3 hours",
      linkedObjective: "Achieve 95% on-time delivery rate",
      type: "weekly"
    }
  ];

  const currentTasks = planType === "daily" ? mockDailyTasks : mockWeeklyTasks;

  const handleGenerateRecommendations = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsGenerating(false);
    
    toast({
      title: "AI Planning Recommendations Generated",
      description: `Smart ${planType} tasks aligned with your objectives`,
    });
  };

  const toggleTask = (id: string) => {
    setSelectedTasks(prev => 
      prev.includes(id) 
        ? prev.filter(taskId => taskId !== id)
        : [...prev, id]
    );
  };

  const handleApproveSelected = () => {
    const approved = currentTasks.filter(task => selectedTasks.includes(task.id));
    onApprove(approved);
    onClose();
    
    toast({
      title: "Tasks Added to Plan",
      description: `${approved.length} AI-recommended tasks have been added to your ${planType} plan`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "default";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return <AlertTriangle className="h-3 w-3" />;
      case "medium": return <Target className="h-3 w-3" />;
      case "low": return <Clock className="h-3 w-3" />;
      default: return <Target className="h-3 w-3" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI {planType.charAt(0).toUpperCase() + planType.slice(1)} Planning Recommendations
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Context Information */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="font-medium">
                  Generating {planType} tasks based on your active objectives and current progress
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          {!isGenerating && currentTasks.length === 0 && (
            <div className="text-center py-8">
              <Button onClick={handleGenerateRecommendations} size="lg">
                <Brain className="h-4 w-4 mr-2" />
                Generate {planType.charAt(0).toUpperCase() + planType.slice(1)} Plan
              </Button>
            </div>
          )}

          {/* Loading State */}
          {isGenerating && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">
                AI is analyzing your objectives and generating optimized {planType} tasks...
              </p>
            </div>
          )}

          {/* Recommendations */}
          {!isGenerating && currentTasks.length > 0 && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recommended {planType.charAt(0).toUpperCase() + planType.slice(1)} Tasks</h3>
                <Badge variant="secondary">
                  {selectedTasks.length} selected
                </Badge>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All Tasks</TabsTrigger>
                  <TabsTrigger value="high">High Priority</TabsTrigger>
                  <TabsTrigger value="medium">Medium Priority</TabsTrigger>
                  <TabsTrigger value="low">Low Priority</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  <TaskList 
                    tasks={currentTasks} 
                    selectedTasks={selectedTasks}
                    onToggleTask={toggleTask}
                    getPriorityColor={getPriorityColor}
                    getPriorityIcon={getPriorityIcon}
                  />
                </TabsContent>

                <TabsContent value="high" className="space-y-4">
                  <TaskList 
                    tasks={currentTasks.filter(t => t.priority === "high")} 
                    selectedTasks={selectedTasks}
                    onToggleTask={toggleTask}
                    getPriorityColor={getPriorityColor}
                    getPriorityIcon={getPriorityIcon}
                  />
                </TabsContent>

                <TabsContent value="medium" className="space-y-4">
                  <TaskList 
                    tasks={currentTasks.filter(t => t.priority === "medium")} 
                    selectedTasks={selectedTasks}
                    onToggleTask={toggleTask}
                    getPriorityColor={getPriorityColor}
                    getPriorityIcon={getPriorityIcon}
                  />
                </TabsContent>

                <TabsContent value="low" className="space-y-4">
                  <TaskList 
                    tasks={currentTasks.filter(t => t.priority === "low")} 
                    selectedTasks={selectedTasks}
                    onToggleTask={toggleTask}
                    getPriorityColor={getPriorityColor}
                    getPriorityIcon={getPriorityIcon}
                  />
                </TabsContent>
              </Tabs>

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
                    disabled={selectedTasks.length === 0}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Add Selected Tasks ({selectedTasks.length})
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

interface TaskListProps {
  tasks: TaskSuggestion[];
  selectedTasks: string[];
  onToggleTask: (id: string) => void;
  getPriorityColor: (priority: string) => string;
  getPriorityIcon: (priority: string) => React.ReactNode;
}

const TaskList = ({ tasks, selectedTasks, onToggleTask, getPriorityColor, getPriorityIcon }: TaskListProps) => (
  <div className="grid gap-4">
    {tasks.map((task) => (
      <Card 
        key={task.id}
        className={`cursor-pointer transition-all duration-200 ${
          selectedTasks.includes(task.id)
            ? 'border-primary bg-primary/5 shadow-md'
            : 'border-border hover:border-primary/50'
        }`}
        onClick={() => onToggleTask(task.id)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {selectedTasks.includes(task.id) ? (
                <CheckCircle className="h-5 w-5 text-primary" />
              ) : (
                <div className="h-5 w-5 border-2 border-muted-foreground/30 rounded-full" />
              )}
              <CardTitle className="text-base">{task.title}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={getPriorityColor(task.priority) as any} className="gap-1">
                {getPriorityIcon(task.priority)}
                {task.priority}
              </Badge>
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" />
                {task.estimatedTime}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">{task.description}</p>
          
          {task.linkedObjective && (
            <div className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-primary font-medium">Linked to: {task.linkedObjective}</span>
            </div>
          )}
        </CardContent>
      </Card>
    ))}
  </div>
);

export default PlanningAIRecommendation;