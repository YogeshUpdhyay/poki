export const Separator = ({color}) => (
  <svg 
    style={{ margin: '0 3px 0 3px' }} 
    width="2" 
    height="10" 
    viewBox="0 0 2 10" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="1.5" width="10" height="1.5" rx="0.75" transform="rotate(90 1.5 0)" fill={color}/>
  </svg>
);