const activities = [
  { name: "Amit", action: "Created lead" },
  { name: "Riya", action: "Closed sale" },
  { name: "Raj", action: "Sent campaign" },
];

export default function TeamActivity() {
  return (
    <div className="border rounded-2xl p-5">
      <h2 className="font-bold mb-4">Team Activity</h2>

      {activities.map((item, index) => (
        <div key={index} className="mb-3">
          {item.name} - {item.action}
        </div>
      ))}
    </div>
  );
}
