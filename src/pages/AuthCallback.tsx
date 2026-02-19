import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export function AuthCallback() {
  const navigate = useNavigate();
  const { loginWithTokens } = useAuthStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');

    if (accessToken && refreshToken) {
      loginWithTokens(accessToken, refreshToken).then(() => {
        navigate('/', { replace: true });
      });
    } else {
      navigate('/', { replace: true });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500">로그인 처리 중...</p>
      </div>
    </div>
  );
}
