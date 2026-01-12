import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NeuBrutalistButton } from "@/components";
import { Badge } from "@/components/ui/badge";
import { Megaphone, TrendUp, Gear, Headset } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    id: "marketing",
    label: "Marketing",
    icon: Megaphone,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    badge: "AI-Powered Campaigns",
    content: "Create personalized campaigns that truly connect with your audience. Drive better results and get a greater return on your marketing spend. We help you turn insights into action with AI-driven strategies that adapt and improve with every interaction.",
  },
  {
    id: "sales",
    label: "Sales",
    icon: TrendUp,
    color: "text-accent",
    bgColor: "bg-accent/10",
    badge: "Pipeline Acceleration",
    content: "Automate lead qualification and follow-ups to close more deals, faster. Let your team focus on building relationships, not busywork. With AI-powered sales systems that learn from every interaction, you'll accelerate pipelines and turn opportunities into consistent growth.",
  },
  {
    id: "operations",
    label: "Operations",
    icon: Gear,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    badge: "Workflow Optimization",
    content: "Streamline workflows and eliminate bottlenecks with intelligent automation. We analyze your operations to identify opportunities where AI can boost efficiency, reduce costs, and free your team to focus on strategic initiatives that drive growth.",
  },
  {
    id: "customer-service",
    label: "Service",
    icon: Headset,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    badge: "24/7 Support",
    content: "Deliver exceptional support experiences that build lasting customer relationships. Our AI-powered solutions enable faster response times, consistent quality, and personalized assistance at scale while empowering your team to handle complex issues.",
  },
];

export function IntelligentAutomation() {
  const [activeTab, setActiveTab] = useState("marketing");
  const activeFeature = features.find(f => f.id === activeTab) || features[0];

  return (
    <section id="services" className="py-24 lg:py-32 px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Make automation your<br/>
            <span className="text-accent">COMPETITIVE ADVANTAGE</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            We partner with you to uncover where automation can create the most impact, then build intelligent AI systems that work independently to elevate your business.
          </p>
        </motion.div>

        {/* Tabs Navigation - Clean Pill Style */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-12 lg:mb-16"
          >
            <TabsList className="h-auto p-1.5 bg-muted/50 border border-border rounded-xl shadow-sm gap-1 flex-wrap">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <TabsTrigger 
                    key={feature.id} 
                    value={feature.id}
                    className="px-5 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground font-heading font-medium text-base lg:text-lg transition-all flex items-center gap-2"
                  >
                    <Icon size={20} weight="bold" className="hidden sm:block" />
                    {feature.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </motion.div>

          {/* Tab Content with Animation */}
          <div className="relative min-h-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center"
              >
                {/* Content Column */}
                <div className="lg:col-span-3 space-y-6">
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-xl ${activeFeature.bgColor}`}>
                    <activeFeature.icon size={32} weight="fill" className={activeFeature.color} />
                  </div>
                  
                  <Badge variant="outline" className={`border-current ${activeFeature.color}`}>
                    {activeFeature.badge}
                  </Badge>
                  
                  <h3 className="font-heading text-3xl lg:text-4xl font-bold">
                    {activeFeature.label}
                  </h3>
                  
                  <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                    {activeFeature.content}
                  </p>
                  
                  <div className="pt-4">
                    <NeuBrutalistButton variant="secondary" href="#contact">
                      Get Started
                    </NeuBrutalistButton>
                  </div>
                </div>

                {/* Visual Column - Clean card with subtle shadow */}
                <div className="lg:col-span-2">
                  <Card className="aspect-square shadow-lg">
                    <CardContent className="p-8 h-full flex items-center justify-center">
                      <div className="text-center">
                      <activeFeature.icon 
                        size={80} 
                        weight="duotone" 
                        className={`${activeFeature.color} mx-auto mb-4 opacity-80`} 
                      />
                      <p className="font-heading font-semibold text-lg">{activeFeature.label}</p>
                      <p className="text-sm text-muted-foreground">Automation</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
