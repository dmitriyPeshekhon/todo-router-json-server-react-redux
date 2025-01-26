import './SearchAndSort.css';
import { useEffect, useState } from 'react';
import sortPng from '../../assets/sort.png';
import { useDebounce } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, toggleSort } from '../../redux/actions';

export const SearchAndSort = () => {
	const [searchInput, setSearchInput] = useState('');
	const search = useSelector((store) => store.searchSort.search);
	const sort = useSelector((store) => store.searchSort.sort);
	const dispatch = useDispatch();

	const debunced = useDebounce(searchInput, 700);

	useEffect(() => {
		if (search !== '' && searchInput !== '') {
			dispatch(setSearch(debunced));
		}
	}, [debunced, dispatch]);

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
				onClick={() => dispatch(toggleSort)}
			>
				<img className="img-sort" src={sortPng} alt="sort a-b" />
			</div>
		</div>
	);
};
