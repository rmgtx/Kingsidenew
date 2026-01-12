import { Card, CardContent } from "@/components/ui/card";

export function MrBottleneck() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-muted/5">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <h2 className="font-heading text-4xl font-bold leading-tight lg:text-5xl">
              You're the boss,<br />
              the strategist,<br />
              the fixer...<br />
              <span className="text-destructive">and the bottleneck.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-prose">
              Every minute lost to admin is a minute stolen from growth. You didn't build your business to manage chaos– so stop doing it.
            </p>
          </div>

          {/* Image Placeholder in Card */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md h-96 bg-muted/20 shadow-lg">
              <CardContent className="h-full flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">👔</div>
                  <p className="font-heading font-bold text-xl">Mr. Bottleneck</p>
                  <p className="text-sm text-muted-foreground">(Image Placeholder)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
