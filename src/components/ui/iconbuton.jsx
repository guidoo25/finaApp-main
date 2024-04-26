import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ButtonIcon({ onClick }) {
  const [isClicked, setIsClicked] = useState(false); // Add a state to track if the button has been clicked

  const handleClick = () => {
    setIsClicked(!isClicked); // Toggle the state when the button is clicked
    onClick(); // Call the onClick function passed as a prop
  };

  return (
    <Button variant="outline" size="icon" onClick={handleClick}>
      {isClicked ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
    </Button>
  );
}