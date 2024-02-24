import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Define the type for each slide item
type Item = {
    title: string;
    description: string;
    imageUrl: string;
  };
  
// Props type definition
interface MySliderProps {
  items: Item[]; // Use the Item type for items prop
}

const MySlider: React.FC<MySliderProps> = ({ items }) => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        // Add responsive settings here as needed
      ]
    };
  
    return (
      <div className="container mx-auto px-4">
        <Slider {...settings}>
          {items.map((item, index) => (
            <div key={index} className="p-4 flex flex-col items-center">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <h3 className="text-lg font-semibold mb-2 text-center p-2">{item.title}</h3>
                <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
                <p className="text-sm text-center p-2">{item.description}</p>
                <button className="bg-purple-500 text-white rounded-full py-2 px-4 mb-4 hover:bg-purple-700 transition duration-150 ease-in-out">
                  Complete Task
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  };
  
  export default MySlider;