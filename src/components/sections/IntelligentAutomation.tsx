import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrandButton, GridPattern } from "@/components";
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
  const gridContainerRef = React.useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!gridContainerRef.current) return;

    const rect = gridContainerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate the snapped grid coordinates (30px grid size)
    const gridSize = 30;
    const col = Math.floor(mouseX / gridSize);
    const row = Math.floor(mouseY / gridSize);

    const squareX = col * gridSize;
    const squareY = row * gridSize;

    gridContainerRef.current.style.setProperty('--mouse-x', `${mouseX}px`);
    gridContainerRef.current.style.setProperty('--mouse-y', `${mouseY}px`);
    gridContainerRef.current.style.setProperty('--grid-x', `${squareX}px`);
    gridContainerRef.current.style.setProperty('--grid-y', `${squareY}px`);
  };

  return (
    <section
      id="services"
      className="relative py-24 lg:py-32 px-6 lg:px-8 bg-background overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Grid Pattern Background - Flipped horizontally (fades from top-left) */}
      <div ref={gridContainerRef} className={`absolute inset-0 z-0 ${isHovering ? 'grid-hovering' : ''}`}>
        <GridPattern
          width={30}
          height={30}
          flip={true}
          className="opacity-100"
        />
      </div>

      {/* Gradient fade at top - transitions from previous section */}
      <div
        className="absolute top-0 left-0 right-0 h-12 lg:h-16 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Gradient fade at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 lg:h-16 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
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
                    <BrandButton
                      href="#contact"
                      variant="brandOutline"
                      size="default"
                      aria-label="Get Started"
                    >
                      Get Started
                    </BrandButton>
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
