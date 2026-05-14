const messages = [
  { name: "Rahul", message: "Interested in gym package" },
  { name: "Priya", message: "Need appointment booking" },
];

export default function WhatsAppFeed() {
  return (
    <div className="border rounded-2xl p-5">
      <h2 className="font-bold">WhatsApp Feed</h2>

      {messages.map((item, index) => (
        <div key={index} className="mt-4 border-b pb-2">
          <p>{item.name}</p>
          <p>{item.message}</p>
        </div>
      ))}
    </div>
  );
}
