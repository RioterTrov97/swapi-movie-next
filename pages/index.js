import Head from 'next/head';
import axios from '../utils/axios';
import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import styles from '../styles/HomeScreen.module.scss';

export default function Home({ movieData }) {
	const [movies, setMovies] = useState([]);
	const [favMovies, setFavMovies] = useState([]);

	const [loading, setLoading] = useState(false);

	const [toggle, setToggle] = useState(false);
	const [searchResult, setSearchResult] = useState(null);
	const [keyword, setKeyword] = useState('');

	const favMovieListHandler = (movieId) => {
		if (favMovies?.includes(movieId)) {
			const favs = favMovies.filter((element) => element !== movieId);
			setFavMovies(() => favs);
			setToggle((toggle) => !toggle);
			localStorage.setItem('favMovies', JSON.stringify(favs));
		} else {
			let favMov = favMovies && [...favMovies, movieId];
			if (favMovies) {
				setFavMovies(() => favMov);
				setToggle((toggle) => !toggle);
			} else {
				favMov = [movieId];
				setFavMovies([movieId]);
				setToggle((toggle) => !toggle);
			}
			localStorage.setItem('favMovies', JSON.stringify(favMov));
		}
	};

	useEffect(() => {
		setLoading(() => true);
		async function fetchFav() {
			const favourites = await JSON.parse(
				localStorage.getItem('favMovies')
			);
			setFavMovies(() => favourites);
			return favourites;
		}

		async function fetchData() {
			try {
				const fav = await fetchFav();
				let request = [];
				if (movies.length === 0) {
					request = movieData;
				} else {
					request = movies;
				}

				const sortedMovies = request
					.map((movie) => {
						//add favourite data to movies
						const movieId = movie?.url?.split('/');
						if (fav?.includes(movieId[movieId.length - 2])) {
							movie.favourite = true;
						} else {
							movie.favourite = false;
						}
						return movie;
					})
					.sort(function (a, b) {
						//sorting episodes from ascending to descending
						return a.episode_id - b.episode_id;
					})
					.sort(function (a, b) {
						//sorting episodes based on whether they are user favourite
						return a.favourite === b.favourite
							? 0
							: a.favourite
							? -1
							: 1;
					});
				setMovies(sortedMovies);
				setLoading(() => false);
			} catch (error) {
				console.log(error);
				setLoading(() => false);
			}
		}

		fetchData();

		// eslint-disable-next-line
	}, [setFavMovies, toggle]);

	const searchHandler = (keyword) => {
		const filtered = movies?.filter((v) =>
			v.title.toLowerCase().includes(keyword.toLowerCase())
		);
		setSearchResult(filtered);
	};

	const clearSearch = () => {
		setKeyword(() => '');
		setSearchResult(() => null);
	};

	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;1,200;1,300;1,400;1,600;1,700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<div className={styles.HomeScreen}>
				<div className={styles.HomeScreen__container}>
					{loading ? (
						<Loader />
					) : (
						<>
							<div className={styles.HomeScreen__search}>
								<input
									placeholder="Search Star War Movies"
									value={keyword}
									onChange={(e) => setKeyword(e.target.value)}
								/>
								<button onClick={() => searchHandler(keyword)}>
									Search
								</button>
							</div>
							<div className={styles.HomeScreen__movieList}>
								{searchResult ? (
									<div
										className={
											styles.HomeScreen__movieList__resultClear
										}>
										<button onClick={() => clearSearch()}>
											Clear Search Results ❌
										</button>
									</div>
								) : null}

								<div
									className={
										styles.HomeScreen__movieList__results
									}>
									{!searchResult ? (
										movies?.map((movie, index) => {
											const id = movie.url.split('/');
											const favourite =
												favMovies?.includes(
													id[id.length - 2]
												);
											return (
												<MovieCard
													key={index}
													releaseDate={
														movie.release_date
													}
													director={movie.director}
													description={
														movie.opening_crawl
													}
													episodeId={movie.episode_id}
													title={movie.title}
													movieId={id[id.length - 2]}
													favHandler={
														favMovieListHandler
													}
													favourite={favourite}
												/>
											);
										})
									) : searchResult.length !== 0 ? (
										searchResult?.map((movie, index) => {
											const id = movie.url.split('/');
											const favourite =
												favMovies.includes(
													id[id.length - 2]
												);
											return (
												<MovieCard
													key={index}
													releaseDate={
														movie.release_date
													}
													director={movie.director}
													description={
														movie.opening_crawl
													}
													episodeId={movie.episode_id}
													title={movie.title}
													movieId={id[id.length - 2]}
													favHandler={
														favMovieListHandler
													}
													favourite={favourite}
												/>
											);
										})
									) : (
										<p
											style={{
												fontSize: 20,
												textAlign: 'center',
											}}>
											Sorry! we could not find what you're
											looking for 😔
										</p>
									)}
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export async function getStaticProps() {
	const { data } = await axios.get('/films');
	const movieData = await data.results;
	return {
		props: {
			movieData,
		},
		revalidate: 1,
	};
}
