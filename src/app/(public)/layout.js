import { PageViewTracker } from "@/components/providers/PageViewTracker";

export default function PublicLayout({ children }) {
  return (
    <>
      <PageViewTracker />
      {children}
    </>
  );
}
