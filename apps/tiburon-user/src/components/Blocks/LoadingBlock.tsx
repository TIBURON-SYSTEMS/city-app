export default function LoadingBlock({ title }: { title: string }) {
  return (
    <section>
      <h2 className="text-xl font-bold mb-3 text-slate-900">{title}</h2>
      <div className="animate-pulse space-y-3">
        <div className="h-20 bg-gray-100 rounded-xl" />
        <div className="h-20 bg-gray-100 rounded-xl" />
        <div className="h-20 bg-gray-100 rounded-xl" />
      </div>
    </section>
  );
}
