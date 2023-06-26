import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Schedule from './components/Schedule'
import Dashboard from './components/DashboardComponents/Dashboard'
import Profile from './components/Profile'
import Login from './components/Login'
import useAuth from './hooks/useAuth'
import ProtectedRoute from './components/ProtectedLayout'
import EventsMain from './components/EventsComponents/EventsMain'
import QrCodeScanner from './components/QrCodeScanner/QrScannerLayout'
import SalesMain from './components/Sales/MainDash'
import AdsList from './components/Sales/AdsList'
import MyAds from './components/Sales/MyAds'
import Chat from './components/Sales/Chat'
import AdvertisementShow from './components/Аdvertisement/Show'
import LocationDash from './components/LocationComponents/MainDash'
import Corps from './components/LocationComponents/Corps'

function App() {
	const user = useAuth().auth

	if (!user) {
		return <Login />
	}

	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path="login" element={<Login />} />
			</Route>
			<Route path="/" element={<ProtectedRoute />}>
				<Route index element={<Dashboard />} />
				<Route path="profile" element={<Profile />} />
				<Route path="schedule" element={<Schedule />} />
				<Route path="events" element={<EventsMain />} />
				<Route path="qrscanner" element={<QrCodeScanner />} />

				<Route path="location" element={<LocationDash />}>
					<Route path="corps" element={<Corps />} />
					{/* <Route path="floors" element={}/> */}
					{/* <Route path="library" element={}/> */}
				</Route>

				<Route path="sales" element={<SalesMain />}>
					<Route path="advertisements" element={<AdsList />} />
					<Route path="chat" element={<Chat />} />
					<Route path="user-advertisements" element={<MyAds />} />
				</Route>

				<Route path="advertisement">
					<Route path="show/:id" element={<AdvertisementShow />} />
				</Route>
			</Route>
		</Routes>
	)
}

export default App
