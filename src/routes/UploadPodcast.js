import { useState } from "react";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import TextInput from "../components/shared/TextInput";
import { makeAuthenticatedPOSTRequest } from "../utils/ServerHelpers";
import { useNavigate } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";

const UploadPodcast = () => {
    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [podcastUrl, setPodcastUrl] = useState("");
    const [uploadedPodcastFileName, setUploadedPodcastFileName] = useState();
    const navigate = useNavigate();


    const submitPodcast = async () => {
        const data = { name, thumbnail, track: podcastUrl };
        const response = await makeAuthenticatedPOSTRequest(
            "/podcast/create",
            data
        );
        if (response.err) {
            alert("Could not create podcast");
            return;
        }
        alert("Success");
        navigate("/home");
        console.log(response);
    };

    
    return (
        <LoggedInContainer curActiveScreen={"uploadPodcast"}>
            <div className="text-2xl font-semibold mb-5 text-white mt-8">
                        Upload Your Podcast
                    </div>
                    <div className="w-2/3 flex space-x-3">
                        <div className="w-1/2">
                            <TextInput
                                label="Name"
                                labelClassName={"text-white"}
                                placeholder="Name"
                                value={name}
                                setValue={setName}
                            />
                        </div>
                        <div className="w-1/2">
                            <TextInput
                                label="Thumbnail"
                                labelClassName={"text-white"}
                                placeholder="Thumbnail"
                                value={thumbnail}
                                setValue={setThumbnail}
                            />
                        </div>
                    </div>
                    <div className="py-5">
                        {
                            uploadedPodcastFileName ? (<div className="bg-white rounded-full p-3 w-1/3">
                                {uploadedPodcastFileName.substring(0, 35)}...
                            </div>
                            ) : (<CloudinaryUpload
                                setUrl={setPodcastUrl}
                                setName={setUploadedPodcastFileName}
                            />)
                        }

                    </div>
                    <div
                        className="bg-white w-40 flex items-center justify-center p-3 rounded-full cursor-pointer font-semibold"
                        onClick={submitPodcast}
                    >
                        Submit Podcast
                    </div>
        </LoggedInContainer>
    );
};

export default UploadPodcast;
