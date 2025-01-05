import { useState } from "react";
import { Separator } from "./ui/separator";
import EmblaCarousel from "./carousel/EmblaCarousel";
import Image from "next/image";
import { ReviewItem, reviewMock } from "./ReviewItem";

export default function MatchingItem() {
  const mockupData = [
    {
      photo_url: ["next.svg", "file.svg"],
      title: "Home in Vancouver",
      city: "120 Garden dr, Vancouver, BC, Canada",
      price: 1500,
    },
    {
      photo_url: ["globe.svg", "logo.svg"],
      title: "2br - Private room with bathroom",
      city: "Downtown",
      price: 1000,
    },
    {
      photo_url: ["window.svg", "next.svg"],
      title: "Furnished Upstair Quite room",
      city: "Port Moody",
      price: 900,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mockupData.length);
    alert("like");
  };

  const prevItem = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mockupData.length - 1 : prevIndex - 1
    );
    alert("dislike");
  };

  const count = 3; // 반복 개수 (수동 설정)
  const items = Array.from({ length: count }, (_, index) => index);

  return (
    <div className="flex justify-center">
      <div className="mr-[85px] mt-[40vh]">
        <button onClick={prevItem}>
          <Image src="leftArrow.svg" width={30} height={30} alt="" />
        </button>
      </div>
      <div className="max-w-custom-sm">
        <div className="flex flex-col items-center">
          <div>
            <EmblaCarousel slides={mockupData[currentIndex].photo_url} />
          </div>
          <div className="my-5">
            <section className="flex flex-col section">
              <div className="flex justify-between py-5">
                <h1 className="h1">{mockupData[currentIndex].title}</h1>
                <h3 className="text-xl">${mockupData[currentIndex].price}</h3>
              </div>
              <span className="text-xl">{mockupData[currentIndex].city}</span>
            </section>
            <section className="section">
              <ul className="filter_container">
                {items.map((item) => (
                  <li key={item} className="filter__item">
                    No Smoking
                  </li>
                ))}
              </ul>
            </section>
            <Separator />
            <section className="flex flex-col">
              <h1 className="h1">Reviews</h1>
              <div>
                {reviewMock.map((item, index) => (
                  <div key={item.id}>
                    <ReviewItem
                      writer={item.writer}
                      title={item.title}
                      body={item.body}
                      point={item.point}
                    />
                    {index !== reviewMock.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
              <button className="text-sm mt-10 py-2">view more {">"}</button>
            </section>
            {/** end review */}
            <Separator />
            <section>
              <h1 className="h1">Location</h1>
              <div className="w-[600px] h-[600px] bg-gray-200"></div>
            </section>
            {/** end Location */}
            <Separator />
            <section>
              <h1 className="h1">Host</h1>
              <div className="rounded-md shadow-full m-6 p-6 flex">
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="w-36 h-36 bg-orange-300 rounded-full" />
                  <h3 className="h2">HostName</h3>
                </div>
                <div className="flex-1 flex flex-col">
                  <p className="text-2xl">8.5</p>
                  <span className="">Avg Rates</span>
                  <Separator />
                  <p className="text-2xl">8.5</p>
                  <span className="">Avg Rates</span>
                  <Separator />
                  <p className="text-2xl">8.5</p>
                  <span className="">Avg Rates</span>
                </div>
              </div>
              {/** host box */}
              <p className="text-xl">
                {`Hi, I'm Emily! I've been an Airbnb host for over 3 years. I love
                meeting new people and ensuring they have a comfortable stay.`}
              </p>
              {/** host description */}
            </section>
            {/** end Host */}
          </div>
        </div>
      </div>
      <div className="ml-[85px] mt-[40vh]">
        <button onClick={nextItem}>
          <Image src="rightArrow.svg" width={30} height={30} alt="" />
        </button>
      </div>
    </div>
  );
}
