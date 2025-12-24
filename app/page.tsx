import { InteractionProvider } from '@/components/InteractionContext';
import PageContainer from '@/components/PageContainer';
import ShiftList from '@/components/ShiftList';
import ShiftTabs from '@/components/ShiftTabs';

function Home() {
  return (
    <PageContainer>
      <InteractionProvider>
        <ShiftTabs />
       <ShiftList />
      </InteractionProvider>
    </PageContainer>
  );
}

export default Home;
