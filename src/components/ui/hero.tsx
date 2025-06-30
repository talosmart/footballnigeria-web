export default function Hero({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="font-lato flex h-[262px] items-end rounded-4xl border bg-[#00000094] bg-[url(/celebrate.jpg)] bg-cover bg-center px-7 py-9 text-white bg-blend-overlay lg:px-16 lg:py-11">
      <div>
        <h1 className="mb-2 text-3xl font-bold">{title}</h1>
        <p className="text-lg">{description}</p>
      </div>
    </section>
  );
}
