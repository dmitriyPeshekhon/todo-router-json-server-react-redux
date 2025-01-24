import './SearchAndSort.css';
import { useEffect, useState } from 'react';
import sortPng from '../../assets/sort.png';
import { useTodos, useDebounce } from '../../hooks';

export const SearchAndSort = () => {
	const [searchInput, setSearchInput] = useState('');
	const { setSearch, sort, setSort } = useTodos();

	const debunced = useDebounce(searchInput, 700);

	useEffect(() => {
		setSearch(debunced);
	}, [debunced]);

	const handleOnChange = ({ target }) => {
		setSearchInput(target.value);
	};

	return (
		<div className="container-search">
			<input
				className="search-textfield"
				type="text"
				value={searchInput}
				placeholder="Поиск..."
				onChange={handleOnChange}
			/>
			<div
				className={`btn-img-sort ${sort ? 'sort-active' : ''}`}
				onClick={() => setSort((prev) => !prev)}
			>
				<img className="img-sort" src={sortPng} alt="sort a-b" />
			</div>
		</div>
	);
};
