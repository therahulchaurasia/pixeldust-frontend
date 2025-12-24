interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center sm:justify-center sm:py-12 transition-all duration-300">
      <div
        className={`w-full min-h-screenbg-white sm:max-w-xl sm:min-h-0 sm:rounded-2xl  sm:border sm:border-gray-100 flex flex-col ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export default PageContainer;
