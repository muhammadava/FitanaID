export default function TimPage() {
  const team = [
    { name: "Tim FitanaID", role: "Founders & Core Team", emoji: "👥", desc: "Tim multidisiplin yang berdedikasi membangun platform kesehatan terpercaya untuk Indonesia." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Tim Kami</h1>
        <p className="text-gray-500">Orang-orang di balik FitanaID</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {team.map((member) => (
          <div key={member.name} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm text-center">
            <div className="text-5xl mb-4">{member.emoji}</div>
            <h3 className="font-bold text-gray-900">{member.name}</h3>
            <p className="text-sm text-emerald-600 mb-2">{member.role}</p>
            <p className="text-sm text-gray-500">{member.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
