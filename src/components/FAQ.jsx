import Card from "./Card";

export default function FAQ({ faqs }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {faqs.map((item) => (
        <Card key={item.question}>
          <h3 className="text-lg font-semibold text-white">{item.question}</h3>
          <p className="mt-2 text-slate-300">{item.answer}</p>
        </Card>
      ))}
    </div>
  );
}
