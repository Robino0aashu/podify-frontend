import {useState, useEffect} from "react";
import { Howl, Howler } from "howler";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelpers";
import SinglePodcastCard from "../components/shared/SinglePodcastCard";
import LoggedInContainer from "../containers/LoggedInContainer";

const MyPodcasts = () => {

    const [podcastData, setPodcastData] = useState([]);
    const [soundPlayed, setSoundPlayed]=useState(null);

    const playSound=(soundSrc)=>{
        if(soundPlayed){
            soundPlayed.stop();
        }
        let sound =new Howl({
            src: [soundSrc],
            html5: true,
        });
        setSoundPlayed(sound);
        sound.play();
    }

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/podcast/get/myPodcasts"
            );
            console.log(response.data);
            setPodcastData(response.data);
        };
        getData();
    }, []);

    return (
        <LoggedInContainer curActiveScreen={"MyPodcast"}>
            <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
                My Podcasts
            </div>
            <div className="space-y-3 overflow-auto">
                {podcastData.map((item) => {
                    return <SinglePodcastCard info={item} playSound={playSound} />;
                })}
            </div>
        </LoggedInContainer>
    );
};

export default MyPodcasts;
