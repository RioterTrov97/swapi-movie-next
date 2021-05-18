import Head from 'next/head';
import axios from '../../utils/axios';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/MovieScreen.module.scss';
import Loader from '../../components/Loader';
import ToolTip from '../../components/ToolTip';

import { useRouter } from 'next/router';

const MovieScreen = ({ movieData }) => {
	const [movie, setMovie] = useState(null);
	const [characters, setCharacters] = useState([]);
	const [planets, setPlanets] = useState([]);
	const [species, setSpecies] = useState([]);
	const [starships, setStarships] = useState([]);
	const [vehicles, setVehicles] = useState([]);

	const history = useRouter();
	const movieId = history.query.id;

	useEffect(() => {
		async function fetchData() {
			try {
				/* const request = await axios.get(`/films/${movieId}`); */
				const request = await movieData;
				setMovie(request);
			} catch (error) {
				console.log(error);
			}
		}
		return fetchData();
	}, [movieId]);

	useEffect(() => {
		const fetchUrlData = () => {
			try {
				const newData = async (url, type) => {
					const newUrl = url.split('/');
					const request = await axios.get(
						`/${newUrl[4]}/${newUrl[5]}`
					);
					if (type === 'characters')
						setCharacters((character) => [
							...character,
							request.data,
						]);
					if (type === 'planets')
						setPlanets((planet) => [...planet, request.data]);
					if (type === 'species')
						setSpecies((species) => [...species, request.data]);
					if (type === 'starships')
						setStarships((starship) => [...starship, request.data]);
					if (type === 'vehicles')
						setVehicles((vechile) => [...vechile, request.data]);
				};
				if (characters.length === 0)
					movie?.characters.map((character) => {
						return newData(character, 'characters');
					});
				if (planets.length === 0)
					movie?.planets.map((planet) => {
						return newData(planet, 'planets');
					});
				if (species.length === 0)
					movie?.species.map((species) => {
						return newData(species, 'species');
					});
				if (starships.length === 0)
					movie?.starships.map((starship) => {
						return newData(starship, 'starships');
					});
				if (vehicles.length === 0)
					movie?.vehicles.map((vechile) => {
						return newData(vechile, 'vehicles');
					});
			} catch (error) {
				console.log(error);
			}
		};

		return fetchUrlData();

		// eslint-disable-next-line
	}, [movie]);

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
				<meta
					httpEquiv="Content-Security-Policy"
					content="upgrade-insecure-requests"
				/>
				<meta property="og:title" content={movie?.title} />
				<meta
					property="og:description"
					content={movie?.opening_crawl}
				/>
				<title>{movie?.title}</title>
			</Head>
			<div className={styles.MovieScreen}>
				<div className={styles.MovieScreen__container}>
					<div className={styles.MovieScreen__top}>
						<i
							className={
								styles.MovieScreen__top__button +
								' fas fa-arrow-circle-left'
							}
							onClick={() => history.push('/')}></i>
						<p className={styles.MovieScreen__top__episode}>
							Episode {movie?.episode_id}:&nbsp;
							<span className={styles.MovieScreen__top__title}>
								{movie?.title}
							</span>
						</p>
					</div>

					<div className={styles.MovieScreen__details}>
						<p>
							<strong>Directed</strong> by {movie?.director} &{' '}
							<strong>Produced</strong> by {movie?.producer}.
						</p>
						<p>Released on {movie?.release_date}.</p>
					</div>

					<div className={styles.MovieScreen__description}>
						<p>
							Overview <br /> <span>{movie?.opening_crawl}</span>
						</p>
					</div>

					<div className={styles.MovieScreen__characters}>
						<p>Characters &nbsp;</p>
						<div>
							{characters.map((character, index) => {
								return (
									<ToolTip
										key={index}
										name={character.name}
										birth_year={character.birth_year}
										gender={character.gender}
										eye_color={character.eye_color}
										hair_color={character.hair_color}
									/>
								);
							})}
						</div>
					</div>
					<div className={styles.MovieScreen__characters}>
						<p>Planets &nbsp;</p>
						<div>
							{planets.map((planet, index) => {
								return (
									<ToolTip
										key={index}
										name={planet.name}
										climate={planet.climate}
										gravity={planet.gravity}
										orbital_period={planet.orbital_period}
									/>
								);
							})}
						</div>
					</div>
					<div className={styles.MovieScreen__characters}>
						<p>Species &nbsp;</p>
						<div>
							{species.map((species, index) => {
								return (
									<ToolTip
										key={index}
										name={species.name}
										designation={species.designation}
										language={species.language}
										classification={species.classification}
									/>
								);
							})}
						</div>
					</div>
					<div className={styles.MovieScreen__characters}>
						<p>Starships &nbsp;</p>
						<div>
							{starships.map((starship, index) => {
								return (
									<ToolTip
										key={index}
										name={starship.name}
										cargo_capacity={starship.cargo_capacity}
										classes={starship.starship_class}
									/>
								);
							})}
						</div>
					</div>
					<div className={styles.MovieScreen__characters}>
						<p>Vehicles &nbsp;</p>
						<div>
							{vehicles.map((vehicle, index) => {
								return (
									<ToolTip
										key={index}
										name={vehicle.name}
										cargo_capacity={vehicle.cargo_capacity}
										classes={vehicle.vehicle_class}
									/>
								);
							})}
						</div>
					</div>
					<div className={styles.MovieScreen__edited}>
						<p>Last edited at {movie?.created.split('T')[0]}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default MovieScreen;

export async function getStaticPaths() {
	const request = await axios.get(`/films`);
	const data = await request.data.results;

	const paths = data.map((movie) => {
		const movieUrl = movie.url.split('/');
		const movieId = movieUrl[movieUrl.length - 2].toString();
		return {
			params: {
				id: movieId,
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const request = await axios.get(`/films/${params.id}`);
	const movieData = await request.data;

	return {
		props: {
			movieData: movieData ? movieData : null,
		},
		revalidate: 1,
	};
}
