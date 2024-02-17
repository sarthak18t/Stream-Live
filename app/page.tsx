import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <UserButton afterSignOutUrl="/" />
      <Button size="lg">Click me</Button>
    </>
  );
}
