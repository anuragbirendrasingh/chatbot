import ChatWidget from "@/components/ChatWidget";
import AuthGate from "@/components/AuthGate";


export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen max-w-6xl items-start gap-8 px-6 py-8">
        <div className="w-full max-w-md">
          <AuthGate />
        </div>
        <div className="flex-1" />
      </div>
      <ChatWidget />
    </main>
  );
}










// import Chatbot from "../components/Chatbot";

// export default function Home() {
//   return (
//     <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-4 bg-white dark:bg-zinc-900">
//         <Chatbot />
//       </main>
//     </div>
//   );
// }