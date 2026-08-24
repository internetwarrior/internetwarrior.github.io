import { useDomRefs } from "../app/context/RefContext";

function AntiHero({ className = "", ...props }) {
  const { antiHero } = useDomRefs();

  return (
    <div id="anti-hero" ref={antiHero}>
      <img
        className={`w-full h-full object-cover main-filter z-10 ${className}`}
        {...props}
      />
    </div>
  );
}

export default AntiHero;
