import React, { useState, useEffect, useCallback, useMemo } from 'react'
import useProdavalnikAuth from '../../hooks/useProdavalnikAuth'
import { performFetch, calculateExpiration } from '../utils'
import Input from '../Components/HTML/Input'
import Select from '../Components/HTML/Select'
import Pagination from '../Components/Pagination'
import Modal from '../Components/Modal'
import Create from '../Components/Ads/Create'
import Card from '../Components/Ads/Card'
import IconMagnifying from '../Icons/Magnifying'
import IconNotFound from '../Icons/NotFound'

export default function AdsList() {
	const { prodavalnikAuth } = useProdavalnikAuth()
	const [ads, setAds] = useState([])
	const [totalAds, setTotalAds] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const headersJSON = useMemo(
		() => ({
			'Content-Type': 'application/json',
			user: prodavalnikAuth,
		}),
		[prodavalnikAuth]
	)
	const [filterData, setFilterData] = useState({
		title: '',
		price: '',
	})

	const fetchAds = useCallback(async () => {
		try {
			setIsLoading(true)

			let apiUrl = `https://prodavalnik-api.devlabs-projects.info/ads?page=${currentPage}&status=active`

			if (filterData.title) {
				apiUrl += `&search=${filterData.title}`
			}

			if (filterData.price) {
				apiUrl += `&sort=${
					filterData.price === 'Низходящ' ? 'desc' : 'asc'
				}`
			}

			const response = await performFetch(apiUrl, 'GET', headersJSON)
			const data = await response.json()

			setAds(
				data.ads.filter(
					(ad) =>
						calculateExpiration(ad.createdAt, ad.expiration, true) >
						0
				)
			)
			setTotalAds(data.totalCount)
			setTotalPages(Math.ceil(data.totalCount / 10))
			setIsLoading(false)
		} catch (err) {
			console.error(err)
			setIsLoading(false)
		}
	}, [headersJSON, currentPage, filterData.title, filterData.price])

	const handlePageChange = (page) => {
		sessionStorage.setItem('currentPageAdsList', page)
		setCurrentPage(page)
	}

	useEffect(() => {
		const storedPage = sessionStorage.getItem('currentPageAdsList')

		if (storedPage && currentPage !== parseInt(storedPage)) {
			setCurrentPage(parseInt(storedPage))
		} else if (prodavalnikAuth) {
			fetchAds()
		}
	}, [
		prodavalnikAuth,
		currentPage,
		filterData.title,
		filterData.price,
		fetchAds,
	])

	useEffect(() => {
		setTotalPages(Math.ceil(totalAds / 10))
	}, [totalAds])

	const handleInputChange = (name, value) => {
		setFilterData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleUpdateSuccess = () => {
		fetchAds()
	}

	return (
		<>
			<div className="w-full sm:flex items-center justify-between px-1 mb-3.5">
				<div className="sm:flex items-center mb-2.5 sm:mb-0">
					<div className="relative mb-2.5 sm:mb-0">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3">
							<IconMagnifying className="w-5 h-5 text-gray-500 mt-1.5" />
						</div>

						<Input
							type="text"
							placeholder="Търси..."
							classes="pl-10 sm:w-44 md:w-56"
							value={filterData.title}
							onChange={(value) =>
								handleInputChange('title', value)
							}
						/>
					</div>

					<Select
						id="sort"
						name="sort"
						placeholder="Сортирай по цена"
						options={['Възходящ', 'Низходящ']}
						classes="sm:w-44 md:w-56 mt-1.5 sm:ml-3"
						value={filterData.price}
						onChange={(value) => handleInputChange('price', value)}
					/>
				</div>

				<Modal
					buttonText="Създай обява"
					title="Добави обява"
					create={true}
				>
					<Create onUpdateSuccess={handleUpdateSuccess} />
				</Modal>
			</div>

			{isLoading ? (
				<div className="flex items-center justify-center min-h-screen w-full">
					<div className="flex items-center gap-2">
						<svg
							aria-hidden="true"
							className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
							viewBox="0 0 100 101"
							fill="none"
						>
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="currentColor"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentFill"
							/>
						</svg>

						<span className="text-xl text-slate-700">
							Зареждане...
						</span>
					</div>
				</div>
			) : (
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-3.5 sm:mb-0">
					{ads.length === 0 ? (
						<div className="flex items-center justify-center h-screen w-full sm:col-span-2 lg:col-span-3 text-slate-700 font-semibold">
							<div className="space-y-2">
								<IconNotFound />
								Няма намерени данни
							</div>
						</div>
					) : (
						<Card ads={ads} isLoading={isLoading} show={true} />
					)}
				</div>
			)}

			<div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
				{totalPages > 1 ? (
					<p className="text-[15px] text-gray-700 font-medium py-2">
						Заредени обвяви от{' '}
						<span className="font-semibold text-gray-900 ">
							{currentPage * 10 - 9}
						</span>{' '}
						до{' '}
						<span className="font-semibold text-gray-900 ">
							{totalAds < currentPage * 10
								? totalAds
								: currentPage * 10 - 1}{' '}
						</span>{' '}
						от общо{' '}
						<span className="font-semibold text-gray-900 ">
							{totalAds}
						</span>{' '}
						резултата
					</p>
				) : null}

				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					handlePageClick={handlePageChange}
				/>
			</div>
		</>
	)
}
