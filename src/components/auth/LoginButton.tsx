import { Button } from '@/components/ui/button';

export function LoginButton() {
  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  const handleKakaoLogin = () => {
    window.location.href = '/api/auth/kakao';
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={handleGoogleLogin}>
        Google 로그인
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleKakaoLogin}
        className="bg-[#FEE500] text-[#191919] border-[#FEE500] hover:bg-[#FDD800]"
      >
        카카오 로그인
      </Button>
    </div>
  );
}
