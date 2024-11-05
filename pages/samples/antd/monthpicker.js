import { DatePicker, ConfigProvider, Input } from 'antd';
import koKR from 'antd/lib/locale/ko_KR';
import { useState } from 'react';

const MonthPicker = () => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  const handleDateSelect = (date) => {
    if (date) {
      setYear(date.year().toString());
      setMonth((date.month() + 1).toString()); // 0-indexed, so add 1
    }
    setDatePickerOpen(false); // Close DatePicker after selection
  };

  const openDatePicker = () => {
    setDatePickerOpen(true);
  };

  return (
    <ConfigProvider locale={koKR}>
      {/* <DatePicker onChange={onChange} picker="month" 
      // format={(value) => `${value.month() + 1}월`}
      monthCellRender={(date) => `${date.month() + 1}월`}/> */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <Input 
          placeholder="년도" 
          value={year} 
          onClick={openDatePicker} 
          readOnly 
        />년 
        <Input 
          placeholder="월" 
          value={`${month}`} 
          onClick={openDatePicker} 
          readOnly 
        />월
      </div>
      <DatePicker 
        open={isDatePickerOpen} 
        picker="month" 
        onChange={handleDateSelect} 
        onOpenChange={(open) => setDatePickerOpen(open)} // Sync open state
        style={{ visibility: 'hidden', position: 'absolute' }} // Hide input field
        monthCellRender={(date) => `${date.month() + 1}월`}
      />
    </ConfigProvider>
  );
};

export default MonthPicker;