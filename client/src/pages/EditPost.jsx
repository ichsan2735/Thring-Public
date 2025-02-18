import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import instance from "../config/axiosInstance";
import { useNavigate, useParams } from "react-router";


export default function EditPost() {
    const { PostId } = useParams()
    const [caption, setCaption] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [coordinates, setCoordinates] = useState(null)
    const [initialCoordinates, setInitialCoordinates] = useState(null);


    const navigate = useNavigate()

    async function handlePopulate(id) {
        try {
            const { data } = await instance({
                method: "GET",
                url: `/post/${id}`,
                headers: {
                    "Authorization": `Bearer ${localStorage.access_token}`
                }
            })
            setCaption(data.caption)
            setInitialCoordinates({
                lat: `${data.coordinate.split(", ")[0]}`,
                lng: `${data.coordinate.split(", ")[1]}`
            })
            setImageUrl(data.imgUrl)
        
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: error.response.data.message
            })
        }
    }

    useEffect(() => {
        handlePopulate(PostId)
    }, [])

    useEffect(() => {
        const map = L.map('map').setView(
            initialCoordinates ? [initialCoordinates.lat, initialCoordinates.lng] : [-6.2088, 106.8456], 
            8
        );

        let currentMarker = null;

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        if (initialCoordinates) {
            currentMarker = L.marker([initialCoordinates.lat, initialCoordinates.lng]).addTo(map);
            setCoordinates(initialCoordinates);
        }

        function onMapClick(e) {
            const { lat, lng } = e.latlng;
            setCoordinates({ lat, lng });

            if (currentMarker) {
                currentMarker.remove();
            }

            currentMarker = L.marker([lat, lng]).addTo(map);
        }

        map.on('click', onMapClick);

        return () => {
            if (currentMarker) {
                currentMarker.remove();
            }
            map.remove();
        };
    }, [initialCoordinates]);

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            setImageUrl(file);
        }
    };

    async function handleGenerate(e) {
        e.preventDefault()

        const formData = new FormData()
        formData.append('imageUrl', imageUrl)

        try {
            setLoading(true)
            const { data } = await instance({
                method: "POST",
                url: `/post/caption`,
                headers: {
                    "Authorization": `Bearer ${localStorage.access_token}`
                },
                data: formData
            })
            console.log(data);
            setCaption(data)
        } catch (error) {
            // console.log(error);

            Swal.fire({
                icon: "error",
                text: error.response.data.message
            })
        } finally {
            setLoading(false)
        }
    };

    async function handleSubmit(e) {
        e.preventDefault()

        let coordinate = `${coordinates.lat}, ${coordinates.lng}`
        // console.log(coordinate);

        try {
            setLoading(true)
            const { data } = await instance({
                method: "PUT",
                url: `/post/${PostId}`,
                headers: {
                    "Authorization": `Bearer ${localStorage.access_token}`
                },
                data: {
                    caption,
                    imgUrl: imageUrl,
                    coordinate
                }
            })
            navigate('/')
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: error.response.data.message
            })
        } finally {
            setLoading(false)
        }
    }

    return <main className="main-content">
        {/* cards */}
        <div className="card-container">
            {/* card form */}
            <div className="card lg:card-side bg-base-300 shadow-xl content-card">
                {/* map */}
                <figure className="lg:w-full h-[400px] lg:h-auto bg-base-200">
                    {/* gonna replace this with map feature */}
                    <div className="w-full h-full flex items-center justify-center">
                        {/* <div className="text-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-16 w-16 mx-auto mb-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <circle cx={12} cy={9} r={3} strokeWidth={2} />
                            </svg>
                            <p>Click on map to select location</p>
                        </div> */}

                        {/* leaflet */}
                        <div id="map" className="w-full h-full"></div>

                        {/* coordinates label */}
                        {coordinates && (
                            <div className="absolute bottom-2 left-2 bg-white p-2 rounded shadow z-[1000] text-black">
                                Location: {coordinates.lat}, {coordinates.lng}
                            </div>
                        )}

                    </div>
                </figure>
                {/* card body */}
                <div className="card-body content-card-body">
                    {/* form */}
                    <form onSubmit={handleSubmit} className="form-control w-full space-y-6">
                        {/* image upload */}
                        {/* <div className="form-group">
                            <div className="label">
                                <span className="label-text text-white">Upload Image</span>
                            </div>
                            <input
                                onChange={handleFileChange}
                                accept="image/*"
                                type="file"
                                className="file-input file-input-bordered file-input-primary w-full"
                            />
                        </div> */}
                        <div className="form-group flex-1">
                            <div className="label">
                                <span className="label-text text-white">Image URL</span>
                            </div>
                            <input 
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
                        </div>


                        {/* caption */}
                        <div className="form-group flex-1">
                            <div className="label">
                                <span className="label-text text-white">Caption</span>
                            </div>
                            <textarea
                                className="textarea textarea-bordered w-full flex-1"
                                style={{ minHeight: 200 }}
                                placeholder="Type your caption"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                            />
                        </div>
                        {/* submit */}
                        <div className="form-group mt-auto flex gap-2">
                            {/* gemini AI button */}
                            <button
                                disabled={loading || !imageUrl}
                                onClick={handleGenerate}
                                className="btn btn-info hover:bg-white hover:text-black w-1/4"
                                type="button"
                            >
                                {loading ? "Generating..." : "Generate"}
                            </button>

                            <button
                                disabled={loading}
                                className="btn btn-primary hover:bg-white hover:text-black w-3/4"
                                type="submit"
                            >
                                {loading ? "Submiting..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>

}