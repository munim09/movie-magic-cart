import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { MovieContext } from "../context";
import { getImgUrl } from "../utils/cine-utility";
import MovieDetailsModal from "./MovieDetailsModal";
import Rating from "./Rating";

export default function MovieCard({ movie }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const { state, dispatch } = useContext(MovieContext);

    function handleAddToCart(event, movie) {
        event.stopPropagation();
        // console.log(movie);
        const found = state.cartData.find((item) => {
            return item.id === movie.id;
        });
        if (!found) {
            // setCartData([...state.cartData, movie]);
            dispatch({
                type: "ADD_TO_CART",
                payload: {
                    ...movie,
                },
            });
            toast.success(`Added  ${movie.title} to the Cart !`, {
                position: "bottom-right",
            });
        } else {
            console.error(`Already added ${movie.title} to the Cart !`);

            toast.error(`Already added ${movie.title} to the Cart !`, {
                position: "bottom-right",
            });
        }
    }

    function handleModalClose() {
        setSelectedMovie(null);
        setShowModal(false);
    }

    function handleMovieSelection(movie) {
        setSelectedMovie(movie);
        setShowModal(true);
    }

    return (
        <>
            {showModal && (
                <MovieDetailsModal
                    movie={selectedMovie}
                    onClose={handleModalClose}
                    onCartAdd={handleAddToCart}
                />
            )}
            <figure className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl">
                <div href="#" onClick={() => handleMovieSelection(movie)}>
                    <img
                        className="w-full object-cover"
                        src={getImgUrl(movie.cover)}
                        alt={movie.title}
                    />
                    <figcaption className="pt-4">
                        <h3 className="text-xl mb-1">{movie.title}</h3>
                        <p className="text-[#575A6E] text-sm mb-2">
                            {movie.genre}
                        </p>
                        <div className="flex items-center space-x-1 mb-5">
                            <Rating value={movie.rating} />
                        </div>
                        <a
                            className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
                            href="#"
                            onClick={(e) => handleAddToCart(e, movie)}
                        >
                            <img src="./assets/tag.svg" alt="" />
                            <span>${movie.price} | Add to Cart</span>
                        </a>
                    </figcaption>
                </div>
            </figure>
        </>
    );
}
