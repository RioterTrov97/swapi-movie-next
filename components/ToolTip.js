import React from 'react';
import styles from '../styles/ToolTip.module.scss';

const ToolTip = ({
	name,
	birth_year,
	gender,
	eye_color,
	hair_color,
	climate,
	gravity,
	orbital_period,
	designation,
	language,
	classification,
	cargo_capacity,
	classes,
}) => {
	return (
		<div className={styles.tooltip}>
			<button className={styles.tooltip__button}>{name}</button>
			<div className={styles.tooltiptext}>
				{name && <p>Name: {name}</p>}
				{birth_year && <p>Birth Year: {birth_year}</p>}
				{gender && <p>Gender: {gender}</p>}
				{eye_color && <p>Eye Color: {eye_color}</p>}
				{hair_color && <p>Hair Color: {hair_color}</p>}
				{climate && <p>Climate: {climate}</p>}
				{gravity && <p>Gravity: {gravity}</p>}
				{orbital_period && <p>Orbital Period: {orbital_period}</p>}
				{designation && <p>Designation: {designation}</p>}
				{language && <p>Language: {language}</p>}
				{classification && <p>Classification: {classification}</p>}
				{cargo_capacity && <p>Cargo Capacity: {cargo_capacity}</p>}
				{classes && <p>Class: {classes}</p>}
			</div>
		</div>
	);
};

export default ToolTip;
