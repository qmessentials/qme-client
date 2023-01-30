export default function Spinner() {
  return (
    <div
      className="animate-spin inline-block w-20 h-20 border-[6px] border-current border-t-transparent text-black rounded-full"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}
