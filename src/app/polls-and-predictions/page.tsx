import Hero from "@/components/ui/hero";
import TabContainer from "@/components/ui/tab-container";

export default function PollsAndPredictions() {
  return (
    <main className="mx-auto grid w-full max-w-[1076px] gap-y-10 px-2.5 pt-5 pb-5 lg:pt-12 lg:pb-[6.25rem]">
      <Hero
        title="Polls & Predictions"
        description="Share your stories, vote on polls, and connect with other fans."
      />

      <TabContainer />
    </main>
  );
}
