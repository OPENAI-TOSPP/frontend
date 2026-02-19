import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { documentsApi } from '@/api/documents.api';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface DocumentItem {
  id: string;
  type: 'privacy-policy' | 'terms-of-service';
  title: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export function MyDocuments() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true });
      return;
    }
    loadDocuments();
  }, [isAuthenticated, page, filter]);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const params: any = { page, limit: 10 };
      if (filter) params.type = filter;
      const { data } = await documentsApi.list(params);
      const result = data.data || data;
      setDocuments(result.items);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error('Failed to load documents', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      await documentsApi.delete(id);
      loadDocuments();
    } catch (error) {
      console.error('Failed to delete document', error);
    }
  };

  const typeLabel = (type: string) =>
    type === 'privacy-policy' ? '개인정보처리방침' : '이용약관';

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">내 문서</h1>
        <Button variant="outline" onClick={() => navigate('/')}>
          홈으로
        </Button>
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          variant={filter === '' ? 'default' : 'outline'}
          size="sm"
          onClick={() => { setFilter(''); setPage(1); }}
        >
          전체
        </Button>
        <Button
          variant={filter === 'privacy-policy' ? 'default' : 'outline'}
          size="sm"
          onClick={() => { setFilter('privacy-policy'); setPage(1); }}
        >
          개인정보처리방침
        </Button>
        <Button
          variant={filter === 'terms-of-service' ? 'default' : 'outline'}
          size="sm"
          onClick={() => { setFilter('terms-of-service'); setPage(1); }}
        >
          이용약관
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">불러오는 중...</div>
      ) : documents.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>저장된 문서가 없습니다.</p>
          <Button className="mt-4" onClick={() => navigate('/')}>
            문서 만들기
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <Card key={doc.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{doc.title}</CardTitle>
                    <CardDescription>
                      {typeLabel(doc.type)} | {new Date(doc.updatedAt).toLocaleDateString('ko-KR')}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${doc.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {doc.status === 'published' ? '게시됨' : '초안'}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex gap-2 justify-end">
                  <Button size="sm" variant="outline" onClick={() => handleDelete(doc.id)}>
                    삭제
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            이전
          </Button>
          <span className="px-3 py-1 text-sm text-gray-600">
            {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            다음
          </Button>
        </div>
      )}
    </div>
  );
}
