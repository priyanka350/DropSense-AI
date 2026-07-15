function StatCard({
  title,
  value,
  subtitle,
  color
}) {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-[28px] p-6 shadow-lg hover:-translate-y-1 transition border border-white/50">

      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <h1
        className={`text-4xl font-bold mt-3 ${color}`}
      >
        {value}
      </h1>

      <p className="text-sm text-gray-400 mt-2">
        {subtitle}
      </p>

    </div>
  );
}

export default StatCard;