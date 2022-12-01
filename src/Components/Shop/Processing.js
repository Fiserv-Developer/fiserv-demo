import Placeholder from "../Placeholder";
import { ResponsiveModal } from "../ResponsiveModal";

export default function Processing(props) {

  return (
    <ResponsiveModal 
      title={(null)} 
      content={<Placeholder />} 
      buttons={(null)} 
      open={props.open} 
      setOpen={props.setOpen} 
      animationState={props.animationState} />
  );
}