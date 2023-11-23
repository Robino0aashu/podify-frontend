import LoggedInContainer from "../containers/LoggedInContainer";
import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelpers";
import { useNavigate } from "react-router-dom";
const focusCardsData = [
    {
      title: 'Science & Technology',
      description: 'Explore the latest innovations and discoveries in tech.',
      imgUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHNjaWVuY2UlMjBhbmQlMjB0ZWNobm9sb2d5fGVufDB8fDB8fHww',
    },
    {
      title: 'Health & Wellness',
      description: 'Discover podcasts focused on holistic health and wellbeing.',
      imgUrl: 'https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGhlYWx0aCUyMGFuZCUyMHdlbGxuZXNzfGVufDB8fDB8fHww',
    },
    {
      title: 'Business & Finance',
      description: 'Stay informed with podcasts on finance, investing, and business strategies.',
      imgUrl: 'https://images.unsplash.com/photo-1444653389962-8149286c578a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fEJ1c2luZXNzJTIwYW5kJTIwZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      title: 'Arts & Culture',
      description: 'Immerse yourself in podcasts celebrating art, history, and diverse cultures.',
      imgUrl: 'https://images.unsplash.com/flagged/photo-1579657831048-d1f1ec408e3b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEFydHMlMjBhbmQlMjBjdWx0dXJlfGVufDB8fDB8fHww',
    },
    {
      title: 'Sports & Recreation',
      description: 'Catch up on sports commentary, stories, and game analyses.',
      imgUrl: 'https://images.unsplash.com/photo-1605050825338-7ce647cc633f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fFNwb3J0cyUyMGFuZCUyMHJlY3JlYXRpb258ZW58MHx8MHx8fDA%3D',
    },
  ];




const LoggedInHome = () => {
    const [podifyRecordsCardData, setPodifyRecordsCardData]=useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/record/get/all"
            );
            setPodifyRecordsCardData(response.data);
        };
        getData();
    }, [podifyRecordsCardData]);

        return (
            <LoggedInContainer curActiveScreen={"home"}>
                            <RecordView
                                titleText="Categories"
                                cardsData={focusCardsData}
                            />
                            <PodifyRecordView
                                titleText="Podify Records"
                                cardsData={podifyRecordsCardData}
                            />
                            <RecordView
                                titleText="Sound of India"
                                cardsData={focusCardsData}
                            />

            </LoggedInContainer>
        );
    };

    const RecordView = ({ titleText, cardsData }) => {
        return (
            <div className="text-white mt-8">
                <div className="text-2xl font-semibold mb-5">{titleText}</div>
                <div className="w-full flex justify-between space-x-4">
                    {
                        // cardsData will be an array
                        cardsData.map((item) => {
                            return (
                                <Card
                                    title={item.title}
                                    description={item.description}
                                    imgUrl={item.imgUrl}
                                />
                            );
                        })
                    }
                </div>
            </div>
        );
    };
    const PodifyRecordView = ({ titleText, cardsData }) => {
        return (
          <div className="text-white mt-8">
            <div className="text-2xl font-semibold mb-5">{titleText}</div>
            <div className="w-full grid grid-cols-5 gap-4">
              {cardsData.map((item) => (
                <RecordCard
                  key={item._id}
                  title={item.name}
                  owner={`${item.owner.firstName} ${item.owner.lastName}`}
                  imgUrl={item.thumbnail}
                  recordId={item._id}
                />
              ))}
            </div>
          </div>
        );
      };
      
      

    const RecordCard = ({title, owner, imgUrl, recordId}) => {
        const navigate = useNavigate();
        return (
            <div
                className="bg-black bg-opacity-40 w-full p-4 rounded-lg cursor-pointer"
                onClick={() => {
                    navigate("/record/" + recordId);
                }}
            >
                <div className="pb-4 pt-2">
                    <img className="w-full rounded-md" src={imgUrl} alt="label" />
                </div>
                <div className="text-white font-semibold py-3">{title}</div>
                <div className="text-gray-500 text-sm">{owner}</div>
            </div>
        );
    };

    const Card = ({ title, description, imgUrl }) => {
        return (
            <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg">
                <div className="pb-4 pt-2">
                    <img className="w-full rounded-md" src={imgUrl} alt="label" />
                </div>
                <div className="text-white font-semibold py-3">{title}</div>
                <div className="text-gray-500 text-sm">{description}</div>
            </div>
        );
    };

    export default LoggedInHome;
