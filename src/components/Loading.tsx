import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center absolute top-0 left-0 backdrop-blur-xl bg-green/50 h-screen w-screen z-50  text-2xl">
      <Loader className="w-20 h-20 text-red-400 animate-spin" />
      Loading...
    </div>
  );
}
