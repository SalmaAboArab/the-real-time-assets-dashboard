import DashboardPreview from "./components/dashboard-preview";

export const metadata = {
  title: 'Real Time Assets Dashboard',
  description: 'A dashboard displaying real-time asset information with search and filtering capabilities.',
}

export default function Home() {
  return (
    <DashboardPreview/>
  );
}
