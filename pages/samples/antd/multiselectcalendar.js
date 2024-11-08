import { Calendar } from 'antd';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

const MultiSelectCalendar = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [lastClickedDate, setLastClickedDate] = useState(null);
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Shift') setIsShiftPressed(true);
      if (event.key === 'Control' || event.key === 'Meta') setIsCtrlPressed(true);
    };

    const handleKeyUp = (event) => {
      if (event.key === 'Shift') setIsShiftPressed(false);
      if (event.key === 'Control' || event.key === 'Meta') setIsCtrlPressed(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleDateClick = (date) => {
    const clickedDate = dayjs(date);

    if (isShiftPressed && lastClickedDate) {
      // Shift-Click: Select a range from last clicked date to the current date
      const start = dayjs.min(lastClickedDate, clickedDate);
      const end = dayjs.max(lastClickedDate, clickedDate);
      const rangeDates = [];

      let current = start;
      while (current.isBefore(end) || current.isSame(end)) {
        rangeDates.push(current);
        current = current.add(1, 'day');
      }

      setSelectedDates(rangeDates);
    } else if (isCtrlPressed) {
      // Ctrl-Click: Toggle the clicked date in selectedDates
      const isAlreadySelected = selectedDates.some(d => d.isSame(clickedDate, 'day'));

      if (isAlreadySelected) {
        setSelectedDates(selectedDates.filter(d => !d.isSame(clickedDate, 'day')));
      } else {
        setSelectedDates([...selectedDates, clickedDate]);
      }
    } else {
      // Regular Click: Reset to only the clicked date
      setSelectedDates([clickedDate]);
    }

    setLastClickedDate(clickedDate);
  };

  const dateCellRender = (date) => {
    const isSelected = selectedDates.some(d => d.isSame(date, 'day'));
    return (
      <div style={{
        backgroundColor: isSelected ? '#87cefa' : undefined,
        borderRadius: '50%',
        padding: '5px',
        textAlign: 'center'
      }}>
        {/* {date.date()} */}
      </div>
    );
  };

  return (
    <Calendar
      onSelect={(date) => handleDateClick(date)}
      // dateCellRender={dateCellRender}
    />
  );
};

export default MultiSelectCalendar;
