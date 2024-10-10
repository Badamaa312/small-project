import Header from "@/components/Header";
import SignUpPage from "@/sign-up/SignUpPage";

export default function Home() {
  return (
    <main className="w-screen h-screen flex items-center flex-col">
      <Header />
      <SignUpPage />
    </main>
  );
}
