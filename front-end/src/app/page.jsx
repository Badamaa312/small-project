import Header from "@/components/Header";
import SignInPage from "./sign-in/page";
import SignUpPage from "./sign-up/page";

export default function Home() {
  return (
    <main className="w-screen h-screen flex items-center flex-col">
      <Header />
      <SignInPage />
      <SignUpPage />
    </main>
  );
}
