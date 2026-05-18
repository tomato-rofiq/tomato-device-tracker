// this component is used to display a loading or error message 
// while data is being fetched or an error has occurred

interface Props {
  loading?: boolean;
  error?: string | null;
  message?: string;
}

export function StatusScreen({ loading, error, message = 'Loading...' }: Props) {
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p>{message}</p>
    </div>
  );
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500">{error}</p>
    </div>
  );
  return null;
}
