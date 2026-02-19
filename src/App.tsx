import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { PrivacyPolicyGenerator } from '@/pages/PrivacyPolicyGenerator';
import { TermsOfServiceGenerator } from '@/pages/TermsOfServiceGenerator';
import { AuthCallback } from '@/pages/AuthCallback';
import { useAuthStore } from '@/store/authStore';

function App() {
  const { fetchMe } = useAuthStore();

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyGenerator />} />
        <Route path="/terms-of-service" element={<TermsOfServiceGenerator />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
