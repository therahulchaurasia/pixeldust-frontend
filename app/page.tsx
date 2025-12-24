import { InteractionProvider } from '@/components/InteractionContext';
import PageContainer from '@/components/PageContainer';
import ShiftList from '@/components/ShiftList';
import ShiftTabs from '@/components/ShiftTabs';
import { Suspense } from 'react';

function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-50">
      <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
    </div>
  );
}

function Home() {
  return (
    <PageContainer>
      <InteractionProvider>
        <Suspense fallback={<LoadingFallback />}>
          <ShiftTabs />
          <ShiftList />
        </Suspense>
      </InteractionProvider>
    </PageContainer>
  );
}

export default Home;
