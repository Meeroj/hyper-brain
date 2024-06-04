import Brain from '@/assets/brain.png';
import './flippy-brain.css';

export default function FlippyBrain() {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center -z-10">
        <img src={Brain} alt="Brain" className="w-20 absolute animate-move-down" style={{left: '33%', top: '0%' }} />
        <img src={Brain} alt="Brain" className="w-20 absolute animate-move-down" style={{ left: '66%', top: '90%' }} />
        <img src={Brain} alt="Brain" className="w-20 absolute animate-move-left" style={{ right: '0%', bottom: '40%' }} />
        <img src={Brain} alt="Brain" className="w-20 absolute animate-move-left" style={{ right: '90%', bottom: '75%' }} />

      </div>
    </div>
  );
}
