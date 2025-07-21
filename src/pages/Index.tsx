import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import AICopilotCoach from "@/components/AICopilotCoach";
import PredictivePerformance from "@/components/PredictivePerformance";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background flex">
      <Navigation />
      <div className="flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <div className="border-b border-border p-4">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="copilot">AI Copilot</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="dashboard" className="mt-0">
            <Dashboard />
          </TabsContent>
          
          <TabsContent value="copilot" className="mt-0">
            <AICopilotCoach />
          </TabsContent>
          
          <TabsContent value="performance" className="mt-0">
            <PredictivePerformance />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
