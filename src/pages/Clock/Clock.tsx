import { useState, useRef, useEffect } from 'react';

import { Wrapper } from './Clock.styled';

const Clock = () => {
  const [time, setTime] = useState<Date>(() => new Date());

  const intervalId = useRef<number | null>(null);

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, []);

  return (
    <Wrapper>
      <p>Current time: {time.toLocaleTimeString()}</p>
    </Wrapper>
  );
};

export default Clock;
