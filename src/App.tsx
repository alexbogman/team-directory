import { Route, Routes } from "react-router-dom";
import { DirectoryPage } from "./pages/DirectoryPage";
import { MemberDetailPage } from "./pages/MemberDetailPage";
import { MemberFormPage } from "./pages/MemberFormPage";

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Team Directory</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<DirectoryPage />} />
          <Route path="/members/new" element={<MemberFormPage />} />
          <Route path="/members/:id" element={<MemberDetailPage />} />
          <Route path="/members/:id/edit" element={<MemberFormPage />} />
        </Routes>
      </main>
    </div>
  );
}
