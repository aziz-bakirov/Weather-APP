import React, { useEffect, useState } from "react";
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { FaCloudSunRain, FaGrinBeamSweat } from "react-icons/fa";
import { GiCoffeeCup } from "react-icons/gi";
import { IoSearch } from "react-icons/io5";
import { MdVisibility } from "react-icons/md";
import { RiTimeZoneFill } from "react-icons/ri";
import { WiHumidity } from "react-icons/wi";

function App() {
  const [search, setSearch] = useState(null);
  const [data, setData] = useState(null);

  const apiKey = "c27e579141f6528092accb9ce1e29c84";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`
        );

        const weatherData = await res.json();
        setData(weatherData);
      } catch (error) {
        console.log("Error fetching weather data:", error);
      }
    };

    if (search) {
      fetchWeather();
    }
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target[0].value);
  };

  const timezone = data?.timezone;
  const offsetHours = timezone / 3600;

  const timezoneStr =
    offsetHours >= 0 ? `UTC+${offsetHours}` : `UTC${offsetHours}`;

  return (
    <div className="bg-gray-300 w-full h-screen flex items-center justify-center">
      <div className="bg-gray-900 text-white w-120 rounded-4xl p-2 flex flex-col justify-between ">
        <div className="bg-gray-400 rounded-3xl p-4 w-full pr-8 pl-8">
          <div className="flex justify-between items-center mb-8">
            <div className="bg-gray-700 w-full flex items-center rounded-2xl pr-4 pl-4">
              <span>
                <IoSearch className="text-3xl text-gray-100" />
              </span>
              <form
                action=""
                className="w-full"
                onSubmit={(e) => handleSubmit(e)}
              >
                <input
                  type="text"
                  className="w-full text-gray-100 p-2 text-2xl outline-0"
                />
              </form>
            </div>
          </div>
          {data ? (
            <>
              <div className="flex justify-between items-center">
                <div className="text-8xl">{Math.floor(data?.main?.temp)}°</div>
                <div className="text-8xl">
                  <img
                    src={`http://openweathermap.org/img/wn/${data?.weather[0]?.icon}@4x.png`}
                    alt={data?.weather[0]?.description}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mt-10">
                <div className="flex gap-1 flex-col items-center">
                  <div className="text-4xl">
                    <FaGrinBeamSweat />
                  </div>
                  <div className="mt-1">Pressure</div>
                  <div className="text-gray-300">
                    {data?.main?.pressure} (hPa)
                  </div>
                </div>
                <div className="flex gap-1 flex-col items-center">
                  <div className="text-4xl">
                    <WiHumidity />
                  </div>
                  <div className="mt-1">Humidity</div>
                  <div className="text-gray-300">{data?.main?.humidity} %</div>
                </div>
                <div className="flex gap-1 flex-col items-center">
                  <div className="text-4xl">
                    <GiCoffeeCup />
                  </div>
                  <div className="mt-1">Feels Like</div>
                  <div className="text-gray-300">
                    {Math.floor(data?.main?.feels_like)} °
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center mt-5">
                <div className="w-15 rounded-4xl h-1 bg-white"></div>
              </div>
            </>
          ) : (
            <div className="text-center p-8 text-2xl">PLS Search City 😊</div>
          )}
        </div>
        {data && (
          <>
            <div className="bg-gray-800 rounded-3xl mt-2 p-4 pr-8 pl-8">
              <div className="flex justify-between">
                <div>Clouds:</div>
                <div>
                  <span>{data?.clouds?.all} %</span>
                </div>
              </div>
              <div className="flex justify-between mt-3">
                <div>Wind:</div>
                <div>
                  <span>{data?.wind?.speed} (m/s)</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-3xl mt-2 p-6 pr-8 pl-8 flex justify-between">
              <div className="flex flex-col items-center gap-4">
                <div className="text-1xl">Sunset</div>
                <div className="text-4xl">
                  <BsFillSunsetFill />
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <div className="text-gray-500">
                    {new Date(data?.sys?.sunset * 1000).toLocaleTimeString()}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="text-1xl">Sunrise</div>
                <div className="text-4xl">
                  <BsFillSunriseFill />
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <div className="text-gray-500">
                    {new Date(data?.sys?.sunrise * 1000).toLocaleTimeString()}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="text-1xl">Timezone</div>
                <div className="text-4xl">
                  <RiTimeZoneFill />
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <div className="text-gray-500">{timezoneStr}</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="text-1xl">Visibility</div>
                <div className="text-4xl">
                  <MdVisibility />
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <div className="text-gray-500">
                    {(data?.visibility / 1000).toFixed(1)} k/m
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
