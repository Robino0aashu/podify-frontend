import { Icon } from "@iconify/react";
import podify_logo from "../assets/images/podify-white.png";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
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
  

  const podifyRecordsCardData = [
    {
        title: "Morning Commute",
        description: "Start your day with engaging discussions and inspiring stories.",
        imgUrl: "https://images.unsplash.com/photo-1694816601757-5aeff1b1ae90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TW9ybmluZyUyMENvbW11dGV8ZW58MHx8MHx8fDA%3D",
    },
    {
        title: "Health & Wellness",
        description: "Explore podcasts that promote a healthier lifestyle and wellness tips.",
        imgUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhlYWx0aHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        title: "Tech Talk",
        description: "Stay updated with the latest tech news, discussions, and innovations.",
        imgUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fFRlY2glMjB0YWxrfGVufDB8fDB8fHww"
    },
    {
        title: "Storytelling Hour",
        description: "Dive into captivating stories, narratives, and fictional tales.",
        imgUrl: "https://plus.unsplash.com/premium_photo-1661538826593-7d629944a11a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3RvcnklMjB0ZWxsaW5nfGVufDB8fDB8fHww",
    },
    {
        title: "Business Insights",
        description: "Learn from successful entrepreneurs and get valuable business insights.",
        imgUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QnVzaW5lc3MlMjBJbnNpZ2h0c3xlbnwwfHwwfHx8MA%3D%3D",
    },
];


const Home = () => {

    const navigate=useNavigate();

    return (
        <div className="h-full w-full flex">
            {/* This first div will be the left panel */}
            <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
                <div>
                    {/* This div is for logo */}
                    <div className="logoDiv p-6">
                        <img
                            src={podify_logo}
                            alt="podify logo"
                            width={135}
                        />
                    </div>
                    <div className="py-5">
                        <IconText
                            iconName={"material-symbols:home"}
                            displayText={"Home"}
                            active
                        />
                        <IconText
                            iconName={"material-symbols:search-rounded"}
                            displayText={"Search"}
                        />
                        <IconText
                            iconName={"icomoon-free:books"}
                            displayText={"Library"}
                        />
                    </div>
                    <div className="pt-5">
                        <IconText
                            iconName={"material-symbols:add-box"}
                            displayText={"Create Records"}
                        />
                        <IconText
                            iconName={"mdi:cards-heart"}
                            displayText={"Liked Podcasts"}
                        />
                    </div>
                </div>
                <div className="px-5">
                    <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
                        <Icon icon="carbon:earth-europe-africa" />
                        <div className="ml-2 text-sm font-semibold">
                            English
                        </div>
                    </div>
                </div>
            </div>
            {/* This second div will be the right part(main content) */}
            <div className="h-full w-4/5 bg-app-black overflow-auto">
                <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
                    <div className="w-1/2 flex h-full">
                        <div className="w-3/5 flex justify-around items-center">
                            <TextWithHover displayText={"Support"} />
                            <TextWithHover displayText={"Download"} />
                            <div className="h-1/2 border-r border-white"></div>
                        </div>
                        <div className="w-2/5 flex justify-around h-full items-center">
                            <TextWithHover displayText={"Sign up"} onClick={()=>{
                                navigate("/signup");
                            }}/>
                            <button className="bg-white h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer" onClick={()=>{
                                navigate("/login");
                            }}>
                                Log in
                            </button>
                        </div>
                    </div>
                </div>
                <div className="content p-8 pt-0 overflow-auto">
                    <RecordView
                        titleText="Categories"
                        cardsData={focusCardsData}
                    />
                    <RecordView
                        titleText="Podify Records"
                        cardsData={podifyRecordsCardData}
                    />
                    <RecordView
                        titleText="Sound of India"
                        cardsData={focusCardsData}
                    />
                </div>
            </div>
        </div>
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

export default Home;
