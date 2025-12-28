import './BrandNeeds.css'
import { useState } from 'react'
import {
  useFloating,
  useClientPoint,
  offset,
  autoUpdate,
  useInteractions,
} from "@floating-ui/react";
import brandNeedsCartoon from '../../assets/imgs/brandNeedsCartoon.svg'
import Offerings from '../offerings/Offerings'
import offeringCardSvg1 from '../../assets/imgs/offeringText1.svg'
import Button from '../button/Button'

export default function BrandNeeds() {
  return (
    <section className="brandNeeds">
      <BrandNeedsHeadline />
      <Offerings
        offerCardSvg={offeringCardSvg1}
        title={<>{'log'} <br /> {'design'}</>}
        cardColor="green"
        offeringDescLines={[
          'ideation & moodboards',
          'custom logo creation',
        ]}
      />
      <div className="brandNeedsButton">
        <Button text="start a project" />
      </div>
    </section>
  )
}

function BrandNeedsHeadline() {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(8)], // optional offset
    whileElementsMounted: autoUpdate,
  });

  const clientPoint = useClientPoint(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    clientPoint,
  ]);

  return (
    <h1 className="headlineText">
      <span
        className="headlineWrapper"
        ref={refs.setReference}
        {...getReferenceProps({
          onMouseEnter: () => setOpen(true),
          onMouseLeave: () => setOpen(false),
        })}
      >
        <span className="headlineHighlight">everything</span> your <br />
        brand needs

        <img
          src={brandNeedsCartoon}
          alt="brandNeedsCartoon"
          className="brandNeedsCartoon"
        />

      </span>

      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps({
            className: "tooltip blue",
          })}
        >
          no shadows, only shine
        </div>)}
    </h1>
  )
}
