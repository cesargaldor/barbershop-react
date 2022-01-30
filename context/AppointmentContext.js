import { createContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [latestAppointments, setLatestAppointments] = useState();

  const getLatestAppointments = async () => {
    const { data, error } = await supabase.from('citas').select().range(0, 20);
    if (data && !error) {
      const todaysAppointments = data.filter((a) => {
        return new Date(a.date).getDate() === new Date().getDate();
      });
      setLatestAppointments(todaysAppointments);
    } else {
      alert(error.message);
    }
  };

  const contextData = {
    latestAppointments,
    getLatestAppointments,
  };

  // Loads latest appointments
  useEffect(() => {
    getLatestAppointments();
  }, []);

  return (
    <AppointmentContext.Provider value={contextData}>
      {children}
    </AppointmentContext.Provider>
  );
};
