export default function AIInsights() {
  const insights = [
    "Lead conversion increased 12%",
    "Best campaign time: 8PM",
    "WhatsApp engagement improved",
  ];

  return (
    <div className="border rounded-2xl p-5">
      <h2 className="font-bold">AI Insights</h2>
      <div className="space-y-4 mt-4">
        {insights.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
}
