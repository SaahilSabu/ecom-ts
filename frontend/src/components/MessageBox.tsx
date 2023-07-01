export default function MessageBox({
  variant = 'info',
  children,
}: {
  variant?: string;
  children: React.ReactNode;
}) {
  const getVariantClasses = (variant: string) => {
    switch (variant) {
      case 'danger':
        return 'bg-red-100 text-red-900 border-red-400';
      case 'warning':
        return 'bg-yellow-100 text-yellow-900 border-yellow-400';
      case 'success':
        return 'bg-green-100 text-green-900 border-green-400';
      default:
        return 'bg-blue-100 text-blue-900 border-blue-400';
    }
  };

  const variantClasses = getVariantClasses(variant);

  return (
    <div className={`p-4 border-l-4 ${variantClasses}`} role="alert">
      {children}
    </div>
  );
}
