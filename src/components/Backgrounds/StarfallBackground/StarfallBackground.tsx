import './index.scss'

export default function StarfallBackground() {
  return (
    <div className="starfall-stars text-white">
      <div className="star" onAnimationEnd={() => {
        console.log('d')
      }}></div>
      <div className="star"></div>
      <div className="star"></div>
    </div>
  );
}
