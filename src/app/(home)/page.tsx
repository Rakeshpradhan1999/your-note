import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 mt-40 ">
      <div className="flex max-w-[980px] mx-auto flex-col text-center gap-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl ">
          Save Your Notes from anywhere
        </h1>
        <p className="max-w-[600px]  text-muted-foreground">
          Your Note is a simple note taking app built with Next js, TypeScript,
          Tailwind CSS, Shadcn and mongodb.
        </p>
        <Button className="max-w-max mx-auto">Get Started</Button>
      </div>
    </section>
  );
}
