type useCalculateAgeT = {
  day: string;
  month: string;
  year: string;
};

export function useCalculateAge({ day, month, year }: useCalculateAgeT) {
  const calculateAge = () => {
    // Get current date
    const currentDate: Date = new Date();

    // Parse the birthdate string to create a Date object
    const birthDate: Date = new Date(`${year}-${month}-${day}`);

    // Calculate the difference in milliseconds
    const difference: number = currentDate.getTime() - birthDate.getTime();

    // Convert the difference from milliseconds to days
    const daysDifference: number = difference / (1000 * 60 * 60 * 24);

    // Calculate years
    const years: number = Math.floor(daysDifference / 365);

    // Calculate months
    const months: number = Math.floor((daysDifference % 365) / 30);

    // Calculate remaining days
    const days: number = Math.floor((daysDifference % 365) % 30);

    return {
      years,
      months,
      days,
    };
  };

  return {
    calculateAge,
  };
}
