import { ChevronRight } from "lucide-react";

export default function ChallengesList() {
  const challenges = [
    {
      title: "MERCADONA RECYCLING HERO",
      company: "Mercadona",
      tags: ["€15 VOUCHER"],
    },
    {
      title: "MERCADONA ZERO PLASTIC",
      company: "Mercadona",
      tags: ["HACENDADO TSHIRT", "HACENDADO CANVAS TOTE BAG"],
    },
    {
      title: "AMAZON RECYCLING SPRINT",
      company: "Amazon",
      tags: ["A RIDE IN SPACE WITH BLUE ORIGIN", "AWS GOLD JACKET"],
    },
    {
      title: "CARREFOUR SHAMPOO BOTTLE",
      company: "Carrefour",
      tags: ["CUSTOM MUG"],
    },
  ];

  return (
    <div className="h-full bg-gray-50 flex flex-col gap-4">
      <header className="px-5 pt-8 pb-6 bg-white">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          All Challenges
        </h1>
      </header>

      <main className="flex flex-col gap-4 flex-1 px-5 py-2 space-y-3">
        {challenges.map((challenge, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-5 bg-white flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
                {challenge.title}
              </h2>
              <p className="text-gray-500 text-sm mb-3 font-medium">
                by {challenge.company}
              </p>
              <div className="flex flex-wrap gap-2">
                {challenge.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200 tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" />
          </div>
        ))}
      </main>
    </div>
  );
}
