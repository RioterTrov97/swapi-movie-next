import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/MovieCard.module.scss';

const MovieCard = ({
	title,
	episodeId,
	movieId,
	favHandler,
	favourite,
	description,
	director,
	releaseDate,
}) => {
	/* const history = useHistory(); */
	const history = useRouter();
	return (
		<div
			className={styles.MovieCard}
			onClick={(e) => {
				e.stopPropagation();
				history.push(`/movie/${movieId}`);
			}}>
			<p className={styles.MovieCard__episode}>
				Episode {episodeId} <span>({releaseDate.split('-')[0]})</span>
			</p>
			<p className={styles.MovieCard__title}>{title}</p>
			<p className={styles.MovieCard__description}>{description}</p>
			<p className={styles.MovieCard__director}>
				Directed by <span>{director}</span>
			</p>
			<div className={styles.MovieCard__icons}>
				<i
					className={
						styles.fa_heart +
						`${favourite ? ' fas' : ' far'} fa-heart`
					}
					onClick={(e) => {
						e.stopPropagation();
						favHandler(movieId);
					}}></i>
			</div>
		</div>
	);
};

export default MovieCard;
