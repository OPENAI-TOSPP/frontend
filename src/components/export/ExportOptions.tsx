import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Copy, FileText, FileCode, Download, CheckCircle2,
  FileDown, Globe, Save, Loader2, AlertCircle,
} from 'lucide-react';

export function ExportOptions() {
  const { document: generatedDoc, serviceInfo, selectedItems, detailInputs } = useAppStore();
  const { isAuthenticated } = useAuthStore();
  const [copied, setCopied] = useState(false);
  const [isLoadingPDF, setIsLoadingPDF] = useState(false);
  const [isLoadingHTML, setIsLoadingHTML] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!generatedDoc) return null;

  const handleCopy = async () => {
    const plainText = generatedDoc.sections
      .map(s => `${s.title}\n\n${stripHtml(s.content)}`)
      .join('\n\n');
    try {
      await navigator.clipboard.writeText(plainText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handlePDFDownload = async () => {
    setIsLoadingPDF(true);
    setError(null);
    try {
      const response = await api.post(
        '/export/pdf',
        { type: 'privacy-policy', content: generatedDoc, serviceInfo },
        { responseType: 'blob' },
      );
      const url = URL.createObjectURL(response.data);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = `${serviceInfo.serviceName}_개인정보처리방침.pdf`;
      window.document.body.appendChild(a);
      a.click();
      window.document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error('PDF generation failed:', err);
      setError(err?.message ?? 'PDF 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoadingPDF(false);
    }
  };

  const handleHTMLDownload = async () => {
    setIsLoadingHTML(true);
    setError(null);
    try {
      const response = await api.post(
        '/export/html',
        { type: 'privacy-policy', content: generatedDoc, serviceInfo },
        { responseType: 'blob' },
      );
      const url = URL.createObjectURL(response.data);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = `${serviceInfo.serviceName}_개인정보처리방침.html`;
      window.document.body.appendChild(a);
      a.click();
      window.document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error('HTML download failed:', err);
      setError(err?.message ?? 'HTML 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoadingHTML(false);
    }
  };

  const handleTextDownload = () => {
    const plainText = generatedDoc.sections
      .map(s => `${s.title}\n\n${stripHtml(s.content)}`)
      .join('\n\n');
    const blob = new Blob([plainText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${serviceInfo.serviceName}_개인정보처리방침.txt`;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      await api.post('/documents', {
        type: 'privacy-policy',
        title: `${serviceInfo.serviceName} 개인정보처리방침`,
        content: generatedDoc,
        serviceInfo,
        selections: { selectedItems, detailInputs },
      });
      setSaved(true);
    } catch (err: any) {
      console.error('Save failed:', err);
      setError(err?.message ?? '저장에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm">{error}</p>
          <button onClick={() => setError(null)} className="ml-auto text-red-500 hover:text-red-700 text-lg leading-none">&times;</button>
        </div>
      )}

      {/* 저장 카드 (로그인 상태에서만) */}
      {isAuthenticated && (
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="p-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-emerald-900">문서 저장</h3>
              <p className="text-sm text-emerald-700 mt-1">
                생성된 문서를 계정에 저장하고 언제든지 다시 불러올 수 있습니다.
              </p>
            </div>
            <Button
              onClick={handleSave}
              disabled={isSaving || saved}
              className="shrink-0 bg-emerald-600 hover:bg-emerald-700"
            >
              {isSaving ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />저장 중...</>
              ) : saved ? (
                <><CheckCircle2 className="w-4 h-4 mr-2" />저장 완료</>
              ) : (
                <><Save className="w-4 h-4 mr-2" />저장하기</>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Export Options */}
      <Tabs defaultValue="copy" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="copy">
            <Copy className="w-4 h-4 mr-2" />복사
          </TabsTrigger>
          <TabsTrigger value="pdf">
            <FileDown className="w-4 h-4 mr-2" />PDF
          </TabsTrigger>
          <TabsTrigger value="html">
            <FileCode className="w-4 h-4 mr-2" />HTML
          </TabsTrigger>
          <TabsTrigger value="text">
            <FileText className="w-4 h-4 mr-2" />텍스트
          </TabsTrigger>
        </TabsList>

        <TabsContent value="copy" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  {copied ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  ) : (
                    <Copy className="w-8 h-8 text-blue-600" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900">
                    {copied ? '복사 완료!' : '클립보드에 복사'}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    문서 내용을 클립보드에 복사하여 원하는 곳에 붙여넣으세요.
                  </p>
                </div>
                <Button onClick={handleCopy} className="w-full sm:w-auto" variant={copied ? 'outline' : 'default'}>
                  {copied ? (
                    <><CheckCircle2 className="w-4 h-4 mr-2" />복사됨</>
                  ) : (
                    <><Copy className="w-4 h-4 mr-2" />내용 복사하기</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pdf" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <FileDown className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900">PDF 다운로드</h3>
                  <p className="text-sm text-slate-500 mt-1">A4 크기의 PDF 파일로 다운로드합니다.</p>
                </div>
                <Button onClick={handlePDFDownload} disabled={isLoadingPDF} className="w-full sm:w-auto">
                  {isLoadingPDF ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />생성 중...</>
                  ) : (
                    <><Download className="w-4 h-4 mr-2" />PDF 다운로드</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="html" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <FileCode className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900">HTML 다운로드</h3>
                  <p className="text-sm text-slate-500 mt-1">웹사이트에 바로 적용할 수 있는 HTML 파일입니다.</p>
                </div>
                <Button onClick={handleHTMLDownload} disabled={isLoadingHTML} className="w-full sm:w-auto">
                  {isLoadingHTML ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />생성 중...</>
                  ) : (
                    <><Download className="w-4 h-4 mr-2" />HTML 다운로드</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="text" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                  <FileText className="w-8 h-8 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900">텍스트 다운로드</h3>
                  <p className="text-sm text-slate-500 mt-1">순수 텍스트 형식으로 다운로드합니다.</p>
                </div>
                <Button onClick={handleTextDownload} className="w-full sm:w-auto">
                  <Download className="w-4 h-4 mr-2" />텍스트 다운로드
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Embed Code */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Globe className="w-4 h-4" />웹사이트 연동
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500 mb-3">
            웹사이트 푸터에 개인정보처리방침 링크를 추가하세요.
          </p>
          <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm text-slate-300">
              {`<a href="/privacy-policy">개인정보처리방침</a>`}
            </code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function stripHtml(html: string): string {
  const tmp = window.document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}
