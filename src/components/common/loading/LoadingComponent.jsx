import "./LoadingComponent.css";
 
function LoadingComponent({ text = "Memuat data..." }) {
  return (
    <div className="loading-wrapper" role="status" aria-live="polite">
      <div className="loading-spinner" />
      <p className="loading-text">{text}</p>
    </div>
  );
}
 
export default LoadingComponent;