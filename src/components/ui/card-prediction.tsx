export function PredictionCard() {
  return (
    <article className="font-lato flex min-h-[314px] flex-col justify-center rounded-2xl bg-[#000000A3] bg-[url(/poll-bg-img.jpg)] bg-cover bg-center px-3.5 py-8 text-white bg-blend-overlay">
      <section className="mb-4 text-center text-xl tracking-[0.19px]">
        <p className="mb-2 font-bold">WHO WAS THE MAN OF THE MATCH?</p>
        <p className="text-[13px] font-semibold">
          Vote for your choice of player who stood out on the Nigeria vs South
          AFrica
        </p>
      </section>
      <section className="grid gap-y-2.5 px-2.5 py-3.5">
        <PoolBar text="Home" />
        <PoolBar text="Draw" />
        <PoolBar text="Away" />
      </section>
    </article>
  );
}

export function PredictionCard2() {
  return (
    <article className="font-lato rounded-2xl bg-[#000000A3] bg-[url(/naija-flag.jpg)] bg-cover bg-center px-2.5 py-5 text-white bg-blend-overlay">
      <section className="mb-4 text-center text-xl font-bold tracking-[0.19px]">
        <p className="mb-2">Who will win this weekend?</p>
        <p className="text-2xl">
          <span>Nigeria</span> vs <span>Ghana</span>
        </p>
        <p className="font-normal">Prediction</p>
      </section>
      <section className="mb-4 grid gap-y-2.5 px-2.5 py-3.5">
        <PoolBar text="Home" />
        <PoolBar text="Draw" />
        <PoolBar text="Away" />
      </section>
      <section>
        <button className="font-poppins w-full rounded-xl bg-[#FFCC00] py-2.5 text-sm font-semibold text-black">
          View Tips
        </button>
      </section>
    </article>
  );
}

const PoolBar = ({ text }: { text: string }) => {
  return (
    <div className="relative h-8 overflow-hidden rounded-full bg-[#8B8B8BA1] text-xs font-bold">
      <div className="flex h-full w-[30%] items-center bg-[#141414] px-3.5">
        {text}
      </div>
      <span className="absolute top-1/2 right-3.5 -translate-y-1/2 text-white">
        30%
      </span>
    </div>
  );
};
