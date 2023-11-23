import { useContext, useState, useLayoutEffect, useRef } from "react";
import { Howl, Howler } from "howler";
import { Icon } from "@iconify/react";
import podify_logo from '../assets/images/podify-white.png';
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import soundContext from "../contexts/soundContext";
import CreateRecordModal from "../modals/CreateRecordModal";
import AddToRecordModal from "../modals/AddToRecordModal";
import { makeAuthenticatedPOSTRequest } from "../utils/ServerHelpers";
import LogoutModal from "../modals/LogoutModal";


const LoggedInContainer = ({ children, curActiveScreen }) => {
    const [createRecordModalOpen, setCreateRecordModalOpen] =
        useState(false);
    const [addToRecordModalOpen, setAddToRecordModalOpen] = useState(false);

    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const {
        currentSound,
        setCurrentSound,
        soundPlayed,
        setSoundPlayed,
        isPaused,
        setIsPaused
    } = useContext(soundContext);

    //console.log(currentSound);

    const firstUpdate = useRef(true);

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        if (!currentSound) {
            return;
        }
        changeSound(currentSound.track);
    }, [currentSound && currentSound.track]);

    const addPodcastToRecord = async (recordId) => {
        const podcastId = currentSound._id;

        const payload = { recordId, podcastId };
        const response = await makeAuthenticatedPOSTRequest(
            "/record/add/Podcast",
            payload
        );
        if (response._id) {
            setAddToRecordModalOpen(false);
        }
    };

    const playSound = () => {
        if (!soundPlayed) {
            return;
        }
        soundPlayed.play();
    };

    const changeSound = (soundSrc) => {
        if (soundPlayed) {
            soundPlayed.stop();
        }
        let sound = new Howl({
            src: [soundSrc],
            html5: true,
        });
        setSoundPlayed(sound);
        sound.play();
        setIsPaused(false);
    };

    const pauseSound = () => {
        soundPlayed.pause();
    };

    const togglePlayPause = () => {
        if (isPaused) {
            playSound();
            setIsPaused(false);
        } else {
            pauseSound();
            setIsPaused(true);
        }
    };
    //console.log("soundPlayed: " + soundPlayed);
    return (
        <div className="h-full w-full bg-app-black">
            {createRecordModalOpen && <CreateRecordModal closeModal={() => {
                setCreateRecordModalOpen(false);
            }} />}
            {addToRecordModalOpen && <AddToRecordModal closeModal={() => {
                setAddToRecordModalOpen(false);
            }}
                addPodcastToRecord={addPodcastToRecord}
            />}
            {
                logoutModalOpen && <LogoutModal closeModal={() => {
                    setLogoutModalOpen(false);
                }}
                open={logoutModalOpen}
                heading="Log out"
                text="Are you sure you want to logout"
                option="Logout"
                navigatedTo="/login"
                />
            }
            <div className={`${currentSound ? "h-9/10" : "h-full"} w-full flex`}>
                {/* This first div will be the left panel */}
                <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
                    <div>
                        {/* This div is for logo */}
                        <div className="logoDiv p-6">
                            <img
                                src={podify_logo}
                                alt="podify logo"
                                width={125}
                            />
                        </div>
                        <div className="py-5">
                            <IconText
                                iconName={"material-symbols:home"}
                                displayText={"Home"}
                                targetLink={"/home"}
                                active={curActiveScreen === "home"}
                            />
                            <IconText
                                iconName={"material-symbols:search-rounded"}
                                displayText={"Search"}
                                active={curActiveScreen === "search"}
                                targetLink={"/search"}
                            />
                            <IconText
                                iconName={"icomoon-free:books"}
                                displayText={"Library"}
                                active={curActiveScreen === "library"}
                                targetLink={"/library"}
                            />
                            <IconText
                                iconName={
                                    "material-symbols:library-music-sharp"
                                }
                                displayText={"My Podcast"}
                                targetLink="/myPodcast"
                                active={curActiveScreen === "MyPodcast"}
                            />
                        </div>
                        <div className="pt-5">
                            <IconText
                                iconName={"material-symbols:add-box"}
                                displayText={"Create Record"}
                                onClick={() => {
                                    setCreateRecordModalOpen(true);
                                }}
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
                            <div className="w-2/3 flex justify-around items-center">
                                <TextWithHover displayText={"Download"} />
                                <TextWithHover displayText={"Support"} />
                                <TextWithHover displayText={"Logout"} onClick={() => {
                                    setLogoutModalOpen(true);
                                }} />
                                <div className="h-1/2 border-r border-white"></div>
                            </div>
                            <div className="w-1/3 flex justify-around h-full items-center">
                                <TextWithHover displayText={"Upload Podcast"} targetLink={"/uploadPodcast"} active={curActiveScreen === "uploadPodcast"} />
                                <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                                <Icon icon="iconamoon:profile-fill" className="text-lg"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content p-8 pt-0 overflow-auto">
                        {children}
                    </div>
                </div>
            </div>
            {/* This div is the current playing song */}
            {currentSound && (
                <div className="w-full h-1/10 bg-black bg-opacity-30 text-white flex items-center px-4">
                    <div className="w-1/4 flex items-center">
                        <img
                            src={currentSound.thumbnail}
                            alt="currentSoundThumbail"
                            className="h-14 w-14 rounded"
                        />
                        <div className="pl-4">
                            <div className="text-sm hover:underline cursor-pointer">
                                {currentSound.name}
                            </div>
                            <div className="text-xs text-gray-500 hover:underline cursor-pointer">
                                {currentSound.speaker.firstName +
                                    " " +
                                    currentSound.speaker.lastName}
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-center h-full flex-col items-center">
                        <div className="flex w-1/3 justify-between items-center">
                            {/* controls for the playing song go here */}
                            <Icon
                                icon="ph:shuffle-fill"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon="mdi:skip-previous-outline"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon={
                                    isPaused
                                        ? "ic:baseline-play-circle"
                                        : "ic:baseline-pause-circle"
                                }
                                fontSize={50}
                                className="cursor-pointer text-gray-500 hover:text-white"
                                onClick={togglePlayPause}
                            />
                            <Icon
                                icon="mdi:skip-next-outline"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon="ic:twotone-repeat"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                        </div>
                        {/* <div>Progress Bar Here</div> */}
                    </div>
                    <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
                        <Icon
                            icon="ic:round-playlist-add"
                            fontSize={30}
                            className="cursor-pointer text-gray-500 hover:text-white"
                            onClick={() => {
                                setAddToRecordModalOpen(true);
                            }}
                        />
                        <Icon
                            icon="ph:heart-bold"
                            fontSize={25}
                            className="cursor-pointer text-gray-500 hover:text-white"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoggedInContainer;
