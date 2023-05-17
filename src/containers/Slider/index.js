import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [order, setOrder] = useState(null);
  // const byDateDesc = data?.focus.sort((evtA, evtB) =>
  //   new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
  // );

  const data2 = data?.focus.length;
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < data2 - 1 ? index + 1 : 0),
      5000
    );
  };


  useEffect(() => {

    setOrder(data?.focus.sort((evtA, evtB) =>
      new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
    ));
    nextCard();

  });

  return (
    <div className="SlideCardList">
      {order?.map((event, idx) => (
        <div key={event.id}>

          <div
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
              }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {order?.map((_, radioIdx) => (
                <input key={_.id} type="radio" name="radio-button" checked={index === radioIdx} readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
