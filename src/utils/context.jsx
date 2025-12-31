import { createContext, useContext, useEffect, useState } from "react";
import OfferingText1 from '../assets/imgs/offeringText1.svg';
import OfferingText2 from '../assets/imgs/offeringText2.svg';
import OfferingText3 from '../assets/imgs/offeringText3.svg';
import projectCardImg1 from '../assets/imgs/projects/projectImg1.png';
import projectCardImg2 from '../assets/imgs/projects/projectImg2.png';
import projectCardImg3 from '../assets/imgs/projects/projectImg3.png';
import projectCardImg4 from '../assets/imgs/projects/projectImg4.png';
import projectCardImg5 from '../assets/imgs/projects/projectImg5.png';
import heroBackgroundMedia from '../assets/imgs/heroBackground.png';

const CmsContext = createContext(null);

const tempCMSData = {
  brandNeedsSection: {
      offerings: [
          {
              color: 'green',
              title: ['logo', 'design'],
              lines: [
                  'ideation & moodboarding',
                  'custom logo creation',
                  'scalable systems',
                  'brand-ready formats',
                  'vector deliverables'
              ],
              svg: OfferingText1
          },
          {
              color: 'pink',
              title: ['brand identity', 'development'],
              lines: [
                  'color & typography systems',
                  'identity guidelines',
                  'visual toolkit',
                  'presentation decks',
                  'collateral design'
              ],
              svg: OfferingText2
          },
          {
              color: 'blue',
              title: ['website and', 'ui design'],
              lines: [
                  'cro landing pages',
                  'responsive websites',
                  'mobile applications',
                  'web applications',
                  'wireframes & flows'
              ],
              svg: OfferingText3
          }
      ]
  },
  projects: [
    { title: 'begun', image: projectCardImg1 },
    { title: 'alpha', image: projectCardImg2 },
    { title: 'nebula', image: projectCardImg3 },
    { title: 'zenith', image: projectCardImg4 },
    { title: 'orbit', image: projectCardImg5 },
  ],
  hero: {
    backgroundMedia: heroBackgroundMedia,
    countMeInUrl: 'https://example.com/contact',
    lines: ['we make your brand,', 'sharper and louder'],
    highlight: 'sharper'
  }
}

export function CmsProvider({ children }) {
  const [data, setData] = useState(tempCMSData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    // async function load() {
    //   try {
    //     setLoading(true);
    //     // replace with your CMS fetch
    //     const res = await fetch("/api/cms/home");
    //     if (!res.ok) throw new Error("Failed to fetch CMS");
    //     const json = await res.json();
    //     if (!cancelled) setData(json);
    //   } catch (e) {
    //     if (!cancelled) setError(e);
    //   } finally {
    //     if (!cancelled) setLoading(false);
    //   }
    // }

    // load();
    console.log("CMS data loaded", data);
    return () => { cancelled = true; };
  }, []);

  return (
    <CmsContext.Provider value={{ data, loading, error }}>
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error("useCms must be used inside <CmsProvider />");
  return ctx;
}
