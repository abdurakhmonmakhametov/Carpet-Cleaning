import React, { useEffect, useState } from 'react';
import { errorIcon } from '../assets/images';
import { useSelector } from 'react-redux';

const ErrorAlert = ({ timeout = 5000, errorDisplayer, setPasswordError, setUsernameError }) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { error } = useSelector((state) => state.auth);

  useEffect(() => {
    errorDisplayer();
    if (error) {
      setProgress(0);
      setIsLoading(true);
      const progressInt = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) {
            return prev + 2;
          }
          return prev;
        });
      }, 100);

      const hideLoading = setTimeout(() => {
        setIsLoading(false);
        setPasswordError(false);
        setUsernameError(false);
        clearInterval(progressInt);
      }, timeout);

      return () => {
        clearInterval(progressInt);
        clearTimeout(hideLoading);
      };
    }
  }, [error, timeout]);

  return (
    <>
      {isLoading && error && (
        <div className="absolute top-0 right-0 z-50 p-4 error-animation">
          <div className="p-4 text-white rounded bg-[#fef2f2] flex relative overflow-hidden">
            <div>
              <img
                src={errorIcon}
                alt="error"
                className="mr-3"
                width="24px"
                height="24px"
                onClick={() => setIsLoading(false)}
              />
            </div>
            <div>
              <h3 className="text-[#a40c12] font-gilroy font-bold">{error.message}</h3>
              <ul className="text-[#d13019] font-gilroy list-inside list-disc">
                {Object.keys(error.details).map((key, index) => (
                  <li key={index}>
                    {error.details[key]}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="h-[4px] bg-[#d13019] absolute bottom-0 left-0"
              style={{
                width: `${progress}%`,
                transition: 'width 0.1s ease-out',
              }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorAlert;
