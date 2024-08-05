import { useState } from "react";
import AlarmList from "./AlarmList";

function Alarm() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isNotice, setIsNotice] = useState<boolean>(false);
  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <li className="relative">
      <button onClick={handleIsOpen} className="flex gap-1">
        알람
        {isNotice && <span className="block w-1 h-1 bg-red-3 rounded-full"></span>}
      </button>
      {isOpen && <AlarmList />}
    </li>
  );
}

export default Alarm;
