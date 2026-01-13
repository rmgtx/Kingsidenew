export function AIStats() {
  const stats = [
    { value: "91", suffix: "%", description: "of SMBs using AI say it boosts revenue", source: "Salesforce SMB Trends Report 2025" },
    { value: "87", suffix: "%", description: "of SMBs report higher productivity with AI", source: "Service Direct Small Business AI Report 2025" },
    { value: "13", suffix: "h", description: "average hours saved per week by AI-powered teams", source: "ActiveCampaign AI Productivity Study 2025 (via Forbes)" },
  ];

  return (
    <section id="stats" className="py-24 bg-black text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-16 max-w-3xl">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl uppercase">
            AI IS TRANSFORMING SMALL BUSINESS PERFORMANCE — <span className="text-accent">REAL IMPACT, REAL RESULTS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex items-baseline mb-4">
                 <span className="font-heading text-5xl sm:text-6xl font-bold text-accent">{stat.value}</span>
                 <span className="font-heading text-3xl sm:text-4xl font-bold text-accent">{stat.suffix}</span>
              </div>
              <p className="text-lg sm:text-xl font-medium mb-2">{stat.description}</p>
              <p className="text-sm text-gray-400 mt-auto">{stat.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
