import { useDispatch } from 'react-redux';

import Modal from '../general-ui/Modal';
import { alertActions } from '../../store/alertSlice';
import doneAnimation from '../../assets/lottie/done.json';
import { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';

export default function AlertModal({ alert, color }) {
  const dispatch = useDispatch();
  const animationContainer = useRef(null);

  function handleClose() {
    dispatch(alertActions.clear());
  }

  useEffect(() => {
    const animation = Lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: doneAnimation, // path to your animation
    });

    animation.addEventListener('complete', () => {
      animation.goToAndStop(animation.totalFrames - 1, true);
    });

    return () => {
      animation.destroy();
    };
  }, []);

  const message = alert.messages[0];

  return (
    <Modal
      onClose={handleClose}
      open={alert.messages.length !== 0}
      className="rounded-lg"
      animation={{
        hidden: { opacity: 0, y: 250 },
        visible: { opacity: 1, y: 200 },
      }}
    >
      <div class={' rounded-lg border-2 border-slate-400 px-12 pb-6  ' + color}>
        <div class="flex flex-col items-center justify-center ">
          <div ref={animationContainer} class="w-[120px] h-[120px]"></div>
          <div class="dark:text-slate-200 font-light text-slate-500 max-w-lg text-center mb-5">
            {message}
          </div>
          <button
            onClick={handleClose}
            class="bg-logoOrange text-white px-8 py-3 rounded-lg"
          >
            Ok
          </button>
        </div>
      </div>
    </Modal>
  );
}
