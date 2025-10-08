import BoardList from "@/components/BoardList";
import BoardListLoading from "@/components/BoardListLoading";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<BoardListLoading />}>
        <BoardList />
      </Suspense>
    </>
  );
}
