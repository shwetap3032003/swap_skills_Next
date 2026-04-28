// import AuthPage from '@/components/AuthPage';

// export default function LoginPage() {
//   return <AuthPage />;
// }
import AuthPage from "@/components/AuthPage";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthPage />
    </Suspense>
  );
}
