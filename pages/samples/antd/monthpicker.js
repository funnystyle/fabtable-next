import { ConfigProvider, DatePicker, Input } from 'antd';
import koKR from 'antd/es/locale/ko_KR';
import "dayjs/locale/ko";
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const App = () => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const [isDatePickerOpen, setDatePickerOpen] = useState(false);

  const openDatePicker = () => {
    setDatePickerOpen(true);
  };

  const onDateChange = (date) => {
    setSelectedDate(date);
    setYear(date.year().toString());
    setMonth((date.month() + 1).toString());
    setDatePickerOpen(false);
  };

  const onManualInput = (e) => {
    setDatePickerOpen(false);
    if (e.key === 'Enter') {
      e.target.blur();
    }
  }

  const onYearChange = (e) => {
    setYear(e.target.value);
  }

  const onMonthChange = (e) => {
    setMonth(e.target.value);
  }

  useEffect(() => {
    if (year && month) {
      const date = dayjs(`${year}-${month.padStart(2, '0')}-01`);
      setSelectedDate(date);
    }
  }, [year, month]);

  return (
    <ConfigProvider locale={koKR}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Input 
          value={year} 
          placeholder="년(예: 2024)" 
          onClick={openDatePicker}
          onChange={onYearChange} 
          onKeyUp={onManualInput}
          style={{ width: '80px' }} 
        />
        <span>년</span>
        <Input 
          value={month} 
          placeholder="월(예: 5)" 
          onClick={openDatePicker}
          onChange={onMonthChange} 
          onKeyUp={onManualInput}
          style={{ width: '60px' }} 
        />
        <span>월</span>
      </div>
      <DatePicker 
        open={isDatePickerOpen}
        picker="month" 
        value={selectedDate} 
        onChange={onDateChange} 
        format={(value) => `${value.year()}년 ${value.month() + 1}월`} 
        style={{ visibility: 'hidden', top:-30 }}  // DatePicker UI 숨기기
        monthCellRender={(date) => {
          const isSelected = selectedDate && date.isSame(selectedDate, 'month');
          return (
            <div style={{ 
              backgroundColor: isSelected ? '#1890ff' : 'transparent',
              color: isSelected ? '#fff' : 'inherit',
              borderRadius: '4px',
              padding: '4px 0',
              textAlign: 'center'
            }}>
              {`${date.month() + 1}월`}
            </div>
          );
        }}
      />
    </ConfigProvider>
  );
};

export default App;
