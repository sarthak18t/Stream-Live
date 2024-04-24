import { getSelfByUserName } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import Navbar from "./_components/navbar";

interface CreatorPageProps {
  children: React.ReactNode;
  params: {
    username: string;
  };
}

const CreatorPage = async ({ children, params }: CreatorPageProps) => {
  const self = await getSelfByUserName(params.username);
  if (!self) {
    redirect("/");
  }
  return (
    <>
        <Navbar/>
      <div className="flex h-full pt-20">{children}</div>
    </>
  );
};

export default CreatorPage;
