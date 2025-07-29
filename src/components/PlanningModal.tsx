import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Plus, Calendar } from "lucide-react";
import AIInsightButton from "./AIInsightButton";
import PlanningAIRecommendation from "./PlanningAIRecommendation";

interface PlanningModalProps {
  isOpen: boolean;
  onClose: () => void;
  planType: "daily" | "weekly";
}

const PlanningModal = ({ isOpen, onClose, planType }: PlanningModalProps) => {
  const [showAIRecommendation, setShowAIRecommendation] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const { toast } = useToast();

  const handleAIRecommendationApprove = (aiTasks: any[]) => {
    setTasks(prev => [...prev, ...aiTasks]);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Create {planType.charAt(0).toUpperCase() + planType.slice(1)} Plan
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Planning Tasks</h3>
              <AIInsightButton 
                onClick={() => setShowAIRecommendation(true)}
              />
            </div>

            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Task Manually
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Use AI Insight to get smart task recommendations based on your objectives
                </p>
              </CardContent>
            </Card>

            {tasks.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Added Tasks ({tasks.length})</h4>
                {tasks.map((task) => (
                  <Card key={task.id} className="bg-muted/30">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium">{task.title}</h5>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">{task.priority}</Badge>
                            <Badge variant="secondary">{task.estimatedTime}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={onClose}>Save Plan</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PlanningAIRecommendation
        isOpen={showAIRecommendation}
        onClose={() => setShowAIRecommendation(false)}
        planType={planType}
        onApprove={handleAIRecommendationApprove}
      />
    </>
  );
};

export default PlanningModal;