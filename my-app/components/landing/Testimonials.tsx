export default function Testimonials() {
  const people = [
    { name: 'Alice', text: 'I love discovering new recipes every week!' },
    { name: 'James', text: 'The layout is clean and the features just work.' },
    { name: 'Sofia', text: 'Adding my own dishes has never been easier.' },
  ];

  return (
    <section className="py-20 bg-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {people.map((p, i) => (
            <div
              key={i}
              className="p-6 border rounded-lg shadow-sm hover:shadow-md transition duration-200"
            >
              <p className="text-gray-600 mb-4 text-sm italic">"{p.text}"</p>
              <h3 className="font-semibold text-orange-600">{p.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}