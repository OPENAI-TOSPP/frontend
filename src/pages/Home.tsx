import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  FileText, Shield, ArrowRight, Sparkles, 
  CheckCircle2, Clock, Zap, Lock, LogIn, LogOut, User
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export function Home() {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-slate-900">PolicyGen</span>
            </div>
            <nav className="hidden sm:flex items-center gap-6">
              <a href="#features" className="text-sm text-slate-600 hover:text-slate-900">기능</a>
              <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900">가격</a>
              <a href="#faq" className="text-sm text-slate-600 hover:text-slate-900">FAQ</a>
            </nav>
            <div className="flex items-center">
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 rounded-full hover:bg-slate-100 p-1 pr-3 transition-colors">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.profileImage} />
                        <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-slate-700">{user.name}</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => logout()} className="text-red-600 cursor-pointer">
                      <LogOut className="w-4 h-4 mr-2" />
                      로그아웃
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <LogIn className="w-4 h-4 mr-2" />
                      로그인
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <a href="/api/auth/google" className="flex items-center gap-2 cursor-pointer">
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Google로 로그인
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/api/auth/kakao" className="flex items-center gap-2 cursor-pointer">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#3A1D1D">
                          <path d="M12 3C6.48 3 2 6.72 2 11.28c0 2.88 1.68 5.4 4.2 6.96l-1.08 3.96 4.56-3c.72.12 1.52.18 2.32.18 5.52 0 10-3.72 10-8.28C22 6.72 17.52 3 12 3z"/>
                        </svg>
                        Kakao로 로그인
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            5분이면 완성하는 스마트 문서 생성
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            서비스 필수 법률 문서를<br />
            <span className="text-blue-600">AI로 간편하게</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            개인정보처리방침과 서비스 이용약관을 체크박스 방식으로 쉽게 생성하세요.
            <br className="hidden sm:block" />
            한국 법률 기준을 반영한 전문적인 문서를 5~10분 만에 완성합니다.
          </p>
        </div>
      </section>

      {/* Generator Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Privacy Policy Card */}
            <Link to="/privacy-policy">
              <Card className="group h-full border-2 border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Shield className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">
                    개인정보처리방침
                  </h2>
                  <p className="text-slate-600 mb-6">
                    수집하는 개인정보 항목, 보관 기간, 제3자 제공 등을 
                    체크박스로 선택하여 맞춤형 개인정보처리방침을 생성합니다.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      약 5분
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      19개 항목
                    </span>
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    생성하기
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Terms of Service Card */}
            <Link to="/terms-of-service">
              <Card className="group h-full border-2 border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FileText className="w-7 h-7 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">
                    서비스 이용약관
                  </h2>
                  <p className="text-slate-600 mb-6">
                    서비스 유형별 기본 조항에 기능별 추가 조항을 선택하여
                    한국 법률 기준을 반영한 이용약관을 생성합니다.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      약 7분
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      13+ 조항
                    </span>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    생성하기
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              왜 PolicyGen인가?
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              법률 전문가가 아니어도 전문적인 법률 문서를 만들 수 있습니다
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">5분 완성</h3>
              <p className="text-sm text-slate-600">
                체크박스 방식으로 빠르게 입력하고 즉시 문서를 받아보세요
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">법률 기준 반영</h3>
              <p className="text-sm text-slate-600">
                개인정보보호법, 전자상거래법 등 한국 법률을 반영
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">AI 문장화</h3>
              <p className="text-sm text-slate-600">
                선택한 항목을 자동으로 전문적인 법률 문장으로 변환
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">다양한 포맷</h3>
              <p className="text-sm text-slate-600">
                PDF, HTML, 텍스트 등 원하는 형식으로 다운로드
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">가격</h2>
            <p className="text-slate-600">모든 기능을 무료로 이용하세요</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="border-2 border-slate-200 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2">무료</h3>
              <div className="text-4xl font-bold text-slate-900 my-4">₩0</div>
              <ul className="text-sm text-slate-600 space-y-3 text-left mb-8">
                {['개인정보처리방침 생성', '서비스 이용약관 생성', 'PDF·HTML·텍스트 다운로드', '실시간 미리보기', '클라이언트 AI 폴백 지원'].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link to="/privacy-policy">
                <button className="w-full py-2 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-700 transition-colors">
                  시작하기
                </button>
              </Link>
            </div>
            <div className="border-2 border-blue-500 rounded-2xl p-8 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">준비 중</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Pro</h3>
              <div className="text-4xl font-bold text-blue-600 my-4">₩9,900<span className="text-lg font-normal text-slate-500">/월</span></div>
              <ul className="text-sm text-slate-600 space-y-3 text-left mb-8">
                {['무료 플랜 모든 기능', 'OpenAI GPT-4o AI 문서 생성', '문서 저장 및 버전 관리', '무제한 문서 생성', '우선 지원'].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <button disabled className="w-full py-2 rounded-lg bg-blue-100 text-blue-400 font-medium cursor-not-allowed">
                출시 예정
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">자주 묻는 질문</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: '생성된 문서는 법적 효력이 있나요?',
                a: '생성된 문서는 한국 법령(개인정보 보호법, 전자상거래법 등)을 참고하여 작성된 템플릿입니다. 실제 서비스에 적용하기 전 반드시 법무 전문가의 검토를 받으시기 바랍니다.',
              },
              {
                q: '입력한 서비스 정보는 어디에 저장되나요?',
                a: '비로그인 상태에서는 브라우저 로컬 스토리지에만 저장되며 서버로 전송되지 않습니다. 로그인 후 저장 기능을 사용하면 계정에 안전하게 보관됩니다.',
              },
              {
                q: '개인정보처리방침과 이용약관 둘 다 만들어야 하나요?',
                a: '개인정보를 수집하는 모든 서비스는 개인정보처리방침이 법적으로 의무입니다. 이용약관은 의무는 아니지만 서비스 이용 조건을 명확히 하기 위해 함께 작성하는 것을 권장합니다.',
              },
              {
                q: '생성된 문서를 수정할 수 있나요?',
                a: '미리보기 단계에서 편집 모드를 활성화하면 각 조항을 직접 수정할 수 있습니다. 수정 후 다운로드하시면 됩니다.',
              },
              {
                q: 'PDF 다운로드가 느린 이유가 있나요?',
                a: 'PDF는 서버에서 Puppeteer(크로미엄 기반)를 통해 고품질로 렌더링됩니다. 한글 폰트와 레이아웃이 정확하게 반영되어 처음 요청 시 10~20초 정도 소요될 수 있습니다.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-2">Q. {q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">A. {a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">법률 자문 고지</h3>
              <p className="text-sm text-amber-800">
                본 서비스는 법률 자문을 제공하지 않습니다. 생성된 문서는 참고용이며, 
                실제 배포 전 반드시 법무 전문가의 검토를 받으시기 바랍니다. 
                문서의 내용에 따라 관련 법규 준수 여부를 반드시 확인하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-white">PolicyGen</span>
            </div>
            <p className="text-sm">
              © 2024 PolicyGen. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
