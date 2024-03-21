import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import RegisterPage from './components/user/RegisterPage';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/user/LoginPage';
import ProfilePage from './components/user/ProfilePage';
import './components/css/App.css';
import RestaurantList from './components/restaurant/RestaurantList';
import RestauruntDetails from './components/restaurant/RestaurantDetails';
import AdminDashboard from './components/admin/AdminDashboard';
import RoleBasedWrapper from './routes/RoleBasedWrapper';
import AddRestaurantPage from './components/restaurant/AddRestaurantPage';
import AddCuisinePage from './components/restaurant/AddCuisinePage';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Header />
				<Routes>
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/' element={<HomePage />} />
					<Route path='/profile' element={<RoleBasedWrapper roles={['User']}>
							<ProfilePage />
						</RoleBasedWrapper>} />
					<Route path='/restaurants' element={<RestaurantList />} />
					<Route path='/restaurant/:restaurantId' element={<RestauruntDetails />} />
					<Route path='/admin-dashboard' element={
						<RoleBasedWrapper roles={['Admin']}>
							<AdminDashboard />
						</RoleBasedWrapper>
					} />
					<Route path='/add-restaurant' element={<RoleBasedWrapper roles={['Admin', 'Editor']}>
							<AddRestaurantPage />
					</RoleBasedWrapper>}/>
					<Route path='/add-cuisine' element={<RoleBasedWrapper roles={['Admin', 'Editor']}>
							<AddCuisinePage />
					</RoleBasedWrapper>}/>
				</Routes>
				<Footer />
			</Router>
		</AuthProvider>
	);
};

export default App;
