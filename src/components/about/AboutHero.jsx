import { useInView } from 'react-intersection-observer'
import { usePreloader } from '../../utils/PreloaderContext'
import { useState, useEffect } from 'react'
import Button from '../common/button/Button'
import AboutHeadline from './AboutHeadline'

function AboutHero() {
  const { isRevealed } = usePreloader();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (inView && isRevealed) {
      const timer = setTimeout(() => setShowButton(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [inView, isRevealed]);

  return (
    <section className="aboutHero" data-navbar="dark" ref={ref}>
      <AboutHeadline />
      <div className="aboutHeroButton">
        <Button
          text='the math checks out'
          color='green'
          className={showButton ? 'heroButtonPop' : ''}
        />
      </div>
    </section>
  )
}

export default AboutHero
