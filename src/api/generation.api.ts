import apiClient from './client';

export const generationApi = {
  generatePrivacyPolicy: (data: {
    serviceInfo: any;
    selectedItems: string[];
    detailInputs: Record<string, any>;
  }) => apiClient.post('/generate/privacy-policy', data),

  generateTermsOfService: (data: {
    serviceInfo: any;
    selectedFeatures: string[];
    featureInputs: Record<string, any>;
  }) => apiClient.post('/generate/terms-of-service', data),
};
