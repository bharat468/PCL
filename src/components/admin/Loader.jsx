export default function AdminLoader() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src="/logo.png"
        alt="loader"
        className="animate-pulse"
        width={80}
        height={80}
      />
      <p className="mt-4 text-sm animate-pulse">Loading...</p>
    </div>
  );
}
