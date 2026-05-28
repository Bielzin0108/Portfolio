import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { LoadingScreen } from "@/components/common/LoadingScreen";

const Home = lazy(() => import("@/pages/Home"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen persistent />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
