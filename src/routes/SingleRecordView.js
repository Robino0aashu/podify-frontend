import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import {makeAuthenticatedGETRequest} from "../utils/ServerHelpers";
import {makeAuthenticatedPOSTRequest} from "../utils/ServerHelpers";
import SinglePodcastCard from "../components/shared/SinglePodcastCard";

const SingleRecordView = () => {
    const [recordDetails, setRecordDetails] = useState({});
    const {recordId} = useParams();

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/record/get/record/" + recordId
            );
            setRecordDetails(response);
        };
        getData();
    }, [recordDetails.podcasts]);

    const removePodcastFromRecord = async (podcastId) => {

        const payload = { recordId, podcastId };
        const response = await makeAuthenticatedPOSTRequest(
            "/record/remove/Podcast",
            payload
        );
        if (response._id) {
        }
    };
    return (
        <LoggedInContainer curActiveScreen={"library"}>
            {recordDetails._id && (
                <div>
                    <div className="text-white text-xl pt-8 font-semibold">
                        {recordDetails.name}
                    </div>
                    <div className="pt-10 space-y-3">
                        {recordDetails.podcasts.map((item) => {
                            return (
                                <SinglePodcastCard activeScreen="singleRecord"
                                removeFunction={()=>{
                                    removePodcastFromRecord(item._id);
                                }}
                                    info={item}
                                    key={JSON.stringify(item)}
                                    playSound={() => {}}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </LoggedInContainer>
    );
};

export default SingleRecordView;
